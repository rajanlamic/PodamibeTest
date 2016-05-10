var express = require('express');
var router = express.Router();

var React = require('react');

var ReactDOMServer = require('react-dom/server');
var About = require('./about.jsx');

/* GET home page. */
router.get('/', function(req, res, next) {

    var AboutUS = React.createFactory(About());
    console.log('AboutUS', AboutUS)
    //var content = ReactDOMServer.renderToString(AboutUS());
    res.render('index', {
        title: 'Express',
        content: 'content'
    });
});

module.exports = router;
