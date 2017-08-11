import React, { Component } from 'react'

import Style from './addDevice.less'

export default class AddDevice extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    let { installedDeviceNum } = this.props.shop
    return (
      <div className='device-form'>
        <h4>实际安装数量</h4>
        <p>请选择主机数量</p>
        <div className='cell device'>
          <img src='//img.shenghuozhe.net/shz/2017/03/21/273w_261h_5A7571490086595.png' />
          <div className='price'>
            <p>请输入设备数量</p>
          </div>
          <div className='input'>
            <button className='add' onClick={this._add.bind(this, 'device')}>+</button>
            <input className={this.device && this.device.value > installedDeviceNum ? 'error' : ''} ref={(ref) => { this.device = ref }} defaultValue={0} type='number' onChange={this._updateDeviceNum.bind(this)} pattern='[0-9]*' />
            <button onClick={this._minus.bind(this, 'device')}>-</button>
          </div>
        </div>
        <div className='cell device'>
          <img src='//img.shenghuozhe.net/shz/2017/03/21/273w_261h_5D7841490086543.png' />
          <div className='price'>
            <p>请输入设备数量</p>
          </div>
          <div className='input'>
            <button className='add' onClick={this._add.bind(this, 'deviceWithBattery')}>+</button>
            <input className={this.deviceWithBattery && this.deviceWithBattery.value > installedDeviceNum ? 'error' : ''} ref={(ref) => { this.deviceWithBattery = ref }} defaultValue={0} type='number' onChange={this._updateDeviceWithBatteryNum.bind(this)} pattern='[0-9]*' />
            <button onClick={this._minus.bind(this, 'deviceWithBattery')}>-</button>
          </div>
        </div>
        <p>请选择配件数量</p>
        <div className='cell adapter'>
          <img src='//img.shenghuozhe.net/shz/2017/03/28/216w_159h_FCA371490683657.png@240w.png' />
          <div className='price'>
            <p>请输入适配器数量</p>
          </div>
          <div className='input'>
            <button className='add' onClick={this._add.bind(this, 'adapter')}>+</button>
            <input className={this.adapter && this.adapter.value > installedDeviceNum ? 'error' : ''} ref={(ref) => { this.adapter = ref }} defaultValue={0} type='number' onChange={this._updateDeviceNum.bind(this)} pattern='[0-9]*' />
            <button onClick={this._minus.bind(this, 'adapter')}>-</button>
          </div>
        </div>
        <div className='cell board'>
          <img src='//img.shenghuozhe.net/shz/2017/03/06/240w_240h_9E8221488801357.jpg@240w.jpg' />
          <div className='price'>
            <p>请输入餐牌数量</p>
          </div>
          <div className='input'>
            <button className='add' onClick={this._add.bind(this, 'board')}>+</button>
            <input className={this.board && this.board.value > installedDeviceNum ? 'error' : ''} ref={(ref) => { this.board = ref }} defaultValue={0} type='number' onChange={this._updateDeviceNum.bind(this)} pattern='[0-9]*' />
            <button onClick={this._minus.bind(this, 'board')}>-</button>
          </div>
        </div>
      </div>
    )
  }
  _add (refName) {
    this[refName].value = Number(this[refName].value) + 1
    this.props.change([this.device.value, this.adapter.value, this.board.value, this.deviceWithBattery.value])
  }
  _minus (refName) {
    if (this[refName].value > 0) {
      this[refName].value = Number(this[refName].value) - 1
      this.props.change([this.device.value, this.adapter.value, this.board.value, this.deviceWithBattery.value])
    }
  }
  _updateDeviceNum () {
    this.props.change([this.device.value, this.adapter.value, this.board.value, this.deviceWithBattery.value])
  }
  _updateDeviceWithBatteryNum () {
    this.props.change([this.device.value, this.adapter.value, this.board.value, this.deviceWithBattery.value])
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
