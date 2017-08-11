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
import { clean } from 'actions/errorMessage'

import Style from './result.less'

// const Reasons = ['充电成功', '更换新设备', '其他措施']

class ConfigContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: -1,
      isNormal: this.props.location.query.normal
    }
  }
  componentWillMount () {
    if (this.state.isNormal) {
      Bridge.setNavTitle('设备无需更换原因')
    } else {
      Bridge.setNavTitle('维修成功')
    }
    Style.use()
  }
  componentDidMount () {
    if (this.state.isNormal) {
      this.props.actions.getOptions(6)
    } else {
      this.props.actions.getOptions(7)
    }
  }
  render () {
    if (!this.props.resultOptions) {
      return <Loading />
    }
    const operOptions = this.props.resultOptions && this.props.resultOptions.opts
    return <div className='result'>
      <ul>
        {
        operOptions.map((o, i) => {
          return <li onClick={() => { this.setState({selectedIndex: Number(o.key)}) }} key={i}>{o.value}<span className={`radio ${this.state.selectedIndex === Number(o.key) ? 'selected' : ''}`} /></li>
        })
      }
      </ul>
      {this.state.selectedIndex === 0 ? <textarea ref='text' placeholder={this.state.isNormal ? '请填写原因' : '请填写维修措施'} name='' id='' cols='30' rows='10' /> : null}
      <Button onClick={this.state.isNormal ? this._completeNormal.bind(this) : this._complete.bind(this)} fixed>提交</Button>
    </div>
  }
  _completeNormal () {
    if (this.state.selectedIndex === -1) {
      return Toast.show('请选择原因')
    }
    if (this.state.selectedIndex === 0 && !this.refs.text.value.trim()) {
      return Toast.show('请填写原因')
    }
    if (this.props.location.query.oldDeviceNo) {
      NProgress.start()
      this.props.actions.normal(this.props.location.query.workOrderNo, this.state.selectedIndex, this.refs.text ? this.refs.text.value.trim() : undefined, this.props.location.query.oldDeviceNo)
    }
  }
  _complete () {
    if (this.state.selectedIndex === -1) {
      return Toast.show('请选择维修措施')
    }
    if (this.state.selectedIndex === 0 && !this.refs.text.value.trim()) {
      return Toast.show('请填写维修措施')
    }
    if (this.props.location.query.deviceNo) {
      NProgress.start()
      this.props.actions.complete(this.props.location.query.installNo, this.state.selectedIndex, this.refs.text ? this.refs.text.value.trim() : undefined)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.workOrder && nextProps.workOrder.complete) {
      NProgress.done()
      // router.replace(`/workOrders/${this.props.location.query.workOrderNo}/repair`)
      router.push('/shops?roleIndex=0&activeTab=-1')
    }
    if (nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.clearErrorMessage()
      NProgress.done()
    }
  }
  componentWillUnmount () {
    this.props.actions.reset()
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    workOrder: state.workOrder,
    resultOptions: state.resultOptions
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign({}, OptionAction, actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigContainer)
