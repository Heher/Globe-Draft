function dataStatus(state = [], action) {
  const { payload } = action

  switch(action.type) {
    case "REQUEST_USERS" :
      return {
        ...state,
        usersFetching: true
      }

    case "RECEIVE_USERS" :
      return {
        ...state,
        usersFetching: false,
        usersReceived: true
      }
    default:
      return state
  }
}

export default dataStatus