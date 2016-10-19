import fetch from 'isomorphic-fetch'
import { fetchError } from './actionCreators'

export function requestSettings() {
  return {
    type: 'REQUEST_SETTINGS'
  }
}

export function receiveSettings(settings) {
  return {
    type: 'RECEIVE_SETTINGS',
    settings
  }
}

export function fetchSettings() {
  return dispatch => {
    dispatch(requestSettings())
    return fetch('/api/settings')
      .then(response =>
        response.json().then(settings => ({ settings, response }))
      ).then(({ settings }) => {
        dispatch(receiveSettings(settings))
      }).catch(error => dispatch(fetchError(error)))
  }
}

export function setMultiplierCountryToState(setting) {
  return {
    type: 'TEST_SET_COUNTRY_SETTING',
    setting
  }
}

export function setGoodCountry(id) {
  return dispatch => {
    return fetch('/api/settings', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload: {
          goodCountry: id
        }
      })
    })
      .then(response =>
        response.json().then(setting => ({ setting, response }))
      ).then(({ setting }) => {
        dispatch(setMultiplierCountryToState(setting))
      }).catch(error => dispatch(fetchError(error)))
  }
}

export function setBadCountry(id) {
  return dispatch => {
    return fetch('/api/settings', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload: {
          badCountry: id
        }
      })
    })
      .then(response =>
        response.json().then(setting => ({ setting, response }))
      ).then(({ setting }) => {
        dispatch(setMultiplierCountryToState(setting))
      }).catch(error => dispatch(fetchError(error)))
  }
}

export function resetSettings() {
  return dispatch => {
    return fetch('/api/settings/reset', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        round: 1,
        userTurn: 1,
        numberDrafted: 0,
        editingDraftOrder: false,
        goodCountry: '',
        badCountry: ''
      })
    })
      .then(response =>
        response.json().then(settings => ({ settings, response }))
      ).then(({ settings }) => {
        dispatch(receiveSettings(settings))
      }).catch(error => dispatch(fetchError(error)))
  }
}

export function toggleDraft(setting) {
  return dispatch => {
    return fetch('/api/settings', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload: {
          draftStarted: setting
        }
      })
    })
      .then(response =>
        response.json().then(settings => ({ settings, response }))
      ).then(({ settings }) => {
        dispatch(receiveSettings(settings))
      }).catch(error => dispatch(fetchError(error)))
  }
}

export function toggleMobileMenu(setting) {
  return {
    type: 'TOGGLE_MOBILE_MENU',
    setting
  }
}
