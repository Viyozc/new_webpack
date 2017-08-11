import React, { Component } from 'react'
import Style from './data.less'

export class OrderDataHead extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='th clearfix'>
        <div className='td' style={{width: '10%'}}>时间</div>
        <div className='td' style={{width: '10%'}}>城市</div>
        <div className='td' style={{width: '10%'}}>商家属性</div>
        <div className='td' style={{width: '10%'}}>扫码数</div>
        <div className='td' style={{width: '10%'}}>创建订单数</div>
        <div className='td' style={{width: '10%'}}>付款订单数</div>
        <div className='td' style={{width: '10%'}}>成功充电订单数</div>
        <div className='td' style={{width: '10%'}}>打开失败自动退款数</div>
        <div className='td' style={{width: '10%'}}>用户申请退款数</div>
        <div className='td' style={{width: '10%'}}>客服发起退款数</div>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

export default class OrderData extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='tr clearfix'>
        <div className='td' style={{width: '10%'}}>{this.props.head}</div>
        <div className='td' style={{width: '10%'}}>{this.props.city}</div>
        <div className='td' style={{width: '10%'}}>{this.props.ka}</div>
        <div className='td' style={{width: '10%'}}>{this.props.scanNum}</div>
        <div className='td' style={{width: '10%'}}>{this.props.orderNum}</div>
        <div className='td' style={{width: '10%'}}>{this.props.payNum}</div>
        <div className='td' style={{width: '10%'}}>{this.props.successNum}</div>
        <div className='td' style={{width: '10%'}}>{this.props.autoRefundNum}</div>
        <div className='td' style={{width: '10%'}}>{this.props.userRefundNum}</div>
        <div className='td' style={{width: '10%'}}>{this.props.kefuRefundNum}</div>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
