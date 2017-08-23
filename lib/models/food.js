const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function getAll() {
    return database.raw('SELECT * FROM foods').then(function(response) {
        return response.rows
    })
}

module.exports = {
    getAll: getAll
}