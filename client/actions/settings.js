import fetch from 'isomorphic-fetch'

export function fetchSettings() {
  return dispatch => {
    dispatch(requestSettings())
    return fetch('/api/settings')
      .then(response => 
        response.json().then(settings => ({ settings, response }))
      ).then(({ settings, response }) => {
        if (!response.ok) {
          console.log("Poop")
          dispatch(settingsFetchError(settings.message))
          return Promise.reject(settings)
        }
        else {
          dispatch(receiveSettings(settings))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function requestSettings() {
  return {
    type: "REQUEST_SETTINGS"
  }
}

export function settingsFetchError(payload) {
  console.log("SETTINGS FETCH ERROR:", payload)
  return {
    type: "SETTINGS_FETCH_ERROR",
    payload
  }
}

export function receiveSettings(settings) {
  return {
    type: "RECEIVE_SETTINGS",
    settings
  }
}

export function setGoodCountry(id) {
  return dispatch => {
    return fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
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
      ).then(({ setting, response }) => {
        if (!response.ok) {
          console.log("Poop")
          dispatch(settingsFetchError(setting.message))
          return Promise.reject(setting)
        }
        else {
          dispatch(setMultiplierCountryToState(setting))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function setBadCountry(id) {
  return dispatch => {
    return fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
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
      ).then(({ setting, response }) => {
        console.log(setting, response)
        if (!response.ok) {
          console.log("Poop")
          dispatch(settingsFetchError(setting.message))
          return Promise.reject(setting)
        }
        else {
          dispatch(setMultiplierCountryToState(setting))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function setMultiplierCountryToState(setting) {
  console.log(setting)
  return {
    type: "TEST_SET_COUNTRY_SETTING",
    setting
  }
}

export function resetSettings() {
  return dispatch => {
    return fetch('/api/settings/reset', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
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
      ).then(({ settings, response }) => {
        console.log(settings, response)
        if (!response.ok) {
          console.log("Poop")
          dispatch(settingsFetchError(settings.message))
          return Promise.reject(settings)
        }
        else {
          dispatch(receiveSettings(settings))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function toggleDraft(setting) {
  console.log(setting)
  return dispatch => {
    return fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
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
      ).then(({ settings, response }) => {
        if (!response.ok) {
          console.log("Poop")
          dispatch(settingsFetchError(settings.message))
          return Promise.reject(settings)
        }
        else {
          dispatch(receiveSettings(settings))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function toggleMobileMenu(setting) {
  return {
    type: "TOGGLE_MOBILE_MENU",
    setting
  }
}