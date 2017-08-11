import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { Link } from 'components/link'

import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Item from 'components/a/count/cashRecord/item'
import Pagination from 'components/common/pagination'
import Notfound from 'components/common/notfound'

import { clean } from 'actions/errorMessage'
import * as teamAction from 'actions/a/count'

import Style from './cashRecord.less'
const PAGE_SIZE = 20
class CountCashRecordContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      list: []
    }
  }

  componentWillMount () {
    Style.use()
    this.props.actions.getCashRecordList({
      offset: 0,
      pageSize: PAGE_SIZE
    })
  }

  componentDidMount () {
    Bridge.setNavTitle('提现记录')
  }

  render () {
    return (
      <div className='agent-count-cash-record'>
        <Pagination location={this.props.location} onPaging={() => { this._paging(this.state.list) }}
          data={this.state.list} size={PAGE_SIZE}>
          {!this.props.data && this.props.error ?
            <Error>{this.props.error.message || '未知错误'}</Error> : !this.props.data ?
              <Loading /> : this.props.data.length === 0 ? <Notfound>暂时没有记录</Notfound> : null
          }
          {this.state.list && this.state.list.length > 0 && this.state.list.map((item, i) => {
            return <Item data={item} key={i} />
          })}
        </Pagination>

      </div>
    )
  }

  _paging (list) {
    this.props.actions.getCashRecordList({
      offset: list.length,
      pageSize: PAGE_SIZE
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (this.props.data !== nextProps.data) {
      if (nextProps.data.length > 0) {
        let arr = []
        nextProps.data.map((item, i) => {
          arr.push({
            statusText: item.statusText,
            applyTime: item.createTime,
            amount: item.amount,
            serialNo: item.serialNo,
            status: item.status !== 1 ? 1 : 0,
            balance: item.balanceAccount
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
    data: state.agentCount.cashRecordList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(teamAction, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountCashRecordContainer)
