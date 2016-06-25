import React from 'react'

export default class DraftNumber extends React.Component {
  constructor(props) {
    super(props)
  }

  createPositionButtons(user, usersLength) {
    let buttons = []
    for (let i = 0; i < usersLength; i++) {
      const draftNum = i + 1
      buttons.push(
        <button 
          key={i} 
          className={user.draftNum === draftNum ? "selected" : ""}
          onClick={this.props.setDraft.bind(this, user._id, {draftNum: draftNum})}
        >
          {draftNum}
        </button>)
    }
    return buttons
  }

  render() {
    const { user } = this.props
    const usersLength = this.props.users.length

    return (
      <div>
        <div className="draft-buttons">
          {this.createPositionButtons(user, usersLength)}
        </div>
      </div>
    )
  }
}