import React, { Component } from 'react'
import {router} from 'utils'

import Style from './distributionItem.less'

export default class ItemComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    const products = this.props.products
    return (
      <div className='shop-item'>
        <div className='shop-item-header'>
          <h3>{this.props.applierName}</h3>
          <div className='status'>
            <p style={{color: this.props.activeTab['color']}}>{this.props.activeTab['label']}</p>
          </div>
        </div>

        <div className='shop-item-body'>
          {products[1] ? <p>设备数量(不带电池版)：{products[1]}</p> : null}
          {products[7] ? <p>设备数量(带电池版)：{products[7]}</p> : null}
          {products[2] ? <p>电源数量：{products[2]}</p> : null}
          {products[5] ? <p>适配器数量：{products[5]}</p> : null}
          {products[6] ? <p>餐牌数量：{products[6]}</p> : null}
        </div>

        <div className='shop-item-footer'>
          <div>
            <p>{this.props.status === 0 ? '申请时间' : '发货时间'}</p>
            <p>{this.props.status === 0 ? this.props.applyTime : this.props.deliveryTime}</p>
          </div>
          {
            this.props.status === 1
            ? <span onClick={this._goToDist.bind(this, products, this.props.applierName, this.props.applyTime)} className='dian-btn'>检货</span>
            : (
              this.props.status === 0
              ? <span onClick={this._goToCheck.bind(this, this.props.id)} className='dian-btn'>配货</span>
              : null
            )
          }
        </div>
      </div>
    )
  }
  _goToCheck (id) {
    this.props.getRepairDetail({id})
    this.props.showCheckList(id)
  }
  _goToDist (products) {
    router.push(`/warehouse/distribute?${this.props.isDemo ? 'demo=true&' : ''}id=${this.props.id}&applyName=${this.props.applierName}&applyTime=${this.props.applyTime}&products=${products[1] || 0}|${products[2] || 0}|${products[5] || 0}|${products[6] || 0}|${products[7] || 0}`)
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
