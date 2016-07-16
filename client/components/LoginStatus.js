import React from 'react'

export default class LoginStatus extends React.Component {
  render() {
    const { currentUser, settings } = this.props
    if (currentUser._id) {
      return (
        <div className={`login-status ${settings.loginSuccess ? "success" : ""}`}>
          <div className="login-status-copy">
            <p>Welcome, {currentUser.name}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className={`login-status ${settings.loginError ? "error" : ""}`}>
          <div className="login-status-copy">
            <p>Email not found. Please try again.</p>
          </div>
        </div>
      )
    }
  }
}