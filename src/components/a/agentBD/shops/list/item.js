import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'components/link'
import Button from 'components/common/button'
import { router, limitFontSize } from 'utils'
import Style from './item.less'
import * as Bridge from 'utils/bridge'

export default class ShopItemComponent extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    Style.use()
  }

  render () {
    return (
      <div>
        {this._renderDetail()}
      </div>
    )
  }

  _renderDetail () {
    let className = this.props.className
    let others = this.props.others
    let cls = classnames({
      'shop-item': true,
      [className]: className
    })
    let deviceType = parseInt(this.props.deviceType)
    let deviceTypeContent

    // 判断设备类型
    if (deviceType === 0) {
      deviceTypeContent = ''
    }
    if (deviceType === 1) {
      deviceTypeContent = <i className='dianfont type icon-xiaodianzuochong' />
    }
    if (deviceType === 2) {
      deviceTypeContent = <i className='dianfont type icon-hezi' />
    }
    if (deviceType === 3) {
      deviceTypeContent = <span className='device-type'><i className='dianfont type icon-xiaodianzuochong' /><i
        className='dianfont type icon-hezi' /></span>
    }
    // 可签约
    if (this.props.tabStatus === 0) {
      return (
        <div className={cls} {...others}>
          <div className='shop-item-header'>
            <h3>{limitFontSize(this.props.shopName, 10, true)}{deviceTypeContent}</h3>
            <div className='status red'>
              <p className='status-label'>
                {this.props.statusLabel}
                <i className='distance'>距离：{parseFloat(this.props.distance).toFixed(2)}Km</i>
              </p>
              <p />
            </div>
          </div>

          <div className='shop-item-body'>
            <i className='dianfont icon-location' onClick={(e) => this._goMap(e)} />
            <p><label className='title'>门店类型：</label>{this.props.parentTypeName + '-' + this.props.typeName}</p>
            <p><label className='title'>门店等级：</label>{this.props.leadsTypeLabel || ''}</p>
            <p><label className='title'>门店电话：</label><a className='link'
              href={`tel: ${this.props.mobile || ''}`}>{this.props.mobile}</a>
            </p>
            <p><label className='title'>门店地址：</label></p>
            <p className='shop-sign-address'>{this.props.address}</p>
          </div>

          <div className='shop-item-footer'>
            <div className='btn-box'>
              <Button onClick={(e) => this._signShop(e)}>签约</Button>
            </div>
          </div>
        </div>
      )
    }
    // 待安装
    if (this.props.tabStatus === 1) {
      return (
        <div className={cls} {...others} to={'/a/agentBD/shops/' + this.props.id}>
          <div className='shop-item-header'>
            <h3>{limitFontSize(this.props.shopName, 10, true)}{deviceTypeContent}</h3>
            <div className='status red'>
              <p>{this.props.statusLabel}</p>
              <p />
            </div>
          </div>

          <div className='shop-item-body'>
            <i className='dianfont icon-location' onClick={(e) => this._goMap(e)} />
            <p>联系人：{this.props.contactName}</p>
            <p>联系人电话：{this.props.contactMobile}</p>
            <p>门店等级：{this.props.leadsTypeLabel || ''}</p>
            <p>门店电话：<a className='link' href={`tel:${this.props.mobile || ''}`}>{this.props.mobile}</a></p>
            <p>地址：{this.props.address}</p>
          </div>

          <div className='shop-item-footer'>
            <div>
              <p className='time-and-bd'>
                <span className='time'>签约时间：{this.props.contractTime}</span>
                {this.props.role === 'bdAgencyBoss' ? <span className='bd'>代理BD：{this.props.bdAgentName}</span> : null}
              </p>
            </div>
          </div>
        </div>
      )
    }
    // 待审核
    if (this.props.tabStatus === 6) {
      return (
        <div className={cls} {...others} to={'/a/agentBD/shops/' + this.props.id}>
          <div className='shop-item-header'>
            <h3>{limitFontSize(this.props.shopName, 10, true)}{deviceTypeContent}</h3>
            <div className='status red'>
              <p>{this.props.statusLabel}</p>
              <p />
            </div>
          </div>

          <div className='shop-item-body'>
            <i className='dianfont icon-location' onClick={(e) => this._goMap(e)} />
            <p>联系人：{this.props.contactName}</p>
            <p>联系人电话：{this.props.contactMobile}</p>
            <p>门店等级：{this.props.leadsTypeLabel || ''}</p>
            <p>门店电话：<a className='link' href={`tel:${this.props.mobile || ''}`}>{this.props.mobile}</a></p>
            <p>地址：{this.props.address}</p>
          </div>

          <div className='shop-item-footer'>
            <div>
              <p className='time-and-bd'>
                <span className='time'>签约时间：{this.props.contractTime}</span>
                {this.props.role === 'bdAgencyBoss' ? <span className='bd'>代理BD：{this.props.bdAgentName}</span> : null}
              </p>
            </div>
          </div>
        </div>
      )
    }
    // 已安装
    if (this.props.tabStatus === 2) {
      return (
        <div className={cls} {...others} to={'/a/agentBD/shops/' + this.props.id}>
          <div className='shop-item-header'>
            <h3>{limitFontSize(this.props.shopName, 10, true)}</h3>
            {deviceTypeContent}
            <div className='status green'>
              <p>{this.props.statusLabel}</p>
              <p />
            </div>
          </div>

          <div className='shop-item-body'>
            <i className='dianfont icon-location' onClick={(e) => this._goMap(e)} />
            <p>联系人：{this.props.contactName}</p>
            <p>联系人电话：{this.props.contactMobile}</p>
            <p>门店等级：{this.props.leadsTypeLabel || ''}</p>
            <p>门店电话：<a className='link' href={`tel:${this.props.mobile || ''}`}>{this.props.mobile}</a></p>
            <p>地址：{this.props.address}</p>
          </div>

          <div className='shop-item-footer'>
            <div>
              <p className='time-and-bd'>
                <span className='time'>签约时间：{this.props.contractTime}</span>
                {this.props.role === 'bdAgencyBoss' ? <span className='bd'>代理BD：{this.props.bdAgentName}</span> : null}
              </p>
            </div>
          </div>
        </div>
      )
    }
    // 无法安装
    if (this.props.tabStatus === 3) {
      return (
        <div className={cls} {...others} to={'/a/agentBD/shops/' + this.props.id}>
          <div className='shop-item-header'>
            <h3>{limitFontSize(this.props.shopName, 10, true)}</h3>
            {deviceTypeContent}
            <div className='status orange'>
              <p>{this.props.statusLabel}</p>
              <p />
            </div>
          </div>

          <div className='shop-item-body'>
            <i className='dianfont icon-location' onClick={(e) => this._goMap(e)} />
            <p><label className='title'>门店类型：</label>{this.props.parentTypeName + '-' + this.props.typeName}</p>
            <p><label className='title'>门店等级：</label>{this.props.leadsTypeLabel || ''}</p>
            <p>门店电话：<a className='link' href={`tel:${this.props.mobile || ''}`}>{this.props.mobile}</a></p>
            <p><label className='title'>门店地址：</label></p>
            <p className='shop-sign-address'>{this.props.address}</p>
          </div>

          <div className='shop-item-body shop-item-body-reason'>
            <p className='fail-reason'>
              <label className='title'>原因：</label><span className='desc'>{this.props.unableInstallReason}</span></p>
          </div>

          <div className='shop-item-footer'>
            <div>
              <p className='time-and-bd'>
                <span className='time'>更新时间：{this.props.updateTime}</span>
                {this.props.role === 'bdAgencyBoss' ? <span className='bd'>代理BD：{this.props.bdAgentName}</span> : null}
              </p>
            </div>
          </div>
        </div>
      )
    }
    // 30天之内回收
    if (this.props.tabStatus === 4) {
      return (
        <div className={cls} {...others} to={'/a/agentBD/shops/' + this.props.id}>
          <div className='shop-item-header'>
            <h3>{limitFontSize(this.props.shopName, 10, true)}</h3>
            {deviceTypeContent}
            <div className='status gray'>
              <p>{this.props.statusLabel}</p>
              <p />
            </div>
          </div>

          <div className='shop-item-body'>
            <i className='dianfont icon-location' onClick={(e) => this._goMap(e)} />
            <p><label className='title'>门店类型：</label>{this.props.parentTypeName + '-' + this.props.typeName}</p>
            <p><label className='title'>门店等级：</label>{this.props.leadsTypeLabel || ''}</p>
            <p><label className='title'>门店电话：</label><a className='link'
              href={`tel:${this.props.mobile || ''}`}>{this.props.mobile}</a>
            </p>
            <p><label className='title'>门店地址：</label></p>
            <p className='shop-sign-address'>{this.props.address}</p>
          </div>

          <div className='shop-item-body shop-item-body-reason'>
            <p className='fail-reason'>
              <label className='title'>原因：</label><span className='desc'>{this.props.recycleReason}</span></p>
          </div>

          <div className='shop-item-footer'>
            <div>
              <p className='time-and-bd'>
                <span className='time'>更新时间：{this.props.updateTime}</span>
                {this.props.role === 'bdAgencyBoss' ? <span className='bd'>代理BD：{this.props.bdAgentName}</span> : null}
              </p>
            </div>
          </div>
        </div>
      )
    }
    // 30天之后回收
    if (this.props.tabStatus === 5) {
      return (
        <div className={cls} {...others} to={'/a/agentBD/shops/' + this.props.id}>
          <div className='shop-item-header'>
            <h3>{limitFontSize(this.props.shopName, 10, true)}</h3>
            {deviceTypeContent}
            <div className='status gray'>
              <p>{this.props.statusLabel}</p>
              <p />
            </div>
          </div>

          <div className='shop-item-body' onClick={(e) => this._goMap(e)}>
            <i className='dianfont icon-location' />
            <p><label className='title'>门店类型：</label>{this.props.parentTypeName + '-' + this.props.typeName}</p>
            <p><label className='title'>门店等级：</label>{this.props.leadsTypeLabel || ''}</p>
            <p><label className='title'>门店电话：</label><a className='link'
              href={`tel:${this.props.mobile || ''}`}>{this.props.mobile}</a>
            </p>
            <p><label className='title'>门店地址：</label></p>
            <p className='shop-sign-address'>{this.props.address}</p>
          </div>

          <div className='shop-item-body shop-item-body-reason'>
            <p className='fail-reason'>
              <label className='title'>原因：</label><span className='desc'>{this.props.recycleReason}</span></p>
          </div>

          <div className='shop-item-footer'>
            <div>
              <p className='time-and-bd'>
                <span className='time'>更新时间：{this.props.updateTime}</span>
                {this.props.role === 'bdAgencyBoss' ? <span className='bd'>代理BD：{this.props.bdAgentName}</span> : null}
              </p>
            </div>
          </div>
        </div>
      )
    }
  }

  // 签约门店  测网 签约门店
  _signShop (e) {
    e.stopPropagation()
    e.preventDefault()
    Bridge.testNetwork((result) => {
      if (result.data) {
        if (result.data.cancel) {
          router.push('/a/agentBD/cancel/' + this.props.id)
        } else {
          router.push('/a/agentBD/shops/create/' + this.props.id)
        }
      }
    }, {'cancelText': '取消签约', 'submitText': '下一步'})
  }

  // 跳转对应地图
  _goMap (e) {
    e.stopPropagation()
    e.preventDefault()
    Bridge.map({
      longitude: this.props.poiLongitude,
      latitude: this.props.poiLatitude,
      name: this.props.shopName,
      address: this.props.address
    })
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
