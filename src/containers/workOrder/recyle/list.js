import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { router } from 'utils'
import assign from 'lodash/assign'
import NProgress from 'utils/nprogress'
import * as Bridge from 'utils/bridge'

import Tabs, { Tab } from 'components/common/tabs'
import Badge from 'components/common/badge'
import Loading from 'components/common/loading'
import Pagination from 'components/common/pagination'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Item from 'components/workOrder/recyle/item'
import Button from 'components/common/button'
import Icon from 'components/common/icon'

import * as actions from 'actions/recyle/workOrder'
import { clean } from 'actions/errorMessage'
import Style from './list.less'

const PAGE_SIZE = 20

const TabConfig = [{
  label: '待更换',
  status: 0
}, {
  label: '待确认',
  status: 1
}, {
  label: '更换成功',
  status: 2
}]

class RecyleContainer extends Component {
  componentWillMount () {
    Bridge.setNavTitle('备件更换')
    Style.use()
  }
  componentDidMount () {
    this.props.actions.getList(TabConfig[this.props.location.query.activeTab || 0].status, 0, PAGE_SIZE)
    this.props.actions.fetchCount()
  }
  render () {
    const list = this.props.data && this.props.data.list
    return (
      <div className='recyle-list'>
        <Tabs>
          {
            TabConfig.map((o, i) => {
              let countName = ['toClaim', 'toConfirm'][i]
              return <Tab others={{'onClick': this._tab.bind(this, i)}} className={Number(this.props.location.query.activeTab || 0) === i ? 'highlight' : ''} key={i}>{o.label}{this.props.tabCount[countName] || this.props.tabCount[countName] === 0 ? <Badge>{this.props.tabCount[countName]}</Badge> : null}</Tab>
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
                  return <Item cancel={this._cancel.bind(this)} claim={this._claim.bind(this)} confirm={this._confirm.bind(this)} status={Number(this.props.location.query.activeTab || 0)} key={i} activeTab={TabConfig[this.props.location.query.activeTab || 0]} {...o} />
                }) : <Notfound>暂无工单</Notfound>
              }
            </Pagination>
          }
        </div>
        <Button onClick={() => router.push('/recyle/add')} fixed><Icon name='xinjian' />添加更换</Button>
      </div>
    )
  }
  _cancel (id) {
    NProgress.start()
    this.props.actions.cancel(id)
  }
  _confirm (id) {
    NProgress.start()
    this.props.actions.confirm(id)
  }
  _claim (id) {
    NProgress.start()
    this.props.actions.claim(id)
  }
  _tab (i) {
    router.replace({pathname: location.pathname, query: assign(this.props.location.query, {activeTab: i})})
  }
  paging () {
    this.props.actions.getList(TabConfig[this.props.location.query.activeTab || 0].status, this.props.data.list.length, PAGE_SIZE)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.data.list && nextProps.error) {
      NProgress.done()
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (nextProps.data && nextProps.data.claimed) {
      NProgress.done()
      router.replace({pathname: location.pathname, query: assign(this.props.location.query, {activeTab: 1})})
      this.props.actions.fetchCount()
    }
    if (nextProps.data && nextProps.data.confirmed) {
      NProgress.done()
      router.replace({pathname: location.pathname, query: assign(this.props.location.query, {activeTab: 2})})
      this.props.actions.fetchCount()
    }
    if (nextProps.data && nextProps.data.list && nextProps.data.canceled) {
      NProgress.done()
      this.props.actions.getList(0, 0, Math.max(nextProps.data.list.length, PAGE_SIZE))
      this.props.actions.fetchCount()
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.location.query.activeTab !== this.props.location.query.activeTab) {
      this.props.actions.getList(TabConfig[this.props.location.query.activeTab].status, 0, PAGE_SIZE)
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

export default connect(mapStateToProps, mapDispatchToProps)(RecyleContainer)
