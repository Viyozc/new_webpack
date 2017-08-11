import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NProgress from 'utils/nprogress'
import { router } from 'utils'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { cookie } from 'cookie_js'
import { COOKIT_OPTIONS, AGENT_ROLE } from 'constants'
import Style from 'components/login.less'
import Button from 'components/common/button'
import Logo from 'components/common/a/logo'
import Input from 'components/common/input'
import Cell, { Cells, CellBody, CellFooter } from 'components/common/cell'
import * as localStorage from 'utils/localStorage'
import * as actions from 'actions/a/login/account'
import { clean } from 'actions/errorMessage'

const HOLDER_MOBILE = '请输入手机号码'
const HOLDER_SMSCODE = '请输入验证码'

class LoginContainer extends Component {
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('登录')
  }

  render () {
    let buttonText = '发送验证码'
    let buttonProps = {
      className: 'sendSmsCode'
    }

    if (this.props.data.countDown) {
      buttonProps.disabled = 'disabled'
      buttonText = this.props.data.countDown + '秒可重发'
    } else {
      buttonProps.onClick = this._handleSendToken.bind(this)
    }

    return (
      <div className='login'>
        <Logo />
        <Cells>
          <Cell icon='shouji'>
            <CellBody>
              <Input type='number' ref='mobile' placeholder={HOLDER_MOBILE} pattern='[0-9]*' />
            </CellBody>
            <CellFooter>
              <Button {...buttonProps}>{buttonText}</Button>
            </CellFooter>
          </Cell>
          <Cell icon='code'>
            <CellBody>
              <Input type='number' ref='token' placeholder={HOLDER_SMSCODE} pattern='[0-9]*' />
            </CellBody>
          </Cell>
        </Cells>
        <Button className='login-button' onClick={this._handleLogin.bind(this)}>登录</Button>
      </div>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.data.returnToken && nextProps.data.returnToken) {
      NProgress.done()
      cookie.set('role', AGENT_ROLE, COOKIT_OPTIONS)
      localStorage.setItem('role', AGENT_ROLE)
      Bridge.setUser({
        token: nextProps.data.returnToken,
        userId: nextProps.data.userId,
        phone: nextProps.data.mobile
      })
      if (this.props.location && this.props.location.query.redirect) {
        location.href = this.props.location.query.redirect
      } else {
        if (nextProps.data.roleName === 'bdAgencyBoss' || nextProps.data.roleName === 'bdAgencyBD') {
          return router.replace('/a/agentBD/home')
        } else {
          return router.replace('/a/channel')
        }
      }
    }

    if (!nextProps.data.countDown) {
      clearInterval(this.__timer)
    }

    if (nextProps.error) {
      NProgress.done()
      Toast.show(nextProps.error.message)
      nextProps.actions.cleanErrorMessage()
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.__timer && clearInterval(this.__timer)
    this.props.actions.cleanLoginInfo()
  }

  _handleSendToken () {
    const mobile = ReactDOM.findDOMNode(this.refs.mobile).value
    if (!mobile) return Toast.show(HOLDER_MOBILE)

    this.props.actions.getSmsCode(mobile)
    this.props.actions.countDown()

    this.__timer = setInterval(() => {
      this.props.actions.countDown()
    }, 1000)
  }

  _handleLogin () {
    const mobile = ReactDOM.findDOMNode(this.refs.mobile).value
    const token = ReactDOM.findDOMNode(this.refs.token).value

    if (!mobile) return Toast.show(HOLDER_MOBILE)
    if (!token) return Toast.show(HOLDER_SMSCODE)

    NProgress.start()
    this.props.actions.login(mobile, token)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.agentLogin
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
