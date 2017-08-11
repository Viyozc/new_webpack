import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'

import Error from 'components/common/error'
import Loading from 'components/common/loading'
import AddDevice from 'components/workOrder/recyle/addDevice'

import * as actions from 'actions/recyle/workOrder'
import { clean } from 'actions/errorMessage'

class RecyleContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceQuantity: 0,
      deviceWithBatteryQuantity: 0,
      batteryQuantity: 0,
      adapterQuantity: 0,
      boardQuantity: 0
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('添加更换')
  }
  componentDidMount () {
    this.props.actions.getMaxReplace({applyType: 1})
  }
  render () {
    if (!this.props.maxReplace && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (!this.props.maxReplace) {
      return <Loading />
    }
    return <div className='add-container'>
      <AddDevice maxReplace={this.props.maxReplace} change={this._change.bind(this)} />
      <div className='bottom'>
        <span className='bottom-left'>总计：</span>
        <span className='bottom-left'><span>设备(无电池)</span><span className='count'>{this.state.deviceQuantity}</span></span>
        <span className='bottom-left'><span>设备(有电池)</span><span className='count'>{this.state.deviceWithBatteryQuantity}</span></span>
        <span className='bottom-left'><span>电池</span><span className='count'>{this.state.batteryQuantity}</span></span>
        <span className='bottom-left'><span>适配器</span><span className='count'>{this.state.adapterQuantity}</span></span>
        <span className='bottom-left'><span>餐牌</span><span className='count'>{this.state.boardQuantity}</span></span>
        <a onClick={this._next.bind(this)}>下一步</a>
      </div>
    </div>
  }
  _change (quantities) {
    this.setState({
      deviceQuantity: parseInt(quantities[0] || 0),
      batteryQuantity: parseInt(quantities[1] || 0),
      adapterQuantity: parseInt(quantities[2] || 0),
      boardQuantity: parseInt(quantities[3] || 0),
      deviceWithBatteryQuantity: parseInt(quantities[4] || 0)
    })
  }
  _next () {
    if (document.getElementsByClassName('error').length) {
      return Toast.show('超出单个备件最大数')
    }
    if (!(this.state.deviceQuantity || this.state.deviceWithBatteryQuantity || this.state.batteryQuantity || this.state.adapterQuantity || this.state.boardQuantity)) {
      return Toast.show('请添加需要更换的备件')
    }
    router.push(`/recyle/add/reason?quantity=${this.state.deviceQuantity}|${this.state.deviceWithBatteryQuantity}|${this.state.batteryQuantity}|${this.state.adapterQuantity}|${this.state.boardQuantity}`)
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    maxReplace: state.maxReplace
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecyleContainer)
