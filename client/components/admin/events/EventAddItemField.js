import React from 'react'
import DateTime from 'react-datetime'

require('../../../css/admin/events/add_event.sass')

export default class EventAddItemField extends React.Component {

  handleFormSubmit(event) {
    event.preventDefault()
    const nameInput = event.target.getElementsByTagName('input')[0]
    const dateInput = event.target.getElementsByClassName('form-control')[0]
    const inputValue = nameInput.value
    const dateValue = dateInput.value
    this.props.addEvent(inputValue, dateValue)
    nameInput.value = ''
  }

  render() {
    return (
      <form onSubmit={event => this.handleFormSubmit(event)}>
        <h4>Add Event:</h4>
        <input type="text" />
        <DateTime timeFormat="HH:mm" />
        <button type="submit">Submit</button>
      </form>
    )
  }
}
