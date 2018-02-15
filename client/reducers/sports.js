export default function sports(state = [], action) {
  const { id, payload } = action

  switch (action.type) {
    case 'RECEIVE_SPORTS' : {
      return Object.assign([], state, action.sports)
    }

    case 'ADD_SPORT' : {
      return [
        ...state,
        ...action.json
      ]
    }

    case 'SET_EDITING_SPORT' : {
      return state.map(sport => {
        if (sport._id !== id) {
          return sport
        }
        return {
          ...sport,
          editing: !sport.editing
        }
      })
    }

    case 'SAVED_SPORT' : {
      return state.map(sport => {
        if (sport._id !== id) {
          return sport
        }
        return {
          ...sport,
          ...payload,
          editing: !sport.editing
        }
      })
    }

    case 'DELETE_SPORT' : {
      const newState = []
      state.forEach(sport => {
        if (sport._id !== action.id) {
          newState.push(sport)
        }
      })
      return newState
    }

    default: {
      return state
    }
  }
}
