/**
 * Created by rajan.lamichhane on 16/05/2016.
 */
var expect = require('chai').expect;
var _ = require('underscore');

module.exports = {
    endBrowser: function ( browser ) {
        browser.end();
    },
    assertDigitalData : function (value, key, list, actualValue) {
        // check for key preset or not
        console.log(' u r here');

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
                this.assetDigitalData(valueNext, keyNext, listNext, actualValue[cleanKey] );
            });
        }
    }
};
