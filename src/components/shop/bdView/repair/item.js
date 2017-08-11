import React, { Component } from 'react'
import classnames from 'classnames'
import Button from 'components/common/button'
import Style from '../item.less'

export default class ShopItemComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div>{this._renderDetail()}</div>
    )
  }
  _renderDetail () {
    let intStatus = this.props.applyStatus
    let className = this.props.className
    let others = this.props.others
    let cls = classnames({
      'shop-item': true,
      [className]: className
    })
    switch (intStatus) {
      case 0:
        return (
          <div className={cls} {...others}>
            <div className='shop-item-header'>
              <div className='repair-title'>
                <p>申领时间：{this.props.createTime}</p>
              </div>
              <div className='status red'>
                <p>{this.props.statusLabel}</p>
                <p />
              </div>
            </div>

            <div className='shop-item-body'>
              {this.props.deviceCount ? <p>设备数量(不带电池版)：{this.props.deviceCount}</p> : null}
              {this.props.deviceWithBatteryCount ? <p>设备数量(带电池版)：{this.props.deviceWithBatteryCount}</p> : null}
              {this.props.brandCount ? <p>餐牌数量：{this.props.brandCount}</p> : null}
              {this.props.batteryCount ? <p>电池数量：{this.props.batteryCount}</p> : null}
              {this.props.adapterCount ? <p>适配器数量：{this.props.adapterCount}</p> : null}
            </div>
            <div className='space' />
          </div>
        )
      case 1:
        return (
          <div className={cls} {...others}>
            <div className='shop-item-header'>
              <div className='repair-title'>
                <p>申领时间：{this.props.createTime}</p>
              </div>
              <div className='status red'>
                <p>{this.props.statusLabel}</p>
                <p />
              </div>
            </div>

            <div className='shop-item-body'>
              {this.props.deviceCount ? <p>设备数量(不带电池版)：{this.props.deviceCount}</p> : null}
              {this.props.deviceWithBatteryCount ? <p>设备数量(带电池版)：{this.props.deviceWithBatteryCount}</p> : null}
              {this.props.brandCount ? <p>餐牌数量：{this.props.brandCount}</p> : null}
              {this.props.batteryCount ? <p>电池数量：{this.props.batteryCount}</p> : null}
              {this.props.adapterCount ? <p>适配器数量：{this.props.adapterCount}</p> : null}
            </div>
            <div className='shop-item-footer'>
              <Button onClick={(e) => { this._bindReceive(e) }}>确认收货</Button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className={cls} {...others}>
            <div className='shop-item-header'>
              <div className='repair-title'>
                <p>申领时间：{this.props.createTime}</p>
              </div>
              <div className='status red'>
                <p>{this.props.statusLabel}</p>
                <p />
              </div>
            </div>

            <div className='shop-item-body'>
              {this.props.deviceCount ? <p>设备数量(不带电池版)：{this.props.deviceCount}</p> : null}
              {this.props.deviceWithBatteryCount ? <p>设备数量(带电池版)：{this.props.deviceWithBatteryCount}</p> : null}
              {this.props.brandCount ? <p>餐牌数量：{this.props.brandCount}</p> : null}
              {this.props.batteryCount ? <p>电池数量：{this.props.batteryCount}</p> : null}
              {this.props.adapterCount ? <p>适配器数量：{this.props.adapterCount}</p> : null}
            </div>

            <div className='shop-item-footer'>
              <div>
                <p>收货时间：{this.props.deliveryTime}</p>
              </div>
            </div>
          </div>
        )
      default: null
    }
  }
  _bindReceive (e) {
    this.props.onReceive(this.props.id)
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
