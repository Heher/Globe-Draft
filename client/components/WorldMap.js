import d3 from 'd3'
import React from 'react'
import ReactDOM from 'react-dom'
import topojson from 'topojson'
import Datamap from 'datamaps/dist/datamaps.world.hires.min'

Datamap.prototype.updatePopup = function (element, d, options) {
  var self = this
  var country = null
  element.on('mousemove', null)
  element.on('mousemove', function() {
    var data = JSON.parse(element.attr('data-info'))
    let info = options.popupTemplate(d, data) || ""
    if (info !== country) {
      country = info
      console.log(info)
      d3.select('#datamap-info').html(info)
    }
    // var position = d3.mouse(self.options.element);
    // d3.select(self.svg[0][0].parentNode).select('.datamaps-hoverover')
    //   .style('top', ( (position[1] + 30)) + "px")
    //   .html(function() {
    //     var data = JSON.parse(element.attr('data-info'));
    //     try {
    //       return options.popupTemplate(d, data);
    //     } catch (e) {
    //       return "";
    //     }
    //   })
    //   .style('left', ( position[0]) + "px");
  })

  // d3.select(self.svg[0][0].parentNode).select('.datamaps-hoverover').style('display', 'block');
};

export default class WorldMap extends React.Component {
  constructor(props){
    super(props)
    this.datamap = null
  }

  findCountry(country) {
    return this.props.countries.filter(propCountry => {
      return country === propCountry._id
    })[0]
  }

  findDrafts() {
    return this.props.countries.filter(country => {
      return country.userId !== ""
    })
  }

  renderCountries() {
    let data = {}
    if (this.props.settings.goodCountry) {
      const foundCountry = this.findCountry(this.props.settings.goodCountry)
      data[foundCountry.shortName] = { fillKey: "goodCountry" }
    }
    if (this.props.settings.badCountry) {
      const foundCountry = this.findCountry(this.props.settings.badCountry)
      data[foundCountry.shortName] = { fillKey: "badCountry" }
    }
    if (this.findDrafts().length > 0) {
      const drafts = this.findDrafts()
      drafts.map(draft => {
        if (this.props.currentUser._id && (this.props.currentUser._id === draft.userId)) {
          data[draft.shortName] = { fillKey: "owned" }
        } else {
          data[draft.shortName] = { fillKey: "drafted" }
        }
      })
    }
    return data
  }

  renderMap() {
    return new Datamap({
      element: ReactDOM.findDOMNode(this),
      scope: 'world',
      projection: 'mercator',
      fills: {
        defaultFill: "#FFF",
        goodCountry: "#BBB",
        badCountry: "#BBB",
        drafted: "#951774",
        owned: "#39961B"
      },
      geographyConfig: {
        borderColor: '#BBB',
        borderWidth: 1,
        borderOpacity: 0.4,
        highlightFillColor: '#9EC1DD',
        highlightBorderColor: 'rgba(14, 101, 171, 0.1)',
        popupTemplate: function(geography, data) {
          return `${geography.properties.name}`
        }
      },
      data: this.renderCountries()
    })
  }

  currentScreenWidth() {
    return window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
  }

  componentDidMount() {
    const mapContainer = d3.select('div #datamap-container')
    const initialScreenWidth = this.currentScreenWidth()
    const containerWidth = (initialScreenWidth < 1000) ?
      { width: initialScreenWidth + 'px',  height: (initialScreenWidth * 0.7) + 'px' } :
      { width: '960px', height: '650px' }

    mapContainer.style(containerWidth)
    this.datamap = this.renderMap()
    window.addEventListener('resize', () => {
      const currentScreenWidth = this.currentScreenWidth()
      const mapContainerWidth = mapContainer.style('width')
      if (this.currentScreenWidth() > 1000 && mapContainerWidth !== '960px') {
        d3.select('.datamap').remove()
        mapContainer.style({
          width: '960px',
          height: '650px'
        })
        this.datamap = this.renderMap()
      }
      else if (this.currentScreenWidth() <= 1000) {
        d3.select('.datamap').remove()
        mapContainer.style({
          width: currentScreenWidth + 'px',
          height: (currentScreenWidth * 0.7) + 'px'
        })
        this.datamap = this.renderMap()
      }
    })
  }

  render() {
    return (
      <div id="datamap-container">
        <p id="datamap-info"></p>
      </div>
    )
  }
}