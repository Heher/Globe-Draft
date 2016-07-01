import React from 'react'
import classNames from 'classnames'

export default class SettingAdminSection extends React.Component {

  render() {
    const { dataStatus, settings } = this.props

    if (dataStatus.settingsReceived) {
      return (
        <div>
          <button onClick={this.props.resetSettings.bind(this)}>Reset Settings</button>
        </div>
      )
    }
  }
}