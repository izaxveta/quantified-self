const getFoods = () => {
  fetch(`https://ivmh-qs-api.herokuapp.com/api/v1/foods`)
    .then(response => handleResponse(response))
    .then(foods => getEachFood(foods))
    .catch(error => console.error({ error }))
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
  $('#food-info').append(`
    <tr>
      <td class="food-name">${food.name}</th>
      <td class="food-calories">${food.calories}</th>
      <td>
      <button data-food-id="${food.id}" class="delete-btn" aria-label="Delete">
        delete me
      </button>
      </td>
    </tr>
    `)
}

module.exports = {
  getFoods,
  addNewFood
}
