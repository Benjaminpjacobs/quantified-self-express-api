exports.seed = function(knex, Promise) {
    return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
        .then(function() {
            return Promise.all([
                knex.raw(
                    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Banana", 150, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Yogurt", 200, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Granola", 300, new Date]
                ),
            ])
        }).then(function() {
            return Promise.all([
                knex.raw(
                    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Turkey Sandwhich", 450, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Potato Chips", 200, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Apple", 100, new Date]
                ),
            ])
        }).then(function() {
            return Promise.all([
                knex.raw(
                    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Carrot Sticks", 150, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Grapes", 100, new Date]
                ),
            ])
        }).then(function() {
            return Promise.all([
                knex.raw(
                    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Chicken Breast", 400, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Green Salad", 200, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Chocolate Cake", 500, new Date]
                )
            ])
        })
};