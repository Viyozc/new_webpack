import React, { Component } from 'react'
import Style from './totalPanel.less'

class TotalPanel extends Component {
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return (
      <div className={`total-panel ${this.props.className || ''}`} style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

class Head extends Component {
  render () {
    return (
      <div className='total-panel-head clearfix'>
        <div className='total-panel-head-title'>{this.props.title}</div>
        <div className='total-panel-head-right'>{this.props.children}</div>
      </div>
    )
  }
}

class Body extends Component {
  render () {
    return (
      <div className='total-panel-body clearfix'>
        {this.props.children}
      </div>
    )
  }
}

class Card extends Component {
  render () {
    return (
      <div className='total-panel-body-card' onClick={this.props.onClick}>
        <p className='card-title'>{this.props.title} {this.props.onClick ? <i className='dianfont icon-xuanze' /> : null}</p>
        <p className='card-value'>{this.props.value}</p>
      </div>
    )
  }
}

export {
  TotalPanel,
  Head,
  Body,
  Card
}
