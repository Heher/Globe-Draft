function users(state = [], action) {
  const { id } = action

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
        if (user.name !== action.name) {
          newState.push(user)
        }
      })
      return newState

    case 'EDIT_USER' :
      return state.map(user => {
        if (user._id !== id) {
          return {
            ...user
          }
        }
        return {
          ...user,
          draftNum: action.draftNum
        }
      })
      
    default:
      return state
  }
}

export default users