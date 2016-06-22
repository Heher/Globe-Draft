import React from 'react'

import PanelEdit from './PanelEdit'
import PanelInfo from './PanelInfo'
import PanelButtons from './PanelButtons'

export default class PanelItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {inputValue: this.props.item.name}
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  handleItemSave() {
    console.log("Saving")
    // this.props.editCountry(this.props.item._id, {name: this.state.inputValue})
  }

  render() {
    const { item, type } = this.props

    if (item.editing) {
      return (
        <PanelEdit 
          {...this.props} 
          item={item}
          type="Country"
          inputValue={this.state.inputValue}
          handleInputChange={this.handleInputChange.bind(this)}
          handleItemSave={this.handleItemSave.bind(this)}
        />
      )
    } else {
      return (
        <PanelInfo {...this.props} item={item} type={type} />
      )
    }
  }
}