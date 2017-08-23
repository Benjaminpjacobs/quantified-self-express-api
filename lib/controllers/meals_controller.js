const Meal = require('../models/meal')
const pry = require('pryjs')


Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
        var val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
}

const formatMeal = (meal) => {
    return {
        id: meal.id,
        name: meal.name,
        foods: [{
            id: meal.food_id,
            name: meal.food_name,
            calories: meal.calories
        }]
    }
}
const getAll = (request, response) => {
    Meal.getAll()
        .then(function(meals) {
            let set = {}
            meals.forEach(function(meal) {
                if (Object.keys(set).includes(meal.id.toString())) {
                    let formatted = formatMeal(meal)
                    set[meal.id.toString()].foods.push(formatted.foods[0])
                } else {
                    set[meal.id] = formatMeal(meal)
                }
            })
            response.status(200).json(Object.values(set))
        })
}


module.exports = {
    getAll: getAll
}