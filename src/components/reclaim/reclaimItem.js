import React, { Component } from 'react'
import { router } from 'utils'
import NProgress from 'utils/nprogress'

import Style from '../workOrder/repair/item.less'

export default class ShopItemComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    const {roleIndex, status} = this.props
    return (
      <a className='shop-item' onClick={() => roleIndex === 1 ? router.push(`/reclaim/${this.props.id}`) : null}>
        <div className='shop-item-header'>
          <h3>{this.props.shopName}</h3>
          <div className='status'>
            <p style={{color: status === 1 ? '#3DCF55' : '#FF5E45'}}>{this.props.statusLabel}</p>
          </div>
        </div>

        <div className='shop-item-body'>
          {
            roleIndex === 1 && status !== 1
            ? [
              <p key={0}>回收类型：{this.props.typeLabel}</p>,
              <p key={1}>回收原因：{this.props.recycleReason}</p>,
              <p key={2}>回收人：{this.props.recyclerName}</p>
            ] : null
          }
          <p>主机（电池版）数量：{this.props.expectDeviceWithBatteryNum}</p>
          <p>主机（无电池版）数量：{this.props.expectDeviceNobatteryNum}</p>
          <p>适配器数量：{this.props.expectAdapterNum}</p>
          <p>餐牌数量：{this.props.expectBrandNum}</p>
          {
            status === 1
            ? <div style={{borderTop: '1px solid #fff'}}>
              <p>实际主机数量：{this.props.realDeviceNum}</p>
              <p>实际适配器数量：{this.props.realAdapterNum}</p>
              <p>实际餐牌数量：{this.props.realBrandNum}</p>
            </div>
             : null
          }
          {
            status !== 1 ? <div>
              <p>联系人：{this.props.contractName}</p>
              <p>联系电话：{this.props.contractMobile}</p>
              <p>安装地址：{this.props.shopAddr}</p>
            </div> : null
          }
        </div>

        <div className='shop-item-footer'>
          <div>
            <p>创建时间</p>
            <p>{this.props.createTime}</p>
          </div>
          {
            status === 0
            ? (roleIndex === 1 ? <span className='dian-btn'>回收</span> : <span onClick={this._revoke.bind(this)} className='dian-btn'>撤销</span>)
            : null
          }
        </div>
      </a>
    )
  }
  _revoke () {
    NProgress.start()
    this.props.revoke({id: this.props.id})
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
