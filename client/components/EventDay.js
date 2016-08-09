import React from 'react'
import moment from 'moment'

import Event from './Event'
import EventIcon from './icons/EventIcon'

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

  renderPlayerOfDay(events) {
    let topPlayer = {
      name: "",
      points: 0
    }
    this.props.paidUsers.map((user, index) => {
      const userCountries = this.findUserCountries(user._id)
      let userCountrySum = 0
      userCountries.map(country => {
        const summedCountry = this.sumCountry(country, events)
        userCountrySum = userCountrySum + country.points
      })
      if (userCountrySum > topPlayer.points) {
        topPlayer.name = user.name
        topPlayer.points = userCountrySum
      }
    })
    if (topPlayer.points > 0) {
      return (
        <div className="player-of-day">
          <span className="title">Player of the Day</span>
          <p className="player">{topPlayer.name} <span>{topPlayer.points}</span></p>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    const sortedEvents = this.sortEvents(this.props.eventGroup)
    const events = sortedEvents.map((event, index) => {
      return <Event {...this.props} key={index} event={event} />
    })

    return (
      <div className={`event-day ${this.state.showEvents ? "show" : "hide"}`}>
        <div className="day-title">
          <div className="header">
            <h2 onClick={this.toggleEvents.bind(this)}>{this.convertDate(this.props.title)}</h2>
            {this.showToggle()}
          </div>
          {this.renderPlayerOfDay(this.props.eventGroup)}
        </div>
        {events}
      </div>
    )
  }
}