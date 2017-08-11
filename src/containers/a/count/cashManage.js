import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { Link } from 'components/link'

import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Pagination from 'components/common/pagination'
import Notfound from 'components/common/notfound'

import { router } from 'utils'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/a/count'

import Item from 'components/a/count/cashRecord/item'

import Style from './cashManage.less'
const PAGE_SIZE = 10
class CountAgencyFeeContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      list: []
    }
  }

  componentWillMount () {
    Style.use()
    this.props.actions.cashManageDetail()
    this.props.actions.cashManageList({
      offset: 0,
      pageSize: PAGE_SIZE
    })
  }

  componentDidMount () {
    Bridge.setNavTitle('代理费管理')
  }

  render () {
    if (!this.props.detail && !this.props.error) {
      return <Loading />
    }
    if (!this.props.detail && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }

    let detail = this.props.detail
    return (
      <div className='agent-count-fee'>
        <article className='info'>
          <dl className='dl'>
            <dt className='title'>
              <span className='tit'>代理费余额</span>
              <span className='money'>{detail.balance}元</span>
            </dt>
            <dd className='line-th'>
              <span className='tit'>代理等级</span>
              <span className='tit'>累计代理费</span>
              <span className='tit'>当月代理分成</span>
              <span className='tit'>当前设备折扣</span>
            </dd>
            <dd className='line-td'>
              <span className='value'>{detail.level}</span>
              <span className='value'>{detail.totalAgencyFee}</span>
              <span className='value'>{detail.feeRate}%</span>
              <span className='value'>{detail.deviceRate}%</span>
            </dd>
          </dl>
        </article>
        <section className='record'>
          <span className='title'>代理费流水</span>
          {!this.props.list && this.props.error ? <Error>{this.props.error.message || '未知错误'}</Error> : null
          }
          {!this.props.list && !this.props.error ? <Loading /> : null}
          {this.props.list && this.props.list.length === 0 ? <Notfound>暂时没有记录</Notfound> : null}
          <Pagination location={this.props.location} onPaging={() => { this._paging(this.state.list.length) }}
            data={this.state.list} size={PAGE_SIZE}>
            {this.state.list && this.state.list.length > 0 && this.state.list.map((item, i) => {
              return <Item data={item} isCashManage key={i} />
            })}
          </Pagination>

        </section>
        <section className='charge'>
          <button onClick={() => { router.replace('/a/count/cash/charge') }} className='btn-charge'>充值代理费</button>
        </section>
      </div>
    )
  }

  _paging (length) {
    this.props.actions.cashManageList({
      offset: length,
      pageSize: PAGE_SIZE
    })
  }

  componentWillReceiveProps (nextProps) {
    if ((nextProps.detail || nextProps.list) && nextProps.error) {
      this.props.actions.cleanErrorMessage()
      return Toast.show(nextProps.error.message || '未知错误')
    }
    if (nextProps.list && this.props.list !== nextProps.list) {
      if (nextProps.list.length > 0) {
        let arr = []
        nextProps.list.map((item, i) => {
          arr.push({
            bizTypeText: item.bizTypeText,
            statusText: item.statusText,
            applyTime: item.createTime,
            amount: item.amount,
            status: item.type,
            serialNo: item.serialNo,
            balance: item.balance
          })
        })

        this.setState({
          list: arr
        })
      }
    }
  }

  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    detail: state.agentCount.detail,
    list: state.agentCount.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountAgencyFeeContainer)
