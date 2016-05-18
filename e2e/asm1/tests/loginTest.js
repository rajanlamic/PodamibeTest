/**
 * Created by rajan.lamichhane on 17/05/2016.
 */

var fs = require('fs');
var utils = require('../../utils/utils');
var expect = require('chai').expect;
var _ = require('underscore');
var expectedFormat = require('../files/homepagejson');

module.exports = {
    page: null,
    actual: {},
    load: function(browser) {
        this.page = browser.page.login();
        this.page.navigate();
        browser.saveScreenshot('e2e/asm1/screenshots/login/loadAsm1.png');
    },
    preLogin: function(browser) {
        browser.pause(1000);
        this.page.click('@preLoginBtn');
    },
    login: function(browser) {
        browser.pause(1000);
        browser.saveScreenshot('e2e/asm1/screenshots/login/login.png');

        this.page.setValue('@userNameTxt', 'ccuser@test.com');
        this.page.setValue('@passwordTxt', 'Password1');
        this.page.click('@loginBtn');
    },
    checkLogin: function (browser) {
        browser.pause(2000);
        this.page
            //.assert.title("Sainsbury's online Grocery Shopping and Fresh Food Delivery")
            .assert.visible('@homepage')
            .assert.containsText('@homepage', 'Hello');
        browser.saveScreenshot('e2e/asm1/screenshots/login/homepage.png');
    },
    saveDigitalData : function(browser) {
        var self = this;
        browser
            .execute("return window.digitalData;", [], function(response) {
                self.actual = response.value;
                fs.writeFile("e2e/asm1/actual/homepage.json", JSON.stringify(response.value, null, 2) , 'utf8', function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("digitalData was saved!");
                });
            })
    },
    checkDigitalData: function(browser) {
        browser.pause(1000);

        var self = this;
        browser.getText("body", function(result) {
            this.assert.equal('check digitalData properties, type and value', 'check digitalData properties, type and value');
        });

        utils.assertDigitalDataEntry(expectedFormat, self.actual);

    }
}
