/**
 * Created by rajan.lamichhane on 17/05/2016.
 */

var loginTest = require('../tests/loginTest');
var utils = require('../../utils/utils');

module.exports =  {
    'load ASM1' : loginTest.load,
    //'click login button at RHS' : loginTest.preLogin,
    //'do login ' : loginTest.login,
    //'check for homepage redirect after login' : loginTest.checkLogin,
    'save digital Data' : loginTest.saveDigitalData,
    'check digital Data' : loginTest.checkDigitalData,
    'close browser' : utils.endBrowser
}
