import React from 'react'

import Event from './Event'

export default class Events extends React.Component {
  render() {
    const events = this.props.events.map((event, index) => {
      return <Event key={index} event={event} />
    })
    return (
      <div>
        <h1>Events</h1>
        {events}
      </div>
    )
  }
}