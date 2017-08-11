import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import NProgress from 'utils/nprogress'
import { router } from 'utils'

import Cell, { Cells, CellBody } from 'components/common/cell'
import Button from 'components/common/button'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/b/account'

import Style from './signUp.less'
import Loading from '../../components/common/loading'

class RegistryContainer extends Component {
  componentWillMount () {
    Style.use()
  }
  componentDidMount () {
    Bridge.setNavTitle('资料完善')
    if (!this.props.location.query.token) {
      location.href = '/leo/1.0/h5/merchant/login?rd=' + encodeURIComponent(this.props.location.query.rd)
      return
    }
    if (!this.props.data || !this.props.location.query.mobile) {
      Toast.show('请先验证手机号')
    }
    this.props.actions.getSignInfo({
      mobile: this.props.location.query.mobile
    })
  }
  render () {
    let existData
    if (this.props.error) {
      return false
    }
    if (!this.props.existData) {
      return <Loading />
    }
    existData = this.props.existData || {}
    let commpanyName = existData && existData.companyName || '',
      contactName = existData && existData.contactName || ''
    return (
      <div className='registry'>
        <Cells>
          <Cell icon='gongsi'>
            <CellBody>
              <input type='text' ref='company' placeholder='请输入公司名' defaultValue={commpanyName} />
            </CellBody>
          </Cell>
          <Cell icon='lianxiren'>
            <CellBody>
              <input type='text' ref='name' placeholder='请输入联系人名字' defaultValue={contactName} />
            </CellBody>
          </Cell>
          <Cell icon='mendiandianhua'>
            <CellBody>
              <input type='number' disabled ref='phone' placeholder='请输入联系人电话' defaultValue={this.props.location.query && this.props.location.query.mobile} />
            </CellBody>
          </Cell>
        </Cells>
        <Button fixed={!!1} onClick={this._regist.bind(this)}>注册</Button>
      </div>
    )
  }
  _onChange () {

  }
  _regist () {
    let refs = this.refs
    if (!refs.company.value) { return Toast.show('请输入公司名') }
    if (!refs.name.value) { return Toast.show('请输入联系人名字') }
    if (!refs.phone.value) { return Toast.show('请输入联系人电话') }
    NProgress.start()
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
      companyName: refs.company.value,
      contactMobile: refs.phone.value,
      contactName: refs.name.value,
      mobile: this.props.location.query.mobile,
      token: this.props.location.query.token,
      role: role
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.error) {
      NProgress.done()
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (nextProps.data && nextProps.data.signed) {
      NProgress.done()
      router.replace(this.props.location.query.rd || '/b')
    }
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.login,
    existData: state.login && state.login.existData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistryContainer)
