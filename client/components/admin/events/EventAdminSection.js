import React from 'react'
import moment from 'moment'
import _ from 'underscore'
import classNames from 'classnames'

import EventAddItemField from './EventAddItemField'
import EventPanelItem from './EventPanelItem'
import EventAdminSectionDay from "./EventAdminSectionDay"

import EventLink from '../../EventLink'

require('../../../css/admin/events/event_section.sass')

export default class EventAdminSection extends React.Component {

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
    const { dataStatus, events, params } = this.props
    let listItems = []
    let dateLinks = []

    if (dataStatus.eventsReceived) {
      const groupedEvents = this.groupEventsByDay(events)
      const groupedEventsArray = []
      for (let day in groupedEvents) {
        groupedEventsArray.push({"day": day, "events": groupedEvents[day]})
      }
      const sortedEvents = this.sortByDay(groupedEventsArray)

      if (params.day) {
        dateLinks.push(<EventLink key={0} {...this.props} mainLink="admin/events" />)
        listItems.push(<EventAdminSectionDay key={params.day} {...this.props} title={params.day} eventGroup={groupedEvents[params.day]} />)
        sortedEvents.map((day, index) => {
          dateLinks.push(<EventLink key={index + 1} {...this.props} day={day.day} mainLink="admin/events" />)
        })
      } else {
        dateLinks.push(<EventLink key={0} {...this.props} mainLink="admin/events"/>)
        sortedEvents.map((day, index) => {
          dateLinks.push(<EventLink key={index + 1} {...this.props} day={day.day} mainLink="admin/events"/>)
          listItems.push(<EventAdminSectionDay key={index + 1} {...this.props} title={day.day} eventGroup={day.events} />)
        })
      }
    } else {
      listItems = null
    }

    return (
      <div className="admin-event">
        <div className="add-item">
          <EventAddItemField {...this.props} />
        </div>
        <div className="date-links">
          {dateLinks}
        </div>
        <div className="events-section">
          {listItems}
        </div>
      </div>
    )
  }
}