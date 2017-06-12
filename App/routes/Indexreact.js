//import first from './mycontent';

var express = require('express');
var router = express.Router();
//
var React = require('react');
//
var ReactDOMServer = require('react-dom/server');



//var About = require('./about.jsx');
//About = React.createFactory(require('../About'))

/* GET home page. */
router.get('/', function(req, res, next) {

    var abouts = React.createElement('null', 'div', 'React rendered on server');
    var content = ReactDOMServer.renderToString(abouts);
    res.render('index', {
        title: 'Express',
        content: content
    });
});

module.exports = router;
