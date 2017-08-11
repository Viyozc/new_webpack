import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'components/link'
import Button from 'components/common/button'
import { router } from 'utils'
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
    let intStatus = parseInt(this.props.status)
    let className = this.props.className
    let others = this.props.others
    let cls = classnames({
      'shop-item': true,
      [className]: className
    })
    switch (intStatus) {
      case 0:
        return (
          <Link className={cls} {...others} to={'/exception/' + this.props.id}>
            <div className='shop-item-header'>
              <h3>{this.props.shopName}</h3>
              <div className='status red'>
                <p>{this.props.statusLabel}</p>
                <p />
              </div>
            </div>

            <div className='shop-item-body'>
              <p>设备数量(不带电池版)：{this.props.objectVO.deviceNum}</p>
              <p>设备数量(带电池版)：{this.props.objectVO.deviceWithBatteryNum}</p>
              <p>餐牌数量：{this.props.objectVO.brandNum}</p>
              <p>适配器数量：{this.props.objectVO.adapterNum}</p>
              <p>联系人：{this.props.objectVO.contactName}</p>
              <p>联系电话：{this.props.objectVO.contactMobile}</p>
              <p>安装地址：{this.props.objectVO.address}</p>
            </div>
            <div className='shop-status'>店铺状态：{this.props.content}</div>

            <div className='shop-item-footer'>
              <div>
                <p>创建时间：{this.props.createTime}</p>
              </div>
              <Button onClick={(e) => { this._locationToDeal(e) }}>处理</Button>
            </div>
          </Link>
        )
      case 2:
        return (
          <Link className={cls} {...others} to={'/exception/' + this.props.id}>
            <div className='shop-item-header'>
              <h3>{this.props.shopName}</h3>
              <div className='status green'>
                <p>{this.props.statusLabel}</p>
                <p />
              </div>
            </div>

            <div className='shop-item-body'>
              <p>设备数量(不带电池版)：{this.props.objectVO.deviceNum}</p>
              <p>设备数量(带电池版)：{this.props.objectVO.deviceWithBatteryNum}</p>
              <p>餐牌数量：{this.props.objectVO.brandNum}</p>
              <p>适配器数量：{this.props.objectVO.adapterNum}</p>
              <p>联系人：{this.props.objectVO.contactName}</p>
              <p>联系电话：{this.props.objectVO.contactMobile}</p>
              <p>安装地址：{this.props.objectVO.address}</p>
            </div>
            <div className='shop-status'>店铺状态：{this.props.content}</div>

            <div className='shop-item-footer'>
              <div>
                <p>创建时间：{this.props.createTime}</p>
              </div>
            </div>
          </Link>
        )
    }
  }
  _locationToDeal (e) {
    e.stopPropagation()
    e.preventDefault()
    router.push('/exception/' + this.props.id + '/reason')
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
