import React from 'react'

import PanelButtons from '../panel/PanelButtons'

export default class EventPanelInfo extends React.Component {
  renderWinners(countries) {
    return countries.map((country, index) => {
      return <p key={index}>{country.name}</p>
    })
  }

  render() {
    const { event, goldCountries, silverCountries } = this.props

    return (
      <div className="panel">
        <p>{event.name}</p>
        <p>Gold:</p>
        {goldCountries.length > 0 ? this.renderWinners(goldCountries) : null}
        <p>Silver:</p>
        {silverCountries.length > 0 ? this.renderWinners(silverCountries) : null}
        <PanelButtons {...this.props} item={event} type="Event" editing={event.editing} />
      </div>
    )
  }
}