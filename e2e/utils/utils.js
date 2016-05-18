/**
 * Created by rajan.lamichhane on 16/05/2016.
 */
var expect = require('chai').expect;
var _ = require('underscore');

module.exports = {
    endBrowser: function ( browser ) {
        browser.end();
    },
    assertDigitalData : function(value, key, list, actualValue) {

        // KF = Key Fixed
        // KA = Key Any | Optional
        // VF = Value Fixed
        // VA = Value any

        //things to remember
        // types are checked automatically so this covers the VA - value any
        // value with fixed are checked and displayed
        // key presence are checked

        var self = this;
        // check for key preset or not
        if(key) {
            var keyFixed = key.indexOf('KF|') !== -1 ? true : false;
            var valueFixed = key.indexOf('VF|') !== -1 ? true : false;
            var valueAny = key.indexOf('VA|') !== -1 ? true : false;
            var keyOptional = key.indexOf('KO|') !== -1 ? true : false;
            var cleanKey = key;

            if(keyFixed) cleanKey = cleanKey.replace("KF|", "");
            if(valueFixed) cleanKey = cleanKey.replace("VF|", "");
            if(valueAny) cleanKey = cleanKey.replace("VA|", "");
            if(keyOptional) cleanKey = cleanKey.replace("KO|", "");

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
                self.assertDigitalData(valueNext, keyNext, listNext, actualValue[cleanKey] );
            });
        }
    },
    assertDigitalDataEntry : function(expectedFormat, actual) {
        var self = this;
        _.each(expectedFormat, function(value, key, list) {
            self.assertDigitalData(value, key, list, actual);
        });
    }
};
