import fetch from 'isomorphic-fetch'
import { fetchError } from './actionCreators'

export function requestMedals() {
  return {
    type: 'REQUEST_MEDALS'
  }
}

export function receiveMedals(medals) {
  return {
    type: 'RECEIVE_MEDALS',
    medals
  }
}

export function fetchMedals() {
  return dispatch => {
    dispatch(requestMedals())
    return fetch('/api/medals')
      .then(response => response.json().then(medals => ({ medals, response })))
      .then(({ medals }) => dispatch(receiveMedals(medals)))
      .catch(error => dispatch(fetchError(error)))
  }
}

export function addMedalToState(json) {
  return {
    type: 'ADD_MEDAL',
    json
  }
}

export function addMedal(payload) {
  return dispatch => (
    fetch('/api/medals', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(json => dispatch(addMedalToState([json])))
      .catch(error => dispatch(fetchError(error)))
  )
}

// export function setEditingRegion(id) {
//   return {
//     type: 'SET_EDITING_REGION',
//     id
//   }
// }

export function savedMedalEdit(id, payload) {
  return {
    type: 'SAVED_MEDAL',
    id,
    payload
  }
}

export function editMedal(id, payload) {
  return dispatch => (
    fetch('/api/medals', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        payload
      })
    })
      .then(dispatch(savedMedalEdit(id, payload)))
      .catch(error => dispatch(fetchError(error)))
  )
}

export function deleteMedalFromState(id) {
  return {
    type: 'DELETE_MEDAL',
    id
  }
}

export function deleteMedal(id) {
  return dispatch => (
    fetch('/api/medals', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id
      })
    })
      .then(dispatch(deleteMedalFromState(id)))
      .catch(error => dispatch(fetchError(error)))
  )
}
