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
    if (!food) {
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

module.exports = {
    getAll: getAll,
    getResource: getResource,
    postResource: postResource
}