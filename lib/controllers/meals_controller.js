const Meal = require('../models/meal')
const Serializer = require('../serializers/serializer.js')

const getAll = (request, response) => {
    Meal.getAll()
        .then(function(meals) {
            response.status(200).json(Serializer.meal(meals))
        })
}

const getResource = (request, response) => {
    const id = request.params.id
    Meal.getResource(id)
        .then(function(meal) {
            if (meal.length === 0) {
                response.status(404).send({ error: 'resource not found' })
            } else {
                response.status(200).json(Serializer.meal(meal))
            }
        })
}

module.exports = {
    getAll: getAll,
    getResource: getResource
}