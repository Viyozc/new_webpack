import React, { Component } from 'react'
import Style from './data.less'

export class DeviceUseRateDataHead extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='th clearfix'>
        <div className='td' style={{width: '20%'}}>时间</div>
        <div className='td' style={{width: '20%'}}>城市</div>
        <div className='td' style={{width: '15%'}}>商家属性</div>
        <div className='td' style={{width: '15%'}}>设备平均订单数</div>
        <div className='td' style={{width: '15%'}}>设备使用率</div>
        <div className='td' style={{width: '15%'}}>设备在线率</div>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

export default class DeviceUseRateData extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='tr clearfix'>
        <div className='td' style={{width: '20%'}}>{this.props.head}</div>
        <div className='td' style={{width: '20%'}}>{this.props.city}</div>
        <div className='td' style={{width: '15%'}}>{this.props.ka}</div>
        <div className='td' style={{width: '15%'}}>{this.props.avgOrderPerDevice.toFixed(2)}</div>
        <div className='td' style={{width: '15%'}}>{(this.props.deviceUseRate * 100).toFixed(2) + '%'}</div>
        <div className='td' style={{width: '15%'}}>{(this.props.deviceOnlineRate * 100).toFixed(2) + '%'}</div>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
