import React from 'react'
import DateTime from 'react-datetime'
import moment from 'moment'
import classNames from 'classnames'

import Flag from './Flag'
import Avatar from './Avatar'
import EventCountrySelect from './admin/events/EventCountrySelect'
import DeleteItem from './admin/panel/buttons/DeleteItem'
import SaveItem from './admin/panel/buttons/SaveItem'

import findByQuery from '../utilities/query'

require('../css/event.sass')
require('../css/inputs/country_select.sass')
require('../css/inputs/date_picker.sass')

export default class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      inputValue: this.props.event.name,
      dateValue: new Date(this.props.event.datetime),
      checkboxValue: this.props.event.team,
      goldAdd: false,
      silverAdd: false,
      bronzeAdd: false
    }
    this.handleAddMedal = this.handleAddMedal.bind(this)
    this.handleEditToggle = this.handleEditToggle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleItemSave = this.handleItemSave.bind(this)
    this.handleEditToggle = this.handleEditToggle.bind(this)
  }

  renderWinners(countries) {
    if (countries.length > 0) {
      return countries.map((country, index) => {
        const countryDrafts = this.props.drafts.filter(draft => draft.country._id === country._id)
        const hasBeenDrafted = countryDrafts.length > 0

        const userOwns = this.props.userCountries.find(draft => draft.country._id === country._id)
        const otherOwns = !userOwns && hasBeenDrafted

        const settingsClasses = classNames({
          good: country._id === this.props.settings.goodCountry,
          bad: country._id === this.props.settings.badCountry,
          taken: otherOwns,
          owned: userOwns,
          selected: country._id === this.props.country
        })
        return (
          <div key={index} className={`winner ${settingsClasses}`}>
            <div className="winner-name">
              <span className="medal ">{country.points}</span>
              <Flag country={country} />
              <p>
                {country.name}
                {hasBeenDrafted ? <Avatar users={this.props.users} countryDrafts={countryDrafts} /> : null}
              </p>
            </div>
          </div>
        )
      })
    }
    return (
      <div key={0} className="winner">
        <div className="winner-name">
          <span className="medal">&nbsp;</span>
          <p>
            No Winner
          </p>
        </div>
      </div>
    )// &nbsp needed for flexbox to correctly align
  }

  handleEditToggle() {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleInputChange(event) {
    this.setState({ inputValue: event.target.value })
  }

  handleCheckboxChange(event) {
    this.setState({ checkboxValue: event.target.checked })
  }

  sortCountryOptions(countries) {
    if (countries.length) {
      return countries.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    }
    return null
  }

  convertDate(datetime) {
    return moment(datetime, moment.ISO_8601).format('ddd, M/D, h:mm A')
  }

  findCountry(country) {
    const foundCountry = findByQuery(this.props.countries, country.id, '_id')
    const newCountry = {
      ...foundCountry,
      points: country.points
    }
    return newCountry
  }

  renderSelects(countries, type) {
    const selects = []

    if (countries.length > 0) {
      countries.forEach((country, index) => {
        selects.push(
          <EventCountrySelect
            {...this.props}
            key={index + 1}
            country={country}
            type={type}
            handleAddMedal={this.handleAddMedal}
            noCountries={false}
          />
        )
      })
      selects.push(<EventCountrySelect {...this.props} key={0} type={type} noCountries={false} />)
    } else {
      selects.push(<EventCountrySelect {...this.props} key={0} type={type} noCountries={true} />)
    }
    return selects
  }

  handleAddMedal(type) {
    switch (type) {
      case 'gold' :
        this.setState({
          goldAdd: !this.state.goldAdd
        })
        break

      case 'silver' :
        this.setState({
          silverAdd: !this.state.silverAdd
        })
        break

      case 'bronze' :
        this.setState({
          bronzeAdd: !this.state.bronzeAdd
        })
        break

      default:
        return
    }
  }

  findCountryId(country) {
    const foundCountry = findByQuery(this.props.countries, country, 'name')
    return foundCountry._id
  }

  // Runs through all medal winners to determine if there is
  // a good or bad country and at what position
  findSpecialCountry(countryType, scores) {
    if (!scores) {
      return null
    }

    let foundCountry
    if (countryType === 'good') {
      foundCountry = scores.filter(score => score === this.props.settings.goodCountry)
    } else {
      foundCountry = scores.filter(score => score === this.props.settings.badCountry)
    }
    return foundCountry.length > 0
  }

  setMultiplier(type, eventSettings) {
    let multiplier = 1
    switch (type) {
      case 'gold' :
        if (eventSettings.goodCountry.silver || eventSettings.goodCountry.bronze) {
          multiplier = multiplier * 0.5
        }
        if (eventSettings.badCountry.silver || eventSettings.badCountry.bronze) {
          multiplier = multiplier * 2
        }
        break

      case 'silver' :
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

      case 'bronze' :
        if (eventSettings.goodCountry.gold || eventSettings.goodCountry.silver) {
          multiplier = multiplier * 2
        }
        if (eventSettings.badCountry.gold || eventSettings.badCountry.silver) {
          multiplier = multiplier * 0.5
        }
        break

      default :
        break
    }
    return multiplier
  }

  // Using the information provided from the select
  // edit panel, scores all countries/users
  scoreEvent(scores) {
    const teamMultiplier = scores.team ? 2 : 1
    const eventSettings = {
      goodCountry: {
        gold: this.findSpecialCountry('good', scores.gold),
        silver: this.findSpecialCountry('good', scores.silver),
        bronze: this.findSpecialCountry('good', scores.bronze)
      },
      badCountry: {
        gold: this.findSpecialCountry('bad', scores.gold),
        silver: this.findSpecialCountry('bad', scores.silver),
        bronze: this.findSpecialCountry('bad', scores.bronze)
      }
    }
    const eventMultiplier = {
      gold: this.setMultiplier('gold', eventSettings),
      silver: this.setMultiplier('silver', eventSettings),
      bronze: this.setMultiplier('bronze', eventSettings)
    }

    let goldValues, silverValues, bronzeValues

    if (scores.gold) {
      goldValues = scores.gold.map(gold => {
        const points = 3 * teamMultiplier * eventMultiplier.gold
        return {
          id: gold,
          points
        }
      })
    }

    if (scores.silver) {
      silverValues = scores.silver.map(silver => {
        const points = 2 * teamMultiplier * eventMultiplier.silver
        return {
          id: silver,
          points
        }
      })
    }

    if (scores.bronze) {
      bronzeValues = scores.bronze.map(bronze => {
        const points = 1 * teamMultiplier * eventMultiplier.bronze
        return {
          id: bronze,
          points
        }
      })
    }

    return { gold: goldValues, silver: silverValues, bronze: bronzeValues }
  }

  // Finds all country values of a medal type and returns them
  findSelectValues(panel, type) {
    const selectDiv = panel.getElementsByClassName(type)[0]
    const selects = Array.from(selectDiv.getElementsByTagName('input'))
    let values = selects.map(select => {
      if (select.value) {
        return this.findCountryId(select.value)
      }
      return ''
    })
    if (values) {
      values = (values.filter(Boolean)) // Used to remove undefined elements
    }
    return values
  }

  // When the save button is clicked
  handleItemSave() {
    // Date/Time value
    const dateValue = this.panel.getElementsByClassName('form-control')[0].value
    const datetime = new Date(dateValue).toISOString()
    // Medal Values
    const goldValues = this.findSelectValues(this.panel, 'golds')
    const silverValues = this.findSelectValues(this.panel, 'silvers')
    const bronzeValues = this.findSelectValues(this.panel, 'bronzes')

    const calculatedValues = this.scoreEvent({
      team: this.state.checkboxValue,
      gold: goldValues,
      silver: silverValues,
      bronze: bronzeValues
    })

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
    this.handleEditToggle()
  }

  render() {
    const { event, currentUser } = this.props

    const goldCountries = event.gold ? event.gold.map(country => this.findCountry(country)) : []
    const silverCountries = event.silver ? event.silver.map(country => this.findCountry(country)) : []
    const bronzeCountries = event.bronze ? event.bronze.map(country => this.findCountry(country)) : []

    if (this.state.editing) {
      return (
        <div className="event-section editing" ref={(node) => this.panel = node}>
          <div className="title">
            {currentUser.isAdmin ? <button className="edit-button" onClick={this.handleEditToggle}>Cancel</button> : null}
            <input
              type="text"
              onChange={this.handleInputChange}
              value={this.state.inputValue}
            />
            <DateTime defaultValue={this.state.dateValue} timeFormat="HH:mm" />
            <div className="admin-checkbox">
              <input
                type="checkbox"
                checked={this.state.checkboxValue ? 'checked' : ''}
                onChange={this.handleCheckboxChange}
              />
              <p>Team Event</p>
            </div>
          </div>
          <div className="medal-winners">
            <div className={`golds ${this.state.goldAdd ? 'adding' : ''}`}>
              {this.renderSelects(goldCountries, 'gold')}
            </div>
            <div className={`silvers ${this.state.silverAdd ? 'adding' : ''}`}>
              {this.renderSelects(silverCountries, 'silver')}
            </div>
            <div className={`bronzes ${this.state.bronzeAdd ? 'adding' : ''}`}>
              {this.renderSelects(bronzeCountries, 'bronze')}
            </div>
          </div>
          <div className="action-buttons">
            <SaveItem
              {...this.props}
              item={event}
              type="Event"
              handleItemSave={this.handleItemSave}
            />
            <DeleteItem {...this.props} item={event} type="Event" />
          </div>
        </div>
      )
    }
    return (
      <div className="event-section">
        <div className="title">
          {currentUser.isAdmin ? <button className="edit-button" onClick={this.handleEditToggle}>Edit</button> : null}
          <h4>{event.name}</h4>
          {event.datetime ? <p>{this.convertDate(event.datetime)}</p> : null}
          {event.team ? <span className="team-badge">Team</span> : null}
        </div>
        <div className="medal-winners">
          <div className="golds">
            {this.renderWinners(goldCountries)}
          </div>
          <div className="silvers">
            {this.renderWinners(silverCountries)}
          </div>
          <div className="bronzes">
            {this.renderWinners(bronzeCountries)}
          </div>
        </div>
      </div>
    )
  }
}

Event.propTypes = {
  event: React.PropTypes.object.isRequired,
  settings: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  users: React.PropTypes.array.isRequired,
  countries: React.PropTypes.array.isRequired,
  editEvent: React.PropTypes.func.isRequired,
  country: React.PropTypes.string
}
