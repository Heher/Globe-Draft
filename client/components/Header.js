import React from 'react'

import ChangeUser from './ChangeUser'

require('../css/header.sass')

export default class Header extends React.Component {

  render() {
    return (
      <header>
        <h2>{this.props.canDraft ? `It's your turn, ${this.props.currentUser.name}. Please choose a country.` : `${this.props.userDrafting.name} is drafting. Please wait.`}</h2>
        <ChangeUser {...this.props} />
      </header>
    )
  }

}