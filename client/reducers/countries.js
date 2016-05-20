function countries(state = [], action) {
  switch(action.type) {
    case 'SELECT_COUNTRY' :
      const { countryId, userId, selecting, disabled } = action
      if (disabled) {
        return state
      }
      return state.map(country => {
        if (country.id !== countryId) {
          return country
        }

        if (selecting) {
          return {
            ...country,
            selected: true,
            userId: userId
          }
        } else {
          return {
            ...country,
            selected: false,
            userId: ""
          }
        }
      })
    default:
      return state
  }
}

export default countries