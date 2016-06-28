import React from 'react'
import ReactDOM from 'react-dom'

import EventPanelEdit from './EventPanelEdit'
import EventPanelInfo from './EventPanelInfo'
import PanelButtons from '../panel/PanelButtons'

export default class EventPanelItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.event.name,
      goldWinners: this.props.event.gold
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

  handleGoldSelectChange(event, key) {
    this.setState({goldWinners: event.target.value})
  }

  handleItemSave() {
    const panel = ReactDOM.findDOMNode(this)
    // Gold Values
    const goldSelects = Array.from(panel.getElementsByClassName('goldSelect'))
    let goldValues = goldSelects.map(select => {
      return select.value
    })
    goldValues = (goldValues.filter( Boolean )) // Used to remove undefined elements
    // Silver Values
    const silverSelects = Array.from(panel.getElementsByClassName('silverSelect'))
    let silverValues = silverSelects.map(select => {
      return select.value
    })
   silverValues = (silverValues.filter( Boolean )) // Used to remove undefined elements
    // Bronze Values
    const bronzeSelects = Array.from(panel.getElementsByClassName('bronzeSelect'))
    let bronzeValues = bronzeSelects.map(select => {
      return select.value
    })
    bronzeValues = (bronzeValues.filter( Boolean )) // Used to remove undefined elements
    this.props.editEvent(
      this.props.event._id, 
      {name: this.state.inputValue, gold: goldValues, silver: silverValues, bronze: bronzeValues}
    )
  }

  render() {
    const { event } = this.props
    const goldCountries = event.gold.map(country => {
      return this.findCountry(country)
    })
    const silverCountries = event.silver.map(country => {
      return this.findCountry(country)
    })
    const bronzeCountries = event.bronze.map(country => {
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
          silverCountries={silverCountries}
          bronzeCountries={bronzeCountries}
        />
      )
    } else {
      return (
        <EventPanelInfo 
          {...this.props}
          event={event} 
          goldCountries={goldCountries}
          silverCountries={silverCountries}
          bronzeCountries={bronzeCountries}
        />
      )
    }
  }
}