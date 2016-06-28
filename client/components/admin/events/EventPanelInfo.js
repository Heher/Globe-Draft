import React from 'react'

import PanelButtons from '../panel/PanelButtons'

export default class EventPanelInfo extends React.Component {
  renderWinners(countries) {
    return countries.map((country, index) => {
      if (country) {
        return <p key={index}>{country.name}</p>
      } else {
        return <p key={index}>Not Set</p>
      }
    })
  }

  render() {
    const { event, goldCountries, silverCountries, bronzeCountries } = this.props
    return (
      <div className="panel">
        <p>{event.name}</p>
        <p>Gold:</p>
        {this.renderWinners(goldCountries)}
        <p>Silver:</p>
        {this.renderWinners(silverCountries)}
        <p>Bronze:</p>
        {this.renderWinners(bronzeCountries)}
        <PanelButtons {...this.props} item={event} type="Event" editing={event.editing} />
      </div>
    )
  }
}