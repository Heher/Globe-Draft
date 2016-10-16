import React from 'react'

import Event from '../Event'

const testRegularUser = {
  name: 'Test User',
  isAdmin: false
}

const testAdminUser = {
  name: 'Admin User',
  isAdmin: true
}

export default function EventStyle(props) {
  return (
    <div className="event">
      <h2>Regular Event</h2>
      <Event {...props} event={props.testEvents.regularNoScore} currentUser={testRegularUser} />
      <h2>Editing Event</h2>
      <Event {...props} event={props.testEvents.editing} handleItemSave={props.testEditEvent} currentUser={testAdminUser} />
    </div>
  )
}
