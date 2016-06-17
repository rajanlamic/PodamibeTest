/**
 * Created by rajan.lamichhane on 08/06/2016.
 */

module.exports = {
    page: null,
    load: function(browser) {
        this.page = browser.page.plp();
    },
    addToBasketFirstProduct: function(browser) {
        //browser.pause(1000);
        browser.waitForElementVisible('body', 500);

        this.page.click('@addFirstProductBtn');
    },
    addToBasketSecondProduct: function(browser) {
        //browser.pause(1000);
        browser.waitForElementVisible('body', 500);
        this.page.click('@addSecondProductBtn');
    },
    emptyTrolley : function(browser) {
        //browser.pause(1000);
        browser.waitForElementVisible('body', 500);
        this.page.click('@emptyTrolleyLink');
    }
}