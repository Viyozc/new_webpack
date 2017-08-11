import React, { Component } from 'react'
import classnames from 'classnames'
import Button from 'components/common/button'
import { router, limitFontSize } from 'utils'
import Style from './item.less'

export default class ShopItemComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowOpc: false
    }
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

    let originType = parseInt(this.props.originType)
    let deviceType = parseInt(this.props.deviceType)
    let deviceTypeContent
    let content

    // 判断店铺类型
    if (originType === 0) {
      content = <p className='redDirect'>直营</p>
    }
    if (originType === 2) {
      content = <p className='buleAgent'>服务商</p>
    }
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
      deviceTypeContent = <span className='device-type clearfix'><i className='dianfont type icon-xiaodianzuochong' /><i
        className='dianfont type icon-hezi' /></span>
    }

    if (this.props.status === 0) {
      return (
        <div className={cls} {...others}>
          <div className='shop-item-header' onClick={() => { router.push('/shops/' + this.props.shopId) }}>
            <h3>{limitFontSize(this.props.shopName, 10, true)}</h3>
            {deviceTypeContent}
            {content}
            <div className='status red'>
              <p>{this.props.statusLabel}</p>
              <p />
            </div>
          </div>

          <div className='shop-item-body' onClick={() => { router.push('/shops/' + this.props.shopId) }}>
            <p>门店联系人：{this.props.contactName}</p>
            <p>联系人电话：{this.props.contactMobile}</p>
            <p>门店电话：{this.props.mobile}</p>
            <p>地址：{this.props.address}</p>
            <p>{this.props.role === 'agencyBoss' ? '员工' : 'BD小二'}：{this.props.sellerNick}&nbsp;&nbsp;&nbsp;{this.props.sellerMobile}</p>
          </div>

          <div className='shop-item-footer'>
            <div>
              <p>创建时间：{this.props.createTime}</p>
            </div>
            {this.props.role === 'agencyBD' || this.props.role === 'agencyBoss'
              ? <div className='btn-box'>
                {this.props.originType === 2
                  ? <Button className='shamBd' onClick={(e) => { router.push('/shops/fake/' + this.props.shopId) }}>虚假BD</Button>
                  : null}
                {this.props.originType === 1
                  ? <Button onClick={(e) => { this._locationToEdit(e, this.props.shopId) }}>安装</Button>
                  : <Button onClick={(e) => { this._goMap() }}>安装</Button>}
              </div>
              : null
            }
            {this.props.role === 'agentSeller'
              ? <div className='btn-box'>
                {this.props.originType === 2
                  ? <Button className='shamBd' onClick={(e) => { router.push('/shops/fake/' + this.props.shopId) }}>虚假BD</Button> : null}
                {this.props.originType === 1
                  ? <Button onClick={(e) => { this._locationToEdit(e, this.props.shopId) }}>安装</Button>
                  : <Button onClick={(e) => { this._goMap() }}>安装</Button>}
              </div>
              : null
            }
            {this.props.role === 'agentSellerManager'
              ? <div className='btn-box'>
                <Button onClick={(e) => { this._locationToChange(e, this.props.shopId) }}>更换BD</Button>
              </div>
              : null
            }
          </div>
        </div>
      )
    }
    if (this.props.status === 4) {
      return (
        <div className={cls} {...others}>
          <div className='shop-item-header' onClick={() => { router.push('/shops/' + this.props.shopId) }}>
            <h3>{limitFontSize(this.props.shopName, 10, true)}</h3>
            {deviceTypeContent}
            {content}
            <div className='status green'>
              <p>{this.props.statusLabel}</p>
              <p />
            </div>
          </div>

          <div className='shop-item-body' onClick={() => { router.push('/shops/' + this.props.shopId) }}>
            {this.props.products && this.props.products.map((item, i) => {
              return <p key={i}>{item.productName}:{item.normalNum || '0'}</p>
            })}
            <p>价格标准：{this.props.priceTypeText}</p>
            <p>安装地址：{this.props.address}</p>
            {this.props.warehouse ? <p>仓库：{this.props.warehouse}</p> : null}
            {this.props.deliverName ? <p>配送员：{this.props.deliverName}</p> : null}
          </div>

          <div className='shop-item-footer'>
            <div>
              <p>创建时间：{this.props.createTime}</p>
            </div>
            {this.props.role === 'agencyBD' || this.props.role === 'agencyBoss'
              ? <div className='btn-box'>
                <Button className='btn-add-device' onClick={(e) => { this._goMap(e) }}>增加设备</Button>
                <Button onClick={(e) => { this._locationToReclaim(e) }}>申请回收</Button>
              </div>
              : null
            }
            {this.props.role === 'agentSeller'
              ? <div className='btn-box'>
                <Button className='btn-add-device' onClick={(e) => { this._goMap(e) }}>增加设备</Button>
                <Button onClick={(e) => { this._locationToReclaim(e) }}>申请回收</Button>
              </div>
              : null
            }
            {this.props.role === 'agentSellerManager'
              ? <div className='btn-box'>
                <Button onClick={(e) => { this._locationToChange(e, this.props.shopId) }}>更换BD</Button>
              </div>
              : null
            }
          </div>
        </div>
      )
    }
    // 待确认
    if (this.props.status === 2) {
      return (
        <div className={cls} {...others}>
          <div className='shop-item-header' onClick={() => { router.push('/shops/' + this.props.shopId) }}>
            <h3>{limitFontSize(this.props.shopName, 10, true)}</h3>
            {deviceTypeContent}
            {content}
            <div className='status red'>
              <p>{this.props.statusLabel}</p>
              <p />
            </div>
          </div>

          <div className='shop-item-body' onClick={() => { router.push('/shops/' + this.props.shopId) }}>
            <p>门店联系人：{this.props.contactName}</p>
            <p>联系人电话：{this.props.contactMobile}</p>
            <p>门店电话：{this.props.mobile}</p>
            <p>地址：{this.props.address}</p>
            <p>{this.props.role === 'agencyBoss' ? '员工' : 'BD小二'}：{this.props.sellerNick}&nbsp;&nbsp;&nbsp;{this.props.sellerMobile}</p>
          </div>

          <div className='shop-item-body reason-body' onClick={() => { router.push('/shops/' + this.props.shopId) }}>
            <p>虚假BD：<i className='red'>{this.props.unableInstallReason}</i></p>
          </div>

          {this.props.role === 'channelManager' ? <div className='shop-item-btn'>
            <button className='btn-refuse' onClick={() => this.props.auditing(2, this.props.shopId)}>拒绝</button>
            <button className='btn-pass' onClick={() => this.props.auditing(1, this.props.shopId)}>同意</button>
          </div> : null}

          <div className='shop-item-footer'>
            <div>
              <p>创建时间：{this.props.createTime}</p>
            </div>
          </div>
        </div>
      )
    }
    if (this.props.status === 5) {
      return (
        <div className={cls} {...others}>
          <div className='shop-item-header' onClick={() => { router.push('/shops/' + this.props.shopId) }}>
            <h3>{limitFontSize(this.props.shopName, 10, true)}</h3>
            {deviceTypeContent}
            {content}
            <div className='status orange'>
              <p>{this.props.statusLabel}</p>
              <p />
            </div>
          </div>
          <div className='shop-item-body' style={{marginBottom: 2}}
            onClick={() => { router.push('/shops/' + this.props.shopId) }}>
            <p>门店类型：{this.props.typeName || ''}</p>
            <p>门店地址：<br /></p>
            <p>{this.props.address || ''}</p>
          </div>
          <div className='shop-item-body'>
            <p>原因：{this.props.unableInstallReason || '暂无'}</p>
          </div>
          <div className='shop-item-footer'>
            <div>
              <p>更新时间：{this.props.createTime}</p>
            </div>
          </div>
        </div>
      )
    }
  }

  _locationToEdit (e, shopId) {
    e.stopPropagation()
    e.preventDefault()
    router.push('/shop/edit?shopId=' + this.props.shopId)
  }

  _locationToReclaim (e) {
    e.stopPropagation()
    e.preventDefault()
    router.push('/reclaim/bd/' + this.props.shopId + '/device')
  }

  _locationToChange (e) {
    e.stopPropagation()
    e.preventDefault()
    router.push('/shop/allocate/chose?shopIds=' + this.props.shopId)
  }

  componentWillUnmount () {
    Style.unuse()
  }

  _goMap () {
    router.push(`/shops/0/install/confirmPoi?shopId=${this.props.shopId}`)
  }
}
