const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

var assert = require('assert');
var request = require('request');
var app = require('../server');


describe('Foods API', function() {

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

    describe('GET all foods', function() {
        beforeEach(function(done) {
            database.raw(
                'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Apple", 120, new Date]
            ).then(function() { done() });
        })

        afterEach(function(done) {
            database.raw('TRUNCATE foods RESTART IDENTITY')
                .then(function() { done() });
        })

        it('should return a 200', function(done) {
            this.request.get('/foods', (error, response) => {
                if (error) { done(error); }
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        it('should return json data of foods', function(done) {
            this.request.get('/foods', (error, response) => {
                if (error) { done(error); }
                let parsedFoods = JSON.parse(response.body)
                assert.equal(parsedFoods.length, 1);
                assert.equal(parsedFoods[0].id, 1);
                assert.equal(parsedFoods[0].calories, 120);
                assert.equal(parsedFoods[0].name, 'Apple');
                done();
            });
        });
    })

    describe('GET single food resource', function() {
        beforeEach(function(done) {
            database.raw(
                'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Apple", 120, new Date]
            ).then(function() { done() });
        })

        afterEach(function(done) {
            database.raw('TRUNCATE foods RESTART IDENTITY')
                .then(function() { done() });
        })

        it('should return 404 if resource not found', function(done) {
            this.request.get('/foods/2', (error, response) => {
                if (error) { done(error); }
                assert.equal(response.statusCode, 404);
                done();
            });
        });

        it('should return a single resource object', function(done) {
            this.request.get('/foods/1', (error, response) => {
                if (error) { done(error); }
                let parsedFoods = JSON.parse(response.body)
                assert.equal(parsedFoods.id, 1);
                assert.equal(parsedFoods.calories, 120);
                assert.equal(parsedFoods.name, 'Apple');
                done();
            });
        });
    })

    describe('POST single food resource', function() {

        afterEach(function(done) {
            database.raw('TRUNCATE foods RESTART IDENTITY')
                .then(function() { done() });
        })

        it('should return a single resource object', function(done) {
            this.request.post('foods?food[name]=Apple&food[calories]=120', (error, response) => {
                if (error) { done(error); }
                let parsedFoods = JSON.parse(response.body)
                assert.equal(parsedFoods.id, 1);
                assert.equal(parsedFoods.calories, 120);
                assert.equal(parsedFoods.name, 'Apple');
                done();
            });
        });

        it('should return 422 if info given', function(done) {
            this.request.post('foods', (error, response) => {
                if (error) { done(error); }
                let parsedFoods = JSON.parse(response.body)
                assert.equal(response.statusCode, 422);
                done();
            });
        });

        it('should return 422 if no name given', function(done) {
            this.request.post('foods?food[calories]=120', (error, response) => {
                if (error) { done(error); }
                let parsedFoods = JSON.parse(response.body)
                assert.equal(response.statusCode, 422);
                done();
            });
        });
        it('should return 422 if no calories given', function(done) {
            this.request.post('foods?food[name]=apple', (error, response) => {
                if (error) { done(error); }
                let parsedFoods = JSON.parse(response.body)
                assert.equal(response.statusCode, 422);
                done();
            });
        });

    })

    describe('PUT single food resource', function() {
        beforeEach(function(done) {
            database.raw(
                'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Apple", 120, new Date]
            ).then(function() { done() });
        })

        afterEach(function(done) {
            database.raw('TRUNCATE foods RESTART IDENTITY')
                .then(function() { done() });
        })

        it('should update a single resource object', function(done) {
            this.request.put('/foods/1?food[name]=orange&food[calories]=100', (error, response) => {
                if (error) { done(error); }
                let parsedFoods = JSON.parse(response.body)
                assert.equal(parsedFoods.id, 1);
                assert.equal(parsedFoods.calories, 100);
                assert.equal(parsedFoods.name, 'orange');
                done();
            });
        });

        it('should return 404 if resource not found', function(done) {
            this.request.put('/foods/1?', (error, response) => {
                if (error) { done(error); }
                assert.equal(response.statusCode, 400);
                done();
            });
        });

    })

    describe('Delete single food resource', function() {
        beforeEach(function(done) {
            database.raw(
                'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Apple", 120, new Date]
            ).then(function() { done() });
        })

        afterEach(function(done) {
            database.raw('TRUNCATE foods RESTART IDENTITY')
                .then(function() { done() });
        })

        it('should delete a single resource object', function(done) {
            this.request.delete('/foods/1', (error, response) => {
                if (error) { done(error); }
                assert.equal(response.statusCode, 204)
                done();
            });
        });

        it('should return 404 if resource does not exist', function(done) {
            this.request.delete('/foods/2', (error, response) => {
                if (error) { done(error); }
                assert.equal(response.statusCode, 400)
                done();
            });
        });
    })
});