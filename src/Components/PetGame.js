var React = require('react');
var axios = require('axios');
var PetComponent = require('./PetComponent');
var constants = require('../constants');

var btnStyle = {
    height : '25px',
    marginLeft : '5px',
    marginTop : '30px'
};

var CAT =constants.CAT;
var DOG = constants.DOG;
var WINNER = constants.WINNER;
var LOSER = constants.LOSER;
var TIE = constants.TIE;
var API_KEY = constants.API_KEY;
var CAT_URL = 'http://localhost:63000/cat/?api_key=' + API_KEY;
var DOG_URL = 'http://localhost:63000/dog/?api_key=' + API_KEY;

class PetGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cat : { result :'', imageUrl : ''},
            dog : { result :'', imageUrl : ''}
         };
        this.catLikesCount = 0;
        this.dogLikesCount = 0;
        this.handleShowWinnerBtnClick = this.handleShowWinnerBtnClick.bind(this);
        this.handleStartOverBtnClick = this.handleStartOverBtnClick.bind(this);
        this.handleLikeBtnClick = this.handleLikeBtnClick.bind(this);
        this.handleDislikeBtnClick = this.handleDislikeBtnClick.bind(this);
    }

    componentDidMount() {
        this.fetchImages();
    }

    fetchPetImage(PET_URL, petName){
        petName = petName.toLowerCase();
        axios.get(PET_URL)
        .then(function(resp) {
            var imageUrl = resp.data.imageUrl;

            this.setState(function(prevState){
                var state = {};
                state[petName] = {
                    result : prevState[petName].result, imageUrl : imageUrl
                };
                return state;
            });
        }.bind(this));
    }

    fetchImages() {
        this.fetchPetImage(CAT_URL, CAT);
        this.fetchPetImage(DOG_URL, DOG);
      }
    handleLikeDislikeBtnClick(petName, operation) {
        this.fetchImages();
        //var petName = event.target.value;
        if (petName === CAT) {
            this.catLikesCount +=operation;
        } else if(petName === DOG) {
            this.dogLikesCount +=operation;
        }
    }
    handleLikeBtnClick(event)
    {
        this.handleLikeDislikeBtnClick(event.target.value, 1);
    }
    handleDislikeBtnClick(event)
    {
     this.handleLikeDislikeBtnClick(event.target.value, -1);
}
    handleShowWinnerBtnClick() {
        var catLikesCount = this.catLikesCount;
        var dogLikesCount = this.dogLikesCount;
        var catResult = TIE;
        var dogResult = TIE

        this.fetchImages();
        if(catLikesCount > dogLikesCount) {
           // console.log('cat is a winner');
            catResult = WINNER
            dogResult = LOSER
        } else if (catLikesCount < dogLikesCount) {
           // console.log('dog is a winner');
            catResult = LOSER
            dogResult = WINNER
        }

        this.setState(function (prevState) {
            return {
                cat : { result : catResult, imageUrl : prevState.cat.imageUrl },
                dog : { result : dogResult, imageUrl : prevState.dog.imageUrl }
                
            };
        });
    }
    handleStartOverBtnClick() {
        this.fetchImages();
        this.catLikesCount =0;
        this.dogLikesCount =0;
        this.setState({
            cat : { result :'', imageUrl : ''},
            dog : { result :'', imageUrl : ''}
        });
    }
    render (){
        return (
            <div>
                <div style = {{marginTop : 60, textAlign : 'center'}}>
                    <PetComponent 
                    petName= {CAT} 
                    likesCount = {this.catLikesCount}
                    petImageUrl={this.state.cat.imageUrl}
                    result = {this.state.cat.result}
                    onLikeBtnClick = {this.handleLikeBtnClick}
                    onDislikeBtnClick = {this.handleDislikeBtnClick}
                    />
                    <PetComponent 
                    petName= {DOG}
                    likesCount = {this.dogLikesCount}
                    petImageUrl={this.state.dog.imageUrl}
                    result = {this.state.dog.result}
                    onLikeBtnClick = {this.handleLikeBtnClick}
                    onDislikeBtnClick = {this.handleDislikeBtnClick}
                    />
                </div>
                <div style={{textAlign:'center'}}>
                {!this.state.cat.result&&
                <button style = {btnStyle} onClick={this.handleShowWinnerBtnClick}>Show Winner</button>}
                <button style = {btnStyle} onClick={this.handleStartOverBtnClick}>Reset</button>
                </div>
            </div>
        );
    }
}

module.exports = PetGame;