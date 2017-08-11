import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Tabs, { Tab } from 'components/common/tabs'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import Style from './approval.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/channel/purchase'
import assign from 'lodash/assign'
import Cell from 'components/channel/purchase/cell'
import { router } from 'utils'
import NProgress from 'utils/nprogress'
import { ApprovalTabConfig } from 'constants/channel'
const PAGE_SIZE = 20

class ApprovalContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  componentDidMount () {
    Bridge.setNavTitle('采购审核')
    if (!this.props.location.query.status) {
      router.replace({pathname: this.props.location.pathname, query: {status: ApprovalTabConfig[0].status}})
    } else {
      this.props.actions.fetchList({status: this.props.location.query.status, pageSize: PAGE_SIZE, offset: 0})
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      router.replace({pathname: nextProps.location.pathname, query: assign({}, nextProps.location.query, {status: ApprovalTabConfig[1].status})})
      this.props.actions.fetchList({status: nextProps.location.query.status, pageSize: PAGE_SIZE, offset: 0})
      NProgress.done()
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }
    if (this.props.location.query.status !== nextProps.location.query.status) {
      this.props.actions.fetchList({status: nextProps.location.query.status, pageSize: PAGE_SIZE, offset: 0})
    }
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    return (
      <div>
        <Tabs>
          {ApprovalTabConfig.map((item, i) => {
            return <Tab
              key={i}
              highlight={item.status === parseInt(this.props.location.query.status || ApprovalTabConfig[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.label}
            </Tab>
          })}
        </Tabs>
        {this._renderList()}
      </div>
    )
  }
  _renderList () {
    if (!this.props.list && !this.props.error) {
      return <Loading />
    }
    if (!this.props.list && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.list && this.props.list.length === 0) {
      return <Notfound>暂无审核项</Notfound>
    }
    return (
      <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
        {
        this.props.list.map((item, i) => {
          return <Cell key={i} {...item} actions={this.props.actions} />
        })
      }
      </Pagination>
    )
  }
  _paging (list) {
    this.props.actions.fetchList({status: this.props.location.query.status, pageSize: PAGE_SIZE, offset: this.props.list.length})
  }
  _tab (status) {
    router.replace({pathname: this.props.location.pathname, query: {status}})
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.channelPurchaseApprovalPage && state.channelPurchaseApprovalPage.list,
    fetch: state.channelPurchaseApprovalPage && state.channelPurchaseApprovalPage.fetch
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalContainer)
