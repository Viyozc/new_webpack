import React, { Component } from 'react'
import Style from './data.less'

export class UserDataHead extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='th clearfix'>
        <div className='td' style={{width: '10%'}}>时间</div>
        <div className='td' style={{width: '10%'}}>城市</div>
        <div className='td' style={{width: '10%'}}>商家属性</div>
        <div className='td' style={{width: '10%'}}>扫码用户数</div>
        <div className='td' style={{width: '10%'}}>创建订单用户数</div>
        <div className='td' style={{width: '10%'}}>付款订单用户数</div>
        <div className='td' style={{width: '10%'}}>充电成功用户数</div>
        <div className='td' style={{width: '10%'}}>打开失败退款用户数</div>
        <div className='td' style={{width: '10%'}}>申请退款用户数</div>
        <div className='td' style={{width: '10%'}}>客服发起退款用户数</div>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

export default class UserData extends Component {
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
