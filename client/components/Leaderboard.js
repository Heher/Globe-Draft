import React from 'react'

import CountryItem from './CountryItem'

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props)
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

  render() {
    const { currentUser } = this.props
    const users = this.props.users.map((user, index) => {
      const userCountries = this.findUserCountries(user._id)
      let userCountrySum = 0
      userCountries.map(country => {
        const summedCountry = this.sumCountry(country)
        userCountrySum = userCountrySum + country.points
      })
      user.points = userCountrySum
      return user
    })

    const sortedUsers = this.sortByPoints(users)
    const renderUsers = sortedUsers.map((user, index) => {
      return <li key={index}>{user.name} - {user.points}</li>
    })

    if (currentUser._id) {
      const { currentUser } = this.props

      const userCountries = this.findUserCountries(currentUser._id)
      const summedCountries = userCountries.map((country, index) => {
        return this.sumCountry(country)
      })
      const sortedCountries = this.sortByPoints(summedCountries)
      const renderCountries = sortedCountries.map((country, index) => {
        return <li key={index}>{country.name} - {country.points}</li>
      })
      return (
        <div>
          <h2>Leaderboard</h2>
          <ul>
            {renderUsers}
          </ul>
          <h2>Your Countries</h2>
          <ul>
            {renderCountries}
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Leaderboard</h2>
          <ul>
            {renderUsers}
          </ul>
        </div>
      )
    }
  }
}