// 维修出库
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'components/link'
import { router } from 'utils'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'

import Tabs, { Tab } from 'components/common/tabs'
import Badge from 'components/common/badge'
import Loading from 'components/common/loading'
import Pagination from 'components/common/pagination'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Item from 'components/warehouse/distributionItem'
import CheckList from 'components/warehouse/checkList'

import * as actions from 'actions/warehouse/distribution'
import { clean } from 'actions/errorMessage'
import Style from './distribution.less'

const PAGE_SIZE = 20

const TabConfig = [{
  label: '待配货',
  status: 0,
  color: '#FF5E45'
}, {
  label: '待检货',
  status: 1,
  color: '#FF5E45'
}, {
  label: '待确认',
  status: 2,
  color: '#FFAF32'
}, {
  label: '检货完成',
  status: 3,
  color: '#26C541'
}]

class RecyleContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCheck: false
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('维修出库')
    Style.use()
  }
  componentDidMount () {
    this.props.actions.fetchList(TabConfig[this.props.location.query.activeTab || 0].status, 0, PAGE_SIZE)
    this.props.actions.fetchCount()
  }
  render () {
    const list = this.props.data && this.props.data.list
    const repairDetail = this.props.repairDetail
    return (
      <div className='distribution'>
        <Tabs>
          {
            TabConfig.map((o, i) => {
              let countName = ['toAllocate', 'toOutgoing', 'toConfirm', 'completed'][i]
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
                  return <Item showCheckList={this.showCheckList.bind(this)} hideCheckList={this.hideCheckList.bind(this)} getRepairDetail={this.props.actions.repairDetail} status={Number(this.props.location.query.activeTab || 0)} key={i} activeTab={TabConfig[this.props.location.query.activeTab || 0]} {...o} />
                }) : <Notfound>暂无工单</Notfound>
              }
            </Pagination>
          }
        </div>
        {
          this.state.showCheck
          ? <CheckList onCheck={this._check.bind(this)} hideCheckList={this.hideCheckList.bind(this)} repairDetail={repairDetail} />
          : null
        }
        <Link className='scan-login' to={'/scanLogin'} >
          <p>PC</p>
          <p>登录</p>
        </Link>
      </div>
    )
  }
  _tab (i) {
    router.replace({pathname: location.pathname, query: assign(this.props.location.query, {activeTab: i})})
  }
  paging () {
    this.props.actions.fetchList(TabConfig[this.props.location.query.activeTab || 0].status, this.props.data.list.length, PAGE_SIZE)
  }
  showCheckList (id) {
    this.setState({showCheck: true, checkId: id})
  }
  _check (event) {
    this.props.actions.claimTask({id: this.state.checkId})
    event.preventDefault()
    event.stopPropagation()
    return false
  }
  hideCheckList () {
    this.setState({showCheck: false})
    this.props.actions.resetClaim()
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.data.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (nextProps.repairDetail && nextProps.repairDetail.claimed) {
      this.hideCheckList()
      this._tab(1)
      this.props.actions.resetClaim()
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.location.query.activeTab !== this.props.location.query.activeTab) {
      this.props.actions.fetchList(TabConfig[this.props.location.query.activeTab].status, 0, PAGE_SIZE)
      this.props.actions.fetchCount()
    }
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.workOrderList,
    tabCount: state.tabCount,
    repairDetail: state.repairDetail
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
