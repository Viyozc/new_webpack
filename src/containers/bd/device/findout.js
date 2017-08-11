/* 寻找要回收的设备 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import assign from 'lodash/assign'
import { router } from 'utils'
import NProgress from 'utils/nprogress'

import Error from 'components/common/error'
import Loading from 'components/common/loading'
import Button from 'components/common/button'
import Notfound from 'components/common/notfound'
import CountInput from 'components/bd/device/countInputList'

import * as actions from 'actions/bd/device'
import { clean } from 'actions/errorMessage'
import Style from './lose.less'

const Status = {
  '-1': '已删除',
  0: '在线',
  1: '充电中',
  2: '离线',
  3: '充电中离线',
  4: '未注册',
  5: '未激活'
}

class FindoutLost extends Component {
  constructor (props) {
    super(props)
    this.state = {
      devices: []
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('选择已找回设备')
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  componentDidMount () {
    this.props.actions.fetchDeviceLostDetail({recordId: this.props.location.query.recordId})
  }

  render () {
    let data = this.props.data
    if (!this.props.error && !data) {
      return <Loading />
    }
    if (this.props.error && !data) {
      return <Error>{this.props.error.message}</Error>
    }
    if (this.props.data && this.props.data.length === 0) {
      return <Notfound>暂无记录</Notfound>
    }
    return (
      <div className='container'>
        <h4>请选择已找回的设备（可多选）{this.props.location.query.lostType === '0' && <a onClick={() => this._toggleAll()} style={{float: 'right', paddingRight: 10, color: '#4A90E2'}}>全选</a>} </h4>
        {this.props.location.query.lostType === '2' ? this._renderShopList() : this._renderShopList(data)}
        <Button fixed fixedSpace={0} onClick={this._submit.bind(this)}>确认</Button>
      </div>
    )
  }
  _renderShopList (data) {
    return <div className='device-list'>
      {
        data.lostDeviceList && data.lostDeviceList.map((o, i) => {
          return <li onClick={this._toggleSelect.bind(this, o)} key={i} className={`device clearfix ${this.state.devices.indexOf(o.deviceNo) !== -1
            ? 'selected' : ''}  ${o.deviceStatus === 0 || o.deviceStatus === 1 ? '' : 'offline'}`}>
            <div className='info'>
              <p>设备型号：{o.deviceTypeName}</p>
              <p>设备编号：{o.deviceNo}</p>
              <div className='status'>{Status[o.deviceStatus]}</div>
            </div>
            <span className='check'><i className='dianfont icon-gou' /></span>
          </li>
        })
      }
    </div>
  }
  _renderSpareList () {
    let data = [
      {productName: '一代'},
      {productName: '一代'},
      {productName: '一代'},
      {productName: '一代'}
    ]
    return <div className='device-list'>
      {
        data.map((item, i) => {
          { /* {this.props.userProducts && this.props.userProducts.map((item, i) => { */ }
          return <CountInput key={i}
            item={item}
            value={item.normalNum || 0}
            _add={this._add.bind(this, item.productId)}
            _change={(id, val) => this._changeNum(id, val)}
            _minus={this._minus.bind(this, item.productId)}
          />
        })
      }
    </div>
  }
  _add () {

  }
  _minus () {

  }
  _changeNum () {

  }
  _toggleSelect (o) {
    let devices = [].concat(this.state.devices)
    if (devices.indexOf(o.deviceNo) !== -1) {
      devices.splice(devices.indexOf(o.deviceNo), 1)
    } else {
      devices.push(o.deviceNo)
    }
    this.setState({ devices })
  }
  _toggleAll () {
    if (this.state.devices.length === this.props.data.lostDeviceList.length) {
      this.setState({devices: []})
    } else {
      let out = []
      this.props.data.lostDeviceList.map(v => {
        out.push(v.deviceNo)
      })
      this.setState({devices: out})
    }
  }
  _submit () {
    if (!this.state.devices.length) {
      return Toast.show('请选择遗失的设备')
    }
    NProgress.start()
    this.props.actions.fetchFindLost({recordId: this.props.location.query.recordId, deviceNos: this.state.devices.join(',')})
    // router.push(`/bd/device/lose/result?shopId=${this.props.location.query.shopId}&deviceNos=${this.state.signIndexs.join(',')}`)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
      router.push('/bd/device/list?type=4')
    }
  }

}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    workOrder: state.workOrder,
    fetch: state.bdHandleLostPage && state.bdHandleLostPage.fetch,
    detail: state.bdDeviceListPage && state.bdDeviceListPage.list,
    data: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.lostDetail
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign({}, actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindoutLost)
