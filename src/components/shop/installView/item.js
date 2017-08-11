import React, { Component } from 'react'
import { Link } from 'components/link'
import Time from 'utils/time'
import { limitFontSize } from 'utils'
import Style from './item.less'

import {
  INSTALL_STATUS
} from 'constants/install'

export default class ShopItemComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    const STATUS = INSTALL_STATUS[this.props.status]
    return (
      <Link to={`/shops/${this.props.installNo}/install`} className='shop-item'>
        <div className='shop-item-header'>
          <h3>{limitFontSize(this.props.shopName, 10, true)}</h3>
          <div className='status' style={{color: STATUS.color}}>
            <p>{this.props.statusVal}</p>
          </div>
        </div>

        <div className='shop-item-body'>
          <p>设备数量(不带电池版)：{this.props.deviceNum}</p>
          <p>设备数量(带电池版)：{this.props.deviceWithBatteryNum}</p>
          <p>适配器数量：{this.props.adapterNum}</p>
          <p>餐牌数量：{this.props.brandNum}</p>
          <p>联系人：{this.props.contactName}</p>
          <p>联系电话：{this.props.contactMobile}</p>
          <p>安装地址：{this.props.shopAddress}</p>
          {this.props.customServiceName ? <p>审批客服：{this.props.customServiceName}</p> : null}
          {this.props.warehouse ? <p>仓库：{this.props.warehouse}</p> : null}
          {this.props.deliverName ? <p>配送员：{this.props.deliverName}</p> : null}
        </div>

        <div className='shop-item-footer'>
          <div>
            <p>{STATUS.timeLabel}</p>
            <p>{Time.formatPureDate(this.props.installTime)}</p>
          </div>
          {STATUS.operator ? <span className='dian-btn'>{STATUS.operator}</span> : null}
        </div>
      </Link>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
