import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'components/link'
import Button from 'components/common/button'
import { router, limitFontSize } from 'utils'
import Style from './item.less'

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
    return (
      <Link className={cls} {...others} to={'/shops/examine/' + this.props.id}>
        <div className='shop-item-header'>
          <h3>{limitFontSize(this.props.shopName, 10, true)}</h3>
          <div className={intStatus === 2 ? 'status green' : 'status red'}>
            <p>{this.props.statusLabel}</p>
            <p />
          </div>
        </div>

        <div className='shop-item-body'>
          <p>设备数量(不带电池版)：{this.props.deviceNum}</p>
          <p>设备数量(带电池版)：{this.props.deviceWithBatteryNum}</p>
          <p>餐牌数量：{this.props.brandNum}</p>
          <p>适配器数量：{this.props.adapterNum}</p>
          <p>价格标准：{this.props.priceTypeText}</p>
          <p>申请人：{this.props.applier}</p>
          <p>申请时间：{this.props.applyTime}</p>
          <p>安装地址：{this.props.address}</p>
          {intStatus === 1 ? <div className='reason'>理由：{this.props.reasonDes}</div> : null}
        </div>
        {intStatus !== 0
          ? <div className='shop-item-footer'>
            <div>
              <p>审批时间：{this.props.approvalTime}</p>
            </div>
          </div>
          : <div className='shop-item-footer'>
            <div />
            <Button onClick={(e) => { this._locationToRefuse(e) }} className='move-left'>拒绝</Button>
            <Button onClick={(e) => { this._triggerSuccess(e) }} className='aggree'>同意</Button>
          </div>}
      </Link>
    )
  }
  _triggerSuccess (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onApprovalSuccess(this.props.id)
  }
  _locationToRefuse (e) {
    e.stopPropagation()
    e.preventDefault()
    router.push('/shop/examine/' + this.props.id + '/reason')
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
