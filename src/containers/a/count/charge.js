import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'

import { router } from 'utils'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/a/count'

import Style from './charge.less'

class CountChargeContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      isLoading: false,
      money: 0
    }
  }

  componentWillMount () {
    Style.use()
  }

  componentDidMount () {
    Bridge.setNavTitle('代理费充值')
  }

  render () {
    return (
      <div className='agent-count-charge'>
        <article className='info'>
          <span className='line'>
            <label className='tit'>充值金额</label>
            <input value={this.state.money === 0 ? '' : this.state.money} onChange={(e) => this._onChange(e)}
              type='number' step='0.01' placeholder='输入充值金额' className='inp-money' />
          </span>
          <p className='remarks'>请先向我们的对公账号打款，再提交相关的申请，如有疑问请联系对应的渠道经理</p>
          <button className={`btn-submit ${this.state.isLoading || this.state.money === 0 ? 'half-opc' : ''}`}
            onClick={() => { if (!this.state.isLoading) { this._submit() } }}>提交充值申请
          </button>
        </article>
      </div>
    )
  }

  _onChange (e) {
    this.setState({
      money: e.target.value
    })
  }

  _submit () {
    if (this.state.money === 0) {
      return Toast.show('请输入正确的金额')
    }
    this.setState({
      isLoading: true
    })
    this.props.actions.cashCharge({
      amount: this.state.money * 100
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (this.props.status === 'request' && nextProps.status === 'success') {
      this.setState({
        isLoading: false
      })
      Toast.show('保存成功')
      router.replace('/a/count/cash/manage')
      this.setState({
        money: 0
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
    status: state.agentCount.submitStatus
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountChargeContainer)
