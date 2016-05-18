/**
 * Created by rajan.lamichhane on 17/05/2016.
 */

var fs = require('fs');
var util = require('util');
var expect = require('chai').expect;
var _ = require('underscore');

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
            this.assert.equal('is pageInfo is property of page', 'is pageInfo is property of page');
            this.assert.equal(self.actual.page.hasOwnProperty('pageInfo'), true);
            this.assert.equal(self.actual.page.pageInfo.pageName, "homePage");
        });

        // KF = Key Fixed
        // KA = Key Any | Optional
        // VF = Value Fixed
        // VA = Value any

        //things to remember
        // types are checked automatically so this covers the VA - value any
        // value with fixed are checked and displayed
        // key presence are checked

        var expectedValueFormat = {
            "KF|page": {
                "KF|pageInfo": {
                    "KF|VF|pageName": "homePage"
                },
                "KF|events": []
            },
            //"KA.optKey" : [],
            "KF|event": [],
            "KF|user": {
                "KF|profile": {
                    "KF|profileInfo": {
                        "KF|VA|websphereId": "1444230441570-6"
                    }
                }
            }
        };

        var expected;
        fs.readFile('e2e/asm1/expected/homepage.json', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            console.log(data);
            expected = data;
        });

        var assetDigitalData = function(value, key, list, actualValue) {

            // check for key preset or not
            if(key) {
                var keyFixed = key.indexOf('KF|') !== -1 ? true : false;
                var valueFixed = key.indexOf('VF|') !== -1 ? true : false;
                var valueAny = key.indexOf('VA|') !== -1 ? true : false;
                var keyOptional = key.indexOf('KA|') !== -1 ? true : false;
                var cleanKey = key;

                if(keyFixed) cleanKey = cleanKey.replace("KF|", "");
                if(valueFixed) cleanKey = cleanKey.replace("VF|", "");
                if(valueAny) cleanKey = cleanKey.replace("VA|", "");
                if(keyOptional) cleanKey = cleanKey.replace("KA|", "");

                if(!keyOptional) expect(actualValue).to.have.property(cleanKey);
                console.log('checking key ' + cleanKey + ' present .............. OK');
            }

            if(!keyOptional) expect(typeof actualValue[cleanKey]).to.equal(typeof list[key]);
            console.log('checking key ' + cleanKey + ' type .............. OK');

            if(value) {
                if(!keyOptional && valueFixed) {
                    expect(actualValue[cleanKey]).to.equal(list[key]);
                    console.log('checking key ' + cleanKey + ' value ' + actualValue[cleanKey] + ' .............. OK');
                }
            }

            var nextList = list[key];
            if(_.isObject(nextList) && !_.isArray(nextList)) {
                _.each(nextList, function(valueNext, keyNext, listNext ) {
                    assetDigitalData(valueNext, keyNext, listNext, actualValue[cleanKey] );
                });
            }
        }
        _.each(expectedValueFormat, function(value, key, list) {
            assetDigitalData(value, key, list, self.actual);
        });
    }
}
