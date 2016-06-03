import React from 'react'

export default class ChoiceList extends React.Component {

  render() {
    return (
      <div>
        <h3>Choice List</h3>
        <p>Round: {this.props.settings.round}</p>
        <p>UserID Choosing: {this.props.settings.userTurn}</p>
        <p>Number Drafted: {this.props.settings.numberDrafted}</p>
        <p>Current User: {this.props.currentUser.id}</p>
      </div>
    )
  }

}