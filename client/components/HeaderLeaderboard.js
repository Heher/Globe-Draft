import React from 'react'
import classNames from 'classnames'

export default class HeaderLeaderboard extends React.Component {
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

  findMedals(users, currentUser) {
    const medals = []
    let rank = 0
    let previousPoints = 0
    users.forEach(user => {
      if (rank <= 3) {
        if (user.points === previousPoints) {
          medals[rank].isUser = currentUser._id === user._id
          medals[rank].players = [
            ...medals[rank].players,
            user
          ]
        } else if (rank < 3) {
          rank = rank + 1
          previousPoints = user.points
          medals[rank] = {
            players: [user],
            points: user.points,
            isUser: currentUser._id === user._id
          }
        }
      }
    })
    return medals
  }

  renderMedalWinners(players, rank) {
    return players.map((player, index) => <span key={index + rank} className="name">{player.name}</span>)
  }

  render() {
    const { currentUser, dataStatus, settings, draftComplete } = this.props
    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived && dataStatus.draftsReceived && (!settings.draftStarted && draftComplete)) {
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
      const medalUsers = this.findMedals(sortedUsers, currentUser)

      const renderMedals = []
      Object.keys(medalUsers).forEach(medal => {
        const renderClasses = classNames({
          gold: medal === '1',
          silver: medal === '2',
          bronze: medal === '3'
        })
        const userClass = classNames({
          user: medalUsers[medal].isUser
        })
        renderMedals.push(
          <li key={medal}>
            <div className={`leaderboard-content ${userClass}`}>
              <div className="name-rank">
                <span className={`rank ${renderClasses}`}>{medalUsers[medal].points}</span>
                <div className="names">
                  {this.renderMedalWinners(medalUsers[medal].players, medal)}
                </div>
              </div>
            </div>
          </li>
        )
      })

      return (
        <div className="leaderboard header-leaderboard">
          <ul>
            {renderMedals}
          </ul>
        </div>
      )
    }
    return null
  }
}

HeaderLeaderboard.propTypes = {
  countries: React.PropTypes.array.isRequired,
  events: React.PropTypes.array.isRequired,
  settings: React.PropTypes.object.isRequired,
  draftComplete: React.PropTypes.bool.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  dataStatus: React.PropTypes.object.isRequired,
  paidUsers: React.PropTypes.array.isRequired
}

HeaderLeaderboard.defaultProps = {
  draftComplete: false,
  paidUsers: []
}
