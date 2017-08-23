var express = require('express')
var app = express()


const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const FoodsController = require('./lib/controllers/foods_controller.js')
const MealsController = require('./lib/controllers/meals_controller.js')
const WelcomeController = require('./lib/controllers/welcome_controller.js')


app.set('port', process.env.PORT || 3000)

app.use(function(req, res, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    next();
});

app.get('/', WelcomeController.getIndex)

app.get('/api/v1/foods', FoodsController.getAll)

app.get('/api/v1/foods/:id', FoodsController.getResource)

app.post('/api/v1/foods', FoodsController.postResource)

app.put('/api/v1/foods/:id', FoodsController.updateResource)

app.delete('/api/v1/foods/:id', FoodsController.deleteResource)

app.get('/api/v1/meals', MealsController.getAll)

app.get('/api/v1/meals/:id', MealsController.getResource)

app.post('/api/v1/meals/:meal_id/foods/:food_id', MealsController.postFoodResource)

app.delete('/api/v1/meals/:meal_id/foods/:food_id', MealsController.deleteFoodResource)


if (!module.parent) {
    app.listen(app.get('port'), function() {
        console.log(`${app.locals.title} is running on ${app.get('port')}.`);
    });
}

module.exports = app