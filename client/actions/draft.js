import fetch from 'isomorphic-fetch'

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

export function draftCountry(id, payload) {
  return dispatch => {
    return fetch('/api/countries', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
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
          dispatch(advanceSettings(id, payload))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function advanceSettings(id, payload) {
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
            id: id._id,
            userId: payload.userId,
            round: settingsPayload.round || payload.round,
            numberDrafted: settingsPayload.numberDrafted,
            draftNum: payload.draftNum,
            lastOfRound: payload.lastOfRound,
            userTurn: settingsPayload.userTurn || payload.userTurn
          }
          dispatch(countryDrafted(newSettings))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function countryDrafted(payload) {
  return {
    type: "COUNTRY_DRAFTED",
    payload
  }
}