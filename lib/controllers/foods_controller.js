const Food = require('../models/food')

const getAll = (request, response) => {
    Food.getAll()
        .then(function(foods) {
            response.status(200).json(foods)
        })
}

const getResource = (request, response) => {
    var id = request.params.id
    Food.getResource(id)
        .then(function(food) {
            if (!food) { return response.sendStatus(404) }
            response.status(200).json(food)
        })
}

const postResource = (request, response) => {
    let food = request.query.food
    if (!food || !food.name || !food.calories) {
        return response.status(422).send({
            error: 'No message property provided'
        })
    } else {
        Food.postAndReturnResource(food)
            .then(function(food) {
                let object = food
                response.status(201).json(food)
            })
    }
}
const updateResource = (request, response) => {
    let food = request.query.food
    let id = request.params.id
    if (!food || !food.name || !food.calories) {
        return response.status(400).send({
            error: 'No message property provided'
        })
    } else {
        Food.updateAndReturnResource(food, id)
            .then(function(food) {
                response.status(200).json(food)
            })
    }
}

const deleteResource = (request, response) => {
    let id = request.params.id
    Food.deleteFood(id)
        .then(function(msg) {
            if (msg.rowCount !== 1) { return response.sendStatus(400) }
            response.sendStatus(204)
        })
}


module.exports = {
    getAll: getAll,
    getResource: getResource,
    postResource: postResource,
    updateResource: updateResource,
    deleteResource: deleteResource
}