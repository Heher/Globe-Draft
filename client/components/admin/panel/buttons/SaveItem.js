import React from 'react'

export default class SaveItem extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSaveButton(item) {
    if (this.props.testing) {
      this.props.testHandleItemSave()
    } else {
      switch(this.props.type) {
        case "User" :
          this.props.handleItemSave()
          break
        case "Event" :
          this.props.handleItemSave(item)
          break
        case "Region" :
          this.props.handleItemSave()
          // this.props.setEditingRegion(item._id)
          break
        case "Country" :
          this.props.handleItemSave()
        default :
          return
      }
    }
  }

  render() {
    const { item } = this.props

    return (
      <button className="save-button" onClick={this.handleSaveButton.bind(this, item)}>SAVE</button>
    )
  }
}