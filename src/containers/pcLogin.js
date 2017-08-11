import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { router } from 'utils'
import assign from 'lodash/assign'
import NProgress from 'utils/nprogress'
import * as actions from 'actions/pcLogin'
import { clean } from 'actions/errorMessage'
import * as Bridge from 'utils/bridge'

import Style from './pcLogin.less'

class PCLogin extends Component {
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('PC登录')
  }
  render () {
    const info = this.props.info
    return (
      <div className='pc-login'>
        <i className='dianfont icon-dengluqueren' />
        <p>PC端登录确认</p>
        {info ? <h4>登录成功，请关闭此页</h4> : null}
        {!info ? <a className='login-btn' onClick={this._login.bind(this)}>登录</a> : <a className='login-btn success' onClick={this._close.bind(this)}>关闭</a>}
        {!info ? <a className='cancel-btn' onClick={this._close.bind(this)}>取消登陆</a> : null}
      </div>
    )
  }
  _login () {
    NProgress.start()
    const uuid = this.props.location.query.uuid
    if (!uuid) {
      return Toast.show('缺少uuid')
    }
    this.props.actions.login({uuid})
  }
  _close () {
    router.goBack()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }
    if (nextProps.error) {
      NProgress.done()
      Toast.show(nextProps.error.message)
      this.props.actions.resetErrorMessage()
    }
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.resetPCLogin()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    info: state.pcLogin && state.pcLogin.info,
    fetch: state.pcLogin && state.pcLogin.fetch
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {resetErrorMessage: clean}), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PCLogin)
