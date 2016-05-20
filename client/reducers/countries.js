function countries(state = [], action) {
  switch(action.type) {
    case 'SELECT_COUNTRY' :
      const { countryId, disabled } = action
      if (disabled) {
        return state
      }
      return state.map(country => {
        if (country.id !== countryId) {
          return country
        }

        return {
          ...country,
          selected: !country.selected
        }
      })
    default:
      return state
  }
}

export default countries