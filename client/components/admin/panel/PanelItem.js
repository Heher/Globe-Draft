import React from 'react'

import PanelEdit from './PanelEdit'
import PanelInfo from './PanelInfo'
import PanelButtons from './PanelButtons'

export default class PanelItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.item.name,
      selectValue: this.props.item.regionId || null,
      goldSelectValue: this.props.item.gold || null,
      silverSelectValue: this.props.item.silver || null,
      bronzeSelectValue: this.props.item.bronze || null
    }
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  handleGoldSelectChange(event) {
    this.setState({goldSelectValue: event.target.value})
  }

  handleSilverSelectChange(event) {
    this.setState({silverSelectValue: event.target.value})
  }

  handleBronzeSelectChange(event) {
    this.setState({bronzeSelectValue: event.target.value})
  }

  handleRegionSelectChange(event) {
    this.setState({selectValue: event.target.value})
  }

  handleItemSave() {
    switch (this.props.type) {
      case "User" :
        this.props.editUser(this.props.item._id, {name: this.state.inputValue})
        break

      case "Event" :
        this.props.editEvent(this.props.item._id, {
          name: this.state.inputValue,
          gold: this.state.goldSelectValue,
          silver: this.state.silverSelectValue,
          bronze: this.state.bronzeSelectValue
        })
        break

      case "Region" :
        this.props.editRegion(this.props.item._id, {name: this.state.inputValue})
        break

      case "Country" :
        this.props.editCountry(this.props.item._id, {
          name: this.state.inputValue,
          regionId: this.state.selectValue
        })
        break

      default :
        return
    }
  }

  render() {
    const { item, type } = this.props
    console.log(item)

    if (item.editing) {
      return (
        <PanelEdit 
          {...this.props} 
          item={item}
          type={type}
          inputValue={this.state.inputValue}
          selectValue={this.state.selectValue}
          handleInputChange={this.handleInputChange.bind(this)}
          handleSelectChange={this.handleSelectChange.bind(this)}
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