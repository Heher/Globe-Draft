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