const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
const pry = require('pryjs')

function getAll() {
    return database.raw('select meals.id, meals.name, foods.name, foods.id, foods.calories, foods.meal_id from foods join meals on foods.meal_id = meals.id').then(function(response) {
        return response.rows
    })
}

module.exports = {
    getAll: getAll
}