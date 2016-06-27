import React from 'react'

import RegionAddItemField from './RegionAddItemField'
import RegionPanelItem from './RegionPanelItem'

export default class RegionAdminSection extends React.Component {

  render() {
    const { dataStatus, regions } = this.props
    let listItems = []
    if (dataStatus.regionsReceived) {
      listItems = regions.map((region, index) => {
        return <RegionPanelItem {...this.props} key={index} region={region} />
      })
    } else {
      listItems = null
    }
    return (
      <div className="admin-section">
        <div>
          <div className="panel add-item">
            <RegionAddItemField {...this.props} />
          </div>
        </div>
        {listItems}
      </div>
    )
  }
}