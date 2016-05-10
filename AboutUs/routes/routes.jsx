// modules/routes.js
import React from 'react'
import { Route, IndexRoute, Router } from 'react-router'
import About from './about.jsx'
import Home from './home.jsx'
import App from './app.jsx'

//var React                       = require( 'react' ),
//    Route                       = require( 'react-router' ).Route,
//    IndexRoute                  = require( 'react-router' ).IndexRoute,
//    About                       = require('./about.jsx'),
//    Home                        = require('./home.jsx');


module.exports = (
    <Route>
        <Route path="/" component={Home}>
            <IndexRoute component={Home} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="/app" component={App} />
    </Route>
)