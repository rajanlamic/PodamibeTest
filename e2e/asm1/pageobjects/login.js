/**
 * Created by rajan.lamichhane on 17/05/2016.
 */

var assert = require('chai').assert;

module.exports = {
    url : 'http://int1.stbc2.jstest2.net/shop/gb/groceries',
    elements : {
        preLoginBtn : {
            selector: '#Rhs_signIn input[type="submit"]'
        },
        userNameTxt: {
            selector: '#logonId'
        },
        passwordTxt: {
          selector: '#logonPassword'
        },
        loginBtn : {
            selector: '#signIn input[type="submit"]'
        },
        homepage: {
          selector : '#homePage'
        }
    },
    commands: [{
        someMethod: function(){
            var something = 'something';
            assert.equal(something, 'something');
        }
    }]
}