import React from 'react'

export default class RegionSelect extends React.Component {
  render() {
    const regionOptions = this.props.regions.map((region, index) => {
      return <option key={index} value={region._id}>{region.name}</option>
    })
    return (
      <select onChange={this.props.handleSelectChange.bind(this)} value={this.props.selectValue}>
        {regionOptions}
      </select>
    )
  }
}