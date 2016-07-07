import React from 'react'

import PanelButtons from '../panel/PanelButtons'
import EditItem from '../panel/buttons/EditItem'

export default class EventPanelInfo extends React.Component {
  renderWinners(countries) {
    if (countries.length > 0) {
      return countries.map((country, index) => {
        return <p key={index}><span>{country.points}</span>{country.name}</p>
      })
    } else {
      return <p key={0}><span>&nbsp;</span>Not Set</p> // &nbsp needed for flexbox to correctly align
    }
  }

  convertDate(datetime) {
    const date = new Date(datetime)
    const convertedDate = date.toLocaleString(navigator.language, {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute:'2-digit'
    })
    return convertedDate
  }

  render() {
    const { event, goldCountries, silverCountries, bronzeCountries } = this.props
    return (
      <div className="event">
        <div className="title">
          <h5>{event.name}</h5>
          {event.datetime ? <p>{this.convertDate(event.datetime)}</p> : null}
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