import React from 'react'

import WorldMap from './WorldMap'
import AmericasMap from './icons/AmericasMap'
import EuropeMap from './icons/EuropeMap'
import AfricaMap from './icons/AfricaMap'
import AsiaMap from './icons/AsiaMap'
import OceaniaMap from './icons/OceaniaMap'

require('../css/main.sass')

export default class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  renderRegionMap(region) {
    switch (region) {
      case 'Americas' :
        return <AmericasMap />
      case 'Europe' :
        return <EuropeMap />
      case 'Africa' :
        return <AfricaMap />
      case 'Asia' :
        return <AsiaMap />
      case 'Oceania' :
        return <OceaniaMap />
      default :
        return null
    }
  }

  renderRegions() {
    return this.props.regions.map((region, index) => {
      return (
        <li key={index} className="world-region">
          {this.renderRegionMap(region.name)}
          <p className="region-name">{region.name}</p>
          <p>{region.maxCountriesSelected} {region.maxCountriesSelected > 1 ? 'Countries' : 'Country'}</p>
        </li>
      )
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
            <p>Each player must draft the following number of countries from each of the world regions:</p>
            <ul className="region-list">
              {this.renderRegions()}
            </ul>
            <p>Players can draft any country from any region on any turn unless that country has been previously
            drafted or they already have drafted all allowed countries from the chosen country's region.</p>
            <p>Draft order is set randomly and continues in serpentine order until all players' teams are complete.</p>
          </div>
          <div className="scoring">
            <h3>Scoring</h3>
            <h4>Regular Scoring</h4>
            <p>All events are scored with gold medals earning 3 points, silver earning 2 points and bronze earning 1 point.</p>
            <h4>Team Events</h4>
            <p>Any event where two or more people are competeing with each other for a medal are deemed Team events and have all point totals doubled.</p>
            <ul>
              <li>Gold: 3 points</li>
              <li>Silver: 2 points</li>
              <li>Bronze: 1 point</li>
            </ul>
            <h4>Multipliers</h4>
            <p>
              The United States and China are medal powerhouses and it would be unfair for any
              one competitor to have them on their team. Therefore, they are assigned as multiplier
              countries.
            </p>
            <h4>United States</h4>
            <p>
              As Americans, we all want Team USA to do well. Therefore, a medal loss to the United States is rewarded.
            </p>
            <p>
              If a competitor's country loses to the United States on the podium, their medal points are doubled.
              Likewise, if your country impedes the United States' chances at gold and outranks them on the podium, their medal points are halved.
            </p>
            <h4>China</h4>
            <p>
              China is set as the opposite of the United States as they are the most likely to stop
              the United States' medal wins. If a competitor's country beats China on the podium, they are
              rewarded with double points. If they are beaten by China, their points are halved.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
