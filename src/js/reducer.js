function getId(state) {
  return state.regions.reduce((maxId, region) => {
    return Math.max(region.id, maxId)
  }, -1) + 1
}

let reducer = function(state, action) {
  switch (action.type) {
    case 'SELECT_COUNTRY':
      return Object.assign({}, state, {
        regions: [{
          regionName: action.regionName,
          countries: []
        }, ...state.regions]
      })
    default:
      return state
  }
}