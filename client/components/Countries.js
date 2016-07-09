import React from 'react'
import { Link } from 'react-router'

import Header from './Header'
import Region from './Region'
import CountryList from './CountryList'
import ChangeUser from './ChangeUser'
import ChoiceList from './ChoiceList'
import ChoiceSubmit from './ChoiceSubmit'
import RoundStatus from './RoundStatus'

export default class Countries extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    const { dataStatus, currentUser } = this.props

    const selectedCountry = this.props.countries.filter(country => {
      return (country.selected && (country.userId === currentUser._id))
    })[0]

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived) {
      if (currentUser._id) {
        return (
          <div className="page">
            <div className="content">
              <div className="regions">
                {this.props.regions.map((region, index) => <Region {...this.props} key={index} i={index} region={region} />)}
              </div>
              <div className="sidebar">
                <ChoiceSubmit {...this.props} selectedCountry={selectedCountry}/>
                <CountryList {...this.props} />
                <RoundStatus {...this.props} />
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="page">
            <div className="content">
              <div className="regions">
                {this.props.regions.map((region, index) => <Region {...this.props} key={index} i={index} region={region} />)}
              </div>
              <div className="sidebar">
                <RoundStatus {...this.props} />
              </div>
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