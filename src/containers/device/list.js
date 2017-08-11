import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'

import Button from 'components/common/button'
import Table from 'components/common/table'
import Error from 'components/common/error'
import Loading from 'components/common/loading'

import * as actions from 'actions/device'

const PAGE_SIZE = 50
const h2Style = {
  backgroundColor: '#fff',
  fontWeight: 'normal',
  color: '#606060',
  fontSize: '16px',
  textIndent: '15px',
  lineHeight: '50px'
}

class DeviceListContainer extends Component {
  componentWillMount () {
    Bridge.setNavTitle('门店设备列表')
  }
  render () {
    if (!this.props.error && !this.props.data) {
      return <Loading />
    }
    if (this.props.error && !this.props.data) {
      return <Error>{this.props.error.message}</Error>
    }
    return (
      <div>
        <h2 style={h2Style}>{this.props.location.query.shopName}</h2>
        <Table labels={this.props.labels} data={this.props.data} />
        <Button fixed={!!1} to={'/device/bind?shopId=' + this.props.location.query.shopId}>添加设备</Button>
      </div>
    )
  }
  componentDidMount () {
    this.props.actions.getList(this.props.location.query.shopId, 0, PAGE_SIZE)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.deviceList && state.deviceList.list,
    labels: state.deviceList && state.deviceList.labels
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListContainer)
