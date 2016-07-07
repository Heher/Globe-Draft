import React from 'react'

import Event from './Event'
import Leaderboard from './Leaderboard'

export default class Events extends React.Component {
  sortEvents(events) {
    if (events.length) {
      return events.sort(function(a, b) {
        if(a.datetime < b.datetime) return -1
        if(a.datetime > b.datetime) return 1
        return 0
      })
    } else {
      return null
    }
  }

  render() {
    const { dataStatus } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived) {
      const sortedEvents = this.sortEvents(this.props.events)
      const events = sortedEvents.map((event, index) => {
        return <Event {...this.props} key={index} event={event} />
      })
      return (
        <div className="page">
          <div className="content">
            <div className="events">
              <h1>Events</h1>
              {events}
            </div>
            <div className="sidebar">
              <Leaderboard {...this.props} />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <h1>Loading</h1>
      )
    }
  }
}