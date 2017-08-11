/* 寻找要回收的设备 */
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

import * as actions from 'actions/install/reclaim'
import * as deviceActions from 'actions/device'
import { clean } from 'actions/errorMessage'
import _ from 'lodash'
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
    let deviceIndexs = []
    let signIndexs = []
    props.reclaimDevices && props.reclaimDevices.map((item, i) => {
      deviceIndexs.push(item.deviceNo)
    })
    props.signDevices && props.signDevices.map((item, i) => {
      signIndexs.push(item.deviceNo)
    })
    this.state = {
      block: true,
      deviceIndexs,
      signIndexs
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('选择回收')
    Style.use()
  }
  componentDidMount () {
    // 轮询刷新列表设备在线状态
    this.timer = setInterval(() => {
      this.props.actions.getList(this.props.location.query.shopId)
    }, 3000)
  }
  render () {
    let data = this.props.data
    if (!this.props.error && !data) {
      return <Loading />
    }
    if (this.props.error && !data) {
      return <Error>{this.props.error.message}</Error>
    }
    return (
      <div className='device-list'>
        {
          data.map((o, i) => {
            return <li onClick={this._toggleSelect.bind(this, o)} key={i} className={`device clearfix ${this.state.deviceIndexs.indexOf(o.deviceNo) !== -1 ? 'selected' : ''}  ${o.status === 0 || o.status === 1 ? '' : 'offline'}`}>
              <div className='info'>
                <p>设备名称：{o.deviceName}</p>
                <p>设备编号：{o.deviceNo}</p>
                <div className='status'>{Status[o.status]}</div>
              </div>
              <span className='check'><i className='dianfont icon-gou' /></span>
              {(o.status === 0 && o.category === 1) || (o.status === 2 && o.category === 1) ? <a className={`${this.state[o.deviceNo + 'On'] ? 'on' : 'off'}`} onClick={this._toggle.bind(this, o)} >{this.state[o.deviceNo + 'On'] ? '测试灯/on' : '测试灯/off'}</a> : null}
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
  _toggleSelect (o) {
    let deviceIndexs = [].concat(this.state.deviceIndexs)
    if (deviceIndexs.indexOf(o.deviceNo) !== -1) {
      deviceIndexs.splice(deviceIndexs.indexOf(o.deviceNo), 1)
    } else {
      deviceIndexs.push(o.deviceNo)
    }
    this.setState({
      deviceIndexs
    })
  }
  _toggleSign (o, event) {
    let signIndexs = [].concat(this.state.signIndexs)
    if (signIndexs.indexOf(o.deviceNo) !== -1) {
      signIndexs.splice(signIndexs.indexOf(o.deviceNo), 1)
    } else {
      signIndexs.push(o.deviceNo)
    }
    this.setState({
      signIndexs
    })
    event.preventDefault()
    event.stopPropagation()
  }
  _submit () {
    if (!document.getElementsByClassName('selected').length) {
      return Toast.show('请选择要回收的设备')
    }
    let reclaimDevices = []
    let signDevices = []
    for (let i = 0; i < (this.props.data && this.props.data.length); i++) {
      if (_.includes(this.state.deviceIndexs, this.props.data[i].deviceNo)) {
        reclaimDevices.push(this.props.data[i])
      }
      if (_.includes(this.state.signIndexs, this.props.data[i].deviceNo)) {
        signDevices.push(this.props.data[i])
      }
    }
    this.props.actions.addDevice(reclaimDevices, signDevices)
    router.goBack()
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  componentWillUnmount () {
    Style.unuse()
    this.timer && clearInterval(this.timer)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.repairDeviceList && state.repairDeviceList.devices,
    reclaimDevices: state.reclaimDevices && state.reclaimDevices.reclaimDevices,
    signDevices: state.reclaimDevices && state.reclaimDevices.signDevices
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign({}, actions, deviceActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListContainer)
