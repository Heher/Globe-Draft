import React from 'react'
import classNames from 'classnames'
import Autosuggest from 'react-autosuggest'

import Flag from '../../Flag'

require('../../../css/inputs/country_select.sass')

export default class EventCountrySelect extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.country) {
      this.state = {
        countryValue: this.props.country.name,
        suggestions: this.getSuggestions(''),
        selectedCountry: this.props.country
      }
    } else {
      this.state = {
        countryValue: '',
        suggestions: this.getSuggestions(''),
        selectedCountry: {}
      }
    }
    this.onChange = this.onChange.bind(this)
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim())
    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp(`\\b${escapedValue}`, 'i')
    return this.props.countries.filter(country => regex.test(this.getSuggestionValue(country)))
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

  getSuggestionValue(suggestion) {
    return suggestion.name
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  renderSuggestion(suggestion) {
    return (
      <span><Flag country={suggestion} />{suggestion.name}</span>
    )
  }

  onChange(event, { newValue }) {
    this.setState({
      countryValue: newValue
    })
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  onSuggestionSelected(event, { suggestion }) {
    this.setState({
      selectedCountry: suggestion
    })
  }

  renderMedal() {
    if (this.props.country) {
      return (
        <span
          className="medal add-medal"
          onClick={() => this.props.handleAddMedal(this.props.type)}
        >
          +
        </span>
      )
    }
    return <span className="medal">&nbsp;</span>
  }

  render() {
    const { type, country, noCountries } = this.props

    const inputProps = {
      placeholder: 'Select Country',
      value: this.state.countryValue,
      onChange: this.onChange
    }

    const newClass = classNames({
      'new-winner': !country && !noCountries
    })

    return (
      <div className={`event-select ${type} ${newClass}`}>
        {this.renderMedal()}
        <Flag country={this.state.selectedCountry} />
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}

EventCountrySelect.propTypes = {
  type: React.PropTypes.string.isRequired,
  countries: React.PropTypes.array.isRequired,
  country: React.PropTypes.object,
  noCountries: React.PropTypes.bool.isRequired,
  handleAddMedal: React.PropTypes.func
}
