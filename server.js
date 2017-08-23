var express = require('express')
var app = express()


const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const FoodsController = require('./lib/controllers/foods_controller.js')

app.set('port', process.env.PORT || 3000)

app.get('/api/v1/foods', FoodsController.getAll)

if (!module.parent) {
    app.listen(app.get('port'), function() {
        console.log(`${app.locals.title} is running on ${app.get('port')}.`);
    });
}