import React, { Component } from 'react'
import { connect } from 'react-redux'
import assign from 'lodash/assign'
import { bindActionCreators } from 'redux'
import { router } from 'utils'
import Button from 'components/common/button'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Style from './confirm.less'
import { clean } from 'actions/errorMessage'
import Icon from 'components/common/icon'
import * as actions from 'actions/device'
import * as shopActions from 'actions/shop'

class ConfirmContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      success: false,
      isRequest: false
    }
  }

  componentWillMount () {
    Style.use()
  }

  componentDidMount () {
    this.props.actions.fetchShopInfoByDeviceNoOrShopIdCloudId({
      shopId: this.props.location.query.shopId,
      deviceNo: this.props.location.query.deviceNo,
      cloudId: this.props.location.query.cloudId || ''
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
    Bridge.setNavTitle('确认信息')
    return (
      <div className='confirm'>
        <p className='title'>门店名称</p>
        <p className='value'>{this.props.shopInfo.deviceInfo.shopName}</p>
        <p className='title'>设备二维码编号</p>
        <p className='value'>{this.props.shopInfo.deviceInfo.deviceNo}</p>
        <Button type='white' className='giveup' fixed
          onClick={() => router.push(`/shops/${this.props.location.query.shopId}`)}>门店信息有误，放弃安装</Button>
        <Button fixed onClick={() => {this._confirm()}}>确认</Button>
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
    Bridge.setNavTitle('确认信息')
    return (
      <div className='fail'>
        <p className='title red'>设备已安装到其他门店</p>
        <p className='subtitle'>请将已安装信息中的设备回收后重新安装</p>
        <div className='info'>已安装信息</div>
        <div className='value fail'>
          <p>门店名称: {this.props.shopInfo.installedInfo.shopName}</p>
          <p>小二: {this.props.shopInfo.installedInfo.bdName} <a href={`tel:${this.props.shopInfo.installedInfo.bdMobile}`}>{this.props.shopInfo.installedInfo.bdMobile}</a></p>
          <p>设备编号: {this.props.shopInfo.installedInfo.deviceNo}</p>
        </div>
        <p className='info'>当前安装信息</p>
        <div className='value'>
          <p>门店名称: {this.props.shopInfo.deviceInfo.shopName}</p>
          <p>设备编号: {this.props.shopInfo.deviceInfo.deviceNo}</p>
        </div>
        <Button fixed onClick={() => router.push(`/shops/${this.props.location.query.shopId}`)}>门店信息有误，放弃安装</Button>
      </div>
    )
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanBindInfo()
    this.props.actions.cleanBindShop()
    this.props.actions.cleanShopInfoByDeviceNoOrShopIdCloudId()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.error && nextProps.error && nextProps.shopInfo) {
      Toast.show(nextProps.error.message)
      this.props.actions.cleanErrorMessage()
    }
    if (nextProps.binded === 'request' || nextProps.heziBinded === 'request') {
      this.setState({
        isRequest: true
      })
    }
    // 座充绑定
    if (this.props.binded === 'request' && nextProps.binded === 'success') {
      Toast.show('设备绑定店铺成功')
      if (nextProps.location.query.oldDeviceNo && nextProps.location.query.oldDeviceNo !== 'undefined') {
        setTimeout(() => {
          window.history.go(-3)
        }, 2000)
      } else {
        setTimeout(() => {
          window.history.go(-2)
        }, 2000)
      }
      this.setState({
        isRequest: false
      })
    }
    // 盒子绑定
    if (this.props.heziBinded === 'request' && nextProps.heziBinded === 'success') {
      Toast.show('设备绑定店铺成功')
      sessionStorage.removeItem('xiaodian-heziTest-isAllTest')
      if (nextProps.location.query.oldDeviceNo && nextProps.location.query.oldDeviceNo !== 'undefined') {
        setTimeout(() => {
          window.history.go(-3)
        }, 2000)
      } else {
        setTimeout(() => {
          window.history.go(-2)
        }, 2000)
      }
      this.setState({
        isRequest: false
      })
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
      })
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
