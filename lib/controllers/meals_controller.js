const Meal = require('../models/meal')
const Serializer = require('../serializers/serializer.js')

const getAll = (request, response, next) => {
    Meal.getAll()
        .then(function(meals) {
            response.status(200).json(Serializer.meal(meals))
        })
}

const getResource = (request, response, next) => {
    const { id } = request.params
    Meal.getResource(id)
        .then(function(meal) {
            if (meal.length === 0) {
                response.status(404).send({ error: 'resource not found' })
            } else {
                response.status(200).json(Serializer.meal(meal))
            }
        })
}

const postFoodResource = (request, response, next) => {
    const { meal_id, food_id } = request.params
    Meal.postFood(meal_id, food_id)
        .then(function(meal) {
            const responseData = {
                code: meal ? 202 : 404,
                data: meal || { error: "" }
            }
            response.status(responseData.code).json(responseData.data)
        })
}


const deleteFoodResource = (request, response, next) => {
    const { meal_id, food_id } = request.params
    Meal.deleteFood(meal_id, food_id)
        .then(function(meal) {
            if (meal !== 0) {
                response.status(204).json(meal)
            } else {
                response.status(404).send({ error: 'resource not found' })
            }
        })
}

module.exports = {
    getAll: getAll,
    getResource: getResource,
    postFoodResource: postFoodResource,
    deleteFoodResource: deleteFoodResource
}