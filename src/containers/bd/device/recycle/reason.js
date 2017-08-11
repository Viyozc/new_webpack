import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'
import NProgress from 'utils/nprogress'
import * as localStorage from 'utils/localStorage'
import ActionTypes from 'constants/actionTypes/bd/device'

import Loading from 'components/common/loading'
import * as optionsActions from 'actions/option'
import * as actions from 'actions/bd/device'
import { clean } from 'actions/errorMessage'

import Style from './reason.less'

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
    this.props.actions.getOptions(9)
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
      <a className='submit_css' onClick={this._configure.bind(this)}>下一步</a>
    </div>
  }
  _configure () {
    if (!this.state.selectedIndex) {
      return Toast.show('请选择原因')
    }
    NProgress.start()
    let jsonListRecycle = JSON.parse(localStorage.getItem('recycleList'))
    let postRecycleObj = {}
    postRecycleObj.optionDes = this.state.optionDes
    postRecycleObj.option = this.state.selectedIndex
    postRecycleObj.products = jsonListRecycle
    this.props.actions.fetchUploadRecycle(postRecycleObj)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.clearErrorMessage()
    }
    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'success') {
      if (nextProps.fetchType === ActionTypes.BD_DEVICE_GET_UPLOAD_RECYCLE) {
        localStorage.removeItem('recycleList')
        NProgress.done()
        router.push('/bd/device/list?type=1')
      }
    }
    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'failure') {
      NProgress.done()
    }
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    fetch: state.bdDeviceRecyclePage && state.bdDeviceRecyclePage.fetch,
    resultOptions: state.resultOptions,
    fetchRequest: state.bdDeviceRecyclePage && state.bdDeviceRecyclePage.fetchRequest,
    fetchType: state.bdDeviceRecyclePage && state.bdDeviceRecyclePage.fetchType
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, optionsActions, {
      clearErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReasonContainer)
