const Food = require('../models/food')

const getAll = (request, response) => {
    Food.getAll()
        .then(function(secrets) {
            response.json(secrets)
        })
}

module.exports = {
    getAll: getAll
}