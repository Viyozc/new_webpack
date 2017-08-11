import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Style from './index.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/user'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { cookie } from 'cookie_js'
import { COOKIT_OPTIONS, AGENT_ROLE } from 'constants'
import * as localStorage from 'utils/localStorage'

class IndexContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('个人主页')
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  componentDidMount () {
    this.props.actions.fetchUser()
  }
  componentWillReceiveProps (nextProps) {
  }
  render () {
    return (
      <div>
        <button className='cell clearfix'>
          <div className='left'>头像</div>
          <div className='right'>
            <div className='avatar' style={{backgroundImage: this.props.user.avatar ? `url(${this.props.user.avatar})` : 'url(//img.shenghuozhe.net/shz/2017/01/19/222w_200h_4A6BD1484797529.png)'}} />
          </div>
        </button>
        <div className='cell clearfix'>
          <div className='left'>昵称</div>
          <div className='right'>{this.props.user.nickName}</div>
        </div>
        <div className='cell clearfix'>
          <div className='left'>职业</div>
          <div className='right'>{this.props.user.roleName_zh}</div>
        </div>
        <div className='cell clearfix'>
          <div className='left'>手机号</div>
          <div className='right'>{this.props.user.mobile}</div>
        </div>
        <div className='cell clearfix'>
          <div className='left'>邮箱</div>
          <div className='right'>{this.props.user.email}</div>
        </div>
        <div className='logout'>
          <button onClick={this._logout.bind(this)}>退出登录</button>
        </div>

      </div>
    )
  }
  _logout () {
    let role = cookie.get('role') || localStorage.getItem('role') || AGENT_ROLE
    cookie.set('dsid', '', COOKIT_OPTIONS)
    cookie.set('role', '', COOKIT_OPTIONS)
    if (role === AGENT_ROLE) {
      location.href = '/a/login'
    } else {
      location.href = '/login'
    }
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
