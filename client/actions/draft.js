import fetch from 'isomorphic-fetch'

export function draftCountry(countryPayload, payload) {
  return dispatch => {
    return fetch('/api/countries', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: countryPayload,
        payload: {
          userId: payload.userId,
          drafted: true,
          round: payload.round,
          draftNum: payload.draftNum
        }
      })
    })
      .then(response => 
        response.json().then(country => ({ country, response }))
      ).then(({ country, response }) => {
        if (!response.ok) {
          console.log("Poop")
          dispatch(countryFetchError(country.message))
          return Promise.reject(country)
        }
        else {
          dispatch(countryDrafted(countryPayload, payload))
          dispatch(advanceSettings(countryPayload, payload))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function countryDrafted(countryPayload, payload) {
  return {
    type: "COUNTRY_DRAFTED",
    id: countryPayload._id,
    payload
  }
}

export function advanceSettings(countryPayload, payload) {
  let settingsPayload = {}

  if (payload.lastOfRound) {
    settingsPayload = {
      round: payload.round + 1,
      numberDrafted: 0
    }
  } else if (payload.round % 2 === 0) {
    settingsPayload = {
      userTurn: payload.userTurn - 1,
      numberDrafted: payload.numberDrafted + 1
    }
  } else {
    settingsPayload = {
      userTurn: payload.userTurn + 1,
      numberDrafted: payload.numberDrafted + 1
    }
  }
  return dispatch => {
    return fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload: settingsPayload
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
          const newSettings = {
            id: countryPayload._id,
            userId: payload.userId,
            round: settingsPayload.round || payload.round,
            numberDrafted: settingsPayload.numberDrafted,
            draftNum: payload.draftNum,
            lastOfRound: payload.lastOfRound,
            userTurn: settingsPayload.userTurn || payload.userTurn
          }
          dispatch(settingsAdvanced(newSettings))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function settingsAdvanced(payload) {
  return {
    type: "ADVANCE_SETTINGS",
    payload
  }
}