import React from 'react'

import Region from './Region'
import CountryList from './CountryList'
import RoundStatus from './RoundStatus'

export default class Countries extends React.Component {
  constructor(props) {
    super(props)
    const countryIds = this.props.countries.map(country => country._id)
    this.state = {
      countryList: countryIds,
      selectedCountry: {}
    }
    this.countrySearch = this.countrySearch.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    this.deselectAll = this.deselectAll.bind(this)
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

  selectCountry(country) {
    if (country === this.state.selectedCountry) {
      this.setState({
        selectedCountry: {}
      })
    } else {
      this.setState({
        selectedCountry: country
      })
    }
  }

  deselectAll() {
    this.setState({
      selectedCountry: {}
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
    const { dataStatus, currentUser, countries } = this.props

    // Takes the current list of countryIds and returns a
    // list of the full country object for each of them.
    const fullCountryList =
      this.state.countryList
        .map(countryId => countries.find(propCountry => countryId === propCountry._id))

    const sortedRegions = this.sortRegions(this.props.regions)

    const regionList = sortedRegions.map((region, index) => (
      <Region
        {...this.props}
        key={index}
        region={region}
        countryList={fullCountryList}
        selectedCountry={this.state.selectedCountry}
        selectCountry={this.selectCountry}
        deselectAll={this.deselectAll}
      />
    ))

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived && dataStatus.draftsReceived) {
      if (currentUser._id && currentUser.hasPaid) {
        return (
          <div className="draft-countries">
            <div className="regions">
              <div className="search-wrapper">
                <input
                  className="country-search"
                  type="text"
                  onChange={this.countrySearch}
                  placeholder="SEARCH"
                />
              </div>
              {regionList}
            </div>
            <div className="sidebar">
              <CountryList {...this.props} />
              <RoundStatus {...this.props} />
            </div>
          </div>
        )
      }
      return (
        <div className="draft-countries">
          <div className="regions">
            <div className="search-wrapper">
              <input
                className="country-search"
                type="text"
                onChange={this.countrySearch}
                placeholder="SEARCH"
              />
            </div>
            {regionList}
          </div>
          <div className="sidebar">
            <RoundStatus {...this.props} />
          </div>
        </div>
      )
    }
    return (
      <h1>Loading</h1>
    )
  }
}

Countries.propTypes = {
  countries: React.PropTypes.array.isRequired,
  dataStatus: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  regions: React.PropTypes.array.isRequired
}

Countries.defaultProps = {
  countries: [],
  dataStatus: {},
  currentUser: {},
  regions: []
}
