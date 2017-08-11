import React, { Component } from 'react'

import Style from '../workOrder/repair/item.less'

export default class ShopItemComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <a className='shop-item'>
        <div className='shop-item-header'>
          <h3>{this.props.shopName}</h3>
          <div className='status'>
            <p style={{color: this.props.status === 2 ? '#3DCF55' : '#FF5E45'}}>{this.props.statusLabel}</p>
          </div>
        </div>

        <div className='shop-item-body'>
          <p>主机：{this.props.deviceNum}</p>
          <p>适配器：{this.props.adapterNum}</p>
          <p>餐牌：{this.props.brandNum}</p>
          <p>联系人：{this.props.contractName}</p>
          <p>联系电话：{this.props.contractMobile}</p>
          <p>安装地址：{this.props.shopAddr}</p>
        </div>

        <div className='shop-item-footer'>
          <div>
            <p>创建时间</p>
            <p>{this.props.createTime}</p>
          </div>
          {this.props.status === 0 ? <span onClick={this._return.bind(this)} className='dian-btn'>退回</span> : null}
        </div>
      </a>
    )
  }
  _return () {
    this.props.toBack({id: this.props.id})
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
