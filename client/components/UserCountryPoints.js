import React from 'react'
import { Link } from 'react-router'

import Flag from './Flag'

import { spacesToDashes } from '../utilities/format'

export default class UserCountryPoints extends React.Component {
  findUserDrafts(userId) {
    return this.props.drafts.filter(draft => draft.userId === userId)
  }

  sumCountry(draft) {
    let sum = 0
    const newCountry = draft.country
    this.props.events.forEach(event => {
      event.gold.forEach(gold => {
        if (gold.id === draft.country._id) {
          sum = sum + gold.points
        }
      })
      event.silver.forEach(silver => {
        if (silver.id === draft.country._id) {
          sum = sum + silver.points
        }
      })
      event.bronze.forEach(bronze => {
        if (bronze.id === draft.country._id) {
          sum = sum + bronze.points
        }
      })
    })
    newCountry.points = sum
    newCountry.round = draft.round
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

    const userDrafts = this.findUserDrafts(userId)
    if (userDrafts.length > 0) {
      const summedCountries = userDrafts.map(draft => this.sumCountry(draft))
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

UserCountryPoints.propTypes = {
  countries: React.PropTypes.array.isRequired,
  events: React.PropTypes.array.isRequired,
  userId: React.PropTypes.string.isRequired
}
