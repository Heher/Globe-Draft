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
        selectedCountry: ''
      }
    }
    this.onChange = this.onChange.bind(this)
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim())
    
    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('\\b' + escapedValue, 'i')
    
    return this.props.countries.filter(country => regex.test(this.getSuggestionValue(country)))
  }

  sortCountryOptions(countries) {
    if (countries.length) {
      return countries.sort(function(a, b) {
        if(a.name < b.name) return -1
        if(a.name > b.name) return 1
        return 0
      })
    } else {
      return null
    }
  }

  getSuggestionValue(suggestion) {
    return suggestion.name
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

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
    this.setState({
      selectedCountry: suggestion
    })
  }

  render() {
    const { type, countries, country } = this.props

    const inputProps = {
      placeholder: 'Select Country',
      value: this.state.countryValue,
      onChange: this.onChange
    }

    return (
      <div className={`event-select ${type}`}>
        <span className="medal add-medal" onClick={this.props.handleAddMedal.bind(this)}>+</span>
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