/* 中断安装 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import { router } from 'utils'

import Loading from 'components/common/loading'
import Button from 'components/common/button'
import Plan from 'components/shop/breakInstall/plan'
import AddDevice from 'components/shop/breakInstall/addDevice'

import * as Bridge from 'utils/bridge'
import * as actions from 'actions/install/shop'
import { clean } from 'actions/errorMessage'

import Style from './break.less'

class BreakDetailContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceQuantity: 0,
      deviceWithBatteryQuantity: 0,
      adapterQuantity: 0,
      boardQuantity: 0
    }
  }
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('中断安装')
  }
  componentDidMount () {
    this.props.actions.fetchShopGet({installNo: this.props.params.id})
  }
  render () {
    let shop = this.props.shopInfo
    if (!shop && !this.props.error) {
      return <Loading />
    }
    if (!shop && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div className='break'>
        <Plan shop={shop} />
        <AddDevice shop={shop} change={this._change.bind(this)} />
        <Button onClick={this._submit.bind(this)} fixed>下一步</Button>
      </div>
    )
  }
  _change (quantities) {
    this.setState({
      deviceQuantity: quantities[0] || 0,
      adapterQuantity: quantities[1] || 0,
      boardQuantity: quantities[2] || 0,
      deviceWithBatteryQuantity: quantities[3] || 0
    })
  }
  _submit () {
    // 允许都为0
    // if (!Number(this.state.deviceQuantity) && !Number(this.state.deviceWithBatteryQuantity) && !Number(this.state.adapterQuantity) && !Number(this.state.boardQuantity)) {
    //   return Toast.show('请输入数量')
    // }
    if (document.getElementsByClassName('error').length) {
      return Toast.show('超出实际安装的主机数量')
    }
    if (Number(this.state.deviceQuantity) + Number(this.state.deviceWithBatteryQuantity) !== Number(this.props.shopInfo.installedDeviceNum)) {
      return Toast.show('主机数与实际安装的主机数量不符')
    }
    router.replace(`/shops/${this.props.params.id}/install/breakReason?quantity=${this.state.deviceQuantity}|${this.state.deviceWithBatteryQuantity}|${this.state.adapterQuantity}|${this.state.boardQuantity}`)
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    shopInfo: state.shopDetail && state.shopDetail.shopInfo
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreakDetailContainer)
