import React from 'react'
import classNames from 'classnames'

import PanelButtons from '../panel/PanelButtons'
import EditItem from '../panel/buttons/EditItem'

import Flag from '../../Flag'
import Avatar from '../../Avatar'

export default class EventPanelInfo extends React.Component {

  renderWinners(countries) {
    if (countries.length > 0) {
      return countries.map((country, index) => {
        const settingsClasses = classNames({
          'good': country._id === this.props.settings.goodCountry,
          'bad': country._id === this.props.settings.badCountry,
          'taken': country.userId
        })
        return (
          <div key={index} className={`winner ${settingsClasses}`}>
            <div className="winner-name">
              <span className="medal ">{country.points}</span>
              <Flag country={country}/>
              <p>
                {country.name}
                {country.userId ? <Avatar {...this.props} userId={country.userId}/> : null}
              </p>
            </div>
          </div>
        )
      })
    } else {
      return (
        <div key={0} className="winner">
          <div className="winner-name">
            <span className="medal">&nbsp;</span>
            <p>
              Not Set
            </p>
          </div>
        </div>
      )// &nbsp needed for flexbox to correctly align
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
      <div className="event-section">
        <div className="title">
          <h4>{event.name}</h4>
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