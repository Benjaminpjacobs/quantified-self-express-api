const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

var assert = require('chai').assert
var request = require('request');
var app = require('../server');


describe('Meals API', function() {

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

    describe('GET all meals', function() {
        beforeEach(function(done) {
            database.raw(
                    'INSERT INTO meals (name, created_at) VALUES (?, ?)', ["Breakfast", new Date]
                ).then(function() {
                    return database.raw(
                        'INSERT INTO meals (name, created_at) VALUES (?, ?)', ["Lunch", new Date]
                    )
                })
                .then(function() { done() });
        })

        beforeEach(function(done) {
            database.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Apple", 120, 1, new Date]
                )
                .then(function() {
                    return database.raw(
                        'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Sandwich", 420, 2, new Date]
                    )
                })
                .then(function() { done() });
        })

        afterEach(function(done) {
            database.raw('TRUNCATE TABLE meals RESTART IDENTITY CASCADE')
                .then(function() {
                    return database.raw('TRUNCATE TABLE foods RESTART IDENTITY')
                })
                .then(function() { done() });
        })



        it('should return a 200', function(done) {
            this.request.get('/meals', (error, response) => {
                if (error) { done(error); }
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        it('should return json data of meals', function(done) {
            this.request.get('/meals', (error, response) => {
                if (error) { done(error); }
                let parsedFoods = JSON.parse(response.body)
                assert.equal(parsedFoods.length, 2);
                assert.equal(parsedFoods[0].id, 1);
                assert.equal(parsedFoods[1].id, 2);
                assert.equal(parsedFoods[0].name, 'Breakfast');
                assert.equal(parsedFoods[1].name, 'Lunch');
                assert.isArray(parsedFoods[0].foods);
                assert.isObject(parsedFoods[0].foods[0]);
                done();
            });
        });
    })
    describe('GET single meals', function() {
        beforeEach(function(done) {
            database.raw(
                    'INSERT INTO meals (name, created_at) VALUES (?, ?)', ["Breakfast", new Date]
                )
                .then(function() { done() });
        })

        beforeEach(function(done) {
            database.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Apple", 120, 1, new Date]
                )
                .then(function() {
                    return database.raw(
                        'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["yogurt", 220, 1, new Date]
                    )
                })
                .then(function() {
                    return database.raw(
                        'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["granola", 420, 1, new Date]
                    )
                })
                .then(function() { done() });
        })

        afterEach(function(done) {
            database.raw('TRUNCATE TABLE meals RESTART IDENTITY CASCADE')
                .then(function() {
                    return database.raw('TRUNCATE TABLE foods RESTART IDENTITY')
                })
                .then(function() { done() });
        })

        it('should return json data of single meal', function(done) {
            this.request.get('/meals/1', (error, response) => {
                if (error) { done(error); }
                let parsedFoods = JSON.parse(response.body)
                assert.equal(response.statusCode, 200);
                assert.equal(parsedFoods.length, 1);
                assert.equal(parsedFoods[0].id, 1);
                assert.equal(parsedFoods[0].name, 'Breakfast');
                assert.isArray(parsedFoods[0].foods);
                assert.isObject(parsedFoods[0].foods[0]);
                done();
            });
        });
        it('should return 404 if resource not found', function(done) {
            this.request.get('meals/2', (error, response) => {
                if (error) { done(error); }
                assert.equal(response.statusCode, 404)
                done();

            })
        })
    })
    describe('POST food to meal', function() {
        beforeEach(function(done) {
            database.raw(
                    'INSERT INTO meals (name, created_at) VALUES (?, ?)', ["Breakfast", new Date]
                )
                .then(function() { done() });
        })

        beforeEach(function(done) {
            database.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Apple", 120, 1, new Date]
                )
                .then(function() {
                    return database.raw(
                        'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["yogurt", 220, 1, new Date]
                    )
                })
                .then(function() {
                    return database.raw(
                        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["granola", 420, new Date]
                    )
                })
                .then(function() { done() });
        })

        afterEach(function(done) {
            database.raw('TRUNCATE TABLE meals RESTART IDENTITY CASCADE')
                .then(function() {
                    return database.raw('TRUNCATE TABLE foods RESTART IDENTITY')
                })
                .then(function() { done() });
        })

        it('should return json data of single meal', function(done) {
            this.request.post('/meals/1/foods/3', (error, response) => {
                if (error) { done(error); }
                let parsedFoods = JSON.parse(response.body)
                assert.equal(response.statusCode, 202);
                done();
            });
        });

        it('should return 404 if resource not found', function(done) {
            this.request.get('meals/1/foods/4', (error, response) => {
                if (error) { done(error); }
                assert.equal(response.statusCode, 404)
                done();

            })
        })
    })
});