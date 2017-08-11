import React, { Component } from 'react'

export default class Icon extends Component {
  render () {
    return (
      <i className={'dianfont icon-' + this.props.name}>
        {this.props.children}
      </i>
    )
  }
}
