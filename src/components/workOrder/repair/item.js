import React, { Component } from 'react'
import { limitFontSize } from 'utils'
import Style from './item.less'
import { router } from 'utils'

export default class ShopItemComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='shop-item'>
        <div className='shop-item-header' onClick={() => { router.push('/workOrders/' + this.props.id + '/repair') }}>
          <h3>{limitFontSize(this.props.shopName, 10, true)}</h3>
          <div className='status'>
            <p style={{color: this.props.status === 0 ? '#FF5E45' : '#3DCF55'}}>{this.props.status === 0 ? '待维修' : '维修成功'}</p>
          </div>
        </div>

        <div className='shop-item-body' onClick={() => { router.push('/workOrders/' + this.props.id + '/repair') }}>
          <p>发起人：{this.props.applierNick}</p>
          <p>安装工：{this.props.installerNick}</p>
          {this.props.status === 1 ? <p>实际维修主机数：{this.props.deviceNum}</p> : <p>维修主机数：{this.props.deviceNum}</p>}
          {this.props.repairDeviceNum ? <p>实际维修主机数：{this.props.repairDeviceNum}</p> : null}
          {this.props.lostDeviceNum ? <p>遗失主机数：{this.props.lostDeviceNum}</p> : null}
          <p>地址：{this.props.shopAddr}</p>
        </div>
        <div className='shop-item-footer'>
          <div>
            <p>创建时间</p>
            <p>{this.props.createTime}</p>
          </div>
          {this.props.status === 0 ? <span className='dian-btn' onClick={() => this.props.testDevice(this.props.shopId, this.props.id)}>测试设备</span> : null}
        </div>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
