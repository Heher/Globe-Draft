import React from 'react'
import classNames from 'classnames'

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
      return countries.sort((a, b) => {
        if (a.points < b.points) return 1
        if (a.points > b.points) return -1
        return 0
      })
    }
    return null
  }

  findUserCountries(userId) {
    return this.props.countries.filter(country => country.userId === userId)
  }

  sumCountryMedals(medalList, country) {
    return medalList.filter(eventMedal => eventMedal.id === country._id).reduce((medalSum, medal) => {
      return medal.points
    }, 0)
  }

  sumCountry(country) {
    const reducedSum = this.props.events.reduce((sum, event) => {
      const golds = this.sumCountryMedals(event.gold, country)
      const silvers = this.sumCountryMedals(event.silver, country)
      const bronzes = this.sumCountryMedals(event.bronze, country)

      return sum + (golds + silvers + bronzes)
    }, 0)

    const newCountry = country
    newCountry.points = reducedSum
    return newCountry

    // let sum = 0
    // const newCountry = country
    // this.props.events.forEach(event => {
    //   event.gold.forEach(gold => {
    //     if (gold.id === country._id) {
    //       sum = sum + gold.points
    //     }
    //   })
    //   event.silver.forEach(silver => {
    //     if (silver.id === country._id) {
    //       sum = sum + silver.points
    //     }
    //   })
    //   event.bronze.forEach(bronze => {
    //     if (bronze.id === country._id) {
    //       sum = sum + bronze.points
    //     }
    //   })
    // })
    // newCountry.points = sum
    // return newCountry
  }

  showUserInfo(info, alternateInfo) {
    if (!this.props.settings.draftStarted && this.props.draftComplete) {
      return info
    }
    return alternateInfo
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
    const medals = {
      gold: users[0].points,
      silver: 0,
      bronze: 0
    }
    let place = 1
    let previousPoints = medals.gold
    users.forEach(user => {
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
    const users = this.props.paidUsers.map(user => {
      const userCountries = this.findUserCountries(user._id)
      const newUser = user
      let userCountrySum = 0
      userCountries.forEach(country => {
        const summedCountry = this.sumCountry(country)
        userCountrySum = userCountrySum + summedCountry.points
      })
      newUser.points = userCountrySum
      return newUser
    })

    const sortedUsers = this.sortByPoints(users)

    const userMedals = this.findMedals(sortedUsers)

    let previousPoints = 0
    let place = 0
    let showRank = true

    const renderUsers = sortedUsers.map((user, index) => {
      if (user.points !== previousPoints) {
        place = place + 1
        showRank = true
      } else {
        showRank = false
      }

      previousPoints = user.points

      const renderClasses = classNames({
        gold: place === 1,
        silver: place === 2,
        bronze: place === 3
      })

      const userClass = classNames({
        user: (!settings.draftStarted && draftComplete) && (user._id === currentUser._id),
        tie: !showRank
      })

      return (
        <li className={this.state.leaderboardOpen === index ? 'open' : ''} key={index}>
          <div className={`leaderboard-content ${userClass}`} onClick={this.openLeaderboard.bind(this, index)}>
            <div className="name-rank">
              {showRank ? <span className={`rank ${renderClasses}`}>{place}</span> : null}
              <span className="name">{this.showUserInfo(user.name, 'No Data')}</span>
            </div>
            <span className="points">{user.points}</span>
          </div>
          <div className="user-details">
            <div className="points-back">
              <p><span className="gold" />{user.points - userMedals.gold > 0 ? '+' : ''}{user.points - userMedals.gold}</p>
              <p><span className="silver" />{user.points - userMedals.silver > 0 ? '+' : ''}{user.points - userMedals.silver}</p>
              <p><span className="bronze" />{user.points - userMedals.bronze > 0 ? '+' : ''}{user.points - userMedals.bronze}</p>
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
        const summedCountries = userCountries.map(country => this.sumCountry(country))
        const sortedCountries = this.sortByPoints(summedCountries)
        renderCountries = sortedCountries.map((country, index) => {
          return (
            <li key={index}>
              <div className="leaderboard-content">
                <div className="name-rank">
                  <span className="rank">{index + 1}</span>
                  <span className="name"><Flag country={country} />{country.name}</span>
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
    }
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
