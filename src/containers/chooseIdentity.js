import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { router } from 'utils'
import * as Bridge from 'utils/bridge'
import Role from 'components/chooseIdentity/role'
import Style from './chooseIdentity.less'
import * as actions from 'actions/chooseIdentity'
import { clean } from 'actions/errorMessage'
import assign from 'lodash/assign'
import { cookie } from 'cookie_js'
import { COOKIT_OPTIONS, SELLER_ROLE, ROLE_STATUS } from 'constants'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import NProgress from 'utils/nprogress'
import * as localStorage from 'utils/localStorage'

class ChooseIdentityContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      roleIndex: -1
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('身份选择')
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanRole()
    NProgress.done()
  }
  componentDidMount () {
    cookie.set('role', SELLER_ROLE, COOKIT_OPTIONS)
    localStorage.setItem('role', SELLER_ROLE)
    this.props.actions.fetchUserCheckRole(ROLE_STATUS.map((item, i) => item.role))
  }
  componentWillReceiveProps (nextProps) {
    if ((!this.props.role && nextProps.role && nextProps.role !== 'choseRole') || (this.props.fetch === 'request' && nextProps.fetch === 'success')) {
      ROLE_STATUS.map((roleObj, i) => {
        if (nextProps.role === roleObj.role) {
          switch (roleObj.roleIndex) {
            case 0: // bd
            case 5: // bdm
            case 25: // ceo
              router.push('/home')
              break
            case 22: // 渠道
              router.push('/channel')
              break
            case 4: // 数据中心
              router.push('/data/center')
              break
            default:
              router.push('/scanLogin')
          }
        }

          NProgress.done()
      })
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }
    if (nextProps.role && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
      NProgress.done()
    }
  }
  render () {
    if (!this.props.role && !this.props.error) {
      return <Loading />
    }
    if (!this.props.role && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.role !== 'choseRole') {
      return null
    }
    return (
      <div>
        <p className='title'>请选择你的身份</p>
        <div className='roles clearfix'>
          {ROLE_STATUS.map((item, i) => {
            return <Role
              key={i}
              index={item.roleIndex}
              name={item.name}
              selected={this.state.roleIndex}
              onChoose={(roleIndex) => { this._triggerSelectRole(roleIndex) }} />
          })}
        </div>
        {
          this.state.roleIndex === -1
          ? <div className='button disabled-button'>确定</div>
          : <a className='button' href='javascript: void(0)' onClick={() => { this._triggerSubmit() }} >确定</a>
        }
      </div>
    )
  }
  _triggerSubmit () {
    let role
    for (let i = 0; i < ROLE_STATUS.length; i++) {
      let roleObj = ROLE_STATUS[i]
      if (roleObj.roleIndex === this.state.roleIndex) {
        role = roleObj.role
        break
      }
    }
    NProgress.start()
    this.props.actions.fetchUsereChoseRole({role: role})
  }
  _triggerSelectRole (roleIndex) {
    this.setState({
      roleIndex: roleIndex
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    role: state.chooseIdentity && state.chooseIdentity.role,
    fetch: state.chooseIdentity && state.chooseIdentity.fetch
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseIdentityContainer)
