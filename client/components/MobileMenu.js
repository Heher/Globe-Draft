import React from 'react'
import { Link } from 'react-router'

import Logout from './Logout'

export default class MobileMenu extends React.Component {
  render() {
    const { settings } = this.props

    return (
      <div className={`mobile-menu ${settings.mobileMenuShow ? "show" : ""}`}>
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
          <li className="sublink">
            <Link to='/draft/overall' activeClassName="active">
              <span>All Drafts</span>
            </Link>
          </li>
          <li className="sublink">
            <Link to='/draft/picks' activeClassName="active">
              <span>Your Picks</span>
            </Link>
          </li>
          <li>
            <Logout {...this.props} />
          </li>
        </ul>
      </div>
    )
  }
}