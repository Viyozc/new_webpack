import React, { Component } from 'react'

import Style from './addDevice.less'

export default class AddDevice extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    const maxReplace = this.props.maxReplace
    return (
      <div className='device-form'>
        <div className='cell device'>
          <img src='//img.shenghuozhe.net/shz/2017/03/21/273w_261h_5A7571490086595.png' />
          <div className='price'>
            <p>请输入设备数量</p>
            <p className='max'>可更换{maxReplace['1']}台</p>
          </div>
          <div className='input'>
            <button className='add' onClick={this._add.bind(this, 'device')}>+</button>
            <input className={this.device && this.device.value > maxReplace['1'] ? 'error' : ''} ref={(ref) => { this.device = ref }} defaultValue={0} type='number' onChange={this._updateDeviceNum.bind(this)} pattern='[0-9]*' />
            <button onClick={this._minus.bind(this, 'device')}>-</button>
          </div>
        </div>
        <div className='cell device'>
          <img src='//img.shenghuozhe.net/shz/2017/03/21/273w_261h_5D7841490086543.png' />
          <div className='price'>
            <p>请输入设备数量</p>
            <p className='max'>可更换{maxReplace['7']}台</p>
          </div>
          <div className='input'>
            <button className='add' onClick={this._add.bind(this, 'deviceWithBattery')}>+</button>
            <input className={this.deviceWithBattery && this.deviceWithBattery.value > maxReplace['7'] ? 'error' : ''} ref={(ref) => { this.deviceWithBattery = ref }} defaultValue={0} type='number' onChange={this._updateDeviceWithBatteryNum.bind(this)} pattern='[0-9]*' />
            <button onClick={this._minus.bind(this, 'deviceWithBattery')}>-</button>
          </div>
        </div>
        <div className='cell battery'>
          <img src='//img.shenghuozhe.net/shz/2017/02/15/258w_156h_642031487127622.png@240w.jpg' />
          <div className='price'>
            <p>请输入电池数量</p>
          </div>
          <div className='input'>
            <button className='add' onClick={this._add.bind(this, 'battery')}>+</button>
            <input ref={(ref) => { this.battery = ref }} defaultValue={0} type='number' onChange={this._updateDeviceNum.bind(this)} pattern='[0-9]*' />
            <button onClick={this._minus.bind(this, 'battery')}>-</button>
          </div>
        </div>
        <div className='cell adapter'>
          <img src='//img.shenghuozhe.net/shz/2017/03/28/216w_159h_FCA371490683657.png@240w.png' />
          <div className='price'>
            <p>请输入适配器数量</p>
          </div>
          <div className='input'>
            <button className='add' onClick={this._add.bind(this, 'adapter')}>+</button>
            <input ref={(ref) => { this.adapter = ref }} defaultValue={0} type='number' onChange={this._updateDeviceNum.bind(this)} pattern='[0-9]*' />
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
            <input ref={(ref) => { this.board = ref }} defaultValue={0} type='number' onChange={this._updateDeviceNum.bind(this)} pattern='[0-9]*' />
            <button onClick={this._minus.bind(this, 'board')}>-</button>
          </div>
        </div>
      </div>
    )
  }
  _add (refName) {
    this[refName].value = Number(this[refName].value) + 1
    this.props.change([this.device.value, this.battery.value, this.adapter.value, this.board.value, this.deviceWithBattery.value])
  }
  _minus (refName) {
    if (this[refName].value > 0) {
      this[refName].value = Number(this[refName].value) - 1
      this.props.change([this.device.value, this.battery.value, this.adapter.value, this.board.value, this.deviceWithBattery.value])
    }
  }
  _updateDeviceNum () {
    this.props.change([this.device.value, this.battery.value, this.adapter.value, this.board.value, this.deviceWithBattery.value])
  }
  _updateDeviceWithBatteryNum () {
    this.props.change([this.device.value, this.battery.value, this.adapter.value, this.board.value, this.deviceWithBattery.value])
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
