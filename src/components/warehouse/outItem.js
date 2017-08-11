import React, { Component } from 'react'
import {router} from 'utils'

import Style from './distributionItem.less'

export default class ItemComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    const products = this.props.detail
    return (
      <div className='shop-item'>
        <div className='shop-item-header'>
          <h3>{this.props.shopName || this.props.applier}</h3>
          <div className='status'>
            <p style={{color: this.props.activeTab['color']}}>{this.props.activeTab['label']}</p>
          </div>
        </div>

        <div className='shop-item-body'>
          {products.map((o, i) => <p key={i}>{o.name}：{o.count}</p>)}
        </div>

        <div className='shop-item-footer'>
          <div>
            <p>{this.props.status === 1 ? '申请时间' : '配货时间'}</p>
            <p>{this.props.status === 1 ? this.props.applyTime : this.props.allocateTime}</p>
          </div>
          {
            this.props.status === 2
            ? null
            : (
              this.props.status === 1
              ? <span onClick={this._goToCheck.bind(this, this.props.installNo)} className='dian-btn'>配货</span>
              : null
            )
          }
        </div>
      </div>
    )
  }
  _goToCheck (installNo) {
    this.props.getDetail({installNo})
    this.props.showCheckList(installNo)
  }
  _goToDist (products) {
    let counts = [0, 0, 0, 0]
    let names = ['设备数量', '电池数量', '适配器数量', '餐牌数量']
    for (let i = 0; i < products.length; i++) {
      let name = products[i]['name']
      let count = products[i]['count']
      for (let j = 0; j < names.length; j++) {
        if (name === names[j]) {
          counts[i] = count
          break
        }
      }
    }
    router.push(`/warehouse/distribute?out=true&id=${this.props.id}&applyName=${this.props.applier}&applyTime=${this.props.allocateTime}&products=${counts.join('|')}`)
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
