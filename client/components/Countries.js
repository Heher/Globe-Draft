import React from 'react'
import { Link } from 'react-router'

import Header from './Header'
import Region from './Region'
import CountryList from './CountryList'
import ChangeUser from './ChangeUser'
import ChoiceList from './ChoiceList'
import ChoiceSubmit from './ChoiceSubmit'

export default class Countries extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    const { currentUser } = this.props

    const selectedCountry = this.props.countries.filter(country => {
      return (country.selected && (country.userId === currentUser._id))
    })

    return (
      <div className="page">
        <div className="content">
          <div className="regions">
            {this.props.regions.map((region, index) => <Region {...this.props} key={index} i={index} region={region} />)}
          </div>
          <div className="sidebar">
            <ChoiceSubmit {...this.props} selectedCountry={selectedCountry}/>
            <CountryList {...this.props} />
            <ChoiceList {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}