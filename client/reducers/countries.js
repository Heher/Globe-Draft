function countries(state = [], action) {
  const { countryId, userId, round } = action

  switch(action.type) {
    case 'SELECT_COUNTRY' :
      return state.map(country => {
        if ((country.userId === userId) && country.selected) {
          return {
            ...country,
            selected: false,
            userId: ""
          }
        }
        if (country.id === countryId) {
          return {
            ...country,
            selected: true,
            userId
          }
        }
        return {
          ...country
        }
      })

    case 'DESELECT_COUNTRY' :
      return state.map(country => {
        if (country.id !== countryId) {
          return country
        } else {
          return {
            ...country,
            selected: false,
            userId: ""
          }
        }
      })

    case 'DRAFT_COUNTRY' :
      return state.map(country => {
        if (country.id !== countryId) {
          return country
        } else {
          return {
            ...country,
            selected: false,
            drafted: true,
            round
          }
        }
      })

    default:
      return state
  }
}

export default countries