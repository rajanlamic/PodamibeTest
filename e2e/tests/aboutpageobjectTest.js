/**
 * Created by rajan.lamichhane on 13/05/2016.
 */


//module.exports = {
//    'about page object test' : function (browser) {
//        browser
//            .url('http://localhost:3001/about')
//            .pause(4000)
//            .waitForElementVisible('body', 5000)
//            .assert.containsText('#app-container', 'about us')
//            .assert.valueContains('#aboutTxt', 'nightwatch_')
//            .setValue('#aboutTxt', '_nightwatch_')
//            .pause(2000)
//            .assert.valueContains('#aboutTxt', 'nightwatch__nightwatch_')
//            .end();
//    }
//};


module.exports = {
    'about page object text': function (client) {
        var about = client.page.about();

        about.navigate()
            .assert.title('mytitle')
            .assert.visible('@aboutTxtE')
            .setValue('@aboutTxtE', 'nightwatch');

        client.pause(2000);
        about.assert.valueContains('@aboutTxtE', 'nightwatch_nightwatch');

        client.end();
    }
};
