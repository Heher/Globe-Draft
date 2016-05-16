let actions = {
  selectCountry: function(country) {
    return {
      type: 'SELECT_COUNTRY',
      country: country
    }
  }
}

export default actions