/**
 * Created by rajan.lamichhane on 08/06/2016.
 */

module.exports = {
    page: null,
    load: function(browser) {
        this.page = browser.page.emptyTrolleyConfirmation();
    },
    clickEmptyTrolleyConfirmation: function(browser) {
        browser.waitForElementVisible('body', 500);
        this.page.click('@emptyTrolleyConfirmationLink');
        //browser.pause(1000);
    }
}