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

  showUserInfo(info, alternateInfo) {
    if (!this.props.settings.draftStarted && this.props.draftComplete) {
      return info
    } else {
      return alternateInfo
    }
  }

  findMedals(users) {
    let medals = []
    let rank = 0
    let previousPoints = 0
    users.map(user => {
      if (rank <= 3) {
        if (user.points === previousPoints) {
          medals[rank].players = [
            ...medals[rank].players,
            user
          ]
        } else if (rank < 3) {
          rank = rank + 1
          previousPoints = user.points
          medals[rank] = {
            players: [user],
            points: user.points
          }
        }
      }
    })
    return medals
  }

  renderMedalWinners(players, rank, currentUser) {
    return players.map((player, index) => {
      const userClass = classNames({
        'user': (player._id === currentUser._id)
      })
      return <span key={index + rank} className="name">{player.name}</span>
    })
  }

  render() {
    const { currentUser, dataStatus, settings, draftComplete } = this.props
    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived && (!settings.draftStarted && draftComplete)) {
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
      const medalUsers = this.findMedals(sortedUsers)

      let renderMedals = []
      for (let medal in medalUsers) {
        const renderClasses = classNames({
          'gold': medal === "1",
          'silver': medal === "2",
          'bronze': medal === "3" 
        })
        renderMedals.push(
          <li key={medal}>
            <div className="leaderboard-content">
              <div className="name-rank">
                <span className={`rank ${renderClasses}`}>{medalUsers[medal].points}</span>
                <div className="names">
                  {this.renderMedalWinners(medalUsers[medal].players, medal, currentUser)}
                </div>
              </div>
            </div>
          </li>
        )
      }

      return (
        <div className="leaderboard header-leaderboard">
          <ul>
            {renderMedals}
          </ul>
        </div>
      )
    } else {
      return null
    }
  }
}