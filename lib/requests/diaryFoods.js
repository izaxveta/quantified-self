const getDiaryFoods = () => {
  fetch(`https://ivmh-qs-api.herokuapp.com/api/v1/foods`)
    .then(response => handleResponse(response))
    .then(foods => getEachDiaryFood(foods))
    .catch(error => console.error({ error }))
}

const getMeals = () => {
  fetch('https://ivmh-qs-api.herokuapp.com/api/v1/meals')
    .then(response => handleResponse(response))
    .then(meals => {
      meals.forEach(meal => populateMealTable(meal))
    })
    .catch(error => console.error({ error })
)}

const populateMealTable = (meal) => {
  meal.foods.forEach(food => renderFoodToMealTable(meal, food))
}

const renderFoodToMealTable = (meal, food) => {
  $(`#${meal.name.toLowerCase()}-table-info`).append(
    `<article class="food-item-${food.id}" id="food-item-row" data="food-${food.id}">
      <p class="food-item-name">${food.name}</p>
      <p class="food-item-calories">${food.calories}</p>
      <div class="button-container">
        <button id="food-item-${food.id}" class="food-item-delete-btn" aria-label="Delete">-</button>
      </div>
    </article>`
  )
}

const handleResponse = (response) => {
  return response.json()
    .then(json => {
      if (!response.ok) {
        const error = {
          status: response.status,
          statusTest: response.statusText,
          json
        }
        return Promise.reject(error)
      }
      return json
    })
}

const getEachDiaryFood = (foods) => {
  return foods.forEach(food => {
    renderDiaryFood(food)
  })
}

const renderDiaryFood = (food) => {
  $('#food-table-info').prepend(
   `<article class="food-item-${food.id}" id="food-item-row" data="food-${food.id}">
     <div class="checkbox-container">
      <input id="food-item-${food.id}" type="checkbox" class="food-item-checkbox">
     </div>
      <p class="food-item-name">${food.name}</p>
      <p class="food-item-calories">${food.calories}</p>
    </article>`
  )
}

module.exports = {
  getDiaryFoods,
  getMeals
}
