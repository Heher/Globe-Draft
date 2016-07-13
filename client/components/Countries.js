import React from 'react'
import { Link } from 'react-router'

import Header from './Header'
import Region from './Region'
import CountryList from './CountryList'
import ChangeUser from './ChangeUser'
import ChoiceList from './ChoiceList'
import ChoiceSubmit from './ChoiceSubmit'
import RoundStatus from './RoundStatus'
import MobileDraftMenu from './MobileDraftMenu'

export default class Countries extends React.Component {
  
  constructor(props) {
    super(props)
    const countryIds = this.props.countries.map(country => {
      return country._id
    })
    this.state = {
      countryList: countryIds
    }
  }

  countrySearch(event) {
    let searchResult = []
    const query = event.target.value.toLowerCase()
    this.props.countries.map(country => {
      if (country.name.toLowerCase().indexOf(query) !== -1) {
        searchResult.push(country._id)
      }
    })
    this.setState({
      countryList: searchResult
    })
  }

  render() {
    const { dataStatus, currentUser } = this.props

    const fullCountryList = this.state.countryList.map(countryId => {
      return this.props.countries.filter(propCountry => {
        return countryId === propCountry._id
      })[0]
    })

    const regionList = this.props.regions.map((region, index) => {
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
      if (currentUser._id) {
        return (
          <div className="draft-countries">
            <MobileDraftMenu {...this.props} />
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
            <MobileDraftMenu {...this.props} />
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
    } else {
      return (
        <h1>Loading</h1>
      )
    }
  }
}