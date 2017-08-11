import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import { router } from 'utils'
import * as Bridge from 'utils/bridge'
import * as varify from 'utils/varify'

import { clean } from 'actions/errorMessage'
import * as teamAction from 'actions/a/team'

import Style from './add.less'

class TeamAddContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      name: '',
      phone: '',
      id: '',
      isLoading: false
    }
  }

  componentWillMount () {
    Style.use()
  }

  componentDidMount () {
    Bridge.setNavTitle('新增员工')
  }

  render () {
    let btnClass = 'btn-commit half-opc'
    if (this.state.name !== '' && this.state.phone !== '') {
      btnClass = 'btn-commit'
    }
    return (
      <div className='agent-team-add'>
        <ul className='form'>
          <li className='line name'>
            <span className='border-bottom'>
              <label className='dianfont icon-Shape' />
              <input className='input' type='text' onChange={(e) => this._onChange('name', e.target.value)}
                value={this.state.name} placeholder='输入员工姓名' />
            </span>
          </li>
          <li className='line phone'>
            <label className='dianfont icon-Fill' />
            <input className='input' type='number' onChange={(e) => this._onChange('phone', e.target.value)}
              value={this.state.phone} placeholder='输入手机号码' />
          </li>
          <li className='line id'>
            <label className='dianfont icon-iconfont-cardidcopy' />
            <input className='input' value={this.state.id} onChange={(e) => this._onChange('id', e.target.value)}
              type='text' placeholder='输入身份证号码（可选）' />
          </li>
        </ul>
        <div className='btn-wap'>
          <button className={`${btnClass}`} onClick={() => { if (!this.state.isLoading) this._confirm() }}>确认</button>
        </div>
      </div>
    )
  }

  _countLength (str) {
    let r = 0
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i)
      // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff
      // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
      if ((c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
        r += 1
      } else {
        r += 2
      }
    }
    return r
  }

  _confirm () {
    if (this.state.name === '') {
      return Toast.show('请输入名字')
    }
    if (this._countLength(this.state.name) > 10) {
      return Toast.show('英文字数不得超过10个，中文字数不得超过5个')
    }
    if (this.state.phone === '') {
      return Toast.show('请输入手机号码')
    }
    if (!varify.isPhone(this.state.phone)) {
      return Toast.show('无效的手机号码')
    }
    if (this.state.id !== '') {
      let isPass = varify.isCardId(this.state.id)
      if (!isPass.pass) {
        return Toast.show(isPass.tip)
      }
    }
    this.setState({
      isLoading: true
    })
    this.props.actions.addTeam({
      idCardNo: this.state.id,
      mobile: this.state.phone,
      name: this.state.name
    })
  }

  _onChange (type, value) {
    switch (type) {
      case 'name':
        this.setState({
          name: value
        })
        break
      case 'phone':
        this.setState({
          phone: value
        })
        break
      case 'id':
        this.setState({
          id: value
        })
        break
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.status && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
      this.setState({
        isLoading: false
      })
    }
    if (this.props.status === 'request' && nextProps.status === 'success') {
      Toast.show('保存成功')
      this.setState({
        isLoading: false,
        id: '',
        name: '',
        phone: ''
      })
    }
  }

  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    status: state.agentTeam.submitStatus
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(teamAction, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamAddContainer)
