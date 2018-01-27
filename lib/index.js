var foodsRequests = require('./requests/foods')
require('./foods')

$(document).ready(() => {
  foodsRequests.getFoods()
  $('#submit-food').on('click', event => {
    event.preventDefault()
    newFoodSequence()
  })
  $('#food-table-info').on('click', event => {
    if (event.target.nodeName == 'BUTTON') {
      foodsRequests.deleteFood(event.target.id)
      foodsRequests.removeFoodRow()
    }
  })
})

const newFoodSequence = () => {
  var nameInput = $('#food-name').val()
  var caloriesInput = $('#food-calories').val()
  clearAlerts()
  if (nameInput != '' && caloriesInput != '') {
    foodsRequests.addNewFood()
  } else if (nameInput == '' && caloriesInput == '') {
    validateNameAlert()
    validateCaloriesAlert()
  } else if (caloriesInput == '') {
    validateCaloriesAlert()
  } else {
    validateNameAlert()
  }
}

const validateNameAlert = () => {
  $('#name-notice').css('display', 'block')
}

const validateCaloriesAlert = () => {
  $('#calories-notice').css('display', 'block')
}

const clearAlerts = () => {
  $('#name-notice').css('display', 'none')
  $('#calories-notice').css('display', 'none')
}