function regions(state = [], action) {
  switch(action.type) {
    case "RECEIVE_REGIONS" :
      return Object.assign([], state, action.json)

    default:
      return state
  }
}

export default regions