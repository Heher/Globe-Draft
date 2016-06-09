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

export function changeUser(userId) {
  return {
    type: "CHANGE_USER",
    userId
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
      .then(json => console.log(json))
  }
}