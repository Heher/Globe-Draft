import React from 'react'

import Event from './Event'
import Leaderboard from './Leaderboard'

export default class Events extends React.Component {
  render() {
    const { dataStatus } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived) {
      const events = this.props.events.map((event, index) => {
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