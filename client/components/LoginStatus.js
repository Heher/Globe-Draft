import React from 'react'

export default class LoginStatus extends React.Component {
  render() {
    const { currentUser, settings } = this.props
    if (currentUser._id) {
      return (
        <div className={`login-status ${settings.loginSuccess ? "success" : ""}`}>
          <p>Welcome, {currentUser.name}</p>
        </div>
      )
    } else {
      return (
        <div className={`login-status ${settings.loginError ? "error" : ""}`}>
          <p>Email not found. Please try again.</p>
        </div>
      )
    }
  }
}