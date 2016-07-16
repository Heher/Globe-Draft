function settings(state = [], action) {
  const { lastOfRound, round, payload } = action

  switch(action.type) {
    case 'RECEIVE_SETTINGS' :
      return Object.assign({}, state, action.settings[0])

    case 'ADVANCE_SETTINGS' :
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

    case 'TOGGLE_MOBILE_MENU' :
      return {
        ...state,
        mobileMenuShow: !state.mobileMenuShow
      }

    case 'LOGIN_EMAIL_NOT_FOUND' :
      return {
        ...state,
        loginError: true
      }

    case 'LOGIN_SUCCESS' :
      return {
        ...state,
        loginSuccess: true
      }

    default:
      return state
  }
}

export default settings