import React from 'react'
import moment from 'moment'
import _ from 'underscore'

import EventDay from './EventDay'
import EventLink from './EventLink'
import Leaderboard from './Leaderboard'
import EventAddItemField from './admin/events/EventAddItemField'

import { findByQuery } from '../utilities/query'
import { dashesToSpaces } from '../utilities/format'

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

  findCountryEvents(countryId) {
    let eventList = []
    this.props.events.map(event => {
      let found = false
      event.gold.map(gold => {
        if (gold.id === countryId) {
          eventList.push(event)
          found = true
        }
      })
      if (!found) {
        event.silver.map(silver => {
          if (silver.id === countryId) {
            eventList.push(event)
            found = true
          }
        })
      }
      if (!found) {
        event.bronze.map(bronze => {
          if (bronze.id === countryId) {
            eventList.push(event)
          }
        })
      }
    })
    return eventList
  }

  formatEvents(events) {
    const groupedEvents = this.groupEventsByDay(events)
    const groupedEventsArray = []
    for (let day in groupedEvents) {
      groupedEventsArray.push({"day": day, "events": groupedEvents[day]})
    }
    const sortedEvents = this.sortByDay(groupedEventsArray)
    return { groupedEvents, sortedEvents }
  }

  render() {
    const { currentUser, dataStatus, params } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived) {
      
      let filterType = ''
      let startingEvents = []
      let country = {}

      if (params.filter) {
        if (/[0-9]+-[0-9]+-[0-9]+/.test(params.filter)) {
          filterType = "day"
        } else {
          filterType = "country"
        }
      }

      if (filterType === "country") {
        const countryName = dashesToSpaces(params.filter)
        country = findByQuery(this.props.countries, countryName, "name")
        startingEvents = this.findCountryEvents(country._id)
      } else {
        startingEvents = this.props.events
      }

      let eventDays = []
      let dateLinks = []

      const { sortedEvents } = this.formatEvents(startingEvents)
      const { groupedEvents } = this.formatEvents(this.props.events)
      const allEvents = this.formatEvents(this.props.events).sortedEvents


      if (filterType) {
        if (filterType === "day") {
          dateLinks.push(<EventLink key={0} {...this.props} mainLink="events" />)
          eventDays.push(<EventDay key={params.filter} {...this.props} title={params.filter} eventGroup={groupedEvents[params.filter]} daySelected={true} />)
          sortedEvents.map((day, index) => {
            dateLinks.push(<EventLink key={index + 1} {...this.props} day={day.day} mainLink="events" />)
          })
        } else if (filterType === "country") {
          dateLinks.push(<EventLink key={0} {...this.props} mainLink="events"/>)
          sortedEvents.map((day, index) => {
            eventDays.push(
              <EventDay 
                key={index + 1} 
                {...this.props}
                title={day.day}
                eventGroup={day.events}
                filterType={filterType}
                country={country}
              />
            )
          })
          allEvents.map((day, index) => {
            dateLinks.push(
              <EventLink 
                key={index + 1}
                {...this.props}
                day={day.day} 
                mainLink="events" 
              />
            )
          })
        }
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
          {currentUser.isAdmin ? <EventAddItemField {...this.props} /> : null}
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