import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'
import NProgress from 'utils/nprogress'

import Button from 'components/common/button'
import Loading from 'components/common/loading'
import * as optionsActions from 'actions/option'

import * as actions from 'actions/repair/workOrder'
import * as recyleActions from 'actions/recyle/workOrder'
import { clean } from 'actions/errorMessage'

import Style from '../repair/result.less'

// const Reasons = ['未及时充电', '网络信号不好', '设备网络故障', '设备无法启动', '设备线缆损坏', '其他原因']

class ReasonContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      optionDes: ''
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('选择原因')
    Style.use()
  }
  componentDidMount () {
    this.props.actions.getOptions(8)
  }
  render () {
    const reasonOptions = this.props.resultOptions && this.props.resultOptions.opts
    if (!reasonOptions) {
      return <Loading />
    }
    if (!reasonOptions && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return <div className='result'>
      <ul>
        {
        reasonOptions.map((o, i) => {
          return <li onClick={() => { this.setState({selectedIndex: o.key}) }} key={i}>{o.value}<span className={`radio ${this.state.selectedIndex === o.key ? 'selected' : ''}`} /></li>
        })
      }
      </ul>
      <div className='comment-panel'>
        <textarea rows='4' placeholder='其它原因' value={this.state.optionDes} onChange={(e) => this.setState({optionDes: e.target.value})} />
      </div>
      <Button onClick={this._configure.bind(this)} fixed>保存</Button>
    </div>
  }
  _configure () {
    if (!this.state.selectedIndex) {
      return Toast.show('请选择原因')
    }
    if (!this.props.location.query.quantity) {
      Toast.show('请选择备件数量')
      return router.replace('/recyle/add')
    }
    NProgress.start()
    this.props.actions.submit(this.state.selectedIndex, this.state.optionDes, this.props.location.query.quantity.split('|'))
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.error) {
      NProgress.done()
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.clearErrorMessage()
    }
    if (nextProps.workOrder && nextProps.workOrder.complete) {
      NProgress.done()
      router.push('/recyle')
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
    actions: bindActionCreators(assign(actions, recyleActions, optionsActions, {
      clearErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReasonContainer)
