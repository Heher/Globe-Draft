import fetch from 'isomorphic-fetch'
import { fetchError } from './actionCreators'

export function receiveCountries(countries) {
  return {
    type: 'RECEIVE_COUNTRIES',
    countries
  }
}

export function requestCountries() {
  return {
    type: 'REQUEST_COUNTRIES'
  }
}

export function fetchCountries() {
  return dispatch => {
    dispatch(requestCountries())
    return fetch('/api/countries')
      .then(response =>
        response.json().then(countries => ({ countries, response }))
      ).then(({ countries }) => {
        dispatch(receiveCountries(countries))
      }).catch(error => dispatch(fetchError(error)))
  }
}

export function addCountryToState(json) {
  return {
    type: 'ADD_COUNTRY',
    json
  }
}

export function addCountry(name, shortName, regionId) {
  return dispatch => {
    return fetch('/api/countries', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        shortName,
        regionId,
        userId: '',
        selected: false,
        drafted: false,
        draftNum: 0,
        round: 0,
        editing: false,
        goodCountry: false,
        badCountry: false
      })
    })
      .then(response => response.json())
      .then(json => dispatch(addCountryToState([json])))
  }
}

export function draftsReset(settings) {
  return {
    type: 'DRAFTS_RESET',
    settings
  }
}

export function resetDrafts() {
  return dispatch => {
    return fetch('/api/countries/resetDrafts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: '',
        drafted: false,
        round: 0,
        draftNum: 0
      })
    })
      .then(response =>
        response.json().then(settings => ({ settings, response }))
      ).then(({ settings }) => {
        dispatch(draftsReset(settings))
      }).catch(error => dispatch(fetchError(error)))
  }
}
