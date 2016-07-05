import React from 'react'

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props)
  }

  findUserCountries(userId) {
    return this.props.countries.filter(user => {
      return user._id === userId
    })
  }

  render() {
    const test = this.findUserCountries(1)
    console.log(test)
    return (
      <h2>Leaderboard</h2>
    )
  }
}