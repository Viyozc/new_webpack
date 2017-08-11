import React, { Component } from 'react'
import Style from './badge.less'

export default class Badge extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <span className={this.props.className ? `badge ${this.props.className}` : 'badge'}>{this.props.children}</span>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
