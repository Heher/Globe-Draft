import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

import Flag from './Flag'
import Avatar from './Avatar'

require('../css/events.sass')

export default class Event extends React.Component {
  constructor(props) {
    super(props)
  }

  findCountry(country) {
    let foundCountry = this.props.countries.filter(propCountry => {
      return propCountry._id === country.id
    })[0]
    const newCountry = {
      ...foundCountry,
      points: country.points
    }
    return newCountry
  }

  renderWinners(countries) {
    if (countries.length > 0) {
      return countries.map((country, index) => {
        const settingsClasses = classNames({
          'good': country._id === this.props.settings.goodCountry,
          'bad': country._id === this.props.settings.badCountry,
          'taken': country.userId,
          'owned': country.userId === this.props.currentUser._id
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
              No Winner
            </p>
          </div>
        </div>
      )// &nbsp needed for flexbox to correctly align
    }
  }

  convertDate(datetime) {
    return moment(datetime, "YYYY-MM-DD").format("ddd, M/D, h:mm A")
  }

  render() {
    const { event } = this.props

    const goldCountries = event.gold.map((country, index) => {
      return this.findCountry(country)
    })
    const silverCountries = event.silver.map((country, index) => {
      return this.findCountry(country)
    })
    const bronzeCountries = event.bronze.map((country, index) => {
      return this.findCountry(country)
    })

    return (
      <div className="event-section">
        <div className="title">
          <h4>{event.name}</h4>
          {event.datetime ? <p>{this.convertDate(event.datetime)}</p> : null}
          {event.team ? <span className="team-badge">Team</span> : null}
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