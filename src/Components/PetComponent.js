var React = require('react');
var constants = require('../constants');

var compStyle = {
    display : 'inline-block',
    marginLeft : 'auto',
    marginRight : 'auto'
};

var btnStyle = {
    height : '25px',
    width  : '70px',
    marginTop : '10px',
    marginLeft : '5px',
    marginRight : '5px'
};

var LOSER = constants.LOSER;
var CUTE = constants.CUTE;

 class PetComponent extends React.Component {
     


    render() {
        var result = null;
        if(this.props.result !== ''){
            var resultStyle = {};
            var disabled = false;
            if(this.props.result === LOSER)
            {
                resultStyle = {color : 'red'};
            }else {
                resultStyle = {color : 'green'};
            }
            result = <h2 style ={resultStyle}>{this.props.result}</h2>
            disabled = true;
                    }

        return (
            <div  style = {compStyle}>
            {result}
            {(this.props.result) ? <h3>{this.props.petName} Likes: {this.props.likesCount}</h3> : <h3>{this.props.petName}</h3>}
            
            <img style={{height: 400 , width : 600}} src={this.props.petImageUrl} alt ={CUTE+''+this.props.petName+ "Images"}/>
            <br/>
            <button style = {btnStyle} value={this.props.petName} disabled={disabled} onClick={this.props.onLikeBtnClick}>Like</button>
            <button style = {btnStyle} value={this.props.petName} disabled={disabled} onClick={this.props.onDislikeBtnClick}>DisLike</button>
            </div>
        );
    }
 }


 module.exports = PetComponent;