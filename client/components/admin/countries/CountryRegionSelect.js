import React from 'react'

export default class CountryRegionSelect extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let regionOptions = []

    regionOptions.push(<option value='' key={0}>Not Set</option>)
    this.props.regions.map((region, index) => {
      regionOptions.push(<option key={index + 1} value={region._id}>{region.name}</option>)
    })
    return (
      <select onChange={this.props.handleSelectChange.bind(this)} value={this.props.regionValue}>
        {regionOptions}
      </select>
    )
  }
}