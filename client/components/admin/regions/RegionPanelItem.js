import React from 'react'

import RegionPanelEdit from './RegionPanelEdit'
import RegionPanelInfo from './RegionPanelInfo'
import PanelButtons from '../panel/PanelButtons'

export default class RegionPanelItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.region.name
    }
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  handleItemSave() {
    this.props.editRegion(
      this.props.event._id, 
      {name: this.state.inputValue}
    )
  }

  render() {
    const { region } = this.props

    if (region.editing) {
      return (
        <RegionPanelEdit 
          {...this.props} 
          region={region}
          inputValue={this.state.inputValue}
          handleInputChange={this.handleInputChange.bind(this)}
          handleItemSave={this.handleItemSave.bind(this)}
        />
      )
    } else {
      return (
        <RegionPanelInfo 
          {...this.props}
          region={region}
        />
      )
    }
  }
}