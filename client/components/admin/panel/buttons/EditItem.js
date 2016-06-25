import React from 'react'

export default class EditItem extends React.Component {
  constructor(props) {
    super(props)
  }

  handleEditButton(item) {
    switch(this.props.type) {
      case "User" :
        this.props.setEditingUser(item._id)
        break
      case "Event" :
        this.props.setEditingEvent(item._id)
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
      <button className="edit-button" onClick={this.handleEditButton.bind(this, item)}>EDIT</button>
    )
  }
}