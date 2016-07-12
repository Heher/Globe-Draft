import React from 'react'
import classNames from 'classnames'

export default class SettingAdminSection extends React.Component {

  setDraft(draftStarted) {
    if (draftStarted) {
      this.props.toggleDraft(false)
    } else {
      this.props.toggleDraft(true)
    }
  }

  render() {
    const { dataStatus, settings } = this.props

    if (dataStatus.settingsReceived) {
      return (
        <div>
          <button onClick={this.setDraft.bind(this, settings.draftStarted)}>{settings.draftStarted ? "Stop Draft" : "Start Draft"}</button>
          <button onClick={this.props.resetSettings.bind(this)}>Reset Settings</button>
          <button onClick={this.props.resetDrafts.bind(this)}>Reset Drafts</button>
        </div>
      )
    }
  }
}