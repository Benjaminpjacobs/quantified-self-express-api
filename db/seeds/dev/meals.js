exports.seed = function(knex, Promise) {
    return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
        .then(function() {
            return knex.raw(
                'INSERT INTO meals (name, created_at) VALUES (?, ?)', ["Breakfast", new Date]
            )
        }).then(function() {

            return knex.raw(
                'INSERT INTO meals (name, created_at) VALUES (?, ?)', ["Lunch", new Date]
            )
        }).then(function() {

            return knex.raw(
                'INSERT INTO meals (name, created_at) VALUES (?, ?)', ["Snack", new Date]
            )
        }).then(function() {

            return knex.raw(
                'INSERT INTO meals (name, created_at) VALUES (?, ?)', ["Dinner", new Date]
            )
        })
};