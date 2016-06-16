import React from 'react'

export default class DraftUser extends React.Component {
  constructor(props) {
    super(props)
  }

  createPositionButtons(user, usersLength) {
    let buttons = []
    for (let i = 0; i < usersLength; i++) {
      const draftNum = i + 1
      buttons.push(<button key={i} className={user.draftNum === draftNum ? "selected" : ""} onClick={this.props.setDraft.bind(this, user._id, draftNum)}>{draftNum}</button>)
    }
    return buttons
  }

  render() {
    const { user, currentUser, editingDraft } = this.props
    const usersLength = this.props.users.length

    return (
      <div>
        <p className={currentUser && currentUser._id === user._id ? "selected" : ""}>{user.name} - {user.draftNum}</p>
        <div className={`draft-buttons ${editingDraft ? 'editing' : ''}`}>
          {this.createPositionButtons(user, usersLength)}
        </div>
      </div>
    )
  }
}