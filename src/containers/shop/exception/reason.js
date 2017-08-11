import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import NProgress from 'utils/nprogress'
import SelectA from 'components/common/selectA'
import Status from 'components/common/status'
import Error from 'components/common/error'
import Button from 'components/common/button'
import Loading from 'components/common/loading'
import { router } from 'utils'

import * as actions from 'actions/shop'
import { clean } from 'actions/errorMessage'

import Style from './reason.less'

class ReasonContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSuccess: false,
      selectedIndex: null,
      reason: ''
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('处理结果')
    Style.use()
  }
  componentDidMount () {
    this.props.actions.fetchGetShopExceptionReasons()
  }
  render () {
    if (!this.props.reasons && !this.props.error) {
      return <Loading />
    }
    if (!this.props.reasons && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return <div className='result'>
      <div className='select'>
        <SelectA model={2} options={this.props.reasons} selectedValue={this.state.selectedIndex} onChose={this._bindSelectOption.bind(this)} />
      </div>
      <textarea rows='4' placeholder='请填写原因' value={this.state.otherValue} onChange={this._bindChangeTextarea.bind(this)} />
      <Button onClick={this._configure.bind(this)} fixed>提交</Button>
      {this.state.showSuccess ? <Status status='success' content='提交成功' /> : null}
    </div>
  }
  _bindSelectOption (id) {
    if (this.state.selectedIndex === id) {
      this.setState({
        selectedIndex: null
      })
    } else {
      this.setState({
        selectedIndex: id
      })
    }
  }
  _bindChangeTextarea (e) {
    this.setState({
      reason: e.target.value
    })
  }
  _configure () {
    if (typeof this.state.selectedIndex !== 'number') return Toast.show('请选择处理结果')
    NProgress.start()
    this.props.actions.fetchShopExceptionProcess({comment: this.state.reason, id: this.props.params.id, processWay: this.state.selectedIndex})
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
      this.setState({showSuccess: true})
      this._timer = setTimeout(() => {
        this.setState({showSuccess: false})
        router.goBack()
      }, 1000)
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }
    if (nextProps.reasons && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  componentWillUnmount () {
    this.props.actions.cleanShopExceptionReason()
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    reasons: state.shopExceptionReason && state.shopExceptionReason.reasons,
    fetch: state.shopExceptionReason && state.shopExceptionReason.fetch
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReasonContainer)
