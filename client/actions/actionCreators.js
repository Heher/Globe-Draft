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

export function fetchError(error) {
  return {
    type: "FETCH_ERROR",
    error
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
        isAdmin: isAdmin,
        email: ''
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addUserToState([json])))
      .catch(error => dispatch(fetchError(error)))
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

export function requestEvents() {
  return {
    type: "REQUEST_EVENTS"
  }
}

export function eventFetchError(payload) {
  console.log("EVENT FETCH ERROR:", payload)
  return {
    type: "EVENT_FETCH_ERROR",
    payload
  }
}

export function fetchEvents() {
  return dispatch => {
    dispatch(requestEvents())
    return fetch('/api/events')
      .then(response => 
        response.json().then(events => ({ events, response }))
      ).then(({ events, response }) => {
        if (!response.ok) {
          console.log("Poop")
          dispatch(eventFetchError(events.message))
          return Promise.reject(events)
        }
        else {
          dispatch(receiveEvents(events))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function receiveEvents(events) {
  return {
    type: "RECEIVE_EVENTS",
    events
  }
}

export function addEvent(name, date) {
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
        editing: false,
        datetime: new Date(date).toISOString()
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

export function testEditEvent(id, payload) {
  return dispatch => {
    dispatch(testEditEventConfirm(id, payload))
  }
}

export function testEditEventConfirm(id, payload) {
  console.log(id, payload)
  return {
    type: 'TEST_EDIT_EVENT'
  }
}

export function testHandleItemSave() {
  return {
    type: 'TEST_ITEM_SAVED'
  }
}

export function testHandleItemDelete() {
  return {
    type: 'TEST_ITEM_DELETED'
  }
}

export function savedEventEdit(id, payload) {
  return {
    type: "SAVED_EVENT",
    id,
    payload
  }
}

export function requestRegions() {
  return {
    type: "REQUEST_REGIONS"
  }
}

export function fetchRegions() {
  return dispatch => {
    dispatch(requestRegions())
    return fetch('/api/regions')
      .then(response => 
        response.json().then(regions => ({ regions, response }))
      ).then(({ regions, response }) => {
        if (!response.ok) {
          console.log("Poop")
          dispatch(regionFetchError(regions.message))
          return Promise.reject(regions)
        }
        else {
          dispatch(receiveRegions(regions))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function receiveRegions(regions) {
  return {
    type: "RECEIVE_REGIONS",
    regions
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
      .then(response => 
        response.json().then(regions => ({ regions, response }))
      ).then(({ regions, response }) => {
        if (!response.ok) {
          console.log("Poop")
          dispatch(countryFetchError(regions.message))
          return Promise.reject(regions)
        }
        else {
          dispatch(savedRegionEdit(id, payload))
        }
      }).catch(err => console.log("Error: ", err))
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
        country: id,
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

export function chargeSuccess() {
  return {
    type: "CARD_CHARGE_SUCCESS"
  }
}
