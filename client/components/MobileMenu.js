import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import Login from './Login'
import Logout from './Logout'

require('../css/mobile_draft_menu.sass')

export default class MobileMenu extends React.Component {
  render() {
    const { settings, currentUser, canDraft, showMenu } = this.props

    const renderDraftClass = classNames({
      'user-turn': settings.draftStarted && canDraft
    })

    if (currentUser._id) {
      return (
        <div className={`mobile-menu ${showMenu ? 'show' : ''}`}>
          <ul className={`nav-links ${renderDraftClass}`}>
            <li>
              <Link to="/events" onClick={this.props.toggle.bind(this)}>
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link to="/leaderboard" onClick={this.props.toggle.bind(this)}>
                <span>Leaderboard</span>
              </Link>
            </li>
            <li>
              <Link className="nav-draft" to="/draft" onClick={this.props.toggle.bind(this)}>
                <span>Draft</span>
              </Link>
            </li>
            <li className="sublink">
              <Link to="/draft/overall" activeClassName="active" onClick={this.props.toggle.bind(this)}>
                <span>All Drafts</span>
              </Link>
            </li>
            <li className="sublink">
              <Link to="/draft/picks" activeClassName="active" onClick={this.props.toggle.bind(this)}>
                <span>Your Picks</span>
              </Link>
            </li>
            <li>
              <Logout {...this.props} onClick={this.props.toggle.bind(this)} />
            </li>
          </ul>
        </div>
      )
    }
    return (
      <div className={`mobile-menu ${showMenu ? 'show' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link to="/events" onClick={this.props.toggle.bind(this)}>
              <span>Events</span>
            </Link>
          </li>
          <li>
            <Link to="/draft" onClick={this.props.toggle.bind(this)}>
              <span>Draft</span>
            </Link>
          </li>
          <li className="sublink">
            <Link to="/draft/overall" activeClassName="active" onClick={this.props.toggle.bind(this)}>
              <span>All Drafts</span>
            </Link>
          </li>
          <li className="sublink">
            <Link to="/draft/picks" activeClassName="active" onClick={this.props.toggle.bind(this)}>
              <span>Your Picks</span>
            </Link>
          </li>
          <Login
            {...this.props}
            loginButtonShow={this.props.loginButtonShow}
            toggleLoginButtons={this.props.toggleLoginButtons.bind(this)}
          />
        </ul>
      </div>
    )
  }
}
