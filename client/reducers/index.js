import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import regions from './regions'
import countries from './countries'
import users from './users'
import events from './events'
import settings from './settings'
import currentUser from './currentUser'
import dataStatus from './dataStatus'

const rootReducer = combineReducers({
  regions,
  countries,
  users,
  events,
  settings,
  currentUser,
  dataStatus,
  routing: routerReducer
})

export default rootReducer
