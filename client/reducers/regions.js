function regions(state = [], action) {
  switch(action.type) {
    case 'SELECT_COUNTRY' :
      const { regionId, selecting, disabled } = action

      if (disabled) {
        return state
      }
      return state.map(region => {
        if (region.id !== regionId) {
          return region
        }

        if (selecting) {
          if (region.numSelected + 1 <= region.maxCountriesSelected) {
            return {
              ...region,
              numSelected: region.numSelected + 1
            }
          } else {
            return {
              ...region
            }
          }
        } else if (region.numSelected > 0){
          return {
            ...region,
            numSelected: region.numSelected - 1
          }
        } else {
          return {
            ...region
          }
        }
      })
    default:
      return state
  }
}

export default regions