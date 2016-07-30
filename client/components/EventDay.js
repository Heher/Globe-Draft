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

  render() {
    const sortedEvents = this.sortEvents(this.props.eventGroup)
    const events = sortedEvents.map((event, index) => {
      return <Event {...this.props} key={index} event={event} />
    })

    return (
      <div className={`event-day ${this.state.showEvents ? "show" : "hide"}`}>
        <div className="title">
          <h2 onClick={this.toggleEvents.bind(this)}>{this.convertDate(this.props.title)}</h2>
          {this.showToggle()}
        </div>
        {events}
      </div>
    )
  }
}