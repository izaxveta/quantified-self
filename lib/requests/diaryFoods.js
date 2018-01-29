const getDiaryFoods = () => {
  fetch(`https://ivmh-qs-api.herokuapp.com/api/v1/foods`)
    .then(response => handleResponse(response))
    .then(foods => getEachDiaryFood(foods))
    .catch(error => console.error({ error }))
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
      <p class="food-item-name" contenteditable="true">${food.name}</p>
      <p class="food-item-calories" contenteditable="true">${food.calories}</p>
    </article>`
  )
}

const updateDiaryFood = (id) => {
  var foodName = $(`.food-item-${id}`).children()[1].innerText
  var foodCalories = $(`.food-item-${id}`).children()[2].innerText
  fetch(`https://ivmh-qs-api.herokuapp.com/api/v1/foods/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      food: {
        name: foodName,
        calories: foodCalories
      }
    })
  })
  .then(response => handleResponse(response))
  .catch(error => console.error({ error }))
}

module.exports = {
  getDiaryFoods,
  updateDiaryFood
}
