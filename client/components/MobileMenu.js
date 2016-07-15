import React from 'react'
import { Link } from 'react-router'

import Logout from './Logout'

export default class MobileMenu extends React.Component {
  render() {
    const { settings, currentUser } = this.props

    if (currentUser._id) {
      return (
        <div className={`mobile-menu ${settings.mobileMenuShow ? "show" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/events" onClick={this.props.toggleMobileMenu.bind(this)}>
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link to="/leaderboard" onClick={this.props.toggleMobileMenu.bind(this)}>
                <span>Leaderboard</span>
              </Link>
            </li>
            <li>
              <Link to="/draft" onClick={this.props.toggleMobileMenu.bind(this)}>
                <span>Draft</span>
              </Link>
            </li>
            <li className="sublink">
              <Link to='/draft/overall' activeClassName="active" onClick={this.props.toggleMobileMenu.bind(this)}>
                <span>All Drafts</span>
              </Link>
            </li>
            <li className="sublink">
              <Link to='/draft/picks' activeClassName="active" onClick={this.props.toggleMobileMenu.bind(this)}>
                <span>Your Picks</span>
              </Link>
            </li>
            <li>
              <Logout {...this.props} onClick={this.props.toggleMobileMenu.bind(this)} />
            </li>
          </ul>
        </div>
      )
    } else {
      return (
        <div className={`mobile-menu ${settings.mobileMenuShow ? "show" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/events" onClick={this.props.toggleMobileMenu.bind(this)}>
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link to="/draft" onClick={this.props.toggleMobileMenu.bind(this)}>
                <span>Draft</span>
              </Link>
            </li>
            <li className="sublink">
              <Link to='/draft/overall' activeClassName="active" onClick={this.props.toggleMobileMenu.bind(this)}>
                <span>All Drafts</span>
              </Link>
            </li>
            <li className="sublink">
              <Link to='/draft/picks' activeClassName="active" onClick={this.props.toggleMobileMenu.bind(this)}>
                <span>Your Picks</span>
              </Link>
            </li>
            <li>
              <Link to="/signin" onClick={this.props.toggleMobileMenu.bind(this)}>
                <span>Login / Register</span>
              </Link>
            </li>
          </ul>
        </div>
      )
    }
  }
}