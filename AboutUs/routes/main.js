/**
 * Created by Rajan.Lamichhane on 10/05/2016.
 */

import React from 'react';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router'
import routes from './routes.jsx'
import {render} from 'react-dom';

import About from './about.jsx'
import Home from './home.jsx'
import App from './app.jsx'

function createElement( Component, props ) {
    return <Component {...props} />;
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/app" component={App} />
    </Router>
), document.getElementById('app-container'))
