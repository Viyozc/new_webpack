import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'
import assign from 'lodash/assign'

import Loading from 'components/common/loading'
import Error from 'components/common/error'

import * as actions from 'actions/install/shop'
import * as shopActions from 'actions/shop'
import { clean } from 'actions/errorMessage'

import Style from './repairPoi.less'
const ZOOM = 16

class RepairPoi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locatedError: false,
      loadingMap: true
    }
  }

  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('确认位置信息')
  }

  componentDidMount () {
    this.props.actions.fetchShopInfoByDeviceNoOrShopId({shopId: this.props.location.query.shopId})
    this.props.shopInfo && Bridge.getLocation((res) => {
      if (!res.success) {
        this.setState({locatedError: true})
      } else if (res.data && res.data.split(',') && res.data.split(',').length) {
        this.setState({
          poiLongitude: res.data.split(',')[1],
          poiLatitude: res.data.split(',')[0]
        })
        this._checkMap(res.data.split(',')[1], res.data.split(',')[0])
      }
    })
  }

  render () {
    if ((!this.props.shopInfo && !this.props.error) || this.state.loadingMap) {
      return <Loading />
    }
    if (!this.props.shopInfo && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.state.locatedError) {
      return <Error>定位失败<p>请确定定位已打开后重试</p></Error>
    }
    return <div className='map' ref='map'>
      <div className='located-point'>
        <div />
      </div>
      <button className='confirm-button' onClick={this._confirm.bind(this)}>确认</button>
    </div>
  }

  _checkMap (longitude, latitude) {
    if (!window.AMap) {
      this._loadSDK(longitude, latitude)
    } else {
      this._initMap(longitude, latitude)
    }
  }

  _loadSDK (longitude, latitude) {
    let script = document.createElement('script')
    script.src = '//webapi.amap.com/maps?v=1.3&key=6d375756866bd7e046d03b0fc3bc9635'
    script.onload = () => {
      this._initMap(longitude, latitude)
    }
    document.body.appendChild(script)
  }

  _initMap (longitude, latitude) {
    let _this = this
    _this.setState({
      loadingMap: false
    }, function () {
      _this.map = new AMap.Map(_this.refs.map, {
        resizeEnable: true,
        center: [longitude, latitude],
        zoom: ZOOM,
        dragEnable: false,
        zoomEnable: false,
        doubleClickZoom: false
      })
    })
  }

  _confirm () {
    this.props.actions.confirmPoi(this.state.poiLatitude, this.state.poiLongitude, this.props.location.query.shopId)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.confirmed && nextProps.confirmed) {
      this.props.actions.resetShopConfirm()
      Bridge.setNetwork({
        shopName: this.props.shopInfo.shopName,
        phone: this.props.shopInfo.contactMobile
      }, (result) => {
        if (result.success) {
          if (this.props.location.query.type !== 'box') {
            let type = parseInt(result.data.type)
            let splitCode = result.data.code.split('/')
            let deviceNo = splitCode[splitCode.length - 1]
            // 如果是座充
            if (type === 4 || type === 5 || type === 6 || type === 7 || type === 9 || type === 10) {
              let typeTxt
              if (type === 4 || type === 5 || type === 6 || type === 7) {
                typeTxt = 'WiFi'
                router.replace('/device/bind?mac=' + (result.data.mac || '') + '&cloudId=' + (result.data.cloudId || '') + '&shopId=' + this.props.location.query.shopId + '&installNo=' + this.props.params.id + '&deviceType=' + type + '&typeTxt=' + typeTxt + '&deviceNo=' + deviceNo + '&oldDeviceNo=' + this.props.location.query.deviceNo || '')
              }
              if (type === 9 || type === 10) {
                typeTxt = '2G'
                router.replace('/device/bind?mac=' + (result.data.mac || '') + '&cloudId=' + (result.data.cloudId || '') + '&shopId=' + this.props.location.query.shopId + '&installNo=' + this.props.params.id + '&deviceType=' + type + '&typeTxt=' + typeTxt + '&deviceNo=' + deviceNo + '&oldDeviceNo=' + this.props.location.query.deviceNo || '')
                // router.replace(`/device/bind?deviceNo=${deviceNo}&shopId=${this.props.location.query.shioId}`)
              }
            }
            // 如果是盒子
            if (type === 8 || type === 13) {
              Toast.show('暂不支持更换其他设备类型，请走回收流程')
              router.replace(`/shops/${this.props.location.query.shopId}`)
              // router.replace('/device/bind/hezi?mac=' + (result.data.mac || '') + '&cloudId=' + (result.data.cloudId || '') + '&shopId=' + this.props.location.query.shopId + '&installNo=' + this.props.params.id + '&deviceType=' + type + '&deviceNo=' + deviceNo + '&oldDeviceNo=' + this.props.location.query.deviceNo || '')
            }
          } else if (this.props.location.query.type === 'box') {
            let type = parseInt(result.data.type)
            let splitCode = result.data.code.split('/')
            let deviceNo = splitCode[splitCode.length - 1]
            // 如果是座充
            if (type === 4 || type === 5 || type === 6 || type === 7 || type === 9 || type === 10) {
              Toast.show('暂不支持更换其他设备类型，请走回收流程')
              router.replace(`/shops/${this.props.location.query.shopId}`)
              // router.replace('/device/bind?mac=' + (result.data.mac || '') + '&cloudId=' + (result.data.cloudId || '') + '&shopId=' + this.props.location.query.shopId + '&installNo=' + this.props.params.id + '&deviceType=' + type + '&typeTxt=' + typeTxt + '&deviceNo=' + deviceNo + '&oldDeviceNo=' + this.props.location.query.oldDeviceNo || '')
            }
            // 如果是盒子
            if (type === 8 || type === 13) {
              router.replace('/device/bind/hezi?mac=' + (result.data.mac || '') + '&cloudId=' + (result.data.cloudId || '') + '&shopId=' + this.props.location.query.shopId + '&installNo=' + this.props.params.id + '&deviceType=' + type + '&deviceNo=' + deviceNo + '&oldDeviceNo=' + this.props.location.query.deviceNo || '')
            }
          }
        } else {
          let splitCode = result.data.code.split('/')
          let deviceNo = splitCode[splitCode.length - 1]
          // 如果设备已经绑定设备过了
          if (parseInt(result.code) === 308) {
            router.push({pathname: '/device/preconfirm', query: assign(this.props.location.query, {deviceNo}, {cloudId: result.data.cloudId || ''})})
          }
        }
      })
    }
    if (!this.props.shopInfo && nextProps.shopInfo) {
      Bridge.getLocation((res) => {
        if (!res.success) {
          this.setState({locatedError: true})
        } else if (res.data && res.data.split(',') && res.data.split(',').length) {
          this.setState({
            poiLongitude: res.data.split(',')[1],
            poiLatitude: res.data.split(',')[0]
          })
          this._checkMap(res.data.split(',')[1], res.data.split(',')[0])
        }
      })
    }
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanShopInfoByDeviceNoOrShopId()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    shopAddress: state.shopAddress && state.shopAddress.list,
    confirmed: state.shopAddress && state.shopAddress.confirmed,
    shopInfo: state.shopInfo
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, shopActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepairPoi)
