import React, { Component } from 'react'
import Style from './deviceCell.less'

export default class DeviceCell extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    if (this.props.onClick) {
      return (
        <div className='device-cell'>
          <button onClick={this.props.onClick && this.props.onClick.bind(this)}>
            <p>{this.props.title1} <i className='dianfont icon-xuanze' /></p>
            <p>{this.props.value1}</p>
          </button>
          <button onClick={this.props.onClick && this.props.onClick.bind(this)}>
            <p>{this.props.title2} <i className='dianfont icon-xuanze' /></p>
            <p>{this.props.value2}</p>
          </button>
        </div>
      )
    }
    return (
      <div className='device-cell'>
        <button onClick={this.props.onClick && this.props.onClick.bind(this)}>
          <p>{this.props.title1}</p>
          <p>{this.props.value1}</p>
        </button>
        <button onClick={this.props.onClick && this.props.onClick.bind(this)}>
          <p>{this.props.title2}</p>
          <p>{this.props.value2}</p>
        </button>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
