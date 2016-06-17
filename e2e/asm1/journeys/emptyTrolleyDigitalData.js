/**
 * Created by rajan.lamichhane on 17/05/2016.
 */

var loginTest = require('../tests/loginTest');
var searchTest = require('../tests/searchTest');
var plpTest = require('../tests/plpTest');
var emptyTrolleyConfirmationTest = require('../tests/emptyTrolleyConfirmationTest');

var utils = require('../../utils/utils');

module.exports =  {
    'load ASM1' : loginTest.load,
    'click login button at RHS' : loginTest.preLogin,
    'do login ' : loginTest.login,

    //'check for homepage redirect after login' : loginTest.checkLogin,
    //'save digital Data' : loginTest.saveDigitalData,
    //'check digital Data' : loginTest.checkDigitalData

    'load search page' : searchTest.load,
    'submit search button' : searchTest.search,

    'load plp page' : plpTest.load,
    'add first product to the basket' : plpTest.addToBasketFirstProduct,
    //'add second product to the basket' : plpTest.addToBasketSecondProduct,

    'click on empty trolley link' : plpTest.emptyTrolley,

    'load empty trolley confirmation' : emptyTrolleyConfirmationTest.load,
    'click empty trolley confirmation link' : emptyTrolleyConfirmationTest.clickEmptyTrolleyConfirmation,

    'save digitalData - Empty trolley - Search' : searchTest.saveDigitalData,
    //'check digitalData - Empty trolley - Search' : searchTest.checkDigitalData,

    'close browser' : utils.endBrowser
}


// not working for multi search with code before refactor
