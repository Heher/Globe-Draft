import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import Login from './Login'
import Logout from './Logout'

require('../css/mobile_draft_menu.sass')

export default function MobileMenu(props) {
  const { settings, currentUser, canDraft, showMenu } = props

  const renderDraftClass = classNames({
    'user-turn': settings.draftStarted && canDraft
  })

  if (currentUser._id) {
    return (
      <div className={`mobile-menu ${showMenu ? 'show' : ''}`}>
        <ul className={`nav-links ${renderDraftClass}`}>
          <li>
            <Link to="/events" onClick={() => props.toggle()}>
              <span>Events</span>
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" onClick={() => props.toggle()}>
              <span>Leaderboard</span>
            </Link>
          </li>
          <li>
            <Link className="nav-draft" to="/draft" onClick={() => props.toggle()}>
              <span>Draft</span>
            </Link>
          </li>
          <li className="sublink">
            <Link to="/draft/overall" activeClassName="active" onClick={() => props.toggle()}>
              <span>All Drafts</span>
            </Link>
          </li>
          <li className="sublink">
            <Link to="/draft/picks" activeClassName="active" onClick={() => props.toggle()}>
              <span>Your Picks</span>
            </Link>
          </li>
          <li>
            <Logout {...props} onClick={() => props.toggle()} />
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className={`mobile-menu ${showMenu ? 'show' : ''}`}>
      <ul className="nav-links">
        <li>
          <Link to="/events" onClick={() => props.toggle()}>
            <span>Events</span>
          </Link>
        </li>
        <li>
          <Link to="/draft" onClick={() => props.toggle()}>
            <span>Draft</span>
          </Link>
        </li>
        <li className="sublink">
          <Link to="/draft/overall" activeClassName="active" onClick={() => props.toggle()}>
            <span>All Drafts</span>
          </Link>
        </li>
        <li className="sublink">
          <Link to="/draft/picks" activeClassName="active" onClick={() => props.toggle()}>
            <span>Your Picks</span>
          </Link>
        </li>
        <Login
          {...props}
          loginButtonShow={props.loginButtonShow}
          toggleLoginButtons={() => props.toggleLoginButtons()}
        />
      </ul>
    </div>
  )
}

MobileMenu.propTypes = {
  toggle: React.PropTypes.func.isRequired,
  loginButtonShow: React.PropTypes.bool.isRequired,
  toggleLoginButtons: React.PropTypes.func.isRequired
}
