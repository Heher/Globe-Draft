import React from 'react'

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
    return (
      <div className="admin-section">
        <div>
          <div className="panel add-item">
            <EventAddItemField {...this.props} />
          </div>
        </div>
        {listItems}
      </div>
    )
  }
}