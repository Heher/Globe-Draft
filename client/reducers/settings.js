function settings(state = [], action) {
  const { lastOfRound, round, payload } = action

  switch(action.type) {
    case 'RECEIVE_SETTINGS' :
      return Object.assign({}, state, action.settings[0])

    case 'COUNTRY_DRAFTED' :
      return {
        ...state,
        round: payload.round,
        numberDrafted: payload.numberDrafted,
        userTurn: payload.userTurn
      }

    case 'TOGGLE_EDIT_USER' :
      return {
        ...state,
        editingDraftOrder: !state.editingDraftOrder
      }

    case 'SAVED_DRAFT' :
      return {
        ...state,
        editingDraftOrder: false
      }

    default:
      return state
  }
}

export default settings