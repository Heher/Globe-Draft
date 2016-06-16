import React from 'react'

export default class EditEvent extends React.Component {
  constructor(props) {
    super(props)
  }

  handleEditButton(id) {
    const payload = {
      gold: [1]
    }
    this.props.editEvent(id, payload)
  }

  render() {
    const { event } = this.props

    return (
      <div>
        <p>{event.name}</p>
        <button className="edit-button" onClick={this.handleEditButton.bind(this, event._id)}>EDIT</button>
      </div>
    )
  }
}