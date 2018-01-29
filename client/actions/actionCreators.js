import fetch from 'isomorphic-fetch'

export function changeUser(id) {
  return {
    type: 'CHANGE_USER',
    id
  }
}

export function addUserToState(json) {
  return {
    type: 'ADD_USER',
    json
  }
}

export function setEditingUser(id) {
  return {
    type: 'SET_EDITING_USER',
    id
  }
}

export function deleteUserFromState(id) {
  return {
    type: 'DELETE_USER',
    id
  }
}

export function fetchError(error) {
  return {
    type: 'FETCH_ERROR',
    error
  }
}

export function addUser(name, isAdmin) {
  return dispatch => (
    fetch('/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        selected: false,
        draftNum: 0,
        editing: false,
        isAdmin,
        email: ''
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addUserToState([json])))
      .catch(error => dispatch(fetchError(error)))
  )
}

export function deleteUser(id) {
  return dispatch => (
    fetch('/api/users', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id
      })
    })
      .then(dispatch(deleteUserFromState(id)))
      .catch(error => dispatch(fetchError(error)))
  )
}

export function savedUserDraft(id, payload) {
  return {
    type: 'SAVED_USER_DRAFT',
    id,
    payload
  }
}

export function setDraft(id, payload) {
  return dispatch => (
    fetch('/api/users', {
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
      .then(dispatch(savedUserDraft(id, payload)))
      .catch(error => dispatch(fetchError(error)))
  )
}

export function requestEvents() {
  return {
    type: 'REQUEST_EVENTS'
  }
}

export function receiveEvents(events) {
  return {
    type: 'RECEIVE_EVENTS',
    events
  }
}

export function fetchEvents() {
  return dispatch => {
    dispatch(requestEvents())
    return fetch('/api/events')
      .then(response => response.json().then(events => ({ events, response })))
      .then(({ events }) => dispatch(receiveEvents(events)))
      .catch(error => dispatch(fetchError(error)))
  }
}

export function addEventToState(json) {
  return {
    type: 'ADD_EVENT',
    json
  }
}

export function addEvent(name, date) {
  return dispatch => (
    fetch('/api/events', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        team: false,
        editing: false,
        datetime: new Date(date).toISOString()
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addEventToState([json])))
      .catch(error => dispatch(fetchError(error)))
  )
}

export function deleteEventFromState(id) {
  return {
    type: 'DELETE_EVENT',
    id
  }
}

export function deleteEvent(id) {
  return dispatch => (
    fetch('/api/events', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id
      })
    })
      .then(dispatch(deleteEventFromState(id)))
      .catch(error => dispatch(fetchError(error)))
  )
}

export function setEditingEvent(id) {
  return {
    type: 'SET_EDITING_EVENT',
    id
  }
}

export function savedEventEdit(id, payload) {
  return {
    type: 'SAVED_EVENT',
    id,
    payload
  }
}

export function editEvent(id, payload) {
  return dispatch => (
    fetch('/api/events', {
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
      .then(dispatch(savedEventEdit(id, payload)))
      .catch(error => dispatch(fetchError(error)))
  )
}

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
        Acceptq: 'application/json',
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

export function deleteCountryFromState(id) {
  return {
    type: 'DELETE_COUNTRY',
    id
  }
}

export function deleteCountry(id) {
  return dispatch => (
    fetch('/api/countries', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id
      })
    })
      .then(dispatch(deleteCountryFromState(id)))
      .catch(error => dispatch(fetchError(error)))
  )
}

export function setEditingCountry(id) {
  return {
    type: 'SET_EDITING_COUNTRY',
    id
  }
}

export function savedCountryEdit(id, payload) {
  return {
    type: 'SAVED_COUNTRY',
    id,
    payload
  }
}

export function editCountry(id, payload) {
  return dispatch => (
    fetch('/api/countries', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: id,
        payload
      })
    })
      .then(dispatch(savedCountryEdit(id, payload)))
      .catch(error => dispatch(fetchError(error)))
  )
}

export function chargeSuccess() {
  return {
    type: 'CARD_CHARGE_SUCCESS'
  }
}
