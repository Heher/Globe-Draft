import React from 'react'

import Login from './Login'
import Logout from './Logout'
import ChangeUser from './ChangeUser'

require('../css/header.sass')

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  renderDraftStatus(draftStarted, canDraft) {
    if (draftStarted) {
      if (canDraft) {
        return "Your turn to draft."
      } else {
        return "Another player is drafting. Please wait."
      }
    } else {
      return ""
    }
  }

  render() {
    const { currentUser, dataStatus, settings } = this.props

    if (currentUser._id) {
      const { userDrafting, canDraft } = this.props

      return (
        <header>
          <div className="header-content">
            <h1>Fantasy World Games</h1>
            <h2>{this.renderDraftStatus(settings.draftStarted, canDraft)}</h2>
            <Logout {...this.props} />
          </div>
        </header>
      )
    } else {
      return (
        <header>
          <div className="header-content">
            <h1>Fantasy World Games</h1>
            <h2>Please Sign In</h2>
            <Login {...this.props} />
          </div>
        </header>
      )
    }
  }

}