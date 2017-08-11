import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'

import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Item from 'components/a/count/detail/item'
import Pagination from 'components/common/pagination'
import Notfound from 'components/common/notfound'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/a/count'

import Style from './recordDetail.less'
const PAGE_SIZE = 20
class CountRecordDetailContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
  }

  componentWillMount () {
    Style.use()
    this.props.actions.getRecordDetail({
      cashRecordId: this.props.params.id
    })
    this.props.actions.getRecordDetailList({
      cashRecordId: this.props.params.id,
      offset: 0,
      pageSize: PAGE_SIZE
    })
  }

  componentDidMount () {
    Bridge.setNavTitle('账单详情')
  }

  render () {
    if ((!this.props.detail || !this.props.list) && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (!this.props.detail || !this.props.list) {
      return <Loading />
    }
    if (JSON.stringify(this.props.detail) === '{}') {
      return <Notfound>暂时没有记录</Notfound>
    }

    return (
      <div className='agent-count-record-detail'>
        <section className='info'>
          <header className='info-titles'>
            <h1 className='title'>{this.props.detail.description}</h1>
            <time className='time'>{this.props.detail.createTime}</time>
            <span className='order-txt'>订单总额：{parseFloat(this.props.detail.totalAmount).toFixed(2) || 0}元&nbsp;&nbsp;
              成功订单：{this.props.detail.orderCount || 0}单</span>
          </header>
          <div className='info-count'>
            <span className='multiplier'><em className='txt'>总订单金额</em><i
              className='money'>{parseFloat(this.props.detail.totalAmount).toFixed(2) || 0}元</i></span>
            <i className='multiplication-sign'>*</i>
            <span className='faciend'><em className='txt'>分成系数</em><i
              className='money'>{(parseFloat(this.props.detail.feeRate) / 100).toFixed(2) || 0}</i></span>
            <i className='eq-sign'>=</i>
            <span
              className='left-money'>{(parseFloat(this.props.detail.totalAmount) * (parseFloat(this.props.detail.feeRate) / 100)).toFixed(2) || 0}</span>
          </div>
        </section>
        <Pagination location={this.props.location} onPaging={() => { this._paging(this.props.list) }}
                    data={this.props.list} size={PAGE_SIZE}>
          {!this.props.list && this.props.error ?
            <Error>{this.props.error.message || '未知错误'}</Error> : !this.props.list ?
              <Loading /> : this.props.list.length === 0 ? <Notfound>暂时没有记录</Notfound> : null
          }
          {
            this.props.list && this.props.list.length > 0 && this.props.list.map((item, i) => {
              return <Item data={item} key={i}/>
            })
          }
        </Pagination>
      </div>
    )
  }

  _paging (list) {
    this.props.actions.getRecordDetailList({
      cashRecordId: this.props.params.id,
      offset: list.length,
      pageSize: PAGE_SIZE
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
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

export default connect(mapStateToProps, mapDispatchToProps)(CountRecordDetailContainer)
