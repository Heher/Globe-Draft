import React from 'react'
import DateTime from 'react-datetime'

export default class EventAddItemField extends React.Component {
  constructor(props) {
    super(props)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const nameInput = event.target.getElementsByTagName('input')[0]
    const dateInput = event.target.getElementsByClassName('form-control')[0]
    let inputValue = nameInput.value
    let dateValue = dateInput.value
    this.props.addEvent(inputValue, dateValue)
    nameInput.value = ""
  }

  render() {
    return (
      <form onSubmit={event => this.handleFormSubmit(event)}>
        <h4>Add Event:</h4>
        <input type="text" />
        <DateTime timeFormat="HH:mm"/>
        <button type="submit">SUBMIT</button>
      </form>
    )
  }
}