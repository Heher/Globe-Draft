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
      goldWinners: this.props.event.gold,
      checkboxValue: this.props.event.team
    }
  }

  findCountry(country) {
    let foundCountry = this.props.countries.filter(propCountry => {
      return propCountry._id === country.id
    })[0]
    const newCountry= {
      ...foundCountry,
      points: country.points
    }
    return newCountry
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  handleCheckboxChange(event) {
    this.setState({checkboxValue: event.target.checked})
  }

  handleGoldSelectChange(event, key) {
    this.setState({goldWinners: event.target.value})
  }

  handleDateChange(event) {
    this.setState({dateValue: event.target.value})
  }

  findSpecialCountry(countryType, scores) {
    let foundCountry
    if (countryType === "good") {
      foundCountry = scores.filter(score => {
        return score === this.props.settings.goodCountry
      })
    } else {
      foundCountry = scores.filter(score => {
        return score === this.props.settings.badCountry
      })
    }
    return foundCountry.length ? true : false
  }

  setMultiplier(type, eventSettings) {
    let multiplier = 1
    switch (type) {
      case "gold" :
        if (eventSettings.goodCountry.silver || eventSettings.goodCountry.bronze) {
          multiplier = multiplier * 0.5
        }
        if (eventSettings.badCountry.silver || eventSettings.badCountry.bronze) {
          multiplier = multiplier * 2
        }
        break

      case "silver" :
        if (eventSettings.goodCountry.bronze) {
          multiplier = multiplier * 0.5
        }
        if (eventSettings.badCountry.gold) {
          multiplier = multiplier * 0.5
        }
        if (eventSettings.goodCountry.gold) {
          multiplier = multiplier * 2
        }
        if (eventSettings.badCountry.bronze) {
          multiplier = multiplier * 2
        }
        break

      case "bronze" :
        if (eventSettings.goodCountry.gold || eventSettings.goodCountry.silver) {
          multiplier = multiplier * 2
        }
        if (eventSettings.badCountry.gold || eventSettings.badCountry.silver) {
          multiplier = multiplier * 0.5
        }
        break
    }
    return multiplier
  }

  scoreEvent(scores) {
    let teamMultiplier = scores.team ? 2 : 1
    let eventSettings = {
      goodCountry: {
        gold: this.findSpecialCountry("good", scores.gold),
        silver: this.findSpecialCountry("good", scores.silver),
        bronze: this.findSpecialCountry("good", scores.bronze)
      },
      badCountry: {
        gold: this.findSpecialCountry("bad", scores.gold),
        silver: this.findSpecialCountry("bad", scores.silver),
        bronze: this.findSpecialCountry("bad", scores.bronze)
      }
    }
    let eventMultiplier = {
      gold: this.setMultiplier("gold", eventSettings),
      silver: this.setMultiplier("silver", eventSettings),
      bronze: this.setMultiplier("bronze", eventSettings)
    }
    const goldValues = scores.gold.map(gold => {
      const points = 3 * teamMultiplier * eventMultiplier.gold
      return {id: gold, points: points}
    })

    const silverValues = scores.silver.map(silver => {
      const points = 2 * teamMultiplier * eventMultiplier.silver
      return {id: silver, points: points}
    })

    const bronzeValues = scores.bronze.map(bronze => {
      const points = 1 * teamMultiplier * eventMultiplier.bronze
      return {id: bronze, points: points}
    })

    return {gold: goldValues, silver: silverValues, bronze: bronzeValues}
  }

  handleItemSave() {
    const panel = ReactDOM.findDOMNode(this)
    // Date/Time value
    const dateValue = panel.getElementsByClassName('form-control')[0].value
    const datetime = new Date(dateValue).toISOString()
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

    const calculatedValues = this.scoreEvent({team: this.state.checkboxValue, gold: goldValues, silver: silverValues, bronze: bronzeValues})

    this.props.editEvent(
      this.props.event._id, 
      {
        name: this.state.inputValue,
        team: this.state.checkboxValue,
        datetime,
        gold: calculatedValues.gold,
        silver: calculatedValues.silver,
        bronze: calculatedValues.bronze
      }
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
          checkboxValue={this.state.checkboxValue}
          dateValue={this.state.dateValue}
          handleInputChange={this.handleInputChange.bind(this)}
          handleCheckboxChange={this.handleCheckboxChange.bind(this)}
          handleDateChange={this.handleDateChange.bind(this)}
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