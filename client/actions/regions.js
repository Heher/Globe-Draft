import fetch from 'isomorphic-fetch'
import { fetchError } from './actionCreators'

export function requestRegions() {
  return {
    type: 'REQUEST_REGIONS'
  }
}

export function receiveRegions(regions) {
  return {
    type: 'RECEIVE_REGIONS',
    regions
  }
}

export function fetchRegions() {
  return dispatch => {
    dispatch(requestRegions())
    return fetch('/api/regions')
      .then(response => response.json().then(regions => ({ regions, response })))
      .then(({ regions }) => dispatch(receiveRegions(regions)))
      .catch(error => dispatch(fetchError(error)))
  }
}

export function addRegionToState(json) {
  return {
    type: 'ADD_REGION',
    json
  }
}

export function addRegion(name) {
  return dispatch => (
    fetch('/api/regions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        maxCountriesSelected: 1,
        editing: false
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addRegionToState([json])))
      .catch(error => dispatch(fetchError(error)))
  )
}

export function setEditingRegion(id) {
  return {
    type: 'SET_EDITING_REGION',
    id
  }
}

export function savedRegionEdit(id, payload) {
  return {
    type: 'SAVED_REGION',
    id,
    payload
  }
}

export function editRegion(id, payload) {
  return dispatch => (
    fetch('/api/regions', {
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
      .then(dispatch(savedRegionEdit(id, payload)))
      .catch(error => dispatch(fetchError(error)))
  )
}

export function deleteRegionFromState(id) {
  return {
    type: 'DELETE_REGION',
    id
  }
}

export function deleteRegion(id) {
  return dispatch => (
    fetch('/api/regions', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id
      })
    })
      .then(dispatch(deleteRegionFromState(id)))
      .catch(error => dispatch(fetchError(error)))
  )
}
