import React from 'react'
import moment from 'moment'
import _ from 'underscore'

import EventDay from './EventDay'
import EventLink from './EventLink'
import Leaderboard from './Leaderboard'

export default class Events extends React.Component {
  
  groupEventsByDay(events) {
    return _.groupBy(events, (event) => {
      const convertedDateTime = moment(event.datetime, "YYYY-MM-DDTHH:mm:ss.sssZ").format("YYYY-MM-DD")
      return convertedDateTime
    })
  }

  sortByDay(eventDays) {
    if (eventDays.length > 1) {
      return eventDays.sort(function(a, b) {
        if(a.day < b.day) return -1
        if(a.day > b.day) return 1
        return 0
      })
    } else {
      return eventDays
    }
  }

  render() {
    const { dataStatus, params } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived) {
      
      let eventDays = []
      let dateLinks = []

      const groupedEvents = this.groupEventsByDay(this.props.events)
      const groupedEventsArray = []
      for (let day in groupedEvents) {
        groupedEventsArray.push({"day": day, "events": groupedEvents[day]})
      }
      const sortedEvents = this.sortByDay(groupedEventsArray)

      if (params.day) {
        dateLinks.push(<EventLink key={0} {...this.props} mainLink="events" />)
        eventDays.push(<EventDay key={params.day} {...this.props} title={params.day} eventGroup={groupedEvents[params.day]} />)
        sortedEvents.map((day, index) => {
          dateLinks.push(<EventLink key={index + 1} {...this.props} day={day.day} mainLink="events" />)
        })
      } else {
        dateLinks.push(<EventLink key={0} {...this.props} mainLink="events"/>)
        sortedEvents.map((day, index) => {
          eventDays.push(<EventDay key={index + 1} {...this.props} title={day.day} eventGroup={day.events} />)
          dateLinks.push(<EventLink key={index + 1} {...this.props} day={day.day} mainLink="events" />)
        })
      }

      return (
        <div className="events-wrapper">
          <div className="date-links">
            {dateLinks}
          </div>
          <div className="events-content">
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