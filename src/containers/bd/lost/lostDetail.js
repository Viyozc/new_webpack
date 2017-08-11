import React, { Component } from 'react'
import { connect } from 'react-redux'
import assign from 'lodash/assign'
import * as actions from 'actions/bd/device'
import { bindActionCreators } from 'redux'
import Style from './lostDetail.less'
import { clean } from 'actions/errorMessage'
import * as Bridge from 'utils/bridge'

import Loading from 'components/common/loading'
import Error from 'components/common/error'
import NProgress from 'utils/nprogress'
import { router } from 'utils'

import ACTION_CONSTANTS from 'constants/actionTypes/bd/device'

class LostDetail extends Component {
  componentWillMount () {
    Bridge.setNavTitle('遗失设备详情')
    Style.use()
  }
  componentDidMount () {
    this.props.actions.fetchDeviceLostDetail({recordId: this.props.location.query.recordId})
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      if (nextProps && nextProps.actionType === ACTION_CONSTANTS.BD_DEVICE_LOST_AGREE) {
        NProgress.done()
        router.push('/bd/lost/deviceList')
      }
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
    if (!this.props.detail && !this.props.error) {
      return <Loading />
    }
    if (!this.props.detail && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      // let item = this.props.detail
      <div className='device-list'>
        <div>
          <div className='panel'>
            <p className='title'>{this.props.detail.statusText}</p>
            <div className='lists'>
              {/* {this._renderShopList()} */}
              {this.props.location.query.lostType === '0' ? this._renderShopList() : this._renderSpareList()}
            </div>
          </div>
          <p className='reason'>遗失原因</p>
          <div className='reason-info'>
            {this.props.detail.lostReason}
          </div>
        </div>
        {
          this.props.detail.status === 0
          ? <div className='handle-buttons'>
            <div onClick={() => { this._handleAgree() }}>审核通过</div>
            <div onClick={() => router.push(`/bd/lost/rejectReason?recordId=${this.props.location.query.recordId}&lostType=${this.props.location.query.lostType || ''}`)}>审核拒绝</div>
          </div>
          : null
        }
      </div>
    )
  }
  _handleAgree () {
    NProgress.start()
    this.props.actions.fetchLostDeviceAgree({recordId: this.props.location.query.recordId})
  }
  _renderShopList () {
    this.props.detail.lostDeviceList && this.props.detail.lostDeviceList.map((device, i) => {
      return (
        <div className='list' key={i}>
          <p className='name'>设备类型: {device.deviceTypeName}</p>
          <p>设备编号: {device.deviceNo}</p>
          <p className='state'>{device.deviceStatusText}</p>
        </div>)
    })
  }
  _renderSpareList () {
    let lostDeviceList = [
      {deviceTypeName: '一代', count: 2},
      {deviceTypeName: '2代', count: 2},
      {deviceTypeName: '3代', count: 2},
      {deviceTypeName: '4代', count: 2},
      {deviceTypeName: '一代', count: 2}
    ]
    // this.props.detail.lostDeviceList && this.props.detail.lostDeviceList.map((device, i) => {
    return (<div>
      {
        lostDeviceList.map((device, i) => {
          return (
            <div className='count-list list' key={i}>
              <p className='name'>设备类型: {device.deviceTypeName} <span className='count' style={{float: 'right'}}>{device.count}</span></p>
            </div>)
        })
      }
    </div>

    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    fetch: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.fetch,
    detail: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.lostDetail,
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

export default connect(mapStateToProps, mapDispatchToProps)(LostDetail)

