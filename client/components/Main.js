import React from 'react'

import WorldMap from './WorldMap'

require('../css/main.sass')

<<<<<<< HEAD
export default class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  renderRegions() {
    return this.props.regions.map((region, index) => {
      return <li key={index}>{region.name}: {region.maxCountriesSelected}</li>
    })
  }

  render() {
    return (
      <div className="main-page">
        <div className="hero">
          <h2>Build a team to win the most medals</h2>
          <WorldMap {...this.props} projection="mercator" />
        </div>
        <div className="rules-wrapper">
          <div className="rules">
            <h3>Rules</h3>
            <p>Each competitor must draft the following number of countries from each of the world regions:</p>
            <WorldMap {...this.props} projection="orthographic" rotation={[97,-30]} />
            <ul>
              {this.renderRegions()}
            </ul>
            <p>Draft continues in snake draft order until all competitors have drafted
            all their countries.</p>
          </div>
          <div className="scoring">
            <h3>Scoring</h3>
            <ul>
              <li>Gold: 3 points</li>
              <li>Silver: 2 points</li>
              <li>Bronze: 1 point</li>
            </ul>
            <h4>Multipliers</h4>
            <p>Team events are worth double</p>
            <p>
              The United States and China are medal powerhouses and it would be unfair for any
              one competitor to have them on their team. Therefore, they are assigned as multiplier
              countries.
            </p>
            <p>
              As Americans, we all want Team USA to do well. Therefore, a medal loss to the United States is rewarded.
            </p>
            <p>
              If a competitor's country loses to the United States on the podium, their medal points are doubled.
              Likewise, if your country impedes the United States' chances at gold and outranks them on the podium, their medal points are halved.
            </p>
            <p>
              China is set as the opposite of the United States as they are the most likely to stop
              the United States' medal wins. If a competitor's country beats China on the podium, they are
              rewarded with double points. If they are beaten by China, their points are halved.
            </p>
          </div>
=======
export default function Main(props) {
  return (
    <div className="main-page">
      <div className="hero">
        <h2>Build a team to win the most medals</h2>
        <WorldMap {...props} />
      </div>
      <div className="rules-wrapper">
        <div className="rules">
          <h3>Rules</h3>
          <h4>The Draft</h4>
          <ol>
            <li>All users are randomly assigned a draft order.</li>
            <li>Each round, a user chooses one country to draft to their team.</li>
            <li>Every user must choose one country from each region and one
            extra country from the Europe region.</li>
            <li>Draft continues in snake draft order until all users have drafted
            all their countries.</li>
          </ol>
          <h4>Scoring</h4>
          <ol>
            <li>
              <p>Medal winners receive points as follows:</p>
              <div className="point-list">
                <p>Gold: 3 points</p>
                <p>Silver: 2 points</p>
                <p>Bronze: 1 point</p>
                <p>Team events are worth double</p>
              </div>
            </li>
            <li>
              <p>
                The United States is set as a "good" country. If a user's country
                loses to the United States on the podium, that country doubles their points.
              </p>
              <p>
                Likewise, beating the United States on the podium, the user's country
                will halve their points.
              </p>
              <p>
                China is set as a "bad" country. They act as opposite to the United States.
                Beating China on the podium will double the user's points and losing to them
                will halve their points.
              </p>
            </li>
          </ol>
>>>>>>> e11e5d6b75d3395e8a57b317f4b1e871d1e62139
        </div>
      </div>
    </div>
  )
}
