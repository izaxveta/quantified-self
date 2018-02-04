var foodsRequests = require('./requests/foods')
var foodsDiary = require('./requests/diaryFoods')
require('./foods')
require('./diary')

$(document).ready(() => {
  calorieSorter()

  var fileName = location.pathname.split('/').slice(-1)[0]

  if (fileName === 'foods.html' || fileName === 'foods' ) {
    foodsRequests.getFoods()
  } else {
    foodsDiary.getDiaryFoods()
    foodsDiary.getMeals()
  }

  $('.meal-add-buttons').on('click', addNewFoodsToMeal)

  $('#submit-food').on('click', event => {
    event.preventDefault()
    newFoodSequence()
  })

  $('#food-table-info').on('click', event => {
    if (event.target.nodeName == 'BUTTON') {
      var id = event.target.id.split('-')[2]
      foodsRequests.deleteFood(id)
      removeFoodRow()
    }
  })

  $('#food-table-info').on('focusout', event => {
    var fileName = location.pathname.split('/').slice(-1)[0]
    if (fileName === 'foods.html') {
      var foodId = event.target.parentElement.attributes.data.value.split('-')[1]
      foodsRequests.updateFood(foodId)
    }
  })

  $('#food-filter-input').on('keyup', event => {
    filterFoods()
  })

  $('.meal-table').on('click', event => {
    if (event.target.nodeName == 'BUTTON') {
      var foodId = event.target.id.split('-')[2]
      var mealName = $(event.target).attr('data').split('-')[0]
      foodsDiary.updateMealWithFood(mealName, foodId, 'DELETE')
      removeFoodRow()
      updateMealCalories(setFoodData(event.target), mealName, 'decreaseMeal')
    }
  })
})

const updateMealCalories = (food, meal, method) => {
  updateMealTable(food, meal, method)
  updateTotalsTable(food, method)
}

const updateMealTable = (food, meal, method) => {
  var currentCaloriesNode = $(`#${meal}-total-calories-count`).find('p')
  var totalCaloriesNode = getRemainingCaloriesValue(meal)
  updateTotalCaloriesValue(food, currentCaloriesNode, method)
  updateRemainingCaloriesValue(food, meal, totalCaloriesNode, method)
}

const updateTotalsTable = (food, method) => {
  var totalDiaryConsumedNode = $('.diary-total-calories-consumed')
  var currentDiaryRemainingCaloriesNode = getRemainingCaloriesValue('diary')
  updateTotalCaloriesValue(food, totalDiaryConsumedNode, method)
  updateRemainingCaloriesValue(food, 'diary', currentDiaryRemainingCaloriesNode, method)
}

const updateRemainingCaloriesValue = (food, meal, currentCaloriesNode, method) => {
  if (method == 'decreaseMeal') {
    var operator = '+'
  } else {
    var operator = '-'
  }
  var totalCalories = parseInt(currentCaloriesNode.text())
  var foodCalories = parseInt(food.calories)
  var updatedRemainingCalories = calculateTotals(operator, totalCalories, foodCalories)
  updateNodeValue(currentCaloriesNode, updatedRemainingCalories)
  foodsDiary.styleRemainingCalorieCount(meal, updatedRemainingCalories)
}

const updateTotalCaloriesValue = (food, totalCaloriesNode, method) => {
  if (method == 'decreaseMeal') {
    var operator = '-'
  } else {
    var operator = '+'
  }
  var totalCalories = parseInt($(totalCaloriesNode).text())
  var foodCalories = parseInt(food.calories)
  var updatedTotalCalories = calculateTotals(operator, totalCalories, foodCalories)
  updateNodeValue(totalCaloriesNode, updatedTotalCalories)
}

const calculateTotals = (operator, digit1, digit2) => {
  var formulate = {
    '+' : (digit1, digit2) => { return digit1 + digit2 },
    '-' : (digit1, digit2) => { return digit1 - digit2 }
  }
  return formulate[operator](digit1, digit2)
}

const getRemainingCaloriesValue = (meal) => {
  return $(`#${meal}-remaining-calories-count`).find('p')
}

const updateNodeValue = (node, value) => {
  $(node.find('strong')[0]).text(value)
}

const addNewFoodsToMeal = () => {
  var checkedFoods = $('.food-item-checkbox:checkbox:checked')
  checkedFoods.each(index => {
    var food = setFoodData(checkedFoods[index])
    var meal = $(event.target).attr('data')
    foodsDiary.renderFoodToMealTable(meal, food)
    updateMealCalories(food, meal, 'increaseMeal')
    foodsDiary.updateMealWithFood(meal, food.id, 'POST')
  })
  clearChecked()
}

const setFoodData = (food) => {
  var foodNode = $(food).parents('article')[0]
  return {
    id      : $(foodNode).attr('data').split('-')[1],
    name    : $($(foodNode).find('p')[0]).text(),
    calories: $($(foodNode).find('p')[1]).text()
  }
}

const filterFoods = () => {
  var filter = $('#food-filter-input').val().toUpperCase()

  let foodNameNodes = findNodesForFilter()

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

const clearChecked = () => {
  $('.food-item-checkbox:checkbox:checked').prop('checked', false )
}

const findNodesForFilter = () => {
  var fileName = location.pathname.split('/').slice(-1)[0]
  if (fileName === 'foods.html' || fileName === 'foods') {
    var foodNameNodes = $('.food-item-name')
  } else {
    var foodNameNodes = $('div.foods-diary-container .food-item-name')
  }
  return foodNameNodes
}

const removeFoodRow = () => {
  event.target.closest('article').remove()
}

const calorieSorter = () => {
  var originalOrder = []
  var count = 0

  $('strong.calorie-sort').on('click', event => {
    if (originalOrder.length === 0) {
      var order = $('div.all-foods-list article.food-item-row')
      order.each(index => {
        originalOrder.push(order[index])
      })
    }
    count += 1
    var calorieNodes = $('div.all-foods-list article.food-item-row')
    sortBy(calorieNodes, count, originalOrder)
  })
}

const sortBy = (calorieNodes, clickCount, originalOrder) => {
  if (clickCount === 1 || clickCount % 3 === 1) {
    var sorted = calorieNodes.sort((a, b) => {
      return findCalorieCount(a) - findCalorieCount(b)
    })
    $('div.all-foods-list').append(sorted)
  } else if (clickCount === 2 || clickCount % 3 === 2) {
    var sorted = calorieNodes.sort((a, b) => {
      return findCalorieCount(b) - findCalorieCount(a)
    })
    $('div.all-foods-list').append(sorted)
  } else {
    $('div.all-foods-list').append(originalOrder)
  }
}

const findCalorieCount = (node) => {
  return $(node).children('.food-item-calories')[0].innerText
}
