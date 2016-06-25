import React from 'react'

export default class Logout extends React.Component {
  handleLogout(id) {
    localStorage.removeItem('id_token')
    this.props.logoutUser(id)
  }

  render() {
    const { currentUser } = this.props
    return (
      <button onClick={this.handleLogout.bind(this, currentUser._id)}>Logout</button>
    )
  }
}