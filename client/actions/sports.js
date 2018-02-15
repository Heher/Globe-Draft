import fetch from 'isomorphic-fetch'
import { fetchError } from './actionCreators'

export function requestSports() {
  return {
    type: 'REQUEST_SPORTS'
  }
}

export function receiveSports(sports) {
  return {
    type: 'RECEIVE_SPORTS',
    sports
  }
}

export function fetchSports() {
  return dispatch => {
    dispatch(requestSports())
    return fetch('/api/sports')
      .then(response => response.json().then(sports => ({ sports, response })))
      .then(({ sports }) => dispatch(receiveSports(sports)))
      .catch(error => dispatch(fetchError(error)))
  }
}

export function addSportToState(json) {
  return {
    type: 'ADD_SPORT',
    json
  }
}

export function addSport(name) {
  return dispatch => (
    fetch('/api/sports', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addSportToState([json])))
      .catch(error => dispatch(fetchError(error)))
  )
}

// export function setEditingRegion(id) {
//   return {
//     type: 'SET_EDITING_REGION',
//     id
//   }
// }

// export function savedRegionEdit(id, payload) {
//   return {
//     type: 'SAVED_REGION',
//     id,
//     payload
//   }
// }

// export function editRegion(id, payload) {
//   return dispatch => (
//     fetch('/api/regions', {
//       method: 'PUT',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         id,
//         payload
//       })
//     })
//       .then(dispatch(savedRegionEdit(id, payload)))
//       .catch(error => dispatch(fetchError(error)))
//   )
// }

// export function deleteRegionFromState(id) {
//   return {
//     type: 'DELETE_REGION',
//     id
//   }
// }

// export function deleteRegion(id) {
//   return dispatch => (
//     fetch('/api/regions', {
//       method: 'DELETE',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         _id: id
//       })
//     })
//       .then(dispatch(deleteRegionFromState(id)))
//       .catch(error => dispatch(fetchError(error)))
//   )
// }
