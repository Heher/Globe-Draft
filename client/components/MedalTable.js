import React from 'react'

export default class MedalTable extends React.Component {
  findCountryMedals(countryId, country) {
    const medalCount = {
      gold: 0,
      silver: 0,
      bronze: 0,
      total: 0
    }
    this.props.events.forEach(event => {
      event.gold.forEach(gold => {
        if (gold.id === countryId) {
          medalCount.gold = medalCount.gold + 1
        }
      })
      event.silver.forEach(silver => {
        if (silver.id === countryId) {
          medalCount.silver = medalCount.silver + 1
        }
      })
      event.bronze.forEach(bronze => {
        if (bronze.id === countryId) {
          medalCount.bronze = medalCount.bronze + 1
        }
      })
    })
    medalCount.total = medalCount.gold + medalCount.silver + medalCount.bronze
    return medalCount
  }

  sortCountries(countryList) {
    if (countryList.length > 1) {
      return countryList.sort((a, b) => {
        if (a.countryMedals.total > b.countryMedals.total) return -1
        if (a.countryMedals.total < b.countryMedals.total) return 1
        return 0
      })
    }
    return countryList
  }

  render() {
    const countries = this.props.countries.map(country => {
      const countryMedals = this.findCountryMedals(country._id, country)
      return { country, countryMedals }
    })
    const sortedCountries = this.sortCountries(countries)
    const renderedCountries = sortedCountries.map((country, index) => {
      return (
        <div key={index}>
          <p>{country.country.name}</p>
          <p>Gold: {country.countryMedals.gold}</p>
          <p>Silver: {country.countryMedals.silver}</p>
          <p>Bronze: {country.countryMedals.bronze}</p>
          <p>Total: {country.countryMedals.total}</p>
          <hr />
        </div>
      )
    })
    return (
      <div>
        {renderedCountries}
      </div>
    )
  }
}
