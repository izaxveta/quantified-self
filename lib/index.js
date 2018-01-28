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
      var id = event.target.id.split('-')[2]
      foodsRequests.deleteFood(id)
      foodsRequests.removeFoodRow()
    }
  })
  $('#food-filter-input').on('keyup', event => {
    filterFoods()
  })
})

const filterFoods = () => {
  var filter = $('#food-filter-input').val().toUpperCase()
  var foodNameNodes = $('.food-item-name')
  for(var i = 0; i < foodNameNodes.length; i++) {
    var name = $(foodNameNodes[i])
    if (name.text().toUpperCase().indexOf(filter) > -1) {
      $(name.parent()[0]).css('display', '')
    } else {
      $(name.parent()[0]).css('display', 'none')
    }
  }
}

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