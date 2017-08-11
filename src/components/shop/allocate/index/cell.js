import { BD_STATUS } from 'constants/bd'
import React, { PureComponent } from 'react'
import includes from 'lodash/includes'
import Style from './cell.less'

export default class CellComponent extends PureComponent {
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return this._renderDetail()
  }
  _renderDetail () {
    switch (parseInt(this.props.status)) {
      case BD_STATUS[0].status:
        return <div className='item' onClick={() => this.props.onChoseShop(this.props.shopId)}>
          {includes(this.props.selectedShopIds, this.props.shopId) ? <div className='chose active'><i className='dianfont icon-gou' /></div> : <div className='chose' />}
          <p className='status red'>{this.props.statusLabel}</p>
          <div className='h4'>{this.props.shopName}</div>
          <p>安装地址：{this.props.address}</p>
          <p>BD：{this.props.sellerName} {this.props.sellerMobile}</p>
        </div>
      case BD_STATUS[1].status:
      case BD_STATUS[2].status:
        return <div className='item' onClick={() => this.props.onChoseShop(this.props.shopId)}>
          {includes(this.props.selectedShopIds, this.props.shopId) ? <div className='chose active'><i className='dianfont icon-gou' /></div> : <div className='chose' />}
          <p className='status green'>{this.props.statusLabel}</p>
          <div className='h4'>{this.props.shopName}</div>
          <p>安装地址：{this.props.address}</p>
          <p>BD：{this.props.sellerName} {this.props.sellerMobile}</p>
        </div>
      default :
        return null
    }
  }
}
