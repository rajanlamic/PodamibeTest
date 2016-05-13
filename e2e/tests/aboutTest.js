/**
 * Created by rajan.lamichhane on 12/05/2016.
 */

//var fs = require('fs');


//module.exports = {
//    'about test' : function (browser) {
//        browser
//            .url('http://localhost:3001/about')
//            //.useCss()
//            .pause(1000)
//            expect.element('body').to.be.present.before(1000)
//            //.setValue('#aboutTxt', 'a')
//            //.waitForElementVisible('#aboutTxt', 1000)
//            //.click('button[name=btnG]')
//            //.pause(1000)
//            //.execute("return window.screen.height;", [], function(response) {
//            //    var value = response.value;
//            //    console.log('value', value);
//            //
//            //    fs.writeFile("e2e/test.txt", "The screen size is " + value, function(err) {
//            //        if(err) {
//            //            return console.log(err);
//            //        }
//            //
//            //        console.log("The file was saved!");
//            //    });
//            //})
//            //.assert.value("#aboutTxt", "aboutTxt")
//            //.waitForElementPresent('#aboutTxt', 1000, false, function() {}, 'elemento %s no era presente en %d ms')
//            //.expect.element('#aboutTxt').text.to.equal("input texta")
//            //.assert.value("#aboutBtn", "ABOUT us reacted s watch after")
//            //.click('#aboutBtn')
//            //.saveScreenshot("e2e/screenshots/about.png")
//            .end();
//    }
//};


module.exports = {
    'about test' : function (browser) {
        browser
            .url('http://localhost:3001/about')
            .pause(4000)
            .waitForElementVisible('body', 5000)
            .assert.containsText('#app-container', 'about us')
            .assert.valueContains('#aboutTxt', 'nightwatch_')
            .setValue('#aboutTxt', '_nightwatch_')
            .pause(2000)
            .assert.valueContains('#aboutTxt', 'nightwatch__nightwatch_')
            .end();
    }
};