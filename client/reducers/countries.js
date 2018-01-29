export default function countries(state = [], action) {
  const { id, userId, payload } = action

  switch (action.type) {
    case 'RECEIVE_COUNTRIES' : {
      return Object.assign([], state, action.countries)
    }

    // case 'SELECT_COUNTRY' : {
    //   console.log("select");
    //   return state.map(country => {
    //     if ((country.userId === userId) && country.selected) {
    //       return {
    //         ...country,
    //         selected: false,
    //         userId: ''
    //       }
    //     }
    //     if (country._id === id) {
    //       return {
    //         ...country,
    //         selected: true,
    //         userId
    //       }
    //     }
    //     return {
    //       ...country
    //     }
    //   })
    // }

    // case 'DESELECT_COUNTRY' : {
    //   return state.map(country => {
    //     if (country._id !== id) {
    //       return country
    //     }
    //     return {
    //       ...country,
    //       selected: false,
    //       userId: ''
    //     }
    //   })
    // }

    case 'COUNTRY_DRAFTED' : {
      return state.map(country => {
        if (country._id !== id) {
          return country
        }
        return {
          ...country,
          selected: false,
          round: payload.round,
          draftNum: payload.draftNum,
          drafts: payload.drafts
        }
      })
    }

    case 'ADD_COUNTRY' : {
      return [
        ...state,
        ...action.json
      ]
    }

    case 'DELETE_COUNTRY' : {
      const newState = []
      state.forEach(country => {
        if (country._id !== action.id) {
          newState.push(country)
        }
      })
      return newState
    }

    case 'SET_EDITING_COUNTRY' : {
      return state.map(country => {
        if (country._id !== id) {
          return country
        }
        return {
          ...country,
          editing: !country.editing
        }
      })
    }

    case 'SAVED_COUNTRY' : {
      return state.map(country => {
        if (country._id !== id) {
          return country
        }
        return {
          ...country,
          ...payload,
          editing: !country.editing
        }
      })
    }

    default: {
      return state
    }
  }
}
