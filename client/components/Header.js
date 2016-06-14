import React from 'react'

import ChangeUser from './ChangeUser'

require('../css/header.sass')

export default class Header extends React.Component {

  render() {
    const { canDraft, currentUser, userDrafting } = this.props
    return (
      <header>
        <h2>{canDraft ? `It's your turn, ${currentUser.name}. Please choose a country.` : `${userDrafting.name} is drafting. Please wait.`}</h2>
        <ChangeUser {...this.props} />
      </header>
    )
  }

}