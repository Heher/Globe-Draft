export default function medals(state = [], action) {
  const { id, payload } = action

  switch (action.type) {
    case 'RECEIVE_MEDALS' : {
      return Object.assign([], state, action.medals)
    }

    case 'ADD_MEDAL' : {
      return [
        ...state,
        ...action.json
      ]
    }

    case 'SET_EDITING_MEDAL' : {
      return state.map(medal => {
        if (medal._id !== id) {
          return medal
        }
        return {
          ...medal,
          editing: !medal.editing
        }
      })
    }

    case 'SAVED_MEDAL' : {
      return state.map(medal => {
        if (medal._id !== id) {
          return medal
        }
        return {
          ...medal,
          ...payload,
          editing: !medal.editing
        }
      })
    }

    case 'DELETE_MEDAL' : {
      const newState = []
      state.forEach(medal => {
        if (medal._id !== action.id) {
          newState.push(medal)
        }
      })
      return newState
    }

    default: {
      return state
    }
  }
}
