var foodsRequests = require('./requests/foods')
var foodsDiary = require('./requests/diaryFoods')
require('./foods')

$(document).ready(() => {
  var fileName = location.pathname.split('/').slice(-1)[0]

  if (fileName === 'foods.html') {
    foodsRequests.getFoods()
  } else {
    foodsDiary.getDiaryFoods()
  }

  $('#submit-food').on('click', event => {
    event.preventDefault()
    newFoodSequence()
  })

  $('#food-table-info').on('click', event => {
    if (event.target.nodeName == 'BUTTON') {
      var id = event.target.id.split('-')[2]
      foodsRequests.deleteFood(id)
      foodsRequests.removeFoodRow()
    }
  })

  $('#food-table-info').on('focusout', e => {
    var foodId = event.target.parentElement.attributes.data.value.split('-')[1]
    foodsRequests.updateFood(foodId)
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
