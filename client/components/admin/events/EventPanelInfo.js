import React from 'react'

import PanelButtons from '../panel/PanelButtons'
import EditItem from '../panel/buttons/EditItem'

export default class EventPanelInfo extends React.Component {
  renderWinners(countries) {
    if (countries.length > 0) {
      return countries.map((country, index) => {
        return <p key={index}><span>3</span>{country.name}</p>
      })
    } else {
      return <p key={0}><span>&nbsp;</span>Not Set</p> // &nbsp needed for flexbox to correctly align
    }
  }

  render() {
    const { event, goldCountries, silverCountries, bronzeCountries } = this.props
    return (
      <div className="event">
        <div className="title">
          <h5>{event.name}</h5>
          <EditItem {...this.props} item={event} type="Event" />
        </div>
        <div className="medal-winners">
          <div className="golds">
            {this.renderWinners(goldCountries)}
          </div>
          <div className="silvers">
            {this.renderWinners(silverCountries)}
          </div>
          <div className="bronzes">
            {this.renderWinners(bronzeCountries)}
          </div>
        </div>
      </div>
    )
  }
}