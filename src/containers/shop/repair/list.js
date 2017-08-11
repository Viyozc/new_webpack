import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Status from 'components/common/status'
import NProgress from 'utils/nprogress'
import Tabs, { Tab } from 'components/common/tabs'
import Badge from 'components/common/badge'
import Button from 'components/common/button'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Item from 'components/shop/bdView/repair/item'
import { router } from 'utils'
import assign from 'lodash/assign'
import * as bdActions from 'actions/shop'
import { clean } from 'actions/errorMessage'
import { REPAIR_STATUS } from 'constants/bd'
const PAGE_SIZE = 20

class ListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSuccess: false
    }
  }
  componentDidMount () {
    Bridge.setNavTitle('申请备用机')
    this.props.actions.fetchShopRepairGets(parseInt(this.props.location.query.activeTab || REPAIR_STATUS[0].status), 0, PAGE_SIZE)
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
    if (nextProps.repairList && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanShopRepairList()
  }
  render () {
    return (
      <div>
        <Tabs>
          {REPAIR_STATUS.map((item, i) => {
            return <Tab
              key={i}
              highlight={item.status === parseInt(this.props.location.query.activeTab || REPAIR_STATUS[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.name}{this.props.count && this.props.count[item.totalCountKey] > 0 ? <Badge>{this.props.count[item.totalCountKey] > 99 ? '99+' : this.props.count[item.totalCountKey]}</Badge> : null}
            </Tab>
          })}
        </Tabs>
        <div style={{paddingBottom: '82px'}}>{this._renderList()}</div>
        <Button fixed={!!1} to='/shop/repair/add'>申请备用机</Button>
        {this.state.showSuccess ? <Status status='success' content='确认成功' /> : null}
      </div>
    )
  }
  _renderList () {
    if (!this.props.repairList && !this.props.error) {
      return <Loading />
    }
    if (!this.props.repairList && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.repairList && this.props.repairList.length === 0) {
      return <Notfound>暂无数据</Notfound>
    }
    return (
      <Pagination onPaging={() => { this._paging(this.props.repairList) }} data={this.props.repairList} size={PAGE_SIZE}>
        {
        this.props.repairList && this.props.repairList.map((item, i) => {
          return <Item {...item} key={i} onReceive={this._bindReceive.bind(this)} status={parseInt(this.props.location.query.activeTab || REPAIR_STATUS[0].status)} />
        })
      }
      </Pagination>
    )
  }
  _tab (tabIndex) {
    router.replace({
      pathname: '/shop/repair/list',
      query: assign({}, this.props.location.query, {
        activeTab: tabIndex
      })
    })
    this.props.actions.fetchShopRepairGets(tabIndex, 0, PAGE_SIZE)
  }
  _paging (list) {
    this.props.actions.fetchShopRepairGets(parseInt(this.props.location.query.activeTab || REPAIR_STATUS[0].status), list.length, PAGE_SIZE)
  }
  _bindReceive (id) {
    NProgress.start()
    this.props.actions.fetchShopRepairReceive({applyId: id})
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    repairList: state.shopRepairList && state.shopRepairList.repairList,
    fetch: state.shopRepairList && state.shopRepairList.fetch,
    count: state.shopRepairList && state.shopRepairList.count
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
