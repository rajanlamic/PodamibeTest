/**
 * Created by rajan.lamichhane on 17/05/2016.
 */

var fs = require('fs');
var util = require('util');
var expect = require('chai').expect;
var _ = require('underscore');

module.exports = {
    page: null,
    digitalData: {},
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
                self.digitalData = response.value;
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
            this.assert.equal(self.digitalData.page.hasOwnProperty('pageInfo'), true);
            this.assert.equal(self.digitalData.page.pageInfo.pageName, "homePage");
        });

        expect('foo').to.equal('foo');

        // KF = Key Fixed
        // VF = Value Fixed
        // VA = Value any

        var expectedValueFormat = {
            "KF.page": {
                "KF.pageInfo": {
                    "KF.VF.pageName": "homePage"
                },
                "KF.VF.events": []
            },
            "KF.VF.event": [],
            "KF.user": {
                "KF.profile": {
                    "KF.profileInfo": {
                        "KF.VA.websphereId": "1444230441570-6"
                    }
                }
            }
        };

        var actualValue = {
            "page": {
                "pageInfo": {
                    "pageName": "homePage"
                },
                "events": []
            },
            "event": [],
            "user": {
                "profile": {
                    "profileInfo": {
                        "websphereId": "1444230441570-6"
                    }
                }
            }
        };

        var assetDigitalData = function(value, key, list, actualValue) {

            // check for key preset or not
            if(key) {
                var keyFixed = key.indexOf('KF') !== -1 ? true : false;
                var valueFixed = key.indexOf('VF') !== -1 ? true : false;
                var valueAny = key.indexOf('VA') !== -1 ? true : false;
                var cleanKey;
                var cleanValue;

                if(keyFixed) cleanKey = key.replace("KF.", "");
                if(valueFixed) cleanKey = cleanKey.replace("VF.", "");
                if(valueAny) cleanKey = cleanKey.replace("VA.", "");
                //cleanKey = key;

                //if(keyFixed && valueFixed) {
                //    cleanKey = key.replace("KF.", "").replace("VF.", "");
                //} else if(keyFixed && valueAny) {
                //    cleanKey = key.replace("KF.", "").replace("VA.", "");
                //} else if(keyFixed) {
                //    cleanKey =  key.replace("KF.", "");
                //} else if(valueFixed) {
                //    cleanKey = key.replace("VF.", "");
                //}

                expect(actualValue).to.have.any.property(cleanKey);
                console.log('checking key ' + cleanKey + '.............. OK');
            }

            var nextList = list[key];
            if(_.isObject(nextList) && !_.isArray(nextList)) {
                _.each(nextList, function(valueNext, keyNext, listNext ) {
                    assetDigitalData(valueNext, keyNext, listNext, actualValue[cleanKey] );
                });
            }

            //console.log('key', key);
            //console.log('value', value);
            //console.log('list', list);
        }
        _.each(expectedValueFormat, function(value, key, list) {
            assetDigitalData(value, key, list, actualValue);
        });
    }
}
