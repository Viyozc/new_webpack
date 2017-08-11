import React, { PureComponent } from 'react'

export default class Plan extends PureComponent {
  render () {
    let { installedDeviceNum, deviceNum, deviceWithBatteryNum, adapterNum, brandNum } = this.props.shop
    return <div className='install-plan'>
      <h4>计划安装数量</h4>
      <p>设备数量（不带电池版）：<span className='value'>{deviceNum}</span></p>
      <p>设备数量（电池版）：<span className='value'>{deviceWithBatteryNum}</span></p>
      <p>适配器数量：<span className='value'>{adapterNum}</span></p>
      <p>餐牌数量：<span className='value'>{brandNum}</span></p>
      <h4 style={{marginTop: 10}}>实际安装数量</h4>
      <p>主机数量：<span className='value'>{installedDeviceNum}</span></p>
    </div>
  }
}
