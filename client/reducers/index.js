import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import regions from './regions'
import countries from './countries'
import users from './users'

const rootReducer = combineReducers({regions, countries, users, routing: routerReducer})

export default rootReducer