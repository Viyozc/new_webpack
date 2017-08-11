import React, { Component } from 'react'

import Style from './item.less'

const ApplyStatus = {
  0: {
    label: '待更换',
    color: '#FF5E45'
  },
  1: {
    label: '待配货',
    color: '#909090'
  },
  2: {
    label: '待出库',
    color: '#909090'
  },
  3: {
    label: '待确认',
    color: '#FF5E45'
  },
  4: {
    label: '更换完成',
    color: '#26C541'
  }
}

export default class ShopItemComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    const status = this.props.applyStatus
    return (
      <div className='item'>
        <div className='item-header'>
          <h3>{this.props.origin}</h3>
          <div className='status'>
            <p style={{color: ApplyStatus[status].color}}>{ApplyStatus[status].label}</p>
          </div>
        </div>

        <div className='shop-item-body'>
          {this.props.deviceCount ? <p>设备数量(不带电池版)：{this.props.deviceCount}</p> : null}
          {this.props.deviceWithBatteryCount ? <p>设备数量(带电池版)：{this.props.deviceWithBatteryCount}</p> : null}
          {this.props.batteryCount ? <p>电池数量：{this.props.batteryCount}</p> : null}
          {this.props.adapterCount ? <p>适配器数量：{this.props.adapterCount}</p> : null}
          {this.props.brandCount ? <p>餐牌数量：{this.props.brandCount}</p> : null}
        </div>

        <div className='shop-item-footer'>
          <div>
            <p>申请时间</p>
            <p>{this.props.createTime}</p>
          </div>
          {this.renderBtn(status, this.props.id, this.props.origin === 2)}
          {
            status === 4
            ? <div className='right'>
              <p>更换时间</p>
              <p>{this.props.deliveryTime}</p>
            </div>
            : null
          }
        </div>
      </div>
    )
  }
  renderBtn (status, id, hasDelete) {
    if (status === 0) {
      if (hasDelete) {
        return [<span key={1} onClick={this._cancel.bind(this, id)} className='dian-btn left'>撤销</span>,
          <span key={2} onClick={this._claim.bind(this, id)} className='dian-btn'>领取</span>]
      } else {
        return <span onClick={this._claim.bind(this, id)} className='dian-btn'>领取</span>
      }
    } else if (status === 3) {
      return <span onClick={this._confirm.bind(this, id)} className='dian-btn'>确认收到</span>
    } else {
      return null
    }
  }
  _cancel (id) {
    this.props.cancel(id)
  }
  _claim (id) {
    this.props.claim(id)
  }
  _confirm (id) {
    this.props.confirm(id)
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
