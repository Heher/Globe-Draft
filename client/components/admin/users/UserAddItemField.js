import React from 'react'

export default class UserAddItemField extends React.Component {
  constructor(props) {
    super(props)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const input = event.target.getElementsByTagName('input')[0]
    const checkbox = event.target.getElementsByTagName('input')[1]
    let inputValue = input.value
    let isAdmin = checkbox.checked
    // console.log(isAdmin)
    this.props.addUser(inputValue, isAdmin)
    input.value = ""
  }

  render() {
    const { type } = this.props
    return (
      <form onSubmit={event => this.handleFormSubmit(event)}>
        <h4>Add User:</h4>
        <input type="text" />
        <p>Make Admin:</p>
        <input
          type="checkbox"
        />
        <button type="submit">SUBMIT</button>
      </form>
    )
  }
}