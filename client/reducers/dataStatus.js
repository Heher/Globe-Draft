export default function dataStatus(state = [], action) {
  switch (action.type) {
    case 'REQUEST_USERS' :
      return {
        ...state,
        usersFetching: true
      }

    case 'RECEIVE_USERS' :
      return {
        ...state,
        usersFetching: false,
        usersReceived: true
      }

    case 'REQUEST_EVENTS' :
      return {
        ...state,
        eventsFetching: true
      }

    case 'RECEIVE_EVENTS' :
      return {
        ...state,
        eventsFetching: false,
        eventsReceived: true
      }

    case 'REQUEST_COUNTRIES' :
      return {
        ...state,
        countriesFetching: true
      }

    case 'RECEIVE_COUNTRIES' :
      return {
        ...state,
        countriesFetching: false,
        countriesReceived: true
      }

    case 'REQUEST_REGIONS' :
      return {
        ...state,
        regionsFetching: true
      }

    case 'RECEIVE_REGIONS' :
      return {
        ...state,
        regionsFetching: false,
        regionsReceived: true
      }

    case 'REQUEST_SETTINGS' :
      return {
        ...state,
        settingsFetching: true
      }

    case 'RECEIVE_SETTINGS' :
      return {
        ...state,
        settingsFetching: false,
        settingsReceived: true
      }

    case 'REQUEST_DRAFTS' :
      return {
        ...state,
        draftsFetching: true
      }

    case 'RECEIVE_DRAFTS' :
      return {
        ...state,
        draftsFetching: false,
        draftsReceived: true
      }

    case 'REQUEST_SPORTS' :
      return {
        ...state,
        sportsFetching: true
      }

    case 'RECEIVE_SPORTS' :
      return {
        ...state,
        sportsFetching: false,
        sportsReceived: true
      }

    case 'REQUEST_MEDALS' :
      return {
        ...state,
        medalsFetching: true
      }

    case 'RECEIVE_MEDALS' :
      return {
        ...state,
        medalsFetching: false,
        medalsReceived: true
      }
    default:
      return state
  }
}
