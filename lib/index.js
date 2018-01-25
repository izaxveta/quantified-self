var foodsRequests = require('./requests/foods')
require('./foods')

$(document).ready(() => {
  foodsRequests.getFoods()
  $('#submit-food').on('click', event => {
    event.preventDefault()
    foodsRequests.addNewFood()
  })
})
