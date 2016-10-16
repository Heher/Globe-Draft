import { createStore, compose, applyMiddleware } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'

import rootReducer from './reducers/index'
import dataStatus from './data/dataStatus'
import testEvents from './data/testEvents'

const defaultState = {
  regions: [],
  countries: [],
  users: [],
  events: [],
  currentUser: {},
  settings: {},
  statuses: [],
  dataStatus,
  testEvents
}

const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, defaultState, enhancers)

export const history = syncHistoryWithStore(browserHistory, store)

if(module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
