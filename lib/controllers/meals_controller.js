const Meal = require('../models/meal')
const pry = require('pryjs')

const getAll = (request, response) => {
    Meal.getAll()
        .then(function(meals) {
            response.status(200).json(meals)
        })
}

module.exports = {
    getAll: getAll
}