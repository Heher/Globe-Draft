import React from 'react'

import PanelButtons from './PanelButtons'

export default class PanelInfo extends React.Component {
  render() {
    const { item, type } = this.props

    switch(type) {
      case "Country" :
        const countryRegion = this.props.regions.find(region => {
          return region._id === item.regionId
        })
        return (
          <div className="panel">
            <p>{item.name}</p>
            <p>{countryRegion.name}</p>
            <PanelButtons {...this.props} item={item} type={type} editing={item.editing} />
          </div>
        )

      case "User" :
        return (
          <div className="panel">
            <p>{item.name} - {item.draftNum}</p>
            <PanelButtons {...this.props} item={item} type={type} editing={item.editing} />
          </div>
        )

      default :
        return (
          <div className="panel">
            <p>{item.name}</p>
            <PanelButtons {...this.props} item={item} type={type} editing={item.editing} />
          </div>
        )
    }
  }
}