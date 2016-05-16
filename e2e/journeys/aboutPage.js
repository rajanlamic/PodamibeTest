/**
 * Created by rajan.lamichhane on 16/05/2016.
 */

var aboutTest = require('../tests/aboutpageobjectTest');
var utils = require('../utils/utils');

module.exports = {
    'about test page' : aboutTest.load,
    'about test text box change value' : aboutTest.change,
    'end browser' : utils.endBrowser
}