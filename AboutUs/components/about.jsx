//var React = require("react");
import React from 'react';
console.log('about about');

var About = React.createClass({
    onChange: function() {
        alert('clicked edited del s r k');
    },
    render: function() {
        return (<div>
            <input type="text" id="aboutTxt" onChange={this.onChange} value='nightwatch_' />
            <input type="button" id="aboutBtn" value="ABOUT us reacted s watch after" />
            about us
        </div>);
    }
});

module.exports = About;


