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
import Style from './rebind.less'

import * as actions from 'actions/device'
import { clean } from 'actions/errorMessage'

class DeviceBindContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countdown: 10,
      success: false,
      mac: props.location.query.mac,
      cloudId: props.location.query.cloudId,
      deviceType: props.location.query.deviceType,
      typeTxt: props.location.query.typeTxt,
      isNotWifi: false
    }
  }

  componentWillMount () {
    Bridge.setNavTitle('设备测试')
    Style.use()
    if (!this.state.mac && !this.state.cloudId) {
      Bridge.setNetwork({reconfigure: true},
        (result) => {
          if (result.success) {
            let type = parseInt(result.data.type)
            let splitCode = result.data.code.split('/')
            let deviceNo = splitCode[splitCode.length - 1]
            let typeTxt

            // 如果是座充
            if (type === 4 || type === 5 || type === 6 || type === 7 || type === 9 || type === 10) {
              if (type === 4 || type === 5 || type === 6 || type === 7) {
                typeTxt = 'WiFi'
              }
              if (type === 9 || type === 10) {
                typeTxt = '2G'
              }
              if (typeTxt === 'WiFi') {
                this.setState({
                  typeTxt: typeTxt,
                  mac: result.data.mac || '',
                  cloudId: (result.data.cloudId || ''),
                  deviceNo: deviceNo || ''
                })
                router.replace({
                  pathname: this.props.location.pathname,
                  query: {
                    mac: (result.data.mac || ''),
                    deviceNo: (deviceNo || ''),
                    cloudId: (result.data.cloudId || '')
                  }
                })
              }
            }
            // 如果是盒子或者2G
            if (type === 8 || typeTxt === '2G') {
              this.setState({
                isNotWifi: true
              })
            }
          } else {
            Toast.show('缺少设备参数')
          }
        })
    }
  }

  componentDidMount () {
    if (this.state.mac && this.state.cloudId) {
      this._countdown = setInterval(() => {
        if (this.state.countdown === 0) {
          clearInterval(this._countdown)
          return
        }
        this.setState({countdown: --this.state.countdown})
      }, 1000)
    }
  }

  render () {
    if (!this.state.mac && !this.state.cloudId) {
      return <div className='notfound'>
        <i className='dianfont icon-meiyouneirong' />
        <p>{this.state.isNotWifi ? '非wifi设备' : '您已取消配网'}</p>
        <button
          onClick={() => { if (this.state.isNotWifi) { window.history.go(-1) } else { this._reBind() } }}>{this.state.isNotWifi ? '返回首页' : '重新配网'}</button>
      </div>
    }
    return (
      <Root loading={!this.state.mac && !this.state.cloudId && !this.props.error}
        errorMessage={!this.state.mac && !this.state.cloudId && this.props.error && this.props.error.message}>
        {this._renderBindSuccess()}
      </Root>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.error && nextProps.error && nextProps.data) {
      Toast.show(nextProps.error.message)
      this.props.actions.clearErrorMessage()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.mac && this.state.cloudId && !prevState.mac && !prevState.cloudId) {
      this._countdown = setInterval(() => {
        if (this.state.countdown === 0) {
          clearInterval(this._countdown)
          return
        }
        this.setState({countdown: --this.state.countdown})
      }, 1000)
    }
  }

  _renderBindSuccess () {
    return (
      <div>
        <BindSuccessComponent>
          <p>{this.props.data.turn ? '充电已开启' : 'WiFi连接成功'}</p>
          <p>{this.props.data.turn ? '若无法充电请再次点击' : `${this.state.countdown ? this.state.countdown + '秒后' : ''}点击按钮测试设备`}</p>
        </BindSuccessComponent>
        <TurnSwitchComponent value={this.props.data && this.props.data.turn}
          onClick={this.state.countdown ? null : this._handleTurnSwitch.bind(this)} />
        {this.props.data.turn ? <Button onClick={this._complete.bind(this)} fixed>完成</Button> : null}
      </div>
    )
  }

  _complete () {
    router.goBack()
  }

  _handleTurnSwitch () {
    // 如果是座充wifi版
    this.props.data.turn
      ? this.props.actions.turnOff(
        {
          mac: this.state.mac,
          cloudId: this.state.cloudId,
          turn: 'off'
        }
    )
      : this.props.actions.turnOn(
        {
          mac: this.state.mac,
          cloudId: this.state.cloudId,
          turn: 'on'
        }
    )
  }

  _reBind () {
    Bridge.setNetwork({reconfigure: true},
      (result) => {
        if (result.success) {
          let type = parseInt(result.data.type)
          let splitCode = result.data.code.split('/')
          let deviceNo = splitCode[splitCode.length - 1]
          let typeTxt

          // 如果是座充
          if (type === 4 || type === 5 || type === 6 || type === 7 || type === 9 || type === 10) {
            if (type === 4 || type === 5 || type === 6 || type === 7) {
              typeTxt = 'WiFi'
            }
            if (type === 9 || type === 10) {
              typeTxt = '2G'
            }
            if (typeTxt === 'WiFi') {
              this.setState({
                typeTxt: typeTxt,
                mac: result.data.mac || '',
                cloudId: (result.data.cloudId || ''),
                deviceNo: deviceNo || ''
              })
              router.replace({
                pathname: this.props.location.pathname,
                query: {mac: (result.data.mac || ''), deviceNo: (deviceNo || ''), cloudId: (result.data.cloudId || '')}
              })
            }
          }
          // 如果是盒子或者2G
          if (type === 8 || typeTxt === '2G') {
            this.setState({
              isNotWifi: true
            })
          }
        } else {
          Toast.show('缺少设备参数')
        }
      })
  }

  componentWillUnmount () {
    this._countdown && clearInterval(this._countdown)
    this.props.actions.cleanBindInfo()
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.deviceBind
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      clearErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceBindContainer)
