import React from 'react'
import _ from 'underscore'

import EventDay from './EventDay'
import Leaderboard from './Leaderboard'

export default class Events extends React.Component {
  
  groupEventsByDay(events) {
    return _.groupBy(events, (event) => {
      return event.datetime.substring(0,10)
    })
  } 

  render() {
    const { dataStatus } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived) {
      
      const groupedEvents = this.groupEventsByDay(this.props.events)
      let eventDays = []
      for (let key in groupedEvents) {
        if (groupedEvents.hasOwnProperty(key)) {
          eventDays.push(<EventDay key={key} {...this.props} title={key} eventGroup={groupedEvents[key]} />)
        }
      }

      return (
        <div className="page">
          <div className="content">
            <div className="events">
              {eventDays}
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