import React from 'react'
import classNames from 'classnames'

import CountryItem from './CountryItem'
import Flag from './Flag'
import UserCountryPoints from './UserCountryPoints'

require('../css/leaderboard.sass')

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      leaderboardOpen: null
    }
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

  showUserInfo(info, alternateInfo) {
    if (!this.props.settings.draftStarted && this.props.draftComplete) {
      return info
    } else {
      return alternateInfo
    }
  }

  openLeaderboard(index) {
    if (index === this.state.leaderboardOpen) {
      this.setState({
        leaderboardOpen: null
      })
    } else {
      this.setState({
        leaderboardOpen: index
      })
    }
  }

  findMedals(users) {
    let medals = {
      gold: users[0].points,
      silver: 0,
      bronze: 0
    }
    let place = 1
    let previousPoints = medals.gold
    users.map(user => {
      if (place <= 3) {
        if (user.points !== previousPoints) {
          previousPoints = user.points
          place = place + 1
          if (place === 2) {
            medals.silver = user.points
          } else if (place === 3) {
            medals.bronze = user.points
          }
        }
      }
    })
    return medals
  }

  render() {
    const { currentUser, settings, draftComplete } = this.props
    const users = this.props.paidUsers.map((user, index) => {
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

    const userMedals = this.findMedals(sortedUsers)

    let previousPoints = sortedUsers[0].points
    let place = 1

    const renderUsers = sortedUsers.map((user, index) => {

      if (user.points !== previousPoints) {
        place = place + 1
        previousPoints = user.points
      }

      const renderClasses = classNames({
        'gold': place === 1,
        'silver': place === 2,
        'bronze': place === 3 
      })

      const userClass = classNames({
        'user': (!settings.draftStarted && draftComplete) && (user._id === currentUser._id)
      })

      return (
        <li className={this.state.leaderboardOpen === index ? "open" : ""} key={index}>
          <div className={`leaderboard-content ${userClass}`} onClick={this.openLeaderboard.bind(this, index)}>
            <div className="name-rank">
              <span className={`rank ${renderClasses}`}>{place}</span>
              <span className="name">{this.showUserInfo(user.name, "No Data")}</span>
            </div>
            <span className="points">{user.points}</span>
          </div>
          <div className="user-details">
            <div className="points-back">
              <p><span className="gold"></span>{user.points - userMedals.gold > 0 ? "+" : ""}{user.points - userMedals.gold}</p>
              <p><span className="silver"></span>{user.points - userMedals.silver > 0 ? "+" : ""}{user.points - userMedals.silver}</p>
              <p><span className="bronze"></span>{user.points - userMedals.bronze > 0 ? "+" : ""}{user.points - userMedals.bronze}</p>
            </div>
            {this.state.leaderboardOpen === index ? <UserCountryPoints {...this.props} userId={user._id} /> : null}
          </div>
        </li>
      )
    })

    if (currentUser._id) {
      const { currentUser } = this.props
      let renderCountries = []

      const userCountries = this.findUserCountries(currentUser._id)
      if (userCountries.length > 0) {
        const summedCountries = userCountries.map((country, index) => {
          return this.sumCountry(country)
        })
        const sortedCountries = this.sortByPoints(summedCountries)
        renderCountries = sortedCountries.map((country, index) => {
          return (
            <li key={index}>
              <div className="leaderboard-content">
                <div className="name-rank">
                  <span className="rank">{index + 1}</span>
                  <span className="name"><Flag country={country}/>{country.name}</span>
                </div>
                <span className="points">{country.points}</span>
              </div>
            </li>
          )
        })
      } else {
        renderCountries.push(
          <li key={0}>
            <div className="leaderboard-content">
              <span className="no-drafts">No Countries Drafted</span>
            </div>
          </li>
        )
      }

      return (
        <div className="leaderboards-wrapper">
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
              {renderUsers}
            </ul>
          </div>
          <div className="user-countries">
            <h2>Your Countries</h2>
            <ul>
              {renderCountries}
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <div className="leaderboards-wrapper">
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
              {renderUsers}
            </ul>
          </div>
        </div>
      )
    }
  }
}