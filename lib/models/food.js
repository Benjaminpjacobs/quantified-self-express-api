const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function getAll() {
    return database.raw('SELECT * FROM foods').then(function(response) {
        return response.rows
    })
}

function getResource(id) {
    return database.raw('SELECT * FROM foods WHERE id=?', id).then(function(response) {
        return response.rows[0]
    })
}

function postAndReturnResource(food) {
    return database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?) RETURNING id, name, calories', [food.name, food.calories, new Date])
        .then(function(response) {
            return response.rows[0]
        })
}

function updateAndReturnResource(food, id) {
    return database.raw('UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING id, name, calories', [food.name, food.calories, id])
        .then(function(response) {
            return response.rows[0]
        })
}

function deleteFood(id) {
    return database.raw('DELETE FROM foods WHERE id=?', id)
        .then(function(response) {
            return response
        })
}

module.exports = {
    getAll: getAll,
    getResource: getResource,
    postAndReturnResource: postAndReturnResource,
    updateAndReturnResource: updateAndReturnResource,
    deleteFood: deleteFood
}