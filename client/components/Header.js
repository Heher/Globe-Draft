import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import Login from './Login'
import Logout from './Logout'
import MobileMenu from './MobileMenu'
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
    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleLoginButtons = this.toggleLoginButtons.bind(this)
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
        return 'Your turn to draft.'
      }
      return 'Another player is drafting. Please wait.'
    }
    return ''
  }

  render() {
    const { currentUser, settings } = this.props

    if (currentUser._id) {
      const { canDraft } = this.props

      const renderDraftClass = classNames({
        'user-turn': settings.draftStarted && canDraft
      })

      return (
        <header>
          <div className="header-content">
            <div className="menu-button-wrapper" onClick={this.toggleMenu}>
              <MenuIcon {...this.props} />
            </div>
            <div className="title">
              <h1><Link to="/">GLOBE DRAFT</Link></h1>
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
          </div>
          <HeaderLeaderboard {...this.props} />
          <MobileMenu
            {...this.props}
            showMenu={this.state.showMenu}
            toggle={this.toggleMenu}
            loginButtonShow={this.state.loginButtonShow}
            toggleLoginButtons={this.toggleLoginButtons}
          />
        </header>
      )
    }
    return (
      <header>
        <div className="header-content">
          <div className="menu-button-wrapper" onClick={this.toggleMenu}>
            <MenuIcon {...this.props} />
          </div>
          <div className="title">
            <h1><Link to="/">GLOBE DRAFT</Link></h1>
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
                toggleLoginButtons={this.toggleLoginButtons}
              />
            </ul>
          </div>
        </div>
        <HeaderLeaderboard {...this.props} />
        <MobileMenu
          {...this.props}
          showMenu={this.state.showMenu}
          toggle={this.toggleMenu}
          loginButtonShow={this.state.loginButtonShow}
          toggleLoginButtons={this.toggleLoginButtons}
        />
      </header>
    )
  }
}

Header.propTypes = {
  currentUser: React.PropTypes.object,
  settings: React.PropTypes.object.isRequired,
  canDraft: React.PropTypes.bool.isRequired
}

Header.defaultProps = {
  canDraft: false
}