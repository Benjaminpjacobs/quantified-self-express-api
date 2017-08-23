const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);



function getAll() {
    return database.raw('select meals.id, meals.name, foods.name as food_name, foods.id as food_id, foods.calories from foods join meals on foods.meal_id = meals.id')
        .then(function(response) {
            return response.rows
        })
}

function getResource(id) {
    return database.raw('select meals.id, meals.name, foods.name as food_name, foods.id as food_id, foods.calories from foods join meals on foods.meal_id = meals.id where meals.id = ?', id)
        .then(function(response) {
            return response.rows
        })
}

function postFood(meal_id, food_id) {
    return database.raw('UPDATE foods SET meal_id = ? WHERE id = ? RETURNING id, name, meal_id', [meal_id, food_id])
        .then(function(response) {
            return response.rows[0]
        })
}

function deleteFood(meal_id, food_id) {
    return database.raw('UPDATE foods SET meal_id = ? WHERE id = ? RETURNING id, name, meal_id', [null, food_id])
        .then(function(response) {
            return response.rows[0]
        })
}

module.exports = {
    getAll: getAll,
    getResource: getResource,
    postFood: postFood,
    deleteFood: deleteFood
}