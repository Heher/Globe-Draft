import React from 'react'

export default class UserAddItemField extends React.Component {
  constructor(props) {
    super(props)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const input = event.target.getElementsByTagName('input')[0]
    let inputValue = input.value
    this.props.addUser(inputValue)
    input.value = ""
  }

  render() {
    const { type } = this.props
    return (
      <form onSubmit={event => this.handleFormSubmit(event)}>
        <h4>Add User:</h4>
        <input type="text" />
        <button type="submit">SUBMIT</button>
      </form>
    )
  }
}