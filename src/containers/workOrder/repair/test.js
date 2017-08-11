import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NProgress from 'utils/nprogress'
import * as Bridge from 'utils/bridge'
import assign from 'lodash/assign'
import { router } from 'utils'

import Button from 'components/common/button'
import Icon from 'components/common/icon'
import Root from 'components/common/root'
import AlertChoseDeviceType from 'components/common/alertChoseDeviceType'
import BindSuccessComponent from 'components/device/bindSuccess'
import TurnSwitchComponent from 'components/device/turnSwitch'
import DeviceInfo from 'components/workOrder/repair/deviceInfo'
import DeviceStatus from 'components/workOrder/repair/deviceStatus'

import * as actions from 'actions/device'
import * as repairActions from 'actions/repair/workOrder'
import { clean } from 'actions/errorMessage'

import Style from './test.less'

class DeviceBindContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countdown: 10,
      success: false,
      isShowOpc: false
    }
  }

  componentWillMount () {
    Bridge.setNavTitle('设备测试')
    Style.use()
  }

  componentDidMount () {
    // this.props.actions.getBindInfo(this.props.location.query.deviceId, this.props.location.query.shopId)
    this._countdown = setInterval(() => {
      if (this.state.countdown === 0) {
        clearInterval(this._countdown)
        return
      }
      this.setState({countdown: --this.state.countdown})
    }, 1000)
    if (this.props.location.query.deviceNo) {
      this.props.actions.getDevice(this.props.location.query.deviceNo, this.props.location.query.shopId)
    }
  }

  render () {
    const device = this.props.device
    return (
      <Root className='repair-test' loading={!this.props.device && !this.props.error}
        errorMessage={!this.props.device && this.props.error && this.props.error.message}>
        <DeviceInfo device={device} />
        <DeviceStatus device={device} />
        {device && device.status === 0 ? this._renderBindSuccess() : (device ? this._renderBindFailure() : null)}
        <AlertChoseDeviceType Bridge={Bridge} closeOpc={() => { this.setState({isShowOpc: false}) }}
          isShowOpc={this.state.isShowOpc} router={router}
          installNo={this.props.location.query.installNo}
          oldDeviceNo={this.props.location.query.deviceNo}
          type={'repair'}
          shopId={this.props.location.query.shopId} />
      </Root>

    )
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.error && nextProps.error && nextProps.device) {
      Toast.show(nextProps.error.message)
      this.props.actions.clearErrorMessage()
      NProgress.done()
    }
    if (nextProps.data && nextProps.data.binded !== undefined) {
      NProgress.done()
      if (nextProps.data.binded) {
        this.setState({success: true})
        setTimeout(() => {
          router.goBack()
        }, 2000)
      } else {
        Toast.show(nextProps.error.message)
        this.props.actions.clearErrorMessage()
        this.props.actions.cleanBindShop()
      }
    }
    if (nextProps.device && nextProps.device.complete) {
      NProgress.done()
      if (nextProps.device.workOrderNo) {
        router.replace(`/workOrders/${nextProps.device.workOrderNo}/repair`)
      } else {
        router.goBack()
      }
    }
  }

  _renderBindSuccess () {
    return (
      <div>
        <TurnSwitchComponent value={this.props.data && this.props.data.turn}
          onClick={this.state.countdown ? null : this._handleTurnSwitch.bind(this)} />
        <BindSuccessComponent>
          <p>{this.props.data.turn ? '请连接手机测试设备是否正常' : '连接成功'}</p>
          <p>{this.props.data.turn ? '若无法充电请再次点击' : `${this.state.countdown ? this.state.countdown + '秒后' : ''}点击按钮测试设备`}</p>
        </BindSuccessComponent>
        {this.props.data.turn ?
          <Button onClick={this._complete.bind(this)} className='complete' fixed>设备正常</Button> : null}
        {this.props.data.turn ?
          <Button type='white' onClick={this._goToConfigure.bind(this)} fixed>更换设备</Button> :
            <Button type='white' onClick={this._goToConfigure.bind(this)} fixed>点击没反应，需更换设备</Button>}
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

  _renderBindFailure () {
    return (
      <div className='failure'>
        <img src='//img.shenghuozhe.net/shz/2017/02/09/291w_309h_D88DA1486605167.png' alt='' />
        <p>设备离线</p>
        <p className='tip'><span>1</span>请检查电源是否工作正常，请充电后测试</p>
        <p className='tip'><span>2</span>请检查网络连接是否正常，调整一下网络位置进行测试</p>
        <Button onClick={() => { location.reload() }} className='complete' fixed>已操作，继续测试</Button>
        <Button type='white' className='lost' onClick={this._lost.bind(this)} fixed>设备遗失</Button>
        <Button type='white' onClick={this._goToConfigure.bind(this)} fixed>更换设备</Button>
      </div>
    )
  }

  _handleTurnSwitch () {
    this.props.data.turn
      ? this.props.actions.turnOff({mac: null, cloudId: this.props.device.cloudId, turn: 'off'})
      : this.props.actions.turnOn({mac: null, cloudId: this.props.device.cloudId, turn: 'on'})
  }

  _complete () {
    router.replace(`/shops/${this.props.location.query.shopId}`)
  }

  _lost () {
    router.replace(`/workOrder/repair/config?lost=1&oldDeviceNo=${this.props.location.query.deviceNo || ''}&workOrderNo=${this.props.location.query.workOrderNo}`)
  }

  _goToConfigure () {
    router.replace(`/workOrder/repair/repairPoi?shopId=${this.props.location.query.shopId}&deviceNo=${this.props.location.query.deviceNo}&oldDeviceNo=${this.props.location.query.deviceNo || ''}`)
  }

  componentWillUnmount () {
    this._countdown && clearInterval(this._countdown)
    this.props.actions.cleanBindInfo()
    this.props.actions.clearErrorMessage()
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.deviceBind,
    device: state.device
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign({}, actions, repairActions, {
      clearErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceBindContainer)
