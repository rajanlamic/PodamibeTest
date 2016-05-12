/**
 * Created by rajan.lamichhane on 12/05/2016.
 */

var fs = require('fs');


module.exports = {
    'Demo test Google' : function (browser) {
        browser
            .url('http://www.google.com')
            .waitForElementVisible('body', 1000)
            .setValue('input[type=text]', 'nightwatch')
            .waitForElementVisible('button[name=btnG]', 1000)
            .click('button[name=btnG]')
            .pause(1000)
            .execute("return window.screen.height;", [], function(response) {
                var value = response.value;
                console.log('value', value);

                fs.writeFile("e2e/test.txt", "The screen size is " + value, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    console.log("The file was saved!");
                });
            })
            .getLogTypes(function(result) {
                console.log(result);
            })
            .getLog('browser', function(result) {
                console.log(result);
            })
            .assert.containsText('#main', 'Night Watch')
            .saveScreenshot("e2e/screenshots/google.png")
            .end();
    }
};
