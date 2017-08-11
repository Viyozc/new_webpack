import React, { Component } from 'react'
import Style from './item.less'

export default class Item extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    let data = this.props.data
    return <div className='item'>
      <span className='description'>
        <label className='name'>{data.shopName}</label>
        {data.orderNo ? <label className='desc'>订单号：{data.orderNo}</label> : null}
        <label className='desc'>员工：{data.sellerNick}</label>
        <label className='desc'>用户昵称：{data.userNick}</label>
        <label className='desc'>付款时间：{data.payTime}</label>
      </span>
      <span className='money'>
        {data.status === 1 ? <i className='green'>+{data.amount}</i> : null}
        {data.status === 2 ? <i className='red'>-{data.amount}</i> : null}
      </span>
    </div>
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
