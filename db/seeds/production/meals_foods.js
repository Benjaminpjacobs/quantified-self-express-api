exports.seed = function(knex, Promise) {
    return knex.raw('TRUNCATE meals_foods RESTART IDENTITY CASCADE')
        .then(function() {
            return Promise.all([
                knex.raw(
                    'INSERT INTO meals_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)', [1, 1, new Date]
                ),
                knex.raw(
                    'INSERT INTO meals_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)', [1, 2, new Date]
                ),
                knex.raw(
                    'INSERT INTO meals_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)', [1, 3, new Date]
                ),
                knex.raw(
                    'INSERT INTO meals_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)', [2, 4, new Date]
                ),
                knex.raw(
                    'INSERT INTO meals_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)', [2, 5, new Date]
                ),
                knex.raw(
                    'INSERT INTO meals_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)', [2, 6, new Date]
                ),
                knex.raw(
                    'INSERT INTO meals_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)', [3, 7, new Date]
                ),
                knex.raw(
                    'INSERT INTO meals_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)', [3, 8, new Date]
                ),
                knex.raw(
                    'INSERT INTO meals_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)', [4, 9, new Date]
                ),
                knex.raw(
                    'INSERT INTO meals_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)', [4, 10, new Date]
                ),
                knex.raw(
                    'INSERT INTO meals_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)', [4, 11, new Date]
                ),
            ])
        })
};