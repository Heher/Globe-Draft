import React from 'react'
import { Link } from 'react-router'

export default class Logout extends React.Component {
  handleLogout(event, id) {
    localStorage.removeItem('id_token')
    this.props.logoutUser(id)
    this.props.toggleMobileMenu()
  }

  render() {
    const { currentUser } = this.props
    return (
      <Link to="/" onClick={this.handleLogout.bind(this, currentUser._id)}>
        <span>Log Out</span>
      </Link>
    )
  }
}