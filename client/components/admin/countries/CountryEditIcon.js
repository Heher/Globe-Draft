import React from 'react'

export default class CountryEditIcon extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(country) {
    this.props.setEditingCountry(country._id)
  }

  render() {
    const { country } = this.props

    return (
      <svg onClick={this.handleClick.bind(this, country)} viewBox="0 0 50 50">
        <path d="M-4318.6-68.4c-43.2 0-78.4 35.2-78.4 78.4 0 43.3 35.2 78.4 78.4 78.4s78.4-35.2 78.4-78.4C-4240.1-33.2-4275.3-68.4-4318.6-68.4zM-4318.9-35.2c13.7 0 24.8 11.1 24.8 24.8 0 13.7-11.1 24.8-24.8 24.8 -13.7 0-24.8-11.1-24.8-24.8C-4343.6-24.1-4332.5-35.2-4318.9-35.2zM-4274.7 65.1c-12 9.6-27.3 15.4-43.9 15.4 -16.6 0-31.8-5.7-43.8-15.4 1.1-19.9 14.2-39.9 30.2-39.9h27.3c16 0 29.1 19.3 30.2 39.2 0 0 0 0 0 0S-4274.7 64.8-4274.7 65.1z"/>
        <rect x="22.5" y="15.2" transform="matrix(0.7444 0.6677 -0.6677 0.7444 25.2784 -10.8496)" width="8.5" height="24.8"/>
        <polyline points="13.1 42.9 20.6 40.9 14.2 35.2 13.1 42.9 "/>
        <rect x="33.1" y="14.2" transform="matrix(0.7445 0.6677 -0.6677 0.7445 20.0919 -20.9498)" width="8.5" height="3.1"/>
        <text y="69.7">  Created by Nicolas Morand</text>
        <text y="74.7">  from the Noun Project</text>
      </svg>
    )
  }
}