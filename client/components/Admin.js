import React from "react"
import { Link } from 'react-router'

import AddItemField from './admin/AddItemField'
import DraftUser from './admin/DraftUser'
import DeleteItem from './admin/DeleteItem'

require('../css/admin.sass')

export default class Admin extends React.Component {

  constructor(props) {
    super(props)
  }

  handleDraftSave() {
    let draftOrders = []
    this.props.users.map(user => {
      draftOrders.push({id: user._id, draftNum: user.draftNum})
    })
    return this.props.saveDraftOrder.bind(this, draftOrders)
  }

  render() {
    const editingDraft = this.props.settings.editingDraftOrder
    const draftUsers = this.props.users.map((user, index) => {
      return <DraftUser {...this.props} key={index} user={user} editingDraft={editingDraft} />
    })
    const deleteUsers = this.props.users.map((user, index) => {
      return <DeleteItem {...this.props} key={index} item={user} type="User" />
    })

    const events = this.props.events.map((event, index) => {
      return event.name
    })
    const deleteEvents = this.props.events.map((event, index) => {
      return <DeleteItem {...this.props} key={index} item={event} type="Event" />
    })

    return (
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <h2>Users</h2>
        <div className="admin-section">
          <div>
            <div className="panel add-user">
              <AddItemField {...this.props} type="User" />
            </div>
          </div>
          <div className="panel edit-draft">
            <h4>Draft Order:</h4>
            {draftUsers}
            <button onClick={this.handleDraftSave()}>SAVE</button>
          </div>
          <div className="panel delete-user">
            <h4>Delete User:</h4>
            {deleteUsers}
          </div>
        </div>
        <h2>Events</h2>
        <div className="admin-section">
          <div>
            <div className="panel add-user">
              <AddItemField {...this.props} type="Event" />
            </div>
          </div>
          <div className="panel delete-user">
            <h4>Delete Event:</h4>
            {deleteEvents}
          </div>
        </div>
        <Link to='/countries'>Countries</Link>
      </div>
    );
  }
}