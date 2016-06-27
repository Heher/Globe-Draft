import React from 'react'

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
      <div>
        <p>{event.name}</p>
        <p>Gold:</p>
        {goldCountries}
        <p>Silver:</p>
        {silverCountries}
        <p>Bronze:</p>
        {bronzeCountries}
      </div>
    )
  }
}