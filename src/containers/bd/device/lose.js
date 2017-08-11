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
import Style from './lose.less'

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
const CATEGORY = [
  {category: 1, name: '一代(二期)设备'},
  {category: 2, name: '盒子'}
]

class DeviceListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signIndexs: []
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('确认遗失设备')
    Style.use()
  }
  componentDidMount () {
    this.props.actions.get({shopId: this.props.location.query.shopId})
    // 轮询刷新列表设备在线状态
    this.timer = setInterval(() => {
      this.props.actions.getList(this.props.location.query.shopId, 0, this.props.data ? this.props.data.length : PAGE_SIZE)
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
    let workOrder = this.props.workOrder || {}
    return (
      <div className='container'>
        {/* <div className='quantity'>
          <h4>安装机器数</h4>
          {
            workOrder.products && workOrder.products.map((item, i) => {
              return <p key={i}>{item.productName}<span className='value'>{item.normalNum}</span></p>
            })
          }
        </div> */}
        <h4>请确认类型</h4>
        <div className='device-list'>
          <Pagination data={data} size={20} onPaging={this._paging.bind(this)}>
            {
            data.map((o, i) => {
              return <li onClick={this._toggleSelect.bind(this, o)} key={i} className={`device clearfix ${JSON.stringify(this.state.signIndexs).indexOf(o.deviceNo) !== -1
                ? 'selected' : ''}  ${o.status === 0 || o.status === 1 ? '' : 'offline'}`}>
                <div className='info'>
                  <p>设备型号：{o.deviceTypeName}</p>
                  <p>设备编号：{o.deviceNo}</p>
                  <div className='status'>{Status[o.status]}</div>
                </div>
                <span className='check'><i className='dianfont icon-gou' /></span>
                {(o.status === 0 || o.status === 2) && (o.deviceType !== 8 && o.deviceType !== 13) ? <a className={`${this.state[o.deviceNo + 'On'] ? 'on' : 'off'}`} onClick={this._toggle.bind(this, o)} >{this.state[o.deviceNo + 'On'] ? '测试灯/on' : '测试灯/off'}</a> : null}
              </li>
            })
          }
          </Pagination>
          <Button onClick={this._submit.bind(this)}>确认选择</Button>
        </div>
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
    let signIndexs = [].concat(this.state.signIndexs)
    let hasIn = false
    let index = null
    signIndexs.map((val, i) => {
      if (val.deviceNo === o.deviceNo) {
        hasIn = true
        index = i
      } else {
        hasIn = false
      }
    })
    if (hasIn) {
      signIndexs.splice(index, 1)
    } else {
      signIndexs.push({deviceType: o.deviceType, deviceNo: o.deviceNo})
    }
    this.setState({signIndexs})
  }
  _paging () {
    this.props.actions.getList(this.props.location.query.shopId, this.props.data.length, PAGE_SIZE)
  }
  _submit () {
    if (!document.getElementsByClassName('selected').length) {
      return Toast.show('请选择遗失的设备')
    }
    let jsonData = JSON.stringify(this.state.signIndexs)
    window.localStorage.setItem('deviceInfo', jsonData)
    // router.push(`/bd/device/lose/result?shopId=${this.props.location.query.shopId}&deviceNos=${this.state.signIndexs.join(',')}`)
    router.push(`/bd/device/lose/result?shopId=${this.props.location.query.shopId}`)
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
    workOrder: state.workOrder,
    data: state.repairDeviceList && state.repairDeviceList.devices
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
