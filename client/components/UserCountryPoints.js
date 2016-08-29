import React from 'react'
import { Link } from 'react-router'

import Flag from './Flag'

import { spacesToDashes } from '../utilities/format'

export default class UserCountryPoints extends React.Component {
  findUserCountries(userId) {
    return this.props.countries.filter(country => country.userId === userId)
  }

  sumCountry(country) {
    let sum = 0
    const newCountry = country
    this.props.events.forEach(event => {
      event.gold.forEach(gold => {
        if (gold.id === country._id) {
          sum = sum + gold.points
        }
      })
      event.silver.forEach(silver => {
        if (silver.id === country._id) {
          sum = sum + silver.points
        }
      })
      event.bronze.forEach(bronze => {
        if (bronze.id === country._id) {
          sum = sum + bronze.points
        }
      })
    })
    newCountry.points = sum
    return newCountry
  }

  sortByPoints(countries) {
    if (countries.length) {
      return countries.sort((a, b) => {
        if (a.points < b.points) return 1
        if (a.points > b.points) return -1
        return 0
      })
    }
    return null
  }

  render() {
    const { userId } = this.props
    let renderCountries = []

    const userCountries = this.findUserCountries(userId)
    if (userCountries.length > 0) {
      const summedCountries = userCountries.map(country => this.sumCountry(country))
      const sortedCountries = this.sortByPoints(summedCountries)
      renderCountries = sortedCountries.map((country, index) => {
        return (
          <li key={index}>
            <div className="user-country-content">
              <Link to={`/events/${spacesToDashes(country.name)}`}>
                <div className="name-rank">
                  <span className="rank">{index + 1}</span>
                  <Flag country={country} />
                  <div className="country-name">
                    {country.name}
                    <span className="round">Round {country.round}</span>
                  </div>
                </div>
                <span className="points">{country.points}</span>
              </Link>
            </div>
          </li>
        )
      })
      return (
        <ul>
          {renderCountries}
        </ul>
      )
    }
    renderCountries.push(
      <li key={0}>
        <div className="user-country-content">
          <span className="no-drafts">No Countries Drafted</span>
        </div>
      </li>
    )
    return (
      <ul>
        {renderCountries}
      </ul>
    )
  }
}
