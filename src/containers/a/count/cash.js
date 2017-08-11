import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'

import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Tabs, { Tab } from 'components/common/tabs'
import Status from 'components/common/status'
import { router } from 'utils'

import { AGENT_COUNT_CASH } from 'constants/agentTab'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/a/count'

import Style from './cash.less'
class CountCashContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      isKnow: false,
      tabIndex: this.props.location.query.activeTab || -1,
      isLoading: false,
      money: 0,
      showSuccess: false
    }
  }

  componentWillMount () {
    Style.use()
    this.props.actions.getPayType()
  }

  componentDidMount () {
    Bridge.setNavTitle('提现')
  }

  render () {
    if (!this.props.data && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (!this.props.data) {
      return <Loading />
    }
    let isDisabled = false
    if (parseInt(this.state.tabIndex) === 1 && !this.props.data[0].accountNo) {
      isDisabled = true
    }
    if (parseInt(this.state.tabIndex) === 0 && !this.props.data[1].accountNo) {
      isDisabled = true
    }

    return (
      <div className='agent-count-cash'>
        <Tabs>
          {AGENT_COUNT_CASH.map((item, i) => {
            return <Tab
              key={i}
              highlight={item.status === parseInt(this.props.location.query.activeTab || AGENT_COUNT_CASH[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.name}
            </Tab>
          })}
        </Tabs>

        <section className='info'>
          <ul className='ul'>
            <li className='line'>
              <i className={`dianfont ${parseInt(this.state.tabIndex) === 1 ? 'icon-wodeyinhangqia1' : 'icon-zhifubao1'}`} />
              <span className='pay-txt'>
                <span
                  className='name'>{parseInt(this.state.tabIndex) === 1 ? this.props.data[0].accountNo ? this.props.data[0].bank : '银行卡' : '支付宝'}
                </span>
                <span
                  className='count'>{
                  parseInt(this.state.tabIndex) === 1 ? this.props.data[0].accountNo ? '尾号' + this.props.data[0].accountNo + '的储蓄卡' : '您没有添加银行卡' : this.props.data[1].accountNo ? this.props.data[1].accountNo : '您没有添加支付宝'
                }</span>
              </span>
            </li>
            <li className='line'>
              <label className='tit'>提现金额</label>
              <input type='text' disabled={isDisabled}
                value={this.state.money === 0 || isDisabled ? '' : this.state.money}
                onChange={(e) => this._onChange('money', e)} placeholder='输入提现金额'
                className='inp-money' />
            </li>
            <li className='line'>
              <dl className='dl'>
                <dd className='line'>
                  <label className='tit'>发票抬头</label>
                  <span className='value'>北京伊电园网络科技有限公司</span>
                </dd>
                <dd className='line'>
                  <label className='tit'>发票税号</label>
                  <span className='value'>91110105MA00A4QR97</span>
                </dd>
                <dd className='line'>
                  <label className='tit'>邮寄地址</label>
                  <span className='value'>杭州市余杭区仓前街道良睦路1399号梦想小镇互联网村12号楼东侧 无玄 0571-57892976</span>
                </dd>
              </dl>
            </li>
          </ul>
          <article className='article'>
            <p className='remarks'>完成提现申请后，请尽快寄回等额发票，收到发票后，5个工作日之内提现申请将被受理。</p>
            <span className='radios'><input id='checkbox'
              onChange={(e) => this._onChange('checkbox', e)}
              type='checkbox' className='inp-checkbox' /><label
                htmlFor='checkbox' className='txt'>我已了解提现流程</label></span>

            <button onClick={() => {
              if (!this.state.isLoading) {
                if (parseInt(this.state.tabIndex) === 1 && !this.props.data[0].accountNo) {
                  return Toast.show('您没有添加银行卡')
                }
                if (parseInt(this.state.tabIndex) === 0 && !this.props.data[1].accountNo) {
                  return Toast.show('您没有添加支付宝')
                }
                this._confirm()
              }
            }}
              className={`btn-submit ${this.state.isKnow && this.state.money > 0 ? '' : 'half-opc'}`}>
              提交提现申请
            </button>
          </article>
        </section>
        {this.state.showSuccess ? <Status status='success' content='提交成功' /> : null}
      </div>
    )
  }

  _onChange (key, e) {
    if (key === 'money') {
      let money = 0,
        isTwoSmallNum = true
      if (e.target.value.indexOf('.') > -1) {
        if (parseInt(e.target.value.split('.')[1]) >= 100) {
          isTwoSmallNum = false
          money = (parseFloat(e.target.value)).toFixed(2)
        } else {
          money = e.target.value
        }
      } else {
        money = e.target.value
      }
      this.setState({
        money: money
      })
      if (!isTwoSmallNum) {
        return Toast.show('小数部分最多只能输入两位')
      }
    }
    if (key === 'checkbox') {
      this.setState({
        isKnow: e.target.checked
      })
    }
  }

  _confirm () {
    if (parseFloat(this.state.money) <= 0 || isNaN(this.state.money)) {
      return Toast.show('请输入正确金额')
    }
    if (parseFloat(this.state.money) < 100) {
      return Toast.show('金额必须>=100元')
    }
    if (!this.state.isKnow) {
      return Toast.show('请先了解提现流程')
    }
    this.setState({
      isLoading: true
    })
    this.props.actions.cash({
      accountId: this.state.tabIndex == '1' ? this.props.data[0].id : this.props.data[1].id,
      amount: Math.floor(parseFloat(this.state.money) * 100)
    })
  }

  _tab (tabIndex) {
    if (parseInt(tabIndex) === 1 && !this.props.data[0].accountNo) {
      return Toast.show('您没有添加银行卡')
    }
    if (parseInt(tabIndex) === 0 && !this.props.data[1].accountNo) {
      return Toast.show('您没有添加支付宝')
    }
    router.replace({
      pathname: '/a/count/cash',
      query: assign({}, this.props.location.query, {
        activeTab: tabIndex
      })
    })
    this.setState({
      tabIndex: tabIndex
    })
  }

  componentWillReceiveProps (nextProps) {
    if ((nextProps.data || (this.props.status === 'request' && nextProps.status === 'success')) && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
      this.setState({
        showSuccess: false,
        isLoading: false,
        money: 0
      })
    }
    if (this.props.data !== nextProps.data && nextProps.data) {
      if (!nextProps.data[0].accountNo) {
        this.setState({
          tabIndex: 0
        })
        router.replace({
          pathname: '/a/count/cash',
          query: assign({}, this.props.location.query, {
            activeTab: 0
          })
        })
      }
      if (!nextProps.data[1].accountNo) {
        this.setState({
          tabIndex: 1
        })
        router.replace({
          pathname: '/a/count/cash',
          query: assign({}, this.props.location.query, {
            activeTab: 1
          })
        })
      }
    }
    if (this.props.status === 'request' && nextProps.status === 'success' && !nextProps.error) {
      this.setState({
        showSuccess: true,
        isLoading: false,
        money: 0
      })
      setTimeout(() => {
        this.setState({
          showSuccess: false
        })
      }, 2000)
    }
  }

  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.agentCount.pay,
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

export default connect(mapStateToProps, mapDispatchToProps)(CountCashContainer)
