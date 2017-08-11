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
import Item from 'components/workOrder/repair/item'
import AlertRepair from 'components/common/alertRepair'

import * as actions from 'actions/repair/workOrder'
import { clean } from 'actions/errorMessage'
import Style from './list.less'

const PAGE_SIZE = 20

const TabConfig = [{
  label: '待维修',
  status: 0
}, {
  label: '维修完成',
  status: 1
}]

class WorkOrderContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shopId: this.props.location.query.shopId || -1,
      installNo: this.props.location.query.installNo || '',
      isShowOpc: false
    }
  }

  componentWillMount () {
    Bridge.setNavTitle('维修更换')
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
              let countName = ['waitRepair'][i]
              return <Tab others={{'onClick': this._tab.bind(this, i)}}
                          className={Number(this.props.location.query.activeTab || 0) === i ? 'highlight' : ''}
                          key={i}>{o.label}{this.props.tabCount[countName] || this.props.tabCount[countName] === 0 ?
                <Badge>{this.props.tabCount[countName]}</Badge> : null}</Tab>
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
                  return <Item testDevice={this._testDevice.bind(this)}
                               status={Number(this.props.location.query.activeTab || 0)} key={i}
                               activeTab={TabConfig[this.props.location.query.activeTab || 0]} {...o} />
                }) : <Notfound>暂无工单</Notfound>
              }
            </Pagination>
          }
        </div>
        <AlertRepair Bridge={Bridge} closeOpc={() => {this.setState({isShowOpc: false})}}
                     isShowOpc={this.state.isShowOpc} installNo={this.state.installNo} router={router} shopId={this.state.shopId}/>

      </div>
    )
  }

  _tab (i) {
    router.replace({pathname: location.pathname, query: assign(this.props.location.query, {activeTab: i})})
  }

  _testDevice (shopId, installNo) {
    this.setState({
      shopId,
      installNo,
      isShowOpc: true
    })
  }

  paging () {
    this.props.actions.getList(TabConfig[this.props.location.query.activeTab || 0].status, this.props.data.list.length, PAGE_SIZE)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.data.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
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

export default connect(mapStateToProps, mapDispatchToProps)(WorkOrderContainer)
