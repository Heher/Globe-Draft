import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import regions from './regions'

const rootReducer = combineReducers({regions, routing: routerReducer})

export default rootReducer