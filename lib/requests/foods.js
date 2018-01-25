const getFoods = () => {
  fetch(`https://ivmh-qs-api.herokuapp.com/api/v1/foods`)
    .then(response => handleResponse(response))
    .then(foods => getEachFood(foods))
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
  getFoods
}
