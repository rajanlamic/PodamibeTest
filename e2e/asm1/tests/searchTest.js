/**
 * Created by rajan.lamichhane on 08/06/2016.
 */

var fs = require('fs');

module.exports = {
    page: null,
    load: function(browser) {
        this.page = browser.page.search();
    },
    search: function(browser) {
        browser.pause(1000);
        //browser.waitForElementVisible('body', 500);
        browser.saveScreenshot('e2e/asm1/screenshots/EmptyTrolley/searchLoad.png');
        this.page.setValue('@searchTxt', 'apples');
        this.page.click('@searchBtn');

        //browser.pause(1000);
    },
    saveDigitalData : function(browser) {
        //browser.waitForElementVisible('body', 500);

        browser.pause(1000);
        browser.saveScreenshot('e2e/asm1/screenshots/EmptyTrolley/searchRedirect.png');

        var self = this;
        browser
            .execute("return digitalData", [], function(response) {
                self.actual = response.value;
                fs.writeFile("e2e/asm1/actual/emptyTrolley/search.json", JSON.stringify(response.value, null, 2) , 'w+', 'utf8', function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("Empty Trolley - search - digitalData was saved!");
                });
            });
    },
    checkDigitalData: function(browser) {
        browser.pause(500);
        browser.waitForElementVisible('body', 500);
        var self = this;
        browser.getText("body", function(result) {
            this.assert.equal(self.actual.page.events[0].eventInfo.pageEvent, 'emptyTrolley');
        });

        //utils.assertDigitalDataEntry(expectedFormat, self.actual);

    }
}
