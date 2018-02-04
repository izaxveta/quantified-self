const deleteFoodListener = (foodsRequests) => {
  $('#food-table-info').on('click', event => {
    if (event.target.nodeName == 'BUTTON') {
      var id = event.target.id.split('-')[2]
      foodsRequests.deleteFood(id, event, removeFoodRow)
    }
  })
}

const removeFoodRow = (event) => {
  event.target.closest('article').remove()
}

module.exports = {
  deleteFoodListener,
  removeFoodRow,
}
