import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import assign from 'lodash/assign'
import { router } from 'utils'

import Error from 'components/common/error'
import Loading from 'components/common/loading'
import Pagination from 'components/common/pagination'
import Button from 'components/common/button'

import * as actions from 'actions/device'
import * as repairActions from 'actions/repair/workOrder'
import { clean } from 'actions/errorMessage'

import Style from './devices.less'

const PAGE_SIZE = 20
const Status = {
  '-1': '已删除',
  0: '在线',
  1: '充电中',
  2: '离线',
  3: '充电中离线',
  4: '未注册',
  5: '未激活'
}

class DeviceListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      block: true
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('选择维修设备')
    Style.use()
  }
  componentDidMount () {
    // 轮询刷新列表设备在线状态
    this.timer = setInterval(() => {
      this.props.actions.getDevices(this.props.location.query.shopId)
    }, 3000)
  }
  render () {
    let data = this.props.data
    if (!this.props.error && !this.props.data) {
      return <Loading />
    }
    if (this.props.error && !this.props.data) {
      return <Error>{this.props.error.message}</Error>
    }
    return (
      <div className='device-list'>
        {data.devices && data.devices.some(v => v.deviceType === 4 || v.deviceType === 5 || v.deviceType === 6 || v.deviceType === 7) ? <p>一代座充:</p> : null}
        {
          data.devices && data.devices.filter(v => v.deviceType === 4 || v.deviceType === 5 || v.deviceType === 6 || v.deviceType === 7).map((o, i) => {
            return <li onClick={this._select.bind(this, o, 1)} key={i} className={`device clearfix ${o.status === 0 || o.status === 1 ? '' : 'offline'} ${this.state.selectedNo === o.deviceNo ? 'selected' : ''}`}>
              <div className='status'>{Status[o.status]}</div>
              <div className='info'>
                <p>设备型号：{o.deviceModel}</p>
                <p>设备编号：{o.deviceNo}</p>
              </div>
              {o.status === 0 || o.status === 2 ? <a className={`${this.state[o.deviceNo + 'On'] ? 'switch on' : 'switch off'}`} onClick={this._toggle.bind(this, o)} >{this.state[o.deviceNo + 'On'] ? '测试灯/on' : '测试灯/off'}</a> : null}
              <span className='check'><i /></span>
            </li>
          })
        }

        {data.devices && data.devices.some(v => v.deviceType === 9 || v.deviceType === 10) ? <p>二代座充:</p> : null}
        {
          data.devices && data.devices.filter(v => v.deviceType === 9 || v.deviceType === 10).map((o, i) => {
            return <li onClick={this._select.bind(this, o, 2)} key={i} className={`device clearfix ${o.status === 0 || o.status === 1 ? '' : 'offline'} ${this.state.selectedNo === o.deviceNo ? 'selected' : ''}`}>
              <div className='status'>{Status[o.status]}</div>
              <div className='info'>
                <p>设备型号：{o.deviceModel}</p>
                <p>设备编号：{o.deviceNo}</p>
              </div>
              {o.status === 0 || o.status === 2 ? <a className={`${this.state[o.deviceNo + 'On'] ? 'switch on' : 'switch off'}`} onClick={this._toggle.bind(this, o)} >{this.state[o.deviceNo + 'On'] ? '测试灯/on' : '测试灯/off'}</a> : null}
              <span className='check'><i /></span>
            </li>
          })
        }

        {data.devices && data.devices.some(v => v.deviceType === 8 || v.deviceType === 13) ? <p>盒子:</p> : null}
        {
          data.devices && data.devices.filter(v => v.deviceType === 8 || v.deviceType === 13).map((o, i) => {
            return <li onClick={this._select.bind(this, o, 3)} key={i} className={`device clearfix ${o.status === 0 || o.status === 1 ? '' : 'offline'} ${this.state.selectedNo === o.deviceNo ? 'selected' : ''}`}>
              <div className='status'>{Status[o.status]}</div>
              <div className='info'>
                <p>设备型号：{o.deviceModel}</p>
                <p>设备编号：{o.deviceNo}</p>
              </div>
              <span className='check'><i /></span>
            </li>
          })
        }

        <Button onClick={this._submit.bind(this)}>确认选择</Button>
        {
          this.state.block
          ? <div className='wrapper'>
            <div className='inner'>
              <i className='dianfont icon-gantanhao' />
              <ul>
                <li><span className='index'>1</span>请拔除损坏设备的电源线，拆掉电池</li>
                <li><span className='index'>2</span>选择离线的设备，更换设备</li>
              </ul>
              <a onClick={() => { this.setState({block: false}) }}>知道了</a>
            </div>
          </div>
          : null
        }
      </div>
    )
  }
  _select (o, type) {
    this.setState({ selectedNo: o.deviceNo, type })
  }
  _toggle (device, event) {
    if (this.state[device.deviceNo + 'On']) {
      this.props.actions.turnOff({mac: null, cloudId: device.cloudId, turn: 'off'})
    } else {
      this.props.actions.turnOn({mac: null, cloudId: device.cloudId, turn: 'on'})
    }
    let temp = {}
    temp[device.deviceNo + 'On'] = !this.state[device.deviceNo + 'On']
    this.setState(temp)
    event.preventDefault()
    event.stopPropagation()
    return
  }
  _submit () {
    if (!this.state.selectedNo) {
      return Toast.show('请选择设备')
    }
    if (this.state.type !== 3) {
      router.replace(`/workOrder/repair/test?deviceNo=${this.state.selectedNo}&shopId=${this.props.location.query.shopId}&installNo=${this.props.location.query.installNo}`)
    } else {
      router.replace(`/workOrder/repair/boxTest?deviceNo=${this.state.selectedNo}&shopId=${this.props.location.query.shopId}&installNo=${this.props.location.query.installNo}`)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.resetErrorMessage()
    }
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.resetDevices()
    this.timer && clearInterval(this.timer)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.repairDeviceList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign({}, repairActions, actions, {
      resetErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListContainer)
