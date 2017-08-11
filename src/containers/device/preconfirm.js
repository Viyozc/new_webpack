import React, { Component } from 'react'
import { connect } from 'react-redux'
import assign from 'lodash/assign'
import { bindActionCreators } from 'redux'
import { router } from 'utils'
import Button from 'components/common/button'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Style from './preconfirm.less'
import { clean } from 'actions/errorMessage'
import Icon from 'components/common/icon'
import * as actions from 'actions/device'
import * as shopActions from 'actions/shop'

class ConfirmContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      success: false
    }
  }

  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('确认信息')
  }

  componentDidMount () {
    this.props.actions.fetchShopInfoByDeviceNoOrShopId({
      shopId: this.props.location.query.shopId,
      deviceNo: this.props.location.query.deviceNo
    })
  }

  render () {
    if (!(this.props.shopInfo) && !this.props.error) {
      return <Loading />
    }
    if (!(this.props.shopInfo) && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return this.props.shopInfo.isBind ? this._renderFail() : this._renderSuccess()
  }

  _renderSuccess () {
    return (
      <div className='preconfirm'>
        <p className='title'>门店名称</p>
        <p className='value'>{this.props.shopInfo.shopName}</p>
        <p className='title'>设备二维码编号</p>
        <p className='value'>{this.props.location.query.deviceNo}</p>
        <Button type='white' className='giveup' fixed
          onClick={() => router.push(`/shops/${this.props.location.query.shopId}`)}>门店信息有误，放弃安装</Button>
        <Button fixed onClick={() => this._confirm()}>确认</Button>
        {
          this.state.success
            ? <div className='added'>
              <Icon name='tianjiachenggong' />
              <p>添加成功</p>
            </div>
            : null
        }
      </div>
    )
  }

  _renderFail () {
    return (
      <div className='fail'>
        <p className='title red'>已绑定其他门店</p>
        <p className='subtitle'>设备已绑定到以下门店，请联系该门店小二解除设备绑定后再安装。</p>
        <div className='value fail'>
          <p>{this.props.shopInfo.shopName}</p>
          <a
            href={`tel:${this.props.shopInfo.sellerMobile}`}>小二：{this.props.shopInfo.sellerName} {this.props.shopInfo.sellerMobile}</a>
        </div>
        <p className='title'>设备二维码编号</p>
        <p className='value'>{this.props.location.query.deviceNo}</p>
        <Button type='white' className='giveup' fixed
          onClick={() => router.push(`/shops/${this.props.location.query.shopId}`)}>返回门店详情</Button>
        <Button fixed onClick={() => { router.goBack() }}>已联系解除，重新安装</Button>
      </div>
    )
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanBindInfo()
    this.props.actions.cleanBindShop()
    this.props.actions.cleanShopInfoByDeviceNoOrShopId()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.error && nextProps.error && nextProps.shopInfo) {
      Toast.show(nextProps.error.message)
      this.props.actions.clearErrorMessage()
    }
    if (this.props.shopInfo !== nextProps.shopInfo && nextProps) {

    }
    // 座充绑定
    if (this.props.binded === 'request' && nextProps.binded === 'success') {
      Toast.show('设备绑定店铺成功')
      setTimeout(() => {
        window.history.go(-2)
      }, 2000)
    }
    // 盒子绑定
    if (this.props.heziBinded === 'request' && nextProps.heziBinded === 'success') {
      Toast.show('设备绑定店铺成功')
      setTimeout(() => {
        window.history.go(-2)
      }, 2000)
    }
  }

  _confirm () {
    // 座充
    if (parseInt(this.props.location.query.deviceType) !== 8) {
      this.props.actions.bindToShop({
        mac: this.props.location.query.mac,
        cloudId: this.props.location.query.cloudId,
        shopId: this.props.location.query.shopId,
        deviceNo: this.props.location.query.deviceNo,
        installNo: this.props.location.query.installNo,
        productId: this.props.location.query.productId,
        oldDeviceNo: this.props.location.query.oldDeviceNo && this.props.location.query.oldDeviceNo !== 'undefined' ? this.props.location.query.oldDeviceNo : ''
      })
    } else {
      //  盒子
      this.props.actions.heziBindToShop({
        cloudId: this.props.location.query.cloudId,
        deviceNo: this.props.location.query.deviceNo,
        oldDeviceNo: this.props.location.query.oldDeviceNo && this.props.location.query.oldDeviceNo !== 'undefined' ? this.props.location.query.oldDeviceNo : '',
        shopId: this.props.location.query.shopId,
        productId: this.props.location.query.productId
      }
      )
    }
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    shopInfo: state.shopInfo,
    binded: state.deviceBind && state.deviceBind.binded,
    heziBinded: state.deviceBind && state.deviceBind.heziBinded
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, shopActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmContainer)
