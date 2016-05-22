export function selectingCountry(regionId, countryId, userId, disabled) {
  return {
    type: "SELECTING_COUNTRY",
    regionId,
    countryId,
    userId,
    disabled
  }
}

export function deselectingCountry(regionId, countryId, userId, disabled) {
  return {
    type: "DESELECTING_COUNTRY",
    regionId,
    countryId,
    userId,
    disabled
  }
}

export function changeUser(userId) {
  return {
    type: "CHANGE_USER",
    userId
  }
}