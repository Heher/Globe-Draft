import fetch from 'isomorphic-fetch'
import { fetchError } from './actionCreators'

export function requestDrafts() {
  return {
    type: 'REQUEST_DRAFTS'
  }
}

export function receiveDrafts(drafts) {
  return {
    type: 'RECEIVE_DRAFTS',
    drafts
  }
}

export function fetchDrafts() {
  return dispatch => {
    dispatch(requestDrafts())
    return fetch('/api/drafts')
      .then(response => response.json().then(drafts => ({ drafts, response })))
      .then(({ drafts }) => dispatch(receiveDrafts(drafts)))
      .catch(error => dispatch(fetchError(error)))
  }
}
