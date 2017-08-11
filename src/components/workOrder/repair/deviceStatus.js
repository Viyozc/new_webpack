import React, { PureComponent } from 'react'

export default class DeviceStatus extends PureComponent {
  render () {
    const {alarms, status} = this.props.device || {}
    return <div className='device-status' style={{padding: 0}}>
      {status !== 0 ? <div>
        <p style={{padding: 5}}>设备状态</p>
        <ul>{
          alarms && alarms.map((o, i) => {
            return <li key={i} className='clearfix'><span className='time'>{o.alarmTime}</span><span className='status'>{o.alarmReason}</span></li>
          })}
        </ul>
      </div>
      : null}
    </div>
  }
}
