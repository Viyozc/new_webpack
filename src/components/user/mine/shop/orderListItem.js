import React, { Component } from 'react'
import Style from './orderListItem.less'

export default class OrderListItem extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    return (
      <div className='order-list-item'>
        <span className="td device-no">{this.props.deviceNo}</span>
        <span className="td pay-time">{this.props.createTime}</span>
        <span className="td user-nick">{this.props.userName}</span>
        <span className="td pay-way">{this.props.payType}</span>
        <span className="td order-status">{this.props.orderStatus}</span>
      </div>
    )
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
