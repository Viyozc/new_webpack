import React, { Component } from 'react'
import Style from './orderCell.less'

export default class OrderCell extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='order-cell'>
        <div className='tr clearfix'>
          <div>{this.props.createTime}</div>
          <div>{this.props.payNum}</div>
          <div className={this.props.status === '退款' ? 'fail' : null}>{this.props.status}</div>
        </div>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
