import React from 'react'

import RegionSelect from './RegionSelect'

export default class AddItemField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {selectValue: ""}
  }

  handleSelectChange(event) {
    this.setState({selectValue: event.target.value})
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const input = event.target.getElementsByTagName('input')[0]
    const select = event.target.getElementsByTagName('select')[0] || ""
    let inputValue = input.value
    let selectValue = select.value
    switch(this.props.type) {
      case "User" :
        this.props.addUser(inputValue)
        break
      case "Event" :
        this.props.addEvent(inputValue)
        break
      case "Region" :
        this.props.addRegion(inputValue)
        break
      case "Country" :
        this.props.addCountry(inputValue, selectValue)
        break
      default :
        return
    }
    input.value = ""
  }

  render() {
    const { type } = this.props
    return (
      <form onSubmit={event => this.handleFormSubmit(event)}>
        <h4>Add {type}:</h4>
        <input type="text" />
        {type === "Country" ? <RegionSelect {...this.props} handleSelectChange={this.handleSelectChange.bind(this)} /> : null}
        <button type="submit">SUBMIT</button>
      </form>
    )
  }
}