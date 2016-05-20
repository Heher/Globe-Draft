export function selectCountry(regionId, countryId, userId, selecting, disabled) {
  return {
    type: "SELECT_COUNTRY",
    regionId,
    countryId,
    userId,
    selecting,
    disabled
  }
}