import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'
import NProgress from 'utils/nprogress'

import Button from 'components/common/button'
import * as actions from 'actions/bd/device'
import { clean } from 'actions/errorMessage'

import Style from './result.less'

class ResuleContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: null,
      optionDes: '',
      devices: []
    }
  }
  componentDidMount () {
    let deviceInfo = JSON.parse(window.localStorage.getItem('deviceInfo'))
    this.setState({selectedIndex: deviceInfo})
  }
  componentWillMount () {
    Bridge.setNavTitle('标注遗失结果')
    Style.use()
  }
  render () {
    let styleOne = []
    let styleTwo = []
    let styleBox = []
    for (let i in this.state.selectedIndex) {
      let item = this.state.selectedIndex[i]
      if (item.deviceType === 4 || item.deviceType === 5) {
        styleOne.push(item.deviceNo)
      } else if (item.deviceType === 6 || item.deviceType === 7 || item.deviceType === 9 || item.deviceType === 10) {
        styleTwo.push(item.deviceNo)
      } else if (item.deviceType === 8) {
        styleBox.push(item.deviceNo)
      }
    }
    return <div>
      <div className='lose'>
        <div className='title'>遗失件设备编号：</div>
        <div className='content'>
          <p className='category'>座充一代: <span>{styleOne.length}</span></p>
          <p className='ids'>{styleOne.join(', ')}</p>
          <p className='category'>座充二代: <span>{styleTwo.length}</span></p>
          <p className='ids'>{styleTwo.join(', ')}</p>
          <p className='category'>盒子: <span>{styleBox.length}</span></p>
          <p className='ids'>{styleBox.join(', ')}</p>
        </div>
      </div>
      <div className='comment-panel'>
        <textarea rows='4' placeholder='请填写遗失原因' ref={(input) => { this.lostReason = input }} />
      </div>
      <Button onClick={this._submit.bind(this)} className='fixed'>提交</Button>
    </div>
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
      Toast.show('提交成功, 请等待审核')
      setTimeout(() => {
        router.push('/bd/device/list?type=4')
      }, 1000)
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }
    if (nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.clearErrorMessage()
    }
  }
  _submit () {
    let devices = []
    for (let i in this.state.selectedIndex) {
      devices.push(this.state.selectedIndex[i].deviceNo)
    }
    devices = devices.join(',')
    // this.setState({devices: this.state.devices.push(devices)})
    let lostReason = this.lostReason.value
    if (!lostReason) return Toast.show('请填写遗失原因')
    this.props.actions.fetchDeviceLost({deviceNos: devices, lostReason, shopId: this.props.location.query.shopId, lostType: 0})
  }
  componentWillUnmount () {
    window.localStorage.setItem('deviceInfo', '')
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    fetch: state.bdDeviceLosePage && state.bdDeviceLosePage.fetch,
    resultOptions: state.resultOptions
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      clearErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResuleContainer)
