import React, { Component } from 'react'
import { connect } from 'react-redux'
import assign from 'lodash/assign'
import * as actions from 'actions/bd/device'
import { bindActionCreators } from 'redux'
import Style from './loseDetail.less'
import { clean } from 'actions/errorMessage'
import * as Bridge from 'utils/bridge'

import Loading from 'components/common/loading'
import Error from 'components/common/error'
import NProgress from 'utils/nprogress'
import { router } from 'utils'

class DeviceList extends Component {
  componentWillMount () {
    Bridge.setNavTitle('遗失设备详情')
    Style.use()
  }
  componentDidMount () {
    // this.props.actions.fetchDeviceLostDetail({recordId: this.props.location.query.recordId})
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
      router.push('/bd/device/list?type=4')
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }
    if (nextProps.error) {
      return <Error>{nextProps.error.message || '未知错误'}</Error>
    }
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.clearLostDevicePage()
    this.props.actions.cleanErrorMessage()
  }
  render () {
    if (!this.props.detail && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    let data = this.props.detail.filter(v => v.recordId === parseInt(this.props.location.query.recordId))[0]
    return (
      <div className='device-list'>
        <div>
          <div className='panel'>
            <p className='title'>{data.statusText}</p>
            <div className='lists'>
              {/* {this.props.detail.lostDeviceList && this.props.detail.lostDeviceList.map((device, i) => {
                return (
                  <div className='list' key={i}>
                    <p className='name'>设备类型: {device.deviceTypeName}</p>
                    <p>设备编号: {device.deviceNo}</p>
                    <p className='state'>{device.deviceStatusText}</p>
                  </div>)
              })} */}
              {this.props.location.query.lostType === '2' ? this._renderSpareList(data) : this._renderShopList(data)}
            </div>
          </div>
          <p className='reason' style={{paddingTop: 10}}>遗失原因</p>
          <div className='reason-info'>
            {data.lostReason}
          </div>
          {data.status === 2 && data.refuseReason
             ? <div>
               <p className='reason'>拒绝原因</p>
               <div className='reason-info'>
                 {data.refuseReason}
               </div>
             </div>
             : null
           }
        </div>
        <div className={data.status === 0 ? 'handle-buttons' : 'handle-buttons single-btn'}>
          <div className='cancel-apply' onClick={() => { this._handleCancel() }}>撤销申请</div>
          <div className='has-find' onClick={() => { this._handleHasFound() }}>设备已找回</div>
        </div>
      </div>
    )
  }
  _handleCancel () {
    NProgress.start()
    this.props.actions.fetchCancelLost({recordId: this.props.location.query.recordId})
  }
  _handleHasFound () {
    router.push(`/bd/device/findout?recordId=${this.props.location.query.recordId}&lostType=${this.props.location.query.lostType}`)
  }

  _renderSpareList (data) {
    return <div>
      {data.devices && data.devices.map((device, i) => {
        return (
          <div className='spare-list' key={i} style={{height: 'auto'}}>
            <p className='type'>设备类型: {device.deviceType}</p>
            <p className='count'>设备数量: {device.count}</p>
          </div>)
      })

      }
    </div>
  }
  _renderShopList (data) {
    return <div>
      {data.lostDeviceList && data.lostDeviceList.map((device, i) => {
        console.log(11)
        return (
          <div className='list' key={i}>
            <p className='name'>设备类型: {device.deviceTypeName}</p>
            <p>设备编号: {device.deviceNo}</p>
            <p className='state'>{device.deviceStatusText}</p>
          </div>)
      })}
    </div>
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    fetch: state.bdDeviceListPage && state.bdDeviceListPage.fetch,
    detail: state.bdDeviceListPage && state.bdDeviceListPage.list,
    // detail: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.lostDetail,
    actionType: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.actionType
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList)
