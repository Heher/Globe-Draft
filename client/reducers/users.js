function users(state = [], action) {
  const { id, draftNum, payload } = action

  switch(action.type) {
    case 'CHANGE_USER' :
      return state.map(user => {
        if (user._id !== id) {
          return {
            ...user,
            selected: false
          }
        }
        return {
          ...user,
          selected: true
        }
      })

    case 'RECEIVE_USERS' :
      return Object.assign([], state, action.json)

    case 'ADD_USER' :
      return [
        ...state,
        ...action.json
      ]

    case 'DELETE_USER' :
      const newState = []
      state.map(user => {
        if (user._id !== action.id) {
          newState.push(user)
        }
      })
      return newState

    case 'SAVED_USER_DRAFT' :
      return state.map(user => {
        if (user._id !== id) {
          return {
            ...user
          }
        }
        return {
          ...user,
          ...payload,
          editing: !user.editing
        }
      })

    case 'SET_EDITING_USER' :
      return state.map(user => {
        if(user._id !== id) {
          return user
        }
        return {
          ...user,
          editing: !user.editing
        }
      })

    case 'USER_LOGGED_IN' :
      return payload

    case 'USER_LOGGED_OUT' :
      return {}
      
    default:
      return state
  }
}

export default users