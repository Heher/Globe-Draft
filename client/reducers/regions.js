function regions(state = [], action) {
  const { regionId, disabled } = action
  switch(action.type) {
    case 'SELECTING_COUNTRY' :

      if (disabled) { // Do nothing if country is disabled
        return state
      }
      return state.map(region => {
        if (region.id !== regionId) { // Do nothing if not correct region
          return region
        }
        if (region.numSelected + 1 <= region.maxCountriesSelected) { // If another country can be selected in the region, add one
          return {
            ...region,
            numSelected: region.numSelected + 1
          }
        } else { // Else, do nothing
          return region
        }
      })

    case 'DESELECTING_COUNTRY' :
      return state.map(region => {
        if (region.id !== regionId) {
          return region
        }
        return {
          ...region,
          numSelected: region.numSelected - 1
        }
      })

    default:
      return state
  }
}

export default regions