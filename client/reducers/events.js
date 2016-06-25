function events(state = [], action) {
  const { id } = action

  switch(action.type) {
    case 'RECEIVE_EVENTS' :
      return Object.assign([], state, action.json)

    case 'ADD_EVENT' :
      return [
        ...state,
        ...action.json
      ]

    case 'SET_EDITING_EVENT' :
      return state.map(event => {
        if(event._id !== id) {
          return event
        }
        return {
          ...event,
          editing: !event.editing
        }
      })

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