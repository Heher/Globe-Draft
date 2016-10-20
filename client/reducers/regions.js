export default function regions(state = [], action) {
  const { id, payload } = action

  switch (action.type) {
    case 'RECEIVE_REGIONS' : {
      return Object.assign([], state, action.regions)
    }

    case 'ADD_REGION' : {
      return [
        ...state,
        ...action.json
      ]
    }

    case 'SET_EDITING_REGION' : {
      return state.map(region => {
        if (region._id !== id) {
          return region
        }
        return {
          ...region,
          editing: !region.editing
        }
      })
    }

    case 'SAVED_REGION' : {
      return state.map(region => {
        if (region._id !== id) {
          return region
        }
        return {
          ...region,
          ...payload,
          editing: !region.editing
        }
      })
    }

    case 'DELETE_REGION' : {
      const newState = []
      state.forEach(region => {
        if (region._id !== action.id) {
          newState.push(region)
        }
      })
      return newState
    }

    default: {
      return state
    }
  }
}
