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

  render() {
    const { event } = this.props

    const goldCountries = event.gold.map((country, index) => {
      const goldCountry = this.findCountry(country)
      return <p key={index}>{goldCountry.name}</p>
    })
    const silverCountries = event.silver.map((country, index) => {
      const silverCountry = this.findCountry(country)
      return <p key={index}>{silverCountry.name}</p>
    })
    const bronzeCountries = event.bronze.map((country, index) => {
      const bronzeCountry = this.findCountry(country)
      return <p key={index}>{bronzeCountry.name}</p>
    })

    return (
      <div className="event-section">
        <h4>{event.name}</h4>
        <div className="medal-winners">
          <div className="golds">
            {goldCountries}
          </div>
          <div className="silvers">
            {silverCountries}
          </div>
          <div className="bronzes">
            {bronzeCountries}
          </div>
        </div>
      </div>
    )
  }
}