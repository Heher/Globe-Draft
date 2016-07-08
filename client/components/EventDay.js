import React from 'react'

import Event from './Event'

export default class EventDay extends React.Component {
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

  convertDate(datetime) {
    const date = new Date(datetime)
    const convertedDate = date.toLocaleString(navigator.language, {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric'
    })
    return convertedDate
  }

  render() {
    const sortedEvents = this.sortEvents(this.props.eventGroup)
    const events = sortedEvents.map((event, index) => {
      return <Event {...this.props} key={index} event={event} />
    })

    return (
      <div className="event-day">
        <h2>{this.convertDate(this.props.title)}</h2>
        {events}
      </div>
    )
  }
}