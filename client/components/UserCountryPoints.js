import React from 'react'
import { Link } from 'react-router'

import Flag from './Flag'

import { spacesToDashes } from '../utilities/format'

export default class UserCountryPoints extends React.Component {
  findUserCountries(userId) {
    return this.props.countries.filter(country => {
      return country.userId === userId
    })
  }

  sumCountry(country) {
    let sum = 0
    this.props.events.map(event => {
      event.gold.map(gold => {
        if (gold.id === country._id) {
          sum = sum + gold.points
        }
      })
      event.silver.map(silver => {
        if (silver.id === country._id) {
          sum = sum + silver.points
        }
      })
      event.bronze.map(bronze => {
        if (bronze.id === country._id) {
          sum = sum + bronze.points
        }
      })
    })
    country.points = sum
    return country
  }

  sortByPoints(countries) {
    if (countries.length) {
      return countries.sort(function(a, b) {
        if(a.points < b.points) return 1
        if(a.points > b.points) return -1
        return 0
      })
    } else {
      return null
    }
  }

  render() {
    const { userId } = this.props
    let renderCountries = []

    const userCountries = this.findUserCountries(userId)
    if (userCountries.length > 0) {
      const summedCountries = userCountries.map((country, index) => {
        return this.sumCountry(country)
      })
      const sortedCountries = this.sortByPoints(summedCountries)
      renderCountries = sortedCountries.map((country, index) => {
        return (
          <li key={index}>
            <div className="user-country-content">
              <Link to={`/events/${spacesToDashes(country.name)}`}>
              <div className="name-rank">
                <span className="rank">{index + 1}</span>
                <span className="name"><Flag country={country}/>{country.name}</span>
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
    } else {
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
}