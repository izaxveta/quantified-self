const getFoods = () => {
  fetch(`https://ivmh-qs-api.herokuapp.com/api/v1/foods`)
    .then(response => handleResponse(response))
    .then(foods => getEachFood(foods))
    .catch(error => console.error({ error }))
}

const deleteFood = (id) => {
  fetch(`https://ivmh-qs-api.herokuapp.com/api/v1/foods/${id}`, {
    method: 'DELETE'
  })
}

const removeFoodRow = () => {
  event.target.parentNode.parentNode.remove()
}

const addNewFood = () => {
  var foodName = $('#food-name').val()
  var foodCalories = $('#food-calories').val()

  fetch(`https://ivmh-qs-api.herokuapp.com/api/v1/foods`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      food: {
        name: foodName,
        calories: foodCalories
      }
    })
  })
  .then(response => handleResponse(response))
  .then(newFood => renderFood(newFood))
  .then(() => clearValues())
  .catch(error => console.error({ error }))
}

const clearValues = () => {
  $('#food-name').val('')
  $('#food-calories').val('')
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

const getEachFood = (foods) => {
  return foods.forEach(food => {
    renderFood(food)
  })
}

const renderFood = (food) => {
  $('#food-table-info').prepend(
   `<article class="food-item-${food.id}" id="food-item-row">
      <p class="food-item-name">${food.name}</p>
      <p class="food-item-calories">${food.calories}</p>
      <div class="button-container">
        <button id="${food.id}" class="food-item-delete-btn" aria-label="Delete">-</button>
      </div>
    </article>`
  )
}

module.exports = {
  getFoods,
  deleteFood,
  removeFoodRow,
  addNewFood
}
