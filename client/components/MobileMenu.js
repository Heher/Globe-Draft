import React from 'react'

export default class MobileMenu extends React.Component {
  render() {
    const { settings } = this.props

    return (
      <div className={`mobile-menu ${settings.mobileMenuShow ? "show" : ""}`}>
        <h1>POOP</h1>
      </div>
    )
  }
}