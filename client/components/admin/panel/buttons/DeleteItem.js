import React from 'react'

export default class DeleteItem extends React.Component {
  constructor(props) {
    super(props)
  }

  handleDeleteButton(item) {
    switch(this.props.type) {
      case "User" :
        this.props.deleteUser(item._id)
        break
      case "Event" :
        this.props.deleteEvent(item._id)
        break
      case "Region" :
        this.props.deleteRegion(item._id)
        break
      case "Country" :
        this.props.deleteCountry(item._id)
        break
      default :
        return
    }
  }

  render() {
    const { item } = this.props

    return (
      <button className="delete-button" onClick={this.handleDeleteButton.bind(this, item)}>DELETE</button>
    )
  }
}