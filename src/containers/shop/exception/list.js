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
import Item from 'components/shop/bdView/exception/item'
import { router } from 'utils'
import assign from 'lodash/assign'
import * as bdActions from 'actions/shop'
import { clean } from 'actions/errorMessage'
import { EXCEPTION_STATUS } from 'constants/bd'
const PAGE_SIZE = 20

class ListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSuccess: false
    }
  }
  componentDidMount () {
    Bridge.setNavTitle('异常处理')
    this.props.actions.fetchShopExceptionGets(parseInt(this.props.location.query.activeTab || EXCEPTION_STATUS[0].status), 0, PAGE_SIZE)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.exceptionList && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanShopExceptionList()
  }
  render () {
    return (
      <div>
        <Tabs>
          {EXCEPTION_STATUS.map((item, i) => {
            return <Tab
              key={i}
              highlight={item.status === parseInt(this.props.location.query.activeTab || EXCEPTION_STATUS[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.name}{this.props.count && this.props.count[item.totalCountKey] > 0 ? <Badge>{this.props.count[item.totalCountKey] > 99 ? '99+' : this.props.count[item.totalCountKey]}</Badge> : null}
            </Tab>
          })}
        </Tabs>
        <div>{this._renderList()}</div>
      </div>
    )
  }
  _renderList () {
    if (!this.props.exceptionList && !this.props.error) {
      return <Loading />
    }
    if (!this.props.exceptionList && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.exceptionList && this.props.exceptionList.length === 0) {
      return <Notfound>暂无数据</Notfound>
    }
    return (
      <Pagination onPaging={() => { this._paging(this.props.exceptionList) }} data={this.props.exceptionList} size={PAGE_SIZE}>
        {
        this.props.exceptionList && this.props.exceptionList.map((item, i) => {
          return <Item {...item} key={i} status={parseInt(this.props.location.query.activeTab || EXCEPTION_STATUS[0].status)} />
        })
      }
      </Pagination>
    )
  }
  _tab (tabIndex) {
    router.replace({
      pathname: '/exception/list',
      query: assign({}, this.props.location.query, {
        activeTab: tabIndex
      })
    })
    this.props.actions.fetchShopExceptionGets(tabIndex, 0, PAGE_SIZE)
  }
  _paging (list) {
    this.props.actions.fetchShopExceptionGets(parseInt(this.props.location.query.activeTab || EXCEPTION_STATUS[0].status), list.length, PAGE_SIZE)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    exceptionList: state.shopExceptionList && state.shopExceptionList.exceptionList,
    count: state.shopExceptionList && state.shopExceptionList.count
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

