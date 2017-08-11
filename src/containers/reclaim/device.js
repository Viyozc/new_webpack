/* 回收设备 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import { router } from 'utils'
import _ from 'lodash'
import Button from 'components/common/button'
import Icon from 'components/common/icon'
import Loading from 'components/common/loading'
import Error from 'components/common/error'

import * as actions from 'actions/install/reclaim'
import * as Bridge from 'utils/bridge'
import { clean } from 'actions/errorMessage'
import * as sessionStorage from 'utils/sessionStorage'

import Style from 'components/reclaim/device.less'
const Status = {
  '-1': '已删除',
  0: '在线',
  1: '充电中',
  2: '离线',
  3: '充电中离线',
  4: '未注册',
  5: '未激活'
}

class DeviceContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    if (this.props.params.id !== sessionStorage.getItem('reclaimDevice')) {
      this.props.actions.clearDevice()
    }
    Style.use()
    Bridge.setNavTitle('回收设备')
  }
  componentDidMount () {
    let viewStock = {
      viewStock: false
    }
    this.props.actions.fetchProductIcons(viewStock)
    this.props.actions.get({shopId: this.props.params.id})
  }
  render () {
    if (!this.props.workOrder && !this.props.error) {
      return <Loading />
    }
    if (!this.props.workOrder && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    let reclaimDevices = this.props.reclaimDevices
    let workOrder = this.props.workOrder
    return (
      <div className='device-configure'>
        <div className='quantity'>
          <h4>安装机器数</h4>
          {
            workOrder.products && workOrder.products.map((item, i) => {
              return <p>{item.productName}<span className='value'>{item.normalNum}</span></p>
            })
          }
        </div>
        <h4>请选择主机</h4>
        <div className='scan clearfix' onClick={this._scan.bind(this)}>
          <span><Icon name='saomachongdian' />扫码回收</span>
          <span onClick={this._goToReclaim.bind(this)}>从列表选择回收<i className='dianfont icon-xiayibu' /></span>
        </div>
        <ul className='mainframe'>
          {
            reclaimDevices && reclaimDevices.map((o, i) => {
              return <li key={i} className={`device clearfix`}>
                <div className='info'>
                  <p>设备名称：{o.deviceName}</p>
                  <p>设备编号：{o.deviceNo}</p>
                  <div className={`status ${o.status === 0 || o.status === 1 ? '' : 'offline'}`}>{Status[o.status]}</div>
                </div>
                <i style={{zIndex: 99}} onClick={this._reduceDevice.bind(this, o)} className='dianfont icon-guanbi' />
                {
                  o.category === 2 ? <ul className='slotInfoList'>
                    {o.slotInfoList && o.slotInfoList.map((item, i) => {
                      return <li style={{lineHeight: '24px'}}key={i}>充电宝 &nbsp; 编号: &nbsp; {item.powerBankNo}</li>
                    })}
                  </ul> : null
                }
              </li>
            })
          }
        </ul>
        {reclaimDevices && reclaimDevices.length ? [
          <h4 key={0}>请选择配件数量</h4>,
          <div key={1} className='device-form'>
            {
            this.props.accessories.map((item, i) => {
              return <div className='cell device' key={i}>
                <img src={item.picUrl} />
                <div className='price'>
                  <p style={{width: 157}}>请输入{item.productName}数量</p>
                </div>
                <div className='input'>
                  <button className='add' onClick={this._addNum.bind(this, 'accessories', i, reclaimDevices.length)}>+</button>
                  <input type='number'
                    // ref={(ref) => { this.props.accessories[i].normalNum = ref }}
                    className={`${reclaimDevices.length < this.props.accessories[i].normalNum ? 'error' : ''}`}
                    value={this.props.accessories[i].normalNum}
                    pattern='[0-9]*' />
                  <button onClick={this._minusNum.bind(this, 'accessories', i)}>-</button>
                </div>
              </div>
            })
            }
          </div>
        ] : null}
        <Button onClick={this._reclaim.bind(this)}>回收</Button>
      </div>
    )
  }
  _addNum (type, index, maxNum) {
    let newValue = this.props[type][index].normalNum + 1
    let uploadParams = {}
    uploadParams.type = type
    uploadParams.index = index
    uploadParams.newValue = newValue
    this._changeNum(uploadParams)
  }
  _minusNum (type, index) {
    if (this.props[type][index].normalNum === 0) {
      return
    }
    let newValue = this.props[type][index].normalNum - 1
    let uploadParams = {}
    uploadParams.type = type
    uploadParams.index = index
    uploadParams.newValue = newValue
    this._changeNum(uploadParams)
  }
  _changeNum (uploadParams) {
    this.props.actions.fetchChangeValue(uploadParams)
  }
  _changeAdapter (e) {
    this.props.actions.updateDeviceNum(e.target.value, this.board.value)
  }
  _changeBoard (e) {
    this.props.actions.updateDeviceNum(this.adapter.value, e.target.value)
  }
  _add (refName) {
    this[refName].value = Number(this[refName].value) + 1
    this.props.actions.updateDeviceNum(this.adapter.value, this.board.value)
  }
  _minus (refName) {
    if (this[refName].value > 0) {
      this[refName].value = Number(this[refName].value) - 1
    }
    this.props.actions.updateDeviceNum(this.adapter.value, this.board.value)
  }
  _reduceDevice (deviceNo) {
    this.props.actions.reduceDevice(deviceNo)
  }
  _scan () {
    Bridge.scanQRCode((res) => {
      let str = res.data
      let deviceNo = str.match(/\/d\/(\S*)\//) ? str.match(/\/d\/(\S*)\//)[1] : ''
      let boxNo = str.match(/\/b\/(\S*)\//) ? str.match(/\/b\/(\S*)\//)[1] : ''
      if (!deviceNo) {
        deviceNo = str.match(/\/d\/(\S*)/) ? str.match(/\/d\/(\S*)/)[1] : ''
      }
      if (!boxNo) {
        boxNo = str.match(/\/b\/(\S*)/) ? str.match(/\/b\/(\S*)/)[1] : ''
      }
      if (!deviceNo && !boxNo) {
        return Toast.show('二维码有问题，请联系管理员')
      }
      let resultNo = deviceNo !== '' ? deviceNo : boxNo
      let selected = false
      for (let i = 0; i < (this.props.data && this.props.data.length); i++) {
        if (_.includes(this.state.deviceIndexs, this.props.data[i].deviceNo)) {
          selected = true
          break
        }
      }
      if (this.props.reclaimDevices && this.props.reclaimDevices.length && selected) {
        return Toast.show('该设备已在列表中')
      }
      this.props.actions.fetchScanDevice({deviceNo: resultNo, shopId: this.props.params.id})
    })
  }
  _goToReclaim (e) {
    sessionStorage.setItem('reclaimDevice', this.props.params.id)
    router.push(`/reclaim/${this.props.params.id}/devices?shopId=${this.props.params.id}`)
    e.preventDefault()
    e.stopPropagation()
    return
  }
  _reclaim () {
    let reclaimDevices = this.props.reclaimDevices
    if (!reclaimDevices || !reclaimDevices.length) {
      return Toast.show('请添加需要更换的备件')
    }
    if (reclaimDevices && (this.props.accessories.some((item, i) => {
      return reclaimDevices.length < Number(item.normalNum)
    }))) {
      return Toast.show('餐牌／适配器数量不能超过主机数')
    }
    router.push(`/reclaim/${this.props.params.id}/result${this.props.location.search}`)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.workOrder) {
      Bridge.setNavTitle(nextProps.workOrder.shopName)
    }
    if (nextProps.workOrder && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.reset()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    workOrder: state.workOrder,
    reclaimDevices: state.reclaimDevices && state.reclaimDevices.reclaimDevices,
    accessories: state.reclaimDevices && state.reclaimDevices.accessories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceContainer)
