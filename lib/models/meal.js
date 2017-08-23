const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);



function getAll() {
    return database.raw('select meals.id, meals.name, foods.name as food_name, foods.id as food_id, foods.calories from foods join meals on foods.meal_id = meals.id')
        .then(function(response) {
            return response.rows
        })
}

module.exports = {
    getAll: getAll
}