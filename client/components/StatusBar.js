import React from 'react'

import PaymentForm from './PaymentForm'

export default function StatusBar(props) {
  const { currentUser, settings, statuses } = props

  // if (currentUser._id) {
  //   if (!currentUser.hasPaid) {
  //     return (
  //       <div className="status-bar payment-needed">
  //         <PaymentForm {...props} />
  //       </div>
  //     )
  //   }
  //   return (
  //     <div className={`status-bar ${settings.loginSuccess ? 'success' : ''}`}>
  //       <div className="status">
  //         <p>Welcome, {currentUser.name}</p>
  //       </div>
  //     </div>
  //   )
  // }

  if (statuses.length > 0) {
    const renderStatuses = statuses.map((status, index) => {
      return (
        <div key={index} className={`status ${status.statusType}`}>
          <p>{status.text}</p>
        </div>
      )
    })
    return (
      <div className="status-bar show">
        {renderStatuses}
      </div>
    )
  }

  return (
    <div className={`status-bar ${settings.loginError ? 'error' : ''}`}>
      <div className="status">
        <p>{settings.loginErrorCopy}</p>
      </div>
    </div>
  )
}

StatusBar.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  settings: React.PropTypes.object.isRequired
}
