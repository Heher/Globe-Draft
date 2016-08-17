import React from 'react'
import moment from 'moment'

import { findByQuery } from '../utilities/query'

import Event from './Event'
import EventIcon from './icons/EventIcon'
import Flag from './Flag'

export default class EventDay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEvents: true
    }
  }

  showToggle() {
    if (!this.props.daySelected) {
      return (
        <EventIcon 
          {...this.props}
          toggle={this.toggleEvents.bind(this)} 
        />
      )
    } else {
      return null
    }
  }

  toggleEvents() {
    this.setState({
      showEvents: !this.state.showEvents
    })
  }

  sortEvents(events) {
    if (events.length) {
      return events.sort(function(a, b) {
        if(a.datetime < b.datetime) return -1
        if(a.datetime > b.datetime) return 1
        if(a.datetime === b.datetime) {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        }
      })
    } else {
      return null
    }
  }

  convertDate(datetime) {
    return moment(datetime, "YYYY-MM-DD").format("ddd, M/D")
  }

  findUserCountries(userId) {
    return this.props.countries.filter(country => {
      return country.userId === userId
    })
  }

  sumCountry(country, events) {
    let sum = 0
    events.map(event => {
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

  sortByPoints(users) {
    if (users.length) {
      return users.sort(function(a, b) {
        if(a.points < b.points) return 1
        if(a.points > b.points) return -1
        return 0
      })
    } else {
      return null
    }
  }

  renderPlayerOfDay(events) {
    const users = this.props.paidUsers.map((user, index) => {
      const userCountries = this.findUserCountries(user._id)
      let userCountrySum = 0
      userCountries.map(country => {
        const summedCountry = this.sumCountry(country, events)
        userCountrySum = userCountrySum + country.points
      })
      user.points = userCountrySum
      return user
    })
    const sortedUsers = this.sortByPoints(users)

    let topPlayer = []
    const topPoints = sortedUsers[0].points

    sortedUsers.map(user => {
      if (user.points === topPoints) {
        topPlayer.push(user.name)
      }
    })
    if (topPoints > 0) {
      const players = topPlayer.map((player, index) => {
        return <p key={index} className="player">{player} <span className="points">{topPoints}</span></p>
      })
      if (topPlayer.length > 1) {
        return (
          <div className="player-of-day">
            <span className="title">Players of the Day</span>
            {players}
          </div>
        )
      } else {
        return (
          <div className="player-of-day">
            <span className="title">Player of the Day</span>
            {players}
          </div>
        )
      }
    } else {
      return null
    }
  }

  renderCountryOfDay(events) {
    const countryList = this.props.countries.map((country, index) => {
      const countryPoints = this.sumCountry(country, events)
      if (country.points > 0 && country.name !== "United States" && country.name !== "China") {
        // console.log(countryPoints)
        return country
      }
    })
    const sortedCountries = this.sortByPoints(countryList).filter(Boolean)

    if (sortedCountries.length > 0) {
      let topCountry = []
      const topPoints = sortedCountries[0].points

      sortedCountries.map(country => {
        if (country.points === topPoints) {
          topCountry.push(country)
        }
      })

      if (topPoints > 0) {
        const countries = topCountry.map((country, index) => {
          return (
            <div key={index} className="country">
              <div className="country-name">
                <Flag country={country} />
                <div className="country-info">
                  <span>{country.name}</span>
                  <span className="user">{country.userId ? findByQuery(this.props.paidUsers, country.userId, "_id").name : null}</span>
                </div>
                <span className="points">{topPoints}</span>
              </div>
            </div>
          )
        })
        if (topCountry.length > 1) {
          return (
            <div className="country-of-day">
              <span className="title">Countries of the Day</span>
              {countries}
            </div>
          )
        } else {
          return (
            <div className="country-of-day">
              <span className="title">Country of the Day</span>
              {countries}
            </div>
          )
        }
      } else {
        return null
      }
    } else {
      return null
    }
  }

  renderCountryTotal(events, country) {
    let sum = 0
    events.map(event => {
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
    return (
      <div className="player-of-day">
        <p className="player"><Flag country={country} />{country.name} <span className="points">{sum}</span></p>
      </div>
    )
  }

  render() {
    const sortedEvents = this.sortEvents(this.props.eventGroup)
    const events = sortedEvents.map((event, index) => {
      return <Event {...this.props} key={index} event={event} country={this.props.country ? this.props.country._id: null}/>
    })

    return (
      <div className={`event-day ${this.state.showEvents ? "show" : "hide"}`}>
        <div className="day-title">
          <div className="header">
            <h2 onClick={this.toggleEvents.bind(this)}>{this.convertDate(this.props.title)}</h2>
            {this.showToggle()}
          </div>
          {this.props.filterType === "country" ? this.renderCountryTotal(sortedEvents, this.props.country) : this.renderPlayerOfDay(this.props.eventGroup)}
          {this.props.filterType === "country" ? null : this.renderCountryOfDay(this.props.eventGroup)}
        </div>
        {events}
      </div>
    )
  }
}