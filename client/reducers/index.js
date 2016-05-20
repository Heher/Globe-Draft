import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import regions from './regions'
import countries from './countries'

const rootReducer = combineReducers({regions, countries, routing: routerReducer})

export default rootReducer