export default function drafts(state = [], action) {
  const { id, payload } = action

  switch (action.type) {
    case 'RECEIVE_DRAFTS' : {
      return Object.assign([], state, action.drafts)
    }

    // case 'SELECT_COUNTRY' : {
    //   console.log("select");
    //   return state.map(draft => {
    //     if ((country.userId === userId) && country.selected) {
    //       return {
    //         ...country,
    //         selected: false,
    //         userId: ''
    //       }
    //     }
    //     if (country._id === id) {
    //       return {
    //         ...country,
    //         selected: true,
    //         userId
    //       }
    //     }
    //     return {
    //       ...country
    //     }
    //   })
    // }

    case 'ADD_DRAFT' : {
      return [
        ...state,
        ...action.json
      ]
    }

    default: {
      return state
    }
  }
}