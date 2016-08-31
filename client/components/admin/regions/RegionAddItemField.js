import React from 'react'

import '../../../css/admin/add_item.sass'

export default class RegionAddItemField extends React.Component {
  constructor(props) {
    super(props)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const input = event.target.getElementsByTagName('input')[0]
    let inputValue = input.value
    this.props.addRegion(inputValue)
    input.value = ""
  }

  render() {
    return (
      <form className="add-item" onSubmit={event => this.handleFormSubmit(event)}>
        <h4>Add Region:</h4>
        <input type="text" />
        <button type="submit">SUBMIT</button>
      </form>
    )
  }
}