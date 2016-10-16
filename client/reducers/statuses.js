function statuses(state = [], action) {
  switch (action.type) {
    case 'TEST_ITEM_SAVED' :
      return [
        ...state,
        {
          statusType: 'saved',
          text: 'Item Saved'
        }
      ]

    case 'TEST_ITEM_DELETED' :
      return [
        ...state,
        {
          statusType: 'deleted',
          text: 'Item Deleted'
        }
      ]

    default:
      return state
  }
}

export default statuses
