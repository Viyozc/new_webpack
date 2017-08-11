/* 回收结果 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import { router } from 'utils'
import NProgress from 'utils/nprogress'

import Button from 'components/common/button'
import Loading from 'components/common/loading'
import Error from 'components/common/error'

import * as actions from 'actions/option'
import * as reclaimActions from 'actions/install/reclaim'
import * as Bridge from 'utils/bridge'
import { clean } from 'actions/errorMessage'

import Style from 'components/reclaim/result.less'
import ResultStyle from '../workOrder/repair/result.less'

class DeviceContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    Style.use()
    ResultStyle.use()
    Bridge.setNavTitle('回收结果')
  }
  componentDidMount () {
    if (!this.props.reclaimDevices) {
      Toast.show('请先选择要回收的设备')
      router.goBack()
    }
    this.props.actions.get({shopId: this.props.params.id})
  }
  render () {
    if (!this.props.workOrder && !this.props.error) {
      return <Loading />
    }
    if (!this.props.workOrder && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    let workOrder = this.props.workOrder
    let pjNum = this.props.deviceList.accessories
    let reclaimDevices = this.props.reclaimDevices
    let boxNum = 0
    let batteryNum = 0
    let powerBankNum = 0
    for (let i = 0; i < reclaimDevices.length; i++) {
      if (reclaimDevices[i].category === 1) {
        boxNum += 1
      }
      if (reclaimDevices[i].category === 2) {
        batteryNum += 1
        powerBankNum += reclaimDevices[i].slotInfoList.length
      }
    }
    // let reclaimAdapterBoardNum = this.props.reclaimAdapterBoardNum
    return (
      <div className='result reclaim-result'>
        <div className='quantity'>
          <h4>安装机器数</h4>
          {
            workOrder.products && workOrder.products.map((item, i) => {
              return <p>{item.productName}<span className='value'>{item.normalNum}</span></p>
            })
          }
        </div>
        <div className='real quantity'>
          <h4>实际回收数量</h4>
          <p>座充数量<span className='value'>{boxNum}</span></p>
          <p>盒子数量<span className='value'>{batteryNum}</span></p>
          <p>充电宝数量<span className='value'>{powerBankNum}</span></p>
          {
            pjNum.map((item, i) => {
              return <p>{item.productName}：<span className='value'>{item.normalNum || 0}</span></p>
            })
          }
        </div>
        <Button onClick={this._submit.bind(this)}>提交</Button>
      </div>
    )
  }
  _submit () {
    let reclaimDevices = this.props.reclaimDevices || []
    // let formatReclaimDevices = reclaimDevices.map((item, i) => item.deviceNo)
    let deviceNos = []
    let boxNos = []
    let powerBankNos = []
    reclaimDevices.map((item, i) => {
      if (item.category === 1) {
        deviceNos.push(item.deviceNo)
      }
      if (item.category === 2) {
        boxNos.push(item.deviceNo)
        item.slotInfoList && item.slotInfoList.map((item, i) => {
          powerBankNos.push(item.powerBankNo)
        })
      }
    })
    let products = []
    this.props.deviceList.accessories.map((item, i) => {
      products.push({productId: item.productId, normalNum: item.normalNum, productType: item.productType})
    })
    NProgress.start()
    let params = {
      products: products,
      boxNos: boxNos ? boxNos.join(',') : '',
      powerBankNos: powerBankNos ? powerBankNos.join(',') : '',
      deviceNos: deviceNos ? deviceNos.join(',') : '',
      shopId: this.props.params.id,
      reasonOption: this.props.location.query.option,
      reasonOptionDes: this.props.location.query.optionDes
    }
    this.props.actions.toRecycle(params)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.workOrder && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
      NProgress.done()
    }
    if (nextProps.workOrder && nextProps.workOrder.recycled) {
      NProgress.done()
      this.props.actions.clearDevice()
      router.push('/bd/device/list?type=6')
      // router.push('/shops?roleIndex=0&activeTab=-1')
    }
  }
  componentWillUnmount () {
    Style.unuse()
    ResultStyle.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.reset()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    workOrder: state.workOrder,
    reclaimDevices: state.reclaimDevices && state.reclaimDevices.reclaimDevices,
    reclaimAdapterBoardNum: state.reclaimAdapterBoardNum,
    deviceList: state.reclaimDevices
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign({}, actions, reclaimActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceContainer)
