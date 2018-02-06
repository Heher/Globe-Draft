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
    this.findUserCountries = this.findUserCountries.bind(this)
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

  // Finds all countries owned by a supplied userId
  findUserCountries(userId) {
    return (
      this.props.drafts.filter(draft => draft.userId === userId).map((draft) => {
        return draft.country
      })
    )
  }

  // Takes in an array of medalTypes (gold, silver, or bronze) from an event
  // and a specific country. Then outputs a sum of that country's points from
  // that country and medalType.
  sumCountryMedals(medalList, country) {
    return medalList
      .filter(eventMedal => eventMedal.id === country._id)
      .reduce((medalSum, medal) => medalSum + medal.points, 0)
  }

  // Takes in a specific country and outputs that country's total points
  // across all events.
  sumCountry(country) {
    const reducedSum = this.props.events.reduce((sum, event) => (
      sum + (
        this.sumCountryMedals(event.gold, country) +
        this.sumCountryMedals(event.silver, country) +
        this.sumCountryMedals(event.bronze, country))
    ), 0)

    return {
      ...country,
      points: reducedSum
    }
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
          <div
            className={`leaderboard-content ${userClass}`}
            onClick={() => this.openLeaderboard(index)}
          >
            <div className="name-rank">
              {showRank ? <span className={`rank ${renderClasses}`}>{place}</span> : null}
              <span className="name">{this.showUserInfo(user.name, 'No Data')}</span>
            </div>
            <span className="points">{user.points}</span>
          </div>
          <div className="user-details">
            <div className="points-back">
              <p>
                <span className="gold" />
                {user.points - userMedals.gold > 0 ? '+' : ''}{user.points - userMedals.gold}
              </p>
              <p>
                <span className="silver" />
                {user.points - userMedals.silver > 0 ? '+' : ''}{user.points - userMedals.silver}
              </p>
              <p>
                <span className="bronze" />
                {user.points - userMedals.bronze > 0 ? '+' : ''}{user.points - userMedals.bronze}
              </p>
            </div>
            {this.state.leaderboardOpen === index ? <UserCountryPoints {...this.props} userId={user._id} findUserCountries={this.findUserCountries}/> : null}
          </div>
        </li>
      )
    })

    if (currentUser._id) {
      let renderCountries = []

      const userCountries = this.findUserCountries(currentUser._id)
      if (userCountries.length > 0) {
        const summedCountries = userCountries.map(country => this.sumCountry(country))
        const sortedCountries = this.sortByPoints(summedCountries)
        renderCountries = sortedCountries.map((country, index) => (
          <li key={index}>
            <div className="leaderboard-content">
              <div className="name-rank">
                <span className="rank">{index + 1}</span>
                <span className="name"><Flag country={country} />{country.name}</span>
              </div>
              <span className="points">{country.points}</span>
            </div>
          </li>
        ))
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

Leaderboard.propTypes = {
  countries: React.PropTypes.array.isRequired,
  events: React.PropTypes.array.isRequired,
  settings: React.PropTypes.object.isRequired,
  draftComplete: React.PropTypes.bool.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  paidUsers: React.PropTypes.array.isRequired
}

Leaderboard.defaultProps = {
  countries: [],
  events: [],
  settings: {},
  draftComplete: false,
  currentUser: {},
  paidUsers: []
}
