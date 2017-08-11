import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import assign from 'lodash/assign'
import { router } from 'utils'

import Button from 'components/common/button'
import Root from 'components/common/root'
import BindSuccessComponent from 'components/device/bindSuccess'
import TurnSwitchComponent from 'components/device/turnSwitch'
import * as actions from 'actions/device'
import * as shopActions from 'actions/shop'
import { clean } from 'actions/errorMessage'

class DeviceBindContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countdown: 10,
      deviceNo: ''
    }
  }

  componentWillMount () {
    Bridge.setNavTitle('设备测试')
  }

  render () {
    return (
      <Root loading={!(this.props.data && this.props.shopInfo) && !this.props.error}
        errorMessage={!(this.props.data && this.props.shopInfo) && this.props.error && this.props.error.message}>
        {this._renderBindSuccess()}
      </Root>
    )
  }

  componentDidMount () {
    this.props.actions.fetchShopInfoByDeviceNoOrShopId({shopId: this.props.location.query.shopId})
    // this.props.actions.getBindInfo(this.props.location.query.deviceId, this.props.location.query.shopId)
    this._countdown = setInterval(() => {
      if (this.state.countdown === 0) {
        clearInterval(this._countdown)
        return
      }
      this.setState({countdown: --this.state.countdown})
    }, 1000)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.error && nextProps.error && nextProps.data) {
      Toast.show(nextProps.error.message)
      this.props.actions.clearErrorMessage()
    }
  }

  _renderBindSuccess () {
    return (
      <div>
        <BindSuccessComponent>
          <p>{(this.props.data.turn || this.props.data.turn2G) ? '充电已开启' : (this.props.location.query.typeTxt || '网络') + '连接成功'}</p>
          <p>{(this.props.data.turn || this.props.data.turn2G) ? '若无法充电请再次点击' : `${this.state.countdown ? this.state.countdown + '秒后' : ''}点击按钮测试设备`}</p>
        </BindSuccessComponent>
        <TurnSwitchComponent value={this.props.data && (this.props.data.turn || this.props.data.turn2G)}
          onClick={this.state.countdown ? null : this._handleTurnSwitch.bind(this)} />
        {(this.props.data.turn || this.props.data.turn2G) ?
          <Button onClick={this._bind.bind(this)} className='complete' fixed>设备正常, 确认安装</Button> : null}
        {(this.props.data.turn || this.props.data.turn2G) ?
          <Button onClick={this._config.bind(this)} type='white' fixed>无法充电，需更换设备</Button> :
            <Button onClick={this._config.bind(this)} type='white' fixed>无法点击，需更换设备</Button>}
      </div>
    )
  }

  _handleTurnSwitch () {
    // 如果是座充wifi版
    if (this.props.location.query.typeTxt !== '2G') {
      this.props.data.turn
        ? this.props.actions.turnOff(
          {
            mac: this.props.location.query.mac,
            cloudId: this.props.location.query.cloudId,
            turn: 'off'
          }
      )
        : this.props.actions.turnOn(
          {
            mac: this.props.location.query.mac,
            cloudId: this.props.location.query.cloudId,
            turn: 'on'
          }
      )
    } else {
      // 如果是座充2G版
      this.props.data.turn2G
        ? this.props.actions.turnOff2G(
          {
            deviceNo: this.props.location.query.deviceNo,
            turn: 'off'
          }
      )
        : this.props.actions.turnOn2G({
          deviceNo: this.props.location.query.deviceNo,
          turn: 'on'
        })
    }
  }

  _bind () {
    router.push({
      pathname: '/device/confirm',
      query: this.props.location.query
    })
  }

  _config () {
    Bridge.setNetwork({
      shopName: this.props.shopInfo.shopName,
      phone: this.props.shopInfo.contactMobile
    },
      (result) => {
        if (result.success) {
          let type = parseInt(result.data.type)
          let splitCode = result.data.code.split('/')
          let deviceNo = splitCode[splitCode.length - 1]
          // 如果是座充
          if (type === 4 || type === 5 || type === 6 || type === 7 || type === 9 || type === 10) {
            let typeTxt
            if (type === 4 || type === 5 || type === 6 || type === 7) {
              typeTxt = 'WiFi'
            }
            if (type === 9 || type === 10) {
              typeTxt = '2G'
            }
            router.replace('/device/bind?mac=' + (result.data.mac || '') + '&cloudId=' + (result.data.cloudId || '') + '&shopId=' + this.props.location.query.shopId + '&installNo=' + this.props.location.query.installNo + '&deviceType=' + type + '&typeTxt=' + typeTxt + '&deviceNo=' + deviceNo + '&oldDeviceNo=' + this.props.location.query.oldDeviceNo || '')
            window.location.reload()
          }
          // 如果是盒子
          if (type === 8) {
            router.replace('/device/bind/hezi?mac=' + (result.data.mac || '') + '&cloudId=' + (result.data.cloudId || '') + 'shopId=' + this.props.location.query.shopId + '&installNo=' + this.props.location.query.installNo + '&deviceType=' + type + '&deviceNo=' + deviceNo + '&oldDeviceNo=' + this.props.location.query.oldDeviceNo || '')
          }
        } else {
          let splitCode = result.data.code.split('/')
          let deviceNo = splitCode[splitCode.length - 1]
          // 如果设备已经绑定设备过了
          if (parseInt(result.code) === 308) {
            router.push({pathname: '/device/confirm', query: assign({deviceNo}, this.props.location.query, {cloudId: result.data.cloudId || ''})})
          }
        }
      })
  }

  componentWillUnmount () {
    this._countdown && clearInterval(this._countdown)
    this.props.actions.cleanBindInfo()
    this.props.actions.cleanShopInfoByDeviceNoOrShopId()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.deviceBind,
    shopInfo: state.shopInfo
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, shopActions, {
      clearErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceBindContainer)
