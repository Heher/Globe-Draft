import fetch from 'isomorphic-fetch'
import { fetchError } from './actionCreators'

export function countryDrafted(payload) {
  return {
    type: 'COUNTRY_DRAFTED',
    payload
  }
}

export function settingsAdvanced(payload) {
  return {
    type: 'ADVANCE_SETTINGS',
    payload
  }
}

export function advanceSettings(countryPayload, settingsPayload) {
  let newSettingsPayload = {}

  if (settingsPayload.lastOfRound) {
    newSettingsPayload = {
      round: countryPayload.round + 1,
      numberDrafted: 0
    }
  } else if (countryPayload.round % 2 === 0) {
    newSettingsPayload = {
      userTurn: settingsPayload.userTurn - 1,
      numberDrafted: settingsPayload.numberDrafted + 1
    }
  } else {
    newSettingsPayload = {
      userTurn: settingsPayload.userTurn + 1,
      numberDrafted: settingsPayload.numberDrafted + 1
    }
  }

  return dispatch => (
    fetch('/api/settings', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload: newSettingsPayload
      })
    })
      .then(() => {
        const newSettings = {
          round: newSettingsPayload.round || countryPayload.round,
          numberDrafted: newSettingsPayload.numberDrafted,
          userTurn: newSettingsPayload.userTurn
        }
        dispatch(settingsAdvanced(newSettings))
      })
      .catch(error => dispatch(fetchError(error)))
  )
}

export function draftCountry(userId, countryPayload, settingsPayload) {
  if (userId !== countryPayload.userId) {
    return null;
  }
  return dispatch => (
    fetch('/api/drafts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: countryPayload.country,
        userId: countryPayload.userId,
        round: countryPayload.round,
        draftNum: countryPayload.draftNum
      })
    })
      .then(() => {
        console.log("success");
        dispatch(countryDrafted([countryPayload]))
        dispatch(advanceSettings(countryPayload, settingsPayload))
      })
      .catch(error => dispatch(fetchError(error)))
  )
}
