import React from 'react'

import PanelButtons from './PanelButtons'
import RegionSelect from '../RegionSelect'

export default class PanelEdit extends React.Component {
  render() {
    const { item, type } = this.props

    switch(type) {
      case "User" :
        return (
          <div className="panel">
            <input 
              type="text"
              onChange={this.props.handleInputChange.bind(this)}
              value={this.props.inputValue}
            />
            <DraftNumber {...this.props} user={item} />
            <PanelButtons
              {...this.props}
              item={item}
              type={type}
              editing={item.editing}
              handleItemSave={this.props.handleItemSave.bind(this)}
            />
          </div>
        )

      case "Event" :
        return (
          <div className="panel">
            <input 
              type="text"
              onChange={this.props.handleInputChange.bind(this)}
              value={this.props.inputValue}
            />
            <p>Gold</p>
            <PanelButtons
              {...this.props}
              item={item}
              type={type}
              editing={item.editing}
              handleItemSave={this.props.handleItemSave.bind(this)}
            />
          </div>
        )

      case "Region" :
        return (
          <div className="panel">
            <input 
              type="text"
              onChange={this.props.handleInputChange.bind(this)}
              value={this.props.inputValue}
            />
            <PanelButtons
              {...this.props}
              item={item}
              type={type}
              editing={item.editing}
              handleItemSave={this.props.handleItemSave.bind(this)}
            />
          </div>
        )

      case "Country" :
        return (
          <div className="panel">
            <input 
              type="text"
              onChange={this.props.handleInputChange.bind(this)}
              value={this.props.inputValue}
            />
            <RegionSelect {...this.props} handleSelectChange={this.props.handleRegionSelectChange.bind(this)} />
            <PanelButtons
              {...this.props}
              item={item}
              type={type}
              editing={item.editing}
              handleItemSave={this.props.handleItemSave.bind(this)}
            />
          </div>
        )

      default :
        return (
          <div className="panel">
            <input 
              type="text"
              onChange={this.props.handleInputChange.bind(this)}
              value={this.props.inputValue}
            />
            <PanelButtons
              {...this.props}
              item={item}
              type={type}
              editing={item.editing}
              handleItemSave={this.props.handleItemSave.bind(this)}
            />
          </div>
        )
    }
  }
}