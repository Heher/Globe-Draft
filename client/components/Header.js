import React from 'react'

import Login from './Login'
import Logout from './Logout'
import ChangeUser from './ChangeUser'

require('../css/header.sass')

export default class Header extends React.Component {

  render() {
    const { currentUser, dataStatus } = this.props

    if (currentUser._id) {
      const { userDrafting, canDraft } = this.props

      return (
        <header>
          <h1>Fantasy World Games</h1>
          <h2>Welcome {currentUser.name}!{canDraft ? " Your turn to draft." : ""}</h2>
          <Logout {...this.props} />
        </header>
      )
    } else {
      return (
        <header>
          <h1>Fantasy World Games</h1>
          <h2>Please Sign In</h2>
          <Login {...this.props} />
        </header>
      )
    }
  }

}