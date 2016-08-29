import React from 'react'

import Region from './Region'
import CountryList from './CountryList'
import RoundStatus from './RoundStatus'

export default class Countries extends React.Component {
  constructor(props) {
    super(props)
    const countryIds = this.props.countries.map(country => country._id)
    this.state = {
      countryList: countryIds
    }
  }

  countrySearch(event) {
    const searchResult = []
    const query = event.target.value.toLowerCase()
    this.props.countries.forEach(country => {
      if (country.name.toLowerCase().indexOf(query) !== -1) {
        searchResult.push(country._id)
      }
    })
    this.setState({
      countryList: searchResult
    })
  }

  sortRegions(regions) {
    if (regions.length) {
      return regions.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    }
    return null
  }

  render() {
    const { dataStatus, currentUser } = this.props

    const fullCountryList = this.state.countryList.map(countryId => {
      return this.props.countries.find(propCountry => countryId === propCountry._id)
    })

    const sortedRegions = this.sortRegions(this.props.regions)

    const regionList = sortedRegions.map((region, index) => {
      return (
        <Region
          {...this.props}
          key={index}
          region={region}
          countryList={fullCountryList}
        />
      )
    })

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived) {
      if (currentUser._id && currentUser.hasPaid) {
        return (
          <div className="draft-countries">
            <div className="regions">
              <div className="search-wrapper">
                <input className="country-search" type="text" onChange={this.countrySearch.bind(this)} placeholder="SEARCH" />
              </div>
              {regionList}
            </div>
            <div className="sidebar">
              <CountryList {...this.props} />
              <RoundStatus {...this.props} />
            </div>
          </div>
        )
      } else {
        return (
          <div className="draft-countries">
            <div className="regions">
              <div className="search-wrapper">
                <input className="country-search" type="text" onChange={this.countrySearch.bind(this)} placeholder="SEARCH" />
              </div>
              {regionList}
            </div>
            <div className="sidebar">
              <RoundStatus {...this.props} />
            </div>
          </div>
        )
      }
    }
    return (
      <h1>Loading</h1>
    )
  }
}
