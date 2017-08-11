import React, { Component } from 'react'
import Style from './item.less'
/** 提现记录和代理费管理列表公用  isisCashManage=true表示是代理费管理 **/
export default class Item extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    let data = this.props.data
    return <div className='item'>
      <span className='description'>
        {data.statusText ? <label
          className='title'>{this.props.isCashManage ? data.bizTypeText + '-' : null}{data.statusText}</label> : null}
        {data.serialNo ? <label className='desc'>流水号:{data.serialNo}</label> : null}
        {data.account ? <label className='count'>提现账号：{data.account}</label> : null}
        {data.comment ? <label className='reason'>提现失败原因：{data.comment}</label> : null }
        {data.applyTime ? <label className='time'>{data.applyTime}</label> : null}
      </span>
      <span className='money'>
        {data.status === 0 ? <i className='green'>+{data.amount}</i> : null}
        {data.status === 1 ? <i className='red'>-{data.amount}</i> : null}
        {!this.props.isCashManage ? <i className='left-money'>余额：{parseFloat((data.balance)).toFixed(2)}元</i> : null}
      </span>
    </div>
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
