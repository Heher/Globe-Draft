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

export function draftCountry(country, userId, round, lastOfRound) {
  return {
    type: "DRAFT_COUNTRY",
    countryId: country.id,
    userId,
    round,
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

export function deleteUserFromState(name) {
  return {
    type: "DELETE_USER",
    name
  }
}

export function editUserInState(id, draftNum) {
  return {
    type: "EDIT_USER",
    id,
    draftNum
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

export function deleteUser(name) {
  return dispatch => {
    return fetch('/api/users', { 
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then(response => response.json())
      .then(json => dispatch(deleteUserFromState(name)))
  }
}

export function changeDraftOrder() {
  return {
    type: "CHANGE_DRAFT_ORDER"
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