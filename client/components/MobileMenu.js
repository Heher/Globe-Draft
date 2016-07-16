import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import Login from './Login'
import Logout from './Logout'

export default class MobileMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  loginStatus() {

  }

  render() {
    const { settings, currentUser } = this.props

    const loginStatusClasses = classNames({
      'success': settings.loginSuccess,
      'error': settings.loginError
    })

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
}