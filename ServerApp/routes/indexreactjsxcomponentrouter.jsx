var express         = require( 'express' ),
    router            = express.Router();
    //React             = require( 'react' );
    //ReactDOMServer    = require('react-dom/server');
    //RoutingContext    = require( 'react-router' ).RoutingContext,
    //match             = require( 'react-router' ).match;
    //qs                = require( 'qs' );
    //createLocation    = require( 'history/lib/createLocation' ),
    //routes           = require( './routes.jsx' )

import React from 'react';
import {renderToString} from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './router.jsx';
//import { createMemoryHistory } from 'react-router'

//import { RouterContext } from 'react-router;

/* GET home page. */
router.use( function(req, res, next) {

    //var location = req.url;
    //var location            = createMemoryHistory( req.url );
    var location            = req.url;

    //location.query = qs.parse( location.substr( 1 ) );

    console.log('location', location);

    match({ routes, location }, ( error, redirectLocation, renderProps ) => {



        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            // You can also check renderProps.components or renderProps.routes for
            // your "not found" component or route respectively, and send a 404 as
            // below, if you're using a catch-all route.

            // callback which populates props in components
            function createElement( Component, props ) {
                return <Component {...props} />
            }

            //var content = renderToString( <RouterContext { ...renderProps } /> );
            //var content = ReactDOMServer.renderToString( <RouterContext { ...renderProps } createElement={ createElement } /> );
            var content = renderToString( <RouterContext { ...renderProps } createElement={ createElement } /> );
            res.render( 'index', {
                title: 'Express',
                content: content
            });

        } else {
            res.status(404).send('Not found')
        }





    });


});

module.exports = router;
