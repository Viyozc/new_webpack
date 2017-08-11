/* 退回仓库 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { router } from 'utils'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'

import Tabs, { Tab } from 'components/common/tabs'
import Badge from 'components/common/badge'
import Loading from 'components/common/loading'
import Pagination from 'components/common/pagination'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Item from 'components/reclaim/returnItem'

import * as actions from 'actions/install/returnToWarehouse'
import { clean } from 'actions/errorMessage'
import Style from '../workOrder/repair/list.less'

const PAGE_SIZE = 20

const TabConfig = [{
  label: '待退回',
  status: 0
}, {
  label: '退回中',
  status: 1
}, {
  label: '退回成功',
  status: 2
}]

class ReturnContainer extends Component {
  componentWillMount () {
    Bridge.setNavTitle('退回仓库')
    Style.use()
  }
  componentDidMount () {
    this.props.actions.getList(TabConfig[this.props.location.query.activeTab || 0].status, 0, PAGE_SIZE)
    this.props.actions.fetchCount()
  }
  render () {
    const list = this.props.data && this.props.data.list
    return (
      <div>
        <Tabs>
          {
            TabConfig.map((o, i) => {
              let countName = ['wait', 'toBack', 'backed'][i]
              return <Tab others={{'onClick': this._tab.bind(this, i)}} className={Number(this.props.location.query.activeTab || 0) === i ? 'highlight' : ''} key={i}>{o.label}{this.props.tabCount[countName] ? <Badge>{this.props.tabCount[countName]}</Badge> : null}</Tab>
            })
          }
        </Tabs>
        <div>
          {
            !list
            ? (this.props.error ? <Error>{this.props.error.message || '未知错误'}</Error> : <Loading />)
            : <Pagination data={list} onPaging={this.paging.bind(this)} size={PAGE_SIZE}>
              {
                list && list.length ? list.map((o, i) => {
                  return <Item toBack={this.props.actions.toBack} status={Number(this.props.location.query.activeTab || 0)} key={i} activeTab={TabConfig[this.props.location.query.activeTab || 0]} {...o} />
                }) : <Notfound>暂无工单</Notfound>
              }
            </Pagination>
          }
        </div>
      </div>
    )
  }
  _tab (i) {
    router.replace({pathname: location.pathname, query: assign(this.props.location.query, {activeTab: i})})
  }
  paging () {
    this.props.actions.getList(TabConfig[this.props.location.query.activeTab || 0].status, this.props.data.list.length, PAGE_SIZE)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.data.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (nextProps.data && nextProps.data.backed) {
      this.props.actions.getList(TabConfig[this.props.location.query.activeTab || 0].status, 0, PAGE_SIZE)
      this.props.actions.fetchCount()
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.location.query.activeTab !== this.props.location.query.activeTab) {
      this.props.actions.getList(TabConfig[this.props.location.query.activeTab || 0].status, 0, PAGE_SIZE)
      this.props.actions.fetchCount()
    }
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
    this.props.actions.resetList()
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.workOrderList,
    tabCount: state.tabCount
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReturnContainer)
