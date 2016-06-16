import fetch from 'isomorphic-fetch'

export function selectCountry(regionId, countryId, userId) {
  return {
    type: "SELECT_COUNTRY",
    regionId,
    countryId,
    userId
  }
}

export function deselectCountry(regionId, countryId, userId) {
  return {
    type: "DESELECT_COUNTRY",
    regionId,
    countryId,
    userId
  }
}

export function changeUser(id) {
  return {
    type: "CHANGE_USER",
    id
  }
}

export function draftCountry(country, userId, round, draftNum, lastOfRound) {
  return {
    type: "DRAFT_COUNTRY",
    countryId: country.id,
    userId,
    round,
    draftNum,
    lastOfRound
  }
}

export function fetchUsers() {
  return dispatch => {
    return fetch('/api/users')
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(json)))
  }
}

export function receiveUsers(json) {
  return {
    type: "RECEIVE_USERS",
    json
  }
}

export function addUserToState(json) {
  return {
    type: "ADD_USER",
    json
  }
}

export function deleteUserFromState(id) {
  return {
    type: "DELETE_USER",
    id
  }
}

export function addUser(name) {
  return dispatch => {
    return fetch('/api/users', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        selected: false
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addUserToState([json])))
  }
}

export function deleteUser(id) {
  console.log(id)
  return dispatch => {
    return fetch('/api/users', { 
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id
      })
    })
      .then(response => response.json())
      .then(json => dispatch(deleteUserFromState(id)))
  }
}

export function setDraft(id, draftNum) {
  return {
    type: "SET_DRAFT_ORDER",
    id,
    draftNum
  }
}

export function savedDraft() {
  return {
    type: "SAVED_DRAFT"
  }
}

export function saveDraftOrder(draftOrders) {
  let complete = 0
  return dispatch => {
    return draftOrders.map(draft => {
      return fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: draft.id,
          draftNum: draft.draftNum
        })
      })
      .then(response => {
        complete = complete + 1
        complete === draftOrders.length ? dispatch(savedDraft()) : ""
      })
    })
  }
}

export function fetchEvents() {
  return dispatch => {
    return fetch('/api/events')
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
  }
}

export function receiveEvents(json) {
  return {
    type: "RECEIVE_EVENTS",
    json
  }
}

export function addEvent(name) {
  return dispatch => {
    return fetch('/api/events', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        team: false
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addEventToState([json])))
  }
}

export function addEventToState(json) {
  return {
    type: "ADD_EVENT",
    json
  }
}

export function deleteEvent(id) {
  return dispatch => {
    return fetch('/api/events', { 
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id
      })
    })
      .then(response => response.json())
      .then(json => dispatch(deleteEventFromState(id)))
  }
}

export function deleteEventFromState(id) {
  return {
    type: "DELETE_EVENT",
    id
  }
}

export function editEvent(id, payload) {
  return dispatch => {
    return fetch('/api/events', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        payload: payload
      })
    })
      .then(response => response.json())
      .then(json => dispatch(savedEventEdit(id, payload)))
  }
}

export function savedEventEdit(id, payload) {
  return {
    type: "SAVED_EVENT",
    id,
    payload
  }
}