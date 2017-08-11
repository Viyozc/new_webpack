import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NProgress from 'utils/nprogress'
import * as Bridge from 'utils/bridge'
import assign from 'lodash/assign'
import { router } from 'utils'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Button from 'components/common/button'

import * as actions from 'actions/device'
import { clean } from 'actions/errorMessage'

import Style from './boxTest.less'

class BoxTest extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countdown: 10,
      success: false,
      isShowOpc: false
    }
  }

  componentWillMount () {
    Bridge.setNavTitle('设备测试')
    Style.use()
  }

  componentDidMount () {
    // this.props.actions.getBindInfo(this.props.location.query.deviceId, this.props.location.query.shopId)
    if (this.props.location.query.deviceNo) {
      this.props.actions.getDevice(this.props.location.query.deviceNo, this.props.location.query.shopId)
    }
  }

  render () {
    if (!this.props.device && !this.props.error) {
      return <Loading />
    }
    if (!this.props.device && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div className='box-repair'>
        <div className='detail'>
          <p>设备名称:{this.props.device.deviceName}</p>
          <p>设备编号: {this.props.device.deviceNo }</p>
          {this.props.device.status === 0 ? <p className='status online'><span>在线</span></p> : null}
          {this.props.device.status === 1 ? <p className='status offline'><span>离线</span></p> : null}
        </div>
        {
          this.props.device && this.props.device.slotInfoList.map((item, i) => {
            return <p className='list' key={i}>充电宝 <span>编号: {item.powerBankNo}</span></p>
          })
         }
        <Button type='white' onClick={this._goExchange.bind(this)} fixed>更换设备</Button>

      </div>

    )
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.error && nextProps.error && nextProps.device) {
      Toast.show(nextProps.error.message)
      this.props.actions.clearErrorMessage()
    }
  }

  _goExchange () {
    router.replace(`/workOrder/repair/repairPoi?deviceNo=${this.props.location.query.deviceNo}&shopId=${this.props.location.query.shopId}&type=box`)
  }

  componentWillUnmount () {
    this._countdown && clearInterval(this._countdown)
    this.props.actions.cleanBindInfo()
    this.props.actions.clearErrorMessage()
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.deviceBind,
    device: state.device
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign({}, actions, {
      clearErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxTest)
