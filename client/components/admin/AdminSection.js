import React from 'react'

import AddItemField from './AddItemField'
import PanelItem from './panel/PanelItem'

export default class AdminSection extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, items } = this.props

    if (items.length > 0) {
      const listItems = items.map((item, index) => {
        return (
          <PanelItem {...this.props} key={index} item={item} type={type} />
        )
      })
    } else {
      const listItems = null
    }
    return (
      <div className="admin-section">
        <div>
          <div className="panel add-item">
            <AddItemField {...this.props} type={type} />
          </div>
        </div>
        {listItems}
      </div>
    )
  }
}