import React from 'react'

import PaymentForm from './PaymentForm'

export default class StatusBar extends React.Component {
  render() {
    const { currentUser, settings } = this.props
    if (currentUser._id) {
      if (!currentUser.hasPaid) {
        return (
          <div className="status-bar payment-needed">
            <PaymentForm {...this.props} />
          </div>
        )
      }
      return (
        <div className={`status-bar ${settings.loginSuccess ? "success" : ""}`}>
          <div className="status">
            <p>Welcome, {currentUser.name}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className={`status-bar ${settings.loginError ? "error" : ""}`}>
          <div className="status">
            <p>Email not found. Please try again.</p>
          </div>
        </div>
      )
    }
  }
}