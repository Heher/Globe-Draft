import React from "react"
import { Link } from "react-router"

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}