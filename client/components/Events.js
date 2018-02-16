import React from 'react'
import moment from 'moment'
import { groupBy } from 'underscore'

import EventDay from './EventDay'
import EventLink from './EventLink'
import Leaderboard from './Leaderboard'
import EventAddItemField from './admin/events/EventAddItemField'
import SportLink from './SportLink'

import findByQuery from '../utilities/query'
import { spacesToDashes, dashesToSpaces } from '../utilities/format'

require('../css/events.sass')

export default class Events extends React.Component {
  groupEventsByDay(events) {
    return groupBy(events, (event) => {
      const convertedDateTime = moment(event.datetime, 'YYYY-MM-DDTHH:mm:ss.sssZ').format('YYYY-MM-DD')
      return convertedDateTime
    })
  }

  sortByDay(eventDays) {
    if (eventDays.length > 1) {
      return eventDays.sort((a, b) => {
        if (a.day < b.day) return -1
        if (a.day > b.day) return 1
        return 0
      })
    }
    return eventDays
  }

  findCountryEvents(countryId) {
    const eventList = []
    this.props.events.forEach(event => {
      let found = false
      event.gold.forEach(gold => {
        if (gold.id === countryId) {
          eventList.push(event)
          found = true
        }
      })
      if (!found) {
        event.silver.forEach(silver => {
          if (silver.id === countryId) {
            eventList.push(event)
            found = true
          }
        })
      }
      if (!found) {
        event.bronze.forEach(bronze => {
          if (bronze.id === countryId) {
            eventList.push(event)
          }
        })
      }
    })
    return eventList
  }

  formatEvents(events) {
    // console.log(events)
    const groupedEvents = this.groupEventsByDay(events)
    // console.log(groupedEvents)
    const groupedEventsArray = []
    Object.keys(groupedEvents).forEach(day => {
      groupedEventsArray.push({
        day,
        events: groupedEvents[day]
      })
    })
    const sortedEvents = this.sortByDay(groupedEventsArray)
    return { groupedEvents, sortedEvents }
  }

  render() {
    const { currentUser, dataStatus, params } = this.props

    if (dataStatus.usersReceived && dataStatus.eventsReceived && dataStatus.countriesReceived && dataStatus.regionsReceived && dataStatus.settingsReceived && dataStatus.draftsReceived) {
      let filterType = ''
      let startingEvents = []
      let country = {}

      if (params.filter) {
        if (/[0-9]+-[0-9]+-[0-9]+/.test(params.filter)) {
          filterType = 'day'
        } else if (findByQuery(this.props.sports, params.filter, 'slug')) {
          filterType = 'sport'
        } else {
          filterType = 'country'
        }
      }

      if (filterType === 'sport') {
        const sport = findByQuery(this.props.sports, params.filter, 'slug')
        // console.log(findByQuery(this.props.events, sport._id, 'sportId'))
        startingEvents = this.props.events.filter(event => event.sportId === sport._id)
      } else if (filterType === 'country') {
        const countryName = dashesToSpaces(params.filter)
        country = findByQuery(this.props.countries, countryName, 'name')
        startingEvents = this.findCountryEvents(country._id)
      } else {
        startingEvents = this.props.events
      }

      const eventDays = []
      const dateLinks = []
      const sportLinks = []

      const { sortedEvents } = this.formatEvents(startingEvents)
      const { groupedEvents } = this.formatEvents(this.props.events)
      const allEvents = this.formatEvents(this.props.events).sortedEvents


      if (filterType) {
        if (filterType === 'day') {
          dateLinks.push(<EventLink key={0} {...this.props} mainLink="events" />)
          eventDays.push(<EventDay key={params.filter} {...this.props} title={params.filter} eventGroup={groupedEvents[params.filter]} daySelected={true} />)
          sortedEvents.forEach((day, index) => {
            dateLinks.push(<EventLink key={index + 1} {...this.props} day={day.day} mainLink="events" />)
          })
        } else if (filterType === 'country') {
          dateLinks.push(<EventLink key={0} {...this.props} mainLink="events" />)
          this.props.sports.forEach((sport, index) => {
            sportLinks.push(
              <SportLink key={index} name={sport.name} />
            )
          })
          if (sortedEvents.length > 0) {
            sortedEvents.forEach((day, index) => {
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
          } else {
            eventDays.push(
              <h2 key={0}>No medals</h2>
            )
          }
          allEvents.forEach((day, index) => {
            dateLinks.push(
              <EventLink
                key={index + 1}
                {...this.props}
                day={day.day}
                mainLink="events"
              />
            )
          })
        } else if (filterType === 'sport') {
          dateLinks.push(<EventLink key={0} {...this.props} mainLink="events" />)
          this.props.sports.forEach((sport, index) => {
            sportLinks.push(
              <SportLink key={index} name={sport.name} />
            )
          })
          if (sortedEvents.length > 0) {
            sortedEvents.forEach((day, index) => {
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
          } else {
            eventDays.push(
              <h2 key={0}>No events</h2>
            )
          }
          allEvents.forEach((day, index) => {
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
        dateLinks.push(<EventLink key={0} {...this.props} mainLink="events" />)
        this.props.sports.forEach((sport, index) => {
          sportLinks.push(
            <SportLink key={index} name={sport.name} />
          )
        })
        sortedEvents.forEach((day, index) => {
          eventDays.push(<EventDay key={index + 1} {...this.props} title={day.day} eventGroup={day.events} />)
          dateLinks.push(<EventLink key={index + 1} {...this.props} day={day.day} mainLink="events" />)
        })
      }

      return (
        <div className="events-wrapper">
          <div className="date-links">
            {dateLinks}
          </div>
          <div className="sport-links-container">
            <div className="sport-links">
              {sportLinks}
            </div>
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
    }
    return (
      <h1>Loading</h1>
    )
  }
}

Events.propTypes = {
  events: React.PropTypes.array.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  dataStatus: React.PropTypes.object.isRequired,
  params: React.PropTypes.object,
  countries: React.PropTypes.array.isRequired
}

Events.defaultProps = {
  events: [],
  currentUser: {},
  dataStatus: {},
  countries: []
}
