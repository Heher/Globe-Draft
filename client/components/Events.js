import React from 'react'
import _ from 'underscore'

import EventDay from './EventDay'
import EventLink from './EventLink'
import Leaderboard from './Leaderboard'

export default class Events extends React.Component {
  
  groupEventsByDay(events) {
    return _.groupBy(events, (event) => {
      return event.datetime.substring(0,10)
    })
  } 

  render() {
    const { dataStatus, params } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived) {
      
      let eventDays = []
      let dateLinks = []

      const groupedEvents = this.groupEventsByDay(this.props.events)

      if (params.day) {
        if (groupedEvents.hasOwnProperty(params.day)) {
          eventDays.push(<EventDay key={params.day} {...this.props} title={params.day} eventGroup={groupedEvents[params.day]} />)
        }
        dateLinks.push(<EventLink key={0} {...this.props} />)
        for (let key in groupedEvents) {
          if (groupedEvents.hasOwnProperty(key)) {
            dateLinks.push(<EventLink key={key} {...this.props} day={key} />)
          }
        }
      } else {
        dateLinks.push(<EventLink key={0} {...this.props} />)
        for (let key in groupedEvents) {
          if (groupedEvents.hasOwnProperty(key)) {
            eventDays.push(<EventDay key={key} {...this.props} title={key} eventGroup={groupedEvents[key]} />)
            dateLinks.push(<EventLink key={key} {...this.props} day={key} />)
          }
        }
      }

      return (
        <div className="events-wrapper">
          <div className="events-content">
            <div className="events">
              <div className="date-links">
                {dateLinks}
              </div>
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