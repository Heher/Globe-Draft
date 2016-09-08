import React from 'react'

import CountryCard from './CountryCard'
import EventIcon from './icons/EventIcon'

require('../css/region.sass')

export default class Region extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showRegion: true
    }
  }
  sortRegion(countries) {
    if (countries.length) {
      return countries.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    }
    return null
  }

  toggleRegionShow() {
    this.setState({
      showRegion: !this.state.showRegion
    })
  }

  render() {
    const { countries, region, currentUser, countryList } = this.props

    let numSelected = 0
    countries.forEach((country) => {
      if (country.regionId === region._id) {
        if ((country.userId === currentUser._id) && (country.selected || country.drafted)) {
          numSelected = numSelected + 1
        }
      }
    })

    const completed = (numSelected === region.maxCountriesSelected)

    const regionCountries = countryList.filter(country => country.regionId === region._id)

    if (regionCountries.length > 0) {
      const countryValues = (regionCountries.filter(Boolean))

      const sortedCountries = this.sortRegion(countryValues)

      const sortedCountryList = sortedCountries.map((country, index) => {
        return (
          <CountryCard
            {...this.props}
            key={index}
            i={index}
            country={country}
            regionCompleted={completed}
          />
        )
      })

      return (
        <div className={`region ${!this.state.showRegion ? 'hide' : ''}`}>
          <h2 onClick={() => this.toggleRegionShow()}>{region.name}</h2>
          <EventIcon {...this.props} toggle={() => this.toggleRegionShow()} />
          <span className="number-selected">{numSelected} selected of {region.maxCountriesSelected}</span>
          <div className="country-selections">
            {sortedCountryList}
          </div>
        </div>
      )
    }
    return null
  }
}

Region.propTypes = {
  countries: React.PropTypes.array.isRequired,
  region: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  countryList: React.PropTypes.array.isRequired
}
