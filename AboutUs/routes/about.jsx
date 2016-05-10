//var React = require("react");
import React from 'react';
console.log('about about');

var About = React.createClass({
    onChange: function() {
        alert('clicked');
    },
    render: function() {
        return (<div>
            <input onChange={this.onChange} value='input text' />
            ABOUT us reacted s
        </div>);
    }
});

module.exports = About;


