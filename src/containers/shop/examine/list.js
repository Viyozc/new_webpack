import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Tabs, { Tab } from 'components/common/tabs'
import Badge from 'components/common/badge'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Item from 'components/shop/examine/item'
import Status from 'components/common/status'
import NProgress from 'utils/nprogress'
import { router } from 'utils'
import assign from 'lodash/assign'
import * as bdActions from 'actions/shop'
import { clean } from 'actions/errorMessage'
import { EXAMINE_STATUS } from 'constants/bd'
const PAGE_SIZE = 20

class ListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSuccess: false
    }
  }
  componentDidMount () {
    Bridge.setNavTitle('安装审批')
    this.props.actions.fetchShopExamineGets(parseInt(this.props.location.query.activeTab || EXAMINE_STATUS[0].status), 0, PAGE_SIZE)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
      this.setState({showSuccess: true})
      this._timer = setTimeout(() => {
        this.setState({showSuccess: false})
        this._tab(0)
      }, 1000)
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }
    if (nextProps.examineList && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanShopExamineList()
  }
  render () {
    return (
      <div>
        <Tabs>
          {EXAMINE_STATUS.map((item, i) => {
            return <Tab
              key={i}
              highlight={item.status === parseInt(this.props.location.query.activeTab || EXAMINE_STATUS[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.name}{this.props.count && this.props.count[item.totalCountKey] > 0 ? <Badge>{this.props.count[item.totalCountKey] > 99 ? '99+' : this.props.count[item.totalCountKey]}</Badge> : null}
            </Tab>
          })}
        </Tabs>
        <div>{this._renderList()}</div>
        {this.state.showSuccess ? <Status status='success' content='提交成功' /> : null}
      </div>
    )
  }
  _renderList () {
    if (!this.props.examineList && !this.props.error) {
      return <Loading />
    }
    if (!this.props.examineList && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.examineList && this.props.examineList.length === 0) {
      return <Notfound>暂无数据</Notfound>
    }
    return (
      <Pagination onPaging={() => { this._paging(this.props.examineList) }} data={this.props.examineList} size={PAGE_SIZE}>
        {
        this.props.examineList && this.props.examineList.map((item, i) => {
          return <Item {...item} onApprovalSuccess={this._bindApprovalSuccess.bind(this)} key={i} status={parseInt(this.props.location.query.activeTab || EXAMINE_STATUS[0].status)} />
        })
      }
      </Pagination>
    )
  }
  _tab (tabIndex) {
    router.replace({
      pathname: '/shop/examine/list',
      query: assign({}, this.props.location.query, {
        activeTab: tabIndex
      })
    })
    this.props.actions.fetchShopExamineGets(tabIndex, 0, PAGE_SIZE)
  }
  _paging (list) {
    this.props.actions.fetchShopExamineGets(parseInt(this.props.location.query.activeTab || EXAMINE_STATUS[0].status), list.length, PAGE_SIZE)
  }
  _bindApprovalSuccess (shopId) {
    NProgress.start()
    this.props.actions.fetchShopExamineApprovalSuccess({id: shopId})
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    examineList: state.shopExamineList && state.shopExamineList.examineList,
    count: state.shopExamineList && state.shopExamineList.count,
    fetch: state.shopExamineList && state.shopExamineList.fetch
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(bdActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)

