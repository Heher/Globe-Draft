import React from 'react'

import Event from '../Event'

export default class EventStyle extends React.Component {
  constructor(props) {
    super(props)
    this.regularEditingEvent = {
      _id: '980',
      name: 'Event',
      datetime: '2016-08-06T12:30:00.000Z',
      team: false,
      editing: true,
      testing: true,
      handleItemSave: () => {
        console.log("Saved")
      },
      gold: [
        {
          id: '578b1e1192ea42817afbbb0c',
          points: 3
        }
      ],
      silver: [
        {
          id: '578b2ec092ea42817afbbb8b',
          points: 2
        }
      ],
      bronze: [
        {
          id: '578b1a2d92ea42817afbbaee',
          points: 1
        }
      ]
    }
  }

  render() {
    return (
      <div className="event">
        <h1>Event</h1>
        <h2>Regular Event</h2>
        <Event {...this.props} event={this.props.testEvents.regularNoScore} />
        <h2>Editing Event</h2>
        <Event {...this.props} event={this.regularEditingEvent} />
      </div>
    )
  }
}
