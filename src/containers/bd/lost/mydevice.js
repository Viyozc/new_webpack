import React, { Component } from 'react'
import { connect } from 'react-redux'
import assign from 'lodash/assign'
import * as actions from 'actions/bd/device'
import { bindActionCreators } from 'redux'
import { clean } from 'actions/errorMessage'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'

import Style from './mydevice.less'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Button from 'components/common/button'
import NProgress from 'utils/nprogress'

class DeviceList extends Component {
  componentWillMount () {
    Bridge.setNavTitle('我的设备')
    Style.use()
  }
  componentDidMount () {
    if (!this.props.userProducts) return router.replace('/bd/device/list?type=4')
  }
  componentWillReceiveProps (nextProps) {

  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  render () {
    if (!this.props.userProducts && !this.props.error) {
      return <Loading />
    }
    if (!this.props.userProducts && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div className='mydevice'>
        {this.props.userProducts && this.props.userProducts.map((item, i) => {
          return <div key={i} className='cell'>
            座充设备{item.productName}
            <span className='count'>{item.normalNum}</span>
          </div>
        })}
        <Button fixed fixedSpace={0} onClick={() => router.replace('/bd/lost/commitSpareLost')}>上报遗失</Button>
      </div>
    )
  }
  _handleAgree () {
    NProgress.start()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    fetch: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.fetch,
    userProducts: state.bdDeviceListPage && state.bdDeviceListPage.userProducts

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

