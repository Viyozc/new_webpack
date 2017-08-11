import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { router } from 'utils'

import { clean } from 'actions/errorMessage'
import * as Bridge from 'utils/bridge'

import Style from './scanLogin.less'

class ScanLogin extends Component {
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('扫码登录')
  }
  render () {
    return <div className='pc-view'>
      <i className='dianfont icon-dengluqueren' />
      <p>扫码登录PC端</p>
      <a className='view-btn' onClick={this._bindScan.bind(this)}>扫码登录</a>
    </div>
  }
  _bindScan () {
    Bridge.scanQRCode((res) => {
      let link = res.data
      router.push(link.substr(link.indexOf('/pcLogin')))
    })
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.resetErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({resetErrorMessage: clean}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanLogin)
