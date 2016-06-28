import React from 'react'
import classNames from 'classnames'

import EventAddItemField from './EventAddItemField'
import EventPanelItem from './EventPanelItem'

export default class EventAdminSection extends React.Component {

  render() {
    const { dataStatus, events } = this.props
    let listItems = []
    if (dataStatus.eventsReceived) {
      listItems = events.map((event, index) => {
        return <EventPanelItem {...this.props} key={index} event={event} />
      })
    } else {
      listItems = null
    }

    const renderClasses = classNames({
      'show': this.props.addingEvent
    })

    return (
      <div>
        <div className={`add-item ${renderClasses}`}>
          <EventAddItemField {...this.props} />
        </div>
        <div className="admin-section">
          {listItems}
        </div>
      </div>
    )
  }
}