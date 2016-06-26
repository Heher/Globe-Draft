import React from 'react'

import EventPanelEdit from './EventPanelEdit'
import EventPanelInfo from './EventPanelInfo'
import PanelButtons from '../panel/PanelButtons'

export default class EventPanelItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.event.name
    }
  }

  findCountry(country) {
    return this.props.countries.filter(propCountry => {
      return propCountry._id === country
    })[0]
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  handleGoldSelectChange(event) {
    this.setState({goldSelectValue: event.target.value})
  }

  handleItemSave() {
    this.props.editEvent(this.props.event._id, {name: this.state.inputValue, gold:['5768a1bd257b63a2357a8393']})
  }

  render() {
    const { event } = this.props
    const goldCountries = event.gold.map(country => {
      return this.findCountry(country)
    })

    if (event.editing) {
      return (
        <EventPanelEdit 
          {...this.props} 
          event={event}
          inputValue={this.state.inputValue}
          handleInputChange={this.handleInputChange.bind(this)}
          handleItemSave={this.handleItemSave.bind(this)}
          goldCountries={goldCountries}
        />
      )
    } else {
      return (
        <EventPanelInfo {...this.props} event={event} goldCountries={goldCountries} />
      )
    }
  }
}