//var Router = require( 'react-router' ).Router,
//    routes = require( './routes' );

import React from 'react';
import {Router} from 'react-router';
import routes from './routes.jsx';

module.exports = (
  <Router>
    { routes }
  </Router>
);
