import React from "react"

import CountryCard from "./CountryCard"
import EventIcon from "./icons/EventIcon"

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
      return countries.sort(function(a, b) {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
      })
    } else {
      return null
    }
  }

  toggleRegionShow() {
    this.setState({
      showRegion: !this.state.showRegion
    })
  }

  render() {
    let numSelected = 0
    this.props.countries.forEach((country) => {
      if (country.regionId === this.props.region._id) {
        if ((country.userId === this.props.currentUser._id) && (country.selected || country.drafted)) {
          numSelected = numSelected + 1
        }
      }
    })

    const completed = (numSelected === this.props.region.maxCountriesSelected)

    const countries = this.props.countryList.filter(country => {
      return country.regionId === this.props.region._id
    })

    if (countries.length > 0) {
      const countryValues = (countries.filter( Boolean ))

      const sortedCountries = this.sortRegion(countryValues)

      const countryList = sortedCountries.map((country, index) => {
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
        <div className={`region ${!this.state.showRegion ? "hide" : ""}`}>
          <h2>{this.props.region.name}</h2>
          <EventIcon {...this.props} toggle={this.toggleRegionShow.bind(this)}/>
          <span className="number-selected">{numSelected} selected of {this.props.region.maxCountriesSelected}</span>
          <div className="country-selections">
            {countryList}
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}