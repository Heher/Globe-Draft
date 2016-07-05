import fetch from 'isomorphic-fetch'

export function fetchCountries() {
  return dispatch => {
    dispatch(requestCountries())
    return fetch('/api/countries')
      .then(response => 
        response.json().then(countries => ({ countries, response }))
      ).then(({ countries, response }) => {
        if (!response.ok) {
          console.log("Poop")
          dispatch(countryFetchError(countries.message))
          return Promise.reject(countries)
        }
        else {
          dispatch(receiveCountries(countries))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function requestCountries() {
  return {
    type: "REQUEST_COUNTRIES"
  }
}

export function countryFetchError(payload) {
  console.log("COUNTRY FETCH ERROR:", payload)
  return {
    type: "COUNTRY_FETCH_ERROR",
    payload
  }
}

export function receiveCountries(countries) {
  return {
    type: "RECEIVE_COUNTRIES",
    countries
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
        editing: false,
        goodCountry: false,
        badCountry: false
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

export function resetDrafts() {
  return dispatch => {
    return fetch('/api/countries/resetDrafts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: "",
        drafted: false,
        round: 0,
        draftNum: 0
      })
    })
      .then(response => 
        response.json().then(settings => ({ settings, response }))
      ).then(({ settings, response }) => {
        console.log(settings, response)
        if (!response.ok) {
          console.log("Poop")
          dispatch(settingsFetchError(settings.message))
          return Promise.reject(settings)
        }
        else {
          console.log("Done")
          // dispatch(receiveSettings(settings))
        }
      }).catch(err => console.log("Error: ", err))
  }
}