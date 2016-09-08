import React from 'react'
import classNames from 'classnames'

import RegionAddItemField from './RegionAddItemField'
import RegionPanelItem from './RegionPanelItem'

require('../../../css/admin/regions/region_section.sass')

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

    const renderClasses = classNames({
      'show': this.props.addingRegion
    })

    return (
      <div>
        <div className={`add-item ${renderClasses}`}>
          <RegionAddItemField {...this.props} />
        </div>
        <div className="region-section">
          {listItems}
        </div>
      </div>
    )
  }
}
