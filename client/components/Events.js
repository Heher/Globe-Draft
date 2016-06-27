import React from 'react'

import Event from './Event'

export default class Events extends React.Component {
  render() {
    const { dataStatus } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived) {
      const events = this.props.events.map((event, index) => {
        return <Event {...this.props} key={index} event={event} />
      })
      return (
        <div>
          <h1>Events</h1>
          {events}
        </div>
      )
    } else {
      return (
        <h1>Loading</h1>
      )
    }
  }
}