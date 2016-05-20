function countries(state = [], action) {
  const { countryId, userId, disabled } = action

  switch(action.type) {
    case 'SELECTING_COUNTRY' :
      if (disabled) {
        return state
      }
      return state.map(country => {
        if (country.id !== countryId) {
          return country
        }
        return {
          ...country,
          selected: true,
          userId: userId
        }
      })

    case 'DESELECTING_COUNTRY' :
      return state.map(country => {
        if (country.id !== countryId) {
          return country
        }
        return {
          ...country,
          selected: false,
          userId: ""
        }
      })

    default:
      return state
  }
}

export default countries