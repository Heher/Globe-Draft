import fetch from 'isomorphic-fetch'

export function selectCountry(regionId, id, userId) {
  return {
    type: "SELECT_COUNTRY",
    regionId,
    id,
    userId
  }
}

export function deselectCountry(regionId, id, userId) {
  return {
    type: "DESELECT_COUNTRY",
    regionId,
    id,
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

export function requestUsers() {
  return {
    type: "REQUEST_USERS"
  }
}

export function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers())
    return fetch('/api/users')
      .then(response => 
        response.json().then(users => ({ users, response }))
      ).then(({ users, response }) => {
        if (!response.ok) {
          console.log("Poop")
          dispatch(userFetchError(users.message))
          return Promise.reject(users)
        }
        else {
          dispatch(receiveUsers(users))
          let token = localStorage.getItem('id_token') ? localStorage.getItem('id_token') : null
          dispatch(findCurrentUser(users, token))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function userFetchError(payload) {
  console.log("USER FETCH ERROR:", payload)
  return {
    type: "USER_FETCH_ERROR",
    payload
  }
}

export function receiveUsers(users) {
  return {
    type: "RECEIVE_USERS",
    users
  }
}

export function editUser(id, payload) {
  return dispatch => {
    return fetch('/api/users', {
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
      .then(response => 
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          console.log("Poop")
          dispatch(userFetchError(user.message))
          return Promise.reject(user)
        }
        else {
          dispatch(savedUser(user._id, user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function savedUser(id, payload) {
  return {
    type: "SAVED_USER",
    id,
    payload
  }
}

export function addUserToState(json) {
  return {
    type: "ADD_USER",
    json
  }
}

export function setEditingUser(id) {
  return {
    type: "SET_EDITING_USER",
    id
  }
}

export function deleteUserFromState(id) {
  return {
    type: "DELETE_USER",
    id
  }
}

export function addUser(name, isAdmin) {
  return dispatch => {
    return fetch('/api/users', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        selected: false,
        draftNum: 0,
        editing: false,
        isAdmin: isAdmin
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addUserToState([json])))
  }
}

export function deleteUser(id) {
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

export function setDraft(id, payload) {
  return dispatch => {
    return fetch('/api/users', {
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
      .then(json => dispatch(savedUserDraft(id, payload)))
  }
}

export function savedUserDraft(id, payload) {
  return {
    type: "SAVED_USER_DRAFT",
    id,
    payload
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
        team: false,
        editing: false
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

export function setEditingEvent(id) {
  return {
    type: "SET_EDITING_EVENT",
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

export function fetchCountries() {
  return dispatch => {
    return fetch('/api/countries')
      .then(response => response.json())
      .then(json => dispatch(receiveCountries(json)))
  }
}

export function receiveCountries(json) {
  return {
    type: "RECEIVE_COUNTRIES",
    json
  }
}

export function fetchRegions() {
  return dispatch => {
    return fetch('/api/regions')
      .then(response => response.json())
      .then(json => dispatch(receiveRegions(json)))
  }
}

export function receiveRegions(json) {
  return {
    type: "RECEIVE_REGIONS",
    json
  }
}

export function addRegion(name) {
  return dispatch => {
    return fetch('/api/regions', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        maxCountriesSelected: 1,
        editing: false
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addRegionToState([json])))
  }
}

export function addRegionToState(json) {
  return {
    type: "ADD_REGION",
    json
  }
}

export function setEditingRegion(id) {
  return {
    type: "SET_EDITING_REGION",
    id
  }
}

export function editRegion(id, payload) {
  return dispatch => {
    return fetch('/api/regions', {
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
      .then(json => dispatch(savedRegionEdit(id, payload)))
  }
}

export function savedRegionEdit(id, payload) {
  return {
    type: "SAVED_REGION",
    id,
    payload
  }
}

export function deleteRegion(id) {
  return dispatch => {
    return fetch('/api/regions', { 
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
      .then(json => dispatch(deleteRegionFromState(id)))
  }
}

export function deleteRegionFromState(id) {
  return {
    type: "DELETE_REGION",
    id
  }
}

export function addCountry(name, region_id) {
  return dispatch => {
    return fetch('/api/countries', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        regionId: region_id,
        userId: "",
        selected: false,
        drafted: false,
        draftNum: 0,
        round: 0,
        editing: false
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addCountryToState([json])))
  }
}

export function addCountryToState(json) {
  return {
    type: "ADD_COUNTRY",
    json
  }
}

export function deleteCountry(id) {
  return dispatch => {
    return fetch('/api/countries', { 
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
      .then(json => dispatch(deleteCountryFromState(id)))
  }
}

export function deleteCountryFromState(id) {
  return {
    type: "DELETE_COUNTRY",
    id
  }
}

export function setEditingCountry(id) {
  return {
    type: "SET_EDITING_COUNTRY",
    id
  }
}

export function editCountry(id, payload) {
  return dispatch => {
    return fetch('/api/countries', {
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
      .then(json => dispatch(savedCountryEdit(id, payload)))
  }
}

export function savedCountryEdit(id, payload) {
  return {
    type: "SAVED_COUNTRY",
    id,
    payload
  }
}

export function findOrCreateFacebookUser(payload) {
  return dispatch => {
    return fetch('/auth/facebook', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload
      })
    })
      .then(response => 
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          dispatch(loginError(user.message))
          return Promise.reject(user)
        }
        else {
          localStorage.setItem('id_token', user.id_token)
          dispatch(setCurrentUser(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function findCurrentUser(users, token) {
  return dispatch => {
    const currentUser = users.filter(user => {
      return user.id_token === token
    })[0]
    console.log(users)
    if (currentUser) {
      dispatch(setCurrentUser(currentUser))
    }
  }
}

export function setCurrentUser(payload) {
  return {
    type: "SET_CURRENT_USER",
    payload
  }
}

export function logoutUser(id) {
  return {
    type: "LOGOUT_USER",
    id
  }
}