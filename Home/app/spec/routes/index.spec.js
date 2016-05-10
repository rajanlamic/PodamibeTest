/**
 * Created by Rajan.Lamichhane on 13/01/2016.
 */

describe("Index route", function() {
    var request;
    var serverUrl;

    beforeEach(function() {
        request = require('request');
        serverUrl = "http://localhost:3000/";
    });

    afterEach(function() {
        request = null;
        serverUrl = null;
    });

    it("should return app hello", function() {
            expect('bodys').toEqual('bodys');
    });

    it("should return app hello", function(done) {
        request(serverUrl, function(error, response, body) {
            expect(body).toBe('<!DOCTYPE html><html><head><title>Express JS</title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Express JS</h1><p>Welcome to Express JS</p></body></html>');
            done()
        });
    });
});