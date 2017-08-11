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
        let deviceType = parseInt(this.props.deviceType)
        let deviceTypeContent

        //判断设备类型
        if (deviceType === 0) {
          deviceTypeContent = ''
        }
        if (deviceType === 1) {
          deviceTypeContent = <i className="dianfont type icon-xiaodianzuochong"/>
        }
        if (deviceType === 2) {
          deviceTypeContent = <i className="dianfont type icon-hezi"/>
        }
        if (deviceType === 3) {
          deviceTypeContent = <span className="device-type"><i className="dianfont type icon-xiaodianzuochong"/><i
            className="dianfont type icon-hezi"/></span>
        }
        return <div className='item' onClick={() => this.props.onChoseShop(this.props.shopId)}>
          {includes(this.props.selectedShopIds, this.props.shopId) ? <div className='chose active'><i className='dianfont icon-gou' /></div> : <div className='chose' />}
          <p className='status red'>{this.props.statusLabel}</p>
          <div className='h4'>{this.props.shopName}{deviceTypeContent}</div>
          <p>门店类型：{this.props.typeName}</p>
          <p>联系方式：{this.props.contactMobile}</p>
          <p>安装地址：{this.props.address}</p>
          <p>签约时间：{this.props.contractTime}</p>
        </div>
      case BD_STATUS[1].status:
      case BD_STATUS[2].status:
        let deviceType2 = parseInt(this.props.deviceType)
        let deviceTypeContent2

        //判断设备类型
        if (deviceType2 === 0) {
          deviceTypeContent2 = ''
        }
        if (deviceType2 === 1) {
          deviceTypeContent2 = <i className="dianfont type icon-xiaodianzuochong"/>
        }
        if (deviceType2 === 2) {
          deviceTypeContent = <i className="dianfont type icon-hezi"/>
        }
        if (deviceType2 === 3) {
          deviceTypeContent2 = <span className="device-type"><i className="dianfont type icon-xiaodianzuochong"/><i
            className="dianfont type icon-hezi"/></span>
        }
        return <div className='item' onClick={() => this.props.onChoseShop(this.props.shopId)}>
          {includes(this.props.selectedShopIds, this.props.shopId) ? <div className='chose active'><i className='dianfont icon-gou' /></div> : <div className='chose' />}
          <p className='status green'>{this.props.statusLabel}</p>
          <div className='h4'>{this.props.shopName}{deviceTypeContent2}</div>
          <p>门店类型：{this.props.typeName}</p>
          <p>联系方式：{this.props.contactMobile}</p>
          <p>安装地址：{this.props.address}</p>
          <p>签约时间：{this.props.contractTime}</p>
        </div>
      default :
        return null
    }
  }
}
