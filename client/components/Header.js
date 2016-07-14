import React from 'react'
import { Link } from 'react-router'

import Login from './Login'
import Logout from './Logout'
import ChangeUser from './ChangeUser'
import MobileMenu from './MobileMenu'
import EventsIcon from './icons/EventsIcon'
import DraftIcon from './icons/DraftIcon'
import HeaderLeaderboard from './HeaderLeaderboard'
import MenuIcon from './icons/MenuIcon'

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
            <MenuIcon {...this.props} />
            <div className="title">
              <h1>GLOBE.DRAFT</h1>
              <ul className="nav-links">
                <li>
                  <Link to="/events">
                    <span>Events</span>
                  </Link>
                </li>
                <li>
                  <Link to="/draft">
                    <span>Draft</span>
                  </Link>
                </li>
                <li>
                  <Logout {...this.props} />
                </li>
              </ul>
            </div>
            <HeaderLeaderboard {...this.props} />
            <h2>{this.renderDraftStatus(settings.draftStarted, canDraft)}</h2>
          </div>
          <MobileMenu {...this.props} />
        </header>
      )
    } else {
      return (
        <header>
          <div className="header-content">
            <div className="title">
              <h1>GLOBE.DRAFT</h1>
              <ul className="nav-links">
                <li>
                  <Link to="/events">
                    <span>Events</span>
                  </Link>
                </li>
                <li>
                  <Link to="/draft">
                    <span>Draft</span>
                  </Link>
                </li>
                <li>
                  <Link to="/signin">
                    <span>Login / Register</span>
                  </Link>
                </li>
              </ul>
            </div>
            <HeaderLeaderboard {...this.props} />
          </div>
        </header>
      )
    }
  }

}