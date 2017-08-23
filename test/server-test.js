const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

var assert = require('assert');
var request = require('request');
var app = require('../server');


describe('Server', function() {

    before(function(done) {
        this.port = 9876;
        this.server = app.listen(this.port, function(err, result) {
            if (err) { return done(err); }
            done();
        });
        this.request = request.defaults({
            baseUrl: 'http://localhost:9876/api/v1'
        });
    });

    after(function() {
        this.server.close();
    });

    it('should exist', function() {
        assert(app);
    });

});