import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'
import NProgress from 'utils/nprogress'

import DeviceItem from 'components/warehouse/distributeItem'
import Button from 'components/common/button'

import * as actions from 'actions/repair/workOrder'
import * as dActions from 'actions/warehouse/distribution'
import { clean } from 'actions/errorMessage'

class DistributeContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {
    Bridge.setNavTitle('配货')
  }
  componentDidMount () {
    ReactDom.findDOMNode(this.refs.btn).setAttribute('disabled', true)
  }
  render () {
    return <div className='add-container'>
      <div className='header'>
        <p>申请人：{this.props.location.query.applyName}</p>
        <p>申请时间：{this.props.location.query.applyTime}</p>
      </div>
      <DeviceItem changeBtnStatus={this._refreshBtn.bind(this)} products={this.props.location.query.products} />
      <Button ref='btn' fixed onClick={this._allocate.bind(this)}>配货完成</Button>
    </div>
  }
  _refreshBtn (enabled) {
    if (!enabled) {
      ReactDom.findDOMNode(this.refs.btn).setAttribute('disabled', true)
    } else {
      ReactDom.findDOMNode(this.refs.btn).removeAttribute('disabled')
    }
  }
  _allocate () {
    if (ReactDom.findDOMNode(this.refs.btn).getAttribute('disabled')) {
      return
    }
    NProgress.start()
    this.props.actions.allocate({id: this.props.location.query.id})
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.workOrder && nextProps.workOrder.allocated) {
      NProgress.done()
      router.replace(this.props.location.query.demo ? '/warehouse/demo/distribution?activeTab=2' : '/warehouse/distribution?activeTab=2')
    }
    if (nextProps.error) {
      NProgress.done()
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  componentWillUnmount () {
    this.props.actions.reset()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    workOrder: state.workOrder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, dActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DistributeContainer)
