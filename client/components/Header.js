import React from 'react'

import ChangeUser from './ChangeUser'

require('../css/header.sass')

export default class Header extends React.Component {

  render() {
    const { canDraft, currentUser, userDrafting } = this.props

    if (currentUser && userDrafting) {
      return (
        <header>
          <h2>{canDraft ? `It's your turn, ${currentUser.name}. Please choose a country.` : `${userDrafting.name} is drafting. Please wait.`}</h2>
          <ChangeUser {...this.props} />
        </header>
      )
    } else {
      return (
        <header>
          <h2>Draft Order Not Set</h2>
          <ChangeUser {...this.props} />
        </header>
      )
    }
  }

}