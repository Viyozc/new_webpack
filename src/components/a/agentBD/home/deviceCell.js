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
            <p>{this.props.title} <i className='dianfont icon-xuanze' /></p>
            <p>{this.props.value}</p>
          </button>
        </div>
      )
    }
    return (
      <div className='device-cell'>
        <button>
          <p>{this.props.title}</p>
          <p>{this.props.value}</p>
        </button>
      </div>
    )
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
