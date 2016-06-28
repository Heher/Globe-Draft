import React from 'react'

require('../css/events.sass')

export default class Event extends React.Component {
  constructor(props) {
    super(props)
  }

  findCountry(country) {
    return this.props.countries.filter(propCountry => {
      return propCountry._id === country
    })[0]
  }

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
        <h4>{event.name}</h4>
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