import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'
import NProgress from 'utils/nprogress'

import Cell, { Cells, CellBody, CellFooter } from 'components/common/cell'
import Input from 'components/common/input'
import Button from 'components/common/button'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/b/account'

import Style from './mobile.less'

const HOLDER_MOBILE = '请输入手机号码'
const HOLDER_SMSCODE = '请输入验证码'

class MobileContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mobile: ''
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentDidMount () {
    Bridge.setNavTitle('手机号码验证')
    if (!this.props.location.query.token) {
      location.href = '/leo/1.0/h5/merchant/login?rd=' + encodeURIComponent(this.props.location.query.rd)
      return
    }
  }
  render () {
    let buttonText = '获取验证码'
    let buttonProps = {
      className: 'send-sms-code'
    }

    if (this.props.data.countDown) {
      buttonProps.disabled = 'disabled'
      buttonText = this.props.data.countDown + '秒可重发'
    } else {
      buttonProps.onClick = this._handleSendToken.bind(this)
      this.__timer && clearInterval(this.__timer)
    }
    let role = ''
    let rd = this.props.location.query.rd
    if (rd.indexOf('?') > -1) {
      let rdTemp = rd.split('?')[1]
      if (rdTemp.indexOf('&') > -1) {
        let rdTempArr = rdTemp.split('&')
        for (let i = 0; i < rdTempArr.length; i++) {
          if (rdTempArr[i].split('=')[0] === 'role') {
            role = rdTempArr[i].split('=')[1]
          }
        }
      } else {
        role = rdTemp.split('=')[1]
      }
    }
    return (
      <div className='mobile-verify'>
        <Cells>
          <Cell icon='mendiandianhua'>
            <CellBody>
              <Input type='number' ref='mobile' placeholder={HOLDER_MOBILE} pattern='[0-9]*' />
            </CellBody>
            <CellFooter>
              <Button {...buttonProps}>{buttonText}</Button>
            </CellFooter>
          </Cell>
          <Cell icon='yanzhengma'>
            <CellBody>
              <Input type='number' ref='token' placeholder={HOLDER_SMSCODE} pattern='[0-9]*' />
            </CellBody>
          </Cell>
        </Cells>
        {role === 'deviceKeeper'
            ? <Button fixed={!!1} onClick={this._login.bind(this)}>登 录</Button>
            : <Button fixed={!!1} onClick={this._verify.bind(this)}>下一步</Button>
          }
      </div>
    )
  }
  _handleSendToken () {
    const mobile = ReactDOM.findDOMNode(this.refs.mobile).value
    if (!mobile) return Toast.show(HOLDER_MOBILE)

    this.props.actions.getMerchantSmsCode(mobile)
    this.props.actions.countDown()

    this.__timer = setInterval(() => {
      this.props.actions.countDown()
    }, 1000)
  }
  _verify () {
    const mobile = ReactDOM.findDOMNode(this.refs.mobile).value
    const token = ReactDOM.findDOMNode(this.refs.token).value

    if (!mobile) return Toast.show(HOLDER_MOBILE)
    if (!token) return Toast.show(HOLDER_SMSCODE)

    NProgress.start()
    this.setState({
      mobile: mobile
    })
    this.props.actions.verify(mobile, token)
  }
  _login () {
    const mobile = ReactDOM.findDOMNode(this.refs.mobile).value
    const token = ReactDOM.findDOMNode(this.refs.token).value

    if (!mobile) return Toast.show(HOLDER_MOBILE)
    if (!token) return Toast.show(HOLDER_SMSCODE)
    let role = ''
    let rd = this.props.location.query.rd
    if (rd.indexOf('?') > -1) {
      let rdTemp = rd.split('?')[1]
      if (rdTemp.indexOf('&') > -1) {
        let rdTempArr = rdTemp.split('&')
        for (let i = 0; i < rdTempArr.length; i++) {
          if (rdTempArr[i].split('=')[0] === 'role') {
            role = rdTempArr[i].split('=')[1]
          }
        }
      } else {
        role = rdTemp.split('=')[1]
      }
    }
    this.props.actions.signUp({
      mobile: mobile,
      smsToken: token,
      role: role,
      token: this.props.location.query.token
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.error) {
      NProgress.done()
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (nextProps.error) {
      NProgress.done()
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    let role = ''
    let rd = this.props.location.query.rd
    if (rd.indexOf('?') > -1) {
      let rdTemp = rd.split('?')[1]
      if (rdTemp.indexOf('&') > -1) {
        let rdTempArr = rdTemp.split('&')
        for (let i = 0; i < rdTempArr.length; i++) {
          if (rdTempArr[i].split('=')[0] === 'role') {
            role = rdTempArr[i].split('=')[1]
          }
        }
      } else {
        role = rdTemp.split('=')[1]
      }
    }
    if (role === 'merchant') {
      if (nextProps.data && nextProps.data.mobile) {
        NProgress.done()
        router.push(`/b/signUp?mobile=${nextProps.data.mobile}&token=${this.props.location.query.token}${this.props.location.query.rd ? '&rd=' + this.props.location.query.rd : ''}`)
      }
    } else {
      if (nextProps.data && nextProps.data.signed) {
        NProgress.done()
        router.replace(this.props.location.query.rd || '/b')
      }
    }
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
    this.__timer && clearInterval(this.__timer)
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.login
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileContainer)