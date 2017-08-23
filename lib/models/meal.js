const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);



function getAll() {
    return database.raw(
            `SELECT meals.id, meals.name, foods.id as food_id, foods.name as food_name, foods.calories 
       FROM meals 
       JOIN meals_foods 
       ON meals_foods.meal_id = meals.id 
       JOIN foods 
       ON meals_foods.food_id = foods.id;`
        )
        .then(function(response) {
            return response.rows
        })
}

function getResource(id) {
    return database.raw(
            `SELECT meals.id, meals.name, foods.id as food_id, foods.name as food_name, foods.calories 
      FROM meals 
      JOIN meals_foods 
      ON meals_foods.meal_id = meals.id 
      JOIN foods 
      ON meals_foods.food_id = foods.id
      WHERE meals.id= ?;`, id
        )
        .then(function(response) {
            return response.rows
        })
}

function postFood(meal_id, food_id) {
    return database.raw('INSERT INTO meals_foods (meal_id, food_id, created_at) VALUES (?, ?, ?) RETURNING meal_id, food_id, created_at', [meal_id, food_id, new Date])
        .then(function(response) {
            return response.rows[0]
        })
}

function deleteFood(meal_id, food_id) {
    return database.raw('DELETE FROM meals_foods WHERE meal_id = ? AND food_id = ?', [meal_id, food_id])
        .then(function(response) {
            console.log(response)
            return response.rowCount
        })
}

module.exports = {
    getAll: getAll,
    getResource: getResource,
    postFood: postFood,
    deleteFood: deleteFood
}