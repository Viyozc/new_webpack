import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'
import NProgress from 'utils/nprogress'

import Button from 'components/common/button'
import Loading from 'components/common/loading'

import * as actions from 'actions/repair/workOrder'
import * as OptionAction from 'actions/option'
import * as shopActions from 'actions/shop'
import { clean } from 'actions/errorMessage'

import Style from './result.less'

// const Reasons = ['未及时充电', '网络信号不好', '设备网络故障', '设备无法启动', '设备线缆损坏', '其他原因']

class ConfigContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: -1,
      isLost: this.props.location.query.lost
    }
  }
  componentWillMount () {
    if (this.state.isLost) {
      Bridge.setNavTitle('设备遗失')
    } else {
      Bridge.setNavTitle('设备测试')
    }
    Style.use()
  }
  componentDidMount () {
    this.props.actions.getOptions(5)
  }
  render () {
    if (!this.props.resultOptions) {
      return <Loading />
    }
    return this.state.isLost ? this._renderLost() : this._renderOptions()
  }
  _renderLost () {
    return <div className='result'>
      <textarea ref='text' placeholder='请填写遗失原因' name='' id='' cols='30' rows='10' />
      <Button onClick={this._configureLost.bind(this)} fixed>提交并更换设备</Button>
    </div>
  }
  _configureLost () {
    if (!this.refs.text.value.trim()) {
      return Toast.show('请填写遗失原因')
    }
    NProgress.start()
    if (this.props.location.query.workOrderNo) {
      NProgress.start()
      // id, optionDes, deviceNo
      this.props.actions.configLost(this.props.location.query.workOrderNo, this.refs.text.value, this.props.location.query.oldDeviceNo)
    }
  }
  _renderOptions () {
    const reasonOptions = this.props.resultOptions && this.props.resultOptions.opts
    return <div className='result'>
      <ul>
        {
        reasonOptions.map((o, i) => {
          return <li onClick={() => { this.setState({selectedIndex: Number(o.key)}) }} key={i}>{o.value}<span className={`radio ${this.state.selectedIndex === Number(o.key) ? 'selected' : ''}`} /></li>
        })
      }
      </ul>
      {this.state.selectedIndex === 0 ? <textarea ref='text' placeholder='请填写原因' name='' id='' cols='30' rows='10' /> : null}
      <Button onClick={this._configure.bind(this)} fixed>提交并更换设备</Button>
    </div>
  }
  _configure () {
    if (this.state.selectedIndex === -1) {
      return Toast.show('请选择原因')
    }
    if (this.state.selectedIndex === 0 && !this.refs.text.value.trim()) {
      return Toast.show('请填写原因')
    }
    NProgress.start()
    if (this.props.location.query.workOrderNo) {
      NProgress.start()
      // option, id, optionDes, deviceNo
      this.props.actions.config(this.state.selectedIndex, this.props.location.query.workOrderNo, this.refs.text ? this.refs.text.value : undefined, this.props.location.query.oldDeviceNo)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.workOrder && nextProps.workOrder.shopId && nextProps.workOrder.repairId) {
      this.props.actions.fetchShopInfoByDeviceNoOrShopId({shopId: nextProps.workOrder.shopId})
    }
    if (!this.props.shopInfo && nextProps.shopInfo) {
      Bridge.setNetwork({shopName: nextProps.shopInfo.shopName, phone: nextProps.shopInfo.contactMobile}, (result) => {
        NProgress.done()
        if (result.data && result.data.mac && result.data.cloudId) {
          router.replace(`/device/bind?mac=${result.data.mac}&cloudId=${result.data.cloudId}&shopId=${nextProps.workOrder.shopId}&installNo=${nextProps.workOrder.repairId}&oldDeviceNo=${this.props.location.query.oldDeviceNo || ''}&workOrderNo=${this.props.location.query.workOrderNo}`)
        } else {
          Toast.show('缺少设备参数')
        }
      })
    }
    if (nextProps.error) {
      NProgress.done()
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  componentWillUnmount () {
    this.props.actions.reset()
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanShopInfoByDeviceNoOrShopId()
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    workOrder: state.workOrder,
    resultOptions: state.resultOptions,
    shopInfo: state.shopInfo
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign({}, OptionAction, actions, shopActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigContainer)
