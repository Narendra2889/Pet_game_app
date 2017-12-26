var React = require('react');
var headerStyle = {
    textAlign : 'center',
    fontSize : '2em',
    color : 'blue'
};

var Header = function() {
    return (
        <h1 style = {headerStyle}>
        Welcome to the home page of pet Game!!!
    </h1>
    );
};

module.exports = Header;