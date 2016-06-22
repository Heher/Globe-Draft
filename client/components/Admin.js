import React from "react"
import { Link } from 'react-router'

import AdminSection from './admin/AdminSection'
import AddItemField from './admin/AddItemField'
import DraftUser from './admin/DraftUser'
import EditEvent from './admin/EditEvent'

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
    // const draftUsers = this.props.users.map((user, index) => {
    //   return <DraftUser {...this.props} key={index} user={user} editingDraft={editingDraft} />
    // })
    // const deleteUsers = this.props.users.map((user, index) => {
    //   return <DeleteItem {...this.props} key={index} item={user} type="User" />
    // })

    const events = this.props.events.map((event, index) => {
      return event.name
    })
    let deleteEvents = []
    let editEvents = []
    // this.props.events.map((event, index) => {
    //   deleteEvents.push(<DeleteItem {...this.props} key={index} item={event} type="Event" />)
    //   editEvents.push(<EditEvent {...this.props} key={index} event={event} />)
    // })

    return (
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <h2>Users</h2>
        <AdminSection {...this.props} type="User" items={this.props.users} />
        <h2>Events</h2>
        <AdminSection {...this.props} type="Event" items={this.props.events} />
        <h2>Regions</h2>
        <AdminSection {...this.props} type="Region" items={this.props.regions} />
        <h2>Countries</h2>
        <AdminSection {...this.props} type="Country" items={this.props.countries} />
        <Link to='/countries'>Countries</Link>
      </div>
    );
  }
}