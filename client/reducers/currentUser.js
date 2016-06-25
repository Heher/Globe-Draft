function currentUser(state = [], action) {
  const { payload } = action

  switch(action.type) {
    case 'FACEBOOK_LOGIN' :
      return payload

    case 'SET_CURRENT_USER' :
      return payload

    case 'LOGOUT_USER' :
      return {}

    default:
      return state
  }
}

export default currentUser