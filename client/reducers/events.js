function events(state = [], action) {
  switch(action.type) {
    case 'RECEIVE_EVENTS' :
      return Object.assign([], state, action.json)

    case 'ADD_EVENT' :
      return [
        ...state,
        ...action.json
      ]

    case 'DELETE_EVENT' :
      const newState = []
      state.map(event => {
        if (event._id !== action.id) {
          newState.push(event)
        }
      })
      return newState

    default:
      return state
  }
}

export default events