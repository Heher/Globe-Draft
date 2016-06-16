import React from 'react'

export default class AddItemField extends React.Component {
  constructor(props) {
    super(props)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const input = event.target.getElementsByTagName('input')[0]
    let value = input.value
    switch(this.props.type) {
      case "User" :
        this.props.addUser(value)
        break
      case "Event" :
        this.props.addEvent(value)
        break
      default :
        return
    }
    input.value = ""
  }

  render() {
    return (
      <form onSubmit={event => this.handleFormSubmit(event)}>
        <h4>Add {this.props.type}:</h4>
        <input type="text" />
        <button type="submit">SUBMIT</button>
      </form>
    )
  }
}