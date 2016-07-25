import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import Login from './Login'
import Logout from './Logout'
import ChangeUser from './ChangeUser'
import MobileMenu from './MobileMenu'
import DraftIcon from './icons/DraftIcon'
import HeaderLeaderboard from './HeaderLeaderboard'
import MenuIcon from './icons/MenuIcon'

require('../css/header.sass')

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
      loginButtonShow: false
    }
  }

  toggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  toggleLoginButtons(event) {
    event.preventDefault()
    this.setState({
      loginButtonShow: !this.state.loginButtonShow
    })
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
      const { userDrafting, canDraft, settings } = this.props

      const renderDraftClass = classNames({
        'user-turn': settings.draftStarted && canDraft
      })

      return (
        <header>
          <div className="header-content">
            <div className="menu-button-wrapper" onClick={this.toggleMenu.bind(this)}>
              <MenuIcon 
                {...this.props}
              />
            </div>
            <div className="title">
              <h1>GLOBE DRAFT</h1>
              <ul className={`nav-links ${renderDraftClass}`}>
                <li>
                  <Link to="/events">
                    <span>Events</span>
                  </Link>
                </li>
                <li className="nav-draft">
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
          </div>
          <MobileMenu
            {...this.props}
            showMenu={this.state.showMenu}
            toggle={this.toggleMenu.bind(this)}
            loginButtonShow={this.state.loginButtonShow} 
            toggleLoginButtons={this.toggleLoginButtons.bind(this)}
          />
        </header>
      )
    } else {
      return (
        <header>
          <div className="header-content">
            <div className="menu-button-wrapper" onClick={this.toggleMenu.bind(this)}>
              <MenuIcon 
                {...this.props}
              />
            </div>
            <div className="title">
              <h1>GLOBE DRAFT</h1>
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
                <Login
                  {...this.props}
                  loginButtonShow={this.state.loginButtonShow} 
                  toggleLoginButtons={this.toggleLoginButtons.bind(this)}
                />
              </ul>
            </div>
            <HeaderLeaderboard {...this.props} />
          </div>
          <MobileMenu
            {...this.props}
            showMenu={this.state.showMenu}
            toggle={this.toggleMenu.bind(this)}
            loginButtonShow={this.state.loginButtonShow} 
            toggleLoginButtons={this.toggleLoginButtons.bind(this)}
          />
        </header>
      )
    }
  }

}