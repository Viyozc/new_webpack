import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'
import NProgress from 'utils/nprogress'

import Button from 'components/common/button'
import Loading from 'components/common/loading'
import Error from 'components/common/error'

import * as actions from 'actions/option'
import * as breakActions from 'actions/install/break'
import * as shopActions from 'actions/install/shop'
import { clean } from 'actions/errorMessage'

import Style from '../../workOrder/repair/result.less'

// const Reasons = ['未及时充电', '网络信号不好', '设备网络故障', '设备无法启动', '设备线缆损坏', '其他原因']

class ConfigContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: -1
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('选择原因')
    Style.use()
  }
  componentDidMount () {
    this.props.actions.getOptions(0)
  }
  render () {
    const reasonOptions = this.props.resultOptions && this.props.resultOptions.opts
    if (!reasonOptions && !this.props.error) {
      return <Loading />
    }
    if (!reasonOptions && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return <div className='result'>
      <ul>
        {
        reasonOptions.map((o, i) => {
          return <li onClick={() => { this.setState({selectedIndex: Number(o.key)}) }} key={i}>{o.value}<span className={`radio ${this.state.selectedIndex === Number(o.key) ? 'selected' : ''}`} /></li>
        })
      }
      </ul>
      {this.state.selectedIndex === 0 ? <textarea placeholder='请填写原因' ref='text' /> : null}
      <Button onClick={this._break.bind(this)} fixed>提交</Button>
    </div>
  }
  _break () {
    if (this.state.selectedIndex === -1) {
      return Toast.show('请选择原因')
    }
    if (this.state.selectedIndex === 0 && !this.refs.text.value.trim()) {
      return Toast.show('请填写原因')
    }
    if (this.props.params.id) {
      NProgress.start()
      let quantity = this.props.location.query.quantity.split('|')
      this.props.actions.breakInstall({
        option: this.state.selectedIndex,
        optionDes: this.state.selectedIndex === 0 ? this.refs.text.value : undefined,
        installNo: this.props.params.id,
        deviceNoBatteryNum: quantity[0],
        deviceWithBatteryNum: quantity[1],
        adapterNum: quantity[2],
        brandNum: quantity[3]
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.error && this.props.resultOptions) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.clearErrorMessage()
      NProgress.done()
    }
    if (nextProps.shopInfo && nextProps.shopInfo.broken) {
      this.props.actions.resetShopInfo()
      NProgress.done()
      router.goBack()
    }
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    resultOptions: state.resultOptions,
    shopInfo: state.shopDetail && state.shopDetail.shopInfo
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, shopActions, breakActions, {
      clearErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigContainer)
