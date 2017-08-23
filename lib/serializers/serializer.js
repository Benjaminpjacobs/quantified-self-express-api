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

const flattenArray = (set) => Object.keys(set).map(function(key) {
    return set[key];
});

const meal = (meals) => {
    const set = {}
    meals.forEach(function(meal) {
        if (Object.keys(set).includes(meal.id.toString())) {
            let formatted = formatMeal(meal)
            set[meal.id.toString()].foods.push(formatted.foods[0])
        } else {
            set[meal.id] = formatMeal(meal)
        }
    })
    return flattenArray(set)
}

module.exports = {
    meal: meal
}