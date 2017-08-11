import React, { PureComponent } from 'react'

export default class DeviceInfo extends PureComponent {
  render () {
    const {deviceModel, deviceNo, battery, status} = this.props.device || {}
    return <div className='device-info'>
      <ul>
        {status !== 0 ? <li>设备型号：{deviceModel || ''}</li> : null}
        <li>设备编号：{deviceNo || ''} {status === 0 ? <span style={{float: 'right', marginRight: 10, color: '#3DCF55', fontSize: 10}}>在线</span> : null}</li>
        <li>当前电量：{battery || ''}%</li>
      </ul>
    </div>
  }
}
