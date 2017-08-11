import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import NProgress from 'utils/nprogress'

import Loading from 'components/common/loading'
import Error from 'components/common/error'
import SectionComponent from 'components/workOrder/repair/section'

import * as actions from 'actions/repair/workOrder'
import { clean } from 'actions/errorMessage'

import Style from 'components/shop/detail.less'

class WorkOrderContainer extends Component {
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('工单详情')
  }
  componentDidMount () {
    this.props.actions.get(this.props.params.id)
  }
  render () {
    if (!this.props.workOrder && !this.props.error) {
      return <Loading />
    }
    if (!this.props.workOrder && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div>
        <div className={`shop-detail to-repair ${this.props.workOrder.status === 1 ? 'repaired' : ''}`}>
          <SectionComponent finish={this.finish.bind(this)} index={0} {...this.props.workOrder} />
        </div>
      </div>
    )
  }
  finish () {
    NProgress.start()
    this.props.actions.finish(this.props.params.id)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.workOrder) {
      Bridge.setNavTitle(nextProps.workOrder.shopName)
    }
    if (nextProps.workOrder && nextProps.workOrder.finished) {
      NProgress.done()
      location.reload()
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
    workOrder: state.workOrder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkOrderContainer)
