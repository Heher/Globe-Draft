import React from 'react'

export default class CancelEdit extends React.Component {
  constructor(props) {
    super(props)
  }

  handleCancelButton(item) {
    switch(this.props.type) {
      case "User" :
        this.props.setEditingUser(item._id)
        break
      case "Event" :
        this.props.deleteEvent(item._id)
        break
      case "Region" :
        this.props.setEditingRegion(item._id)
        break
      case "Country" :
        this.props.setEditingCountry(item._id)
        break
      default :
        return
    }
  }

  render() {
    const { item } = this.props

    return (
      <button className="cancel-button" onClick={this.handleCancelButton.bind(this, item)}>CANCEL</button>
    )
  }
}