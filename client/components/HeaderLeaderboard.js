import React from 'react'
import classNames from 'classnames'

import CountryItem from './CountryItem'

// require('../css/leaderboard.sass')

export default class HeaderLeaderboard extends React.Component {
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
    const { currentUser, dataStatus } = this.props
    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived ) {
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
        if (index < 3) {
          const renderClasses = classNames({
            'gold': index === 0,
            'silver': index === 1,
            'bronze': index === 2 
          })

          const userClass = classNames({
            'user': user._id === currentUser._id
          })

          return (
            <li key={index}>
              <div className={`leaderboard-content ${userClass}`}>
                <div className="name-rank">
                  <span className={`rank ${renderClasses}`}></span>
                  <span className="name">{user.name}</span>
                </div>
              </div>
            </li>
          )
        }
      })

      return (
        <div className="leaderboard">
          <ul>
            {renderUsers}
          </ul>
        </div>
      )
    } else {
      return null
    }
  }
}