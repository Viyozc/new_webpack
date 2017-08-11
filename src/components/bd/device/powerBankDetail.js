import React, { Component } from 'react'
import Style from './powerBankDetail.less'

export default class PowerBankDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: true
    }
  }
  componentDidMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    let device = this.props.device
    return (
      <div className='powerbank-item'>
        {device.status === 0 && this.props.shouldAdd ? <div className='supply'>
          <span className='order'>
            <a className='tag'><span>补货</span></a>
            {device.slot + 1 || ''}</span>
          <span className='insert'>请插入充电宝</span>
        </div>
          : device.status === 1 ? <div className='has-box'>
            <div className='order' style={{width: '20%'}}>{device.slot + 1 || ''}</div>
            <div className='number' style={{width: '30%'}}> <span>{device.powerBankNo || ''}</span> </div>
            <div className='status' style={device.powerBankStatus === 0 ? {width: '30%'} : {width: '30%', color: '#D0021B'}}>{device.powerBankStatusText || ''}</div>
            <div className='power' style={{width: '20%'}}>{device.battery || 0}</div>
          </div>
          : <div className='empty'>
            <span className='order'>{device.slot + 1 || ''}</span>
            <span className='info'>—— 预留的归还槽位, 不需补货 ——</span>
          </div>
          }
      </div>
    )
  }
  _cancel () {

  }
}
