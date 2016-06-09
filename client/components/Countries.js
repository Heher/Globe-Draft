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
    const currentUser = this.props.users.filter((user) => {
      return user.selected
    })

    const userDrafting = this.props.users.filter(user => {
      return Number(user.id) === this.props.settings.userTurn
    })

    const selectedCountry = this.props.countries.filter(country => {
      return (country.selected && (country.userId === currentUser[0].id))
    })

    const canDraft = this.props.settings.userTurn === Number(currentUser[0].id)

    return (
      <div className="page">
        <Header {...this.props} canDraft={canDraft} currentUser={currentUser[0]} userDrafting={userDrafting[0]}/>
        <div className="content">
          <div className="regions">
            {this.props.regions.map((region, index) => <Region {...this.props} key={index} i={index} region={region} currentUser={currentUser[0]} canDraft={canDraft}/>)}
          </div>
          <div className="sidebar">
            <ChoiceSubmit {...this.props} currentUser={currentUser[0]} selectedCountry={selectedCountry}/>
            <CountryList {...this.props} currentUser={currentUser[0]} />
            <ChoiceList {...this.props} currentUser={currentUser[0]}/>
          </div>
        </div>
      </div>
    )
  }
}