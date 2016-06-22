import React from 'react'

import EditItem from './buttons/EditItem'
import DeleteItem from './buttons/DeleteItem'
import SaveItem from './buttons/SaveItem'
import CancelEdit from './buttons/CancelEdit'

export default class PanelButtons extends React.Component {
  render() {
    const { item, type, editing } = this.props

    if (!editing) {
      return (
        <div className="panel-buttons">
          <EditItem {...this.props} item={item} type={type} />
          <DeleteItem {...this.props} item={item} type={type} />
        </div>
      )
    } else {
      return (
        <div className="panel-buttons">
          <SaveItem {...this.props} item={item} type={type} handleItemSave={this.props.handleItemSave.bind(this)}/>
          <CancelEdit {...this.props} item={item} type={type} />
        </div>
      )
    }
  }
}