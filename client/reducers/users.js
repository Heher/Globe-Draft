function users(state = [], action) {
  const { userId } = action

  switch(action.type) {
    case 'CHANGE_USER' :
      return state.map(user => {
        if (user.id !== userId) {
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
      console.log(state)
      console.log(action.json)
      return Object.assign([], state, action.json)
      
    default:
      return state
  }
}

export default users