export function selectCountry(regionId, countryId, selecting, disabled) {
  return {
    type: "SELECT_COUNTRY",
    regionId,
    countryId,
    selecting,
    disabled
  }
}