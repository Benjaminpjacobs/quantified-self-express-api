exports.seed = function(knex, Promise) {
    return knex.raw('SELECT * FROM foods')
        .then(function() {
            return Promise.all([
                knex.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Banana", 150, 1, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Yogurt", 200, 1, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Granola", 300, 1, new Date]
                ),
            ])
        }).then(function() {
            return Promise.all([
                knex.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Turkey Sandwhich", 450, 2, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Potato Chips", 200, 2, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Apple", 100, 2, new Date]
                ),
            ])
        }).then(function() {
            return Promise.all([
                knex.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Carrot Sticks", 150, 3, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Grapes", 100, 3, new Date]
                ),
            ])
        }).then(function() {
            return Promise.all([
                knex.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Chicken Breast", 400, 4, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Green Salad", 200, 4, new Date]
                ),
                knex.raw(
                    'INSERT INTO foods (name, calories, meal_id, created_at) VALUES (?, ?, ?, ?)', ["Chocolate Cake", 500, 4, new Date]
                )
            ])
        })
};