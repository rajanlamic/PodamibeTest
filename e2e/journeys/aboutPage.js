/**
 * Created by rajan.lamichhane on 16/05/2016.
 */

var aboutTest = require('../tests/aboutpageobjectTest');
var utils = require('../utils/utils');

module.exports = {
    'load page' : aboutTest.load,
    'text box value change' : aboutTest.change,
    'end browser' : utils.endBrowser
}