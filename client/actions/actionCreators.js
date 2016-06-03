export function selectCountry(regionId, countryId, userId) {
  return {
    type: "SELECT_COUNTRY",
    regionId,
    countryId,
    userId
  }
}

export function deselectCountry(regionId, countryId, userId) {
  return {
    type: "DESELECT_COUNTRY",
    regionId,
    countryId,
    userId
  }
}

export function changeUser(userId) {
  return {
    type: "CHANGE_USER",
    userId
  }
}

export function draftCountry(country, userId, round, lastOfRound) {
  return {
    type: "DRAFT_COUNTRY",
    countryId: country.id,
    userId,
    round,
    lastOfRound
  }
}