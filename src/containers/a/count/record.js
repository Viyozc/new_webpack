import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import { router } from 'utils'
import * as Bridge from 'utils/bridge'
import { Link } from 'components/link'

import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Tabs, { Tab } from 'components/common/tabs'
import Item from 'components/a/count/record/item'
import { AGENT_COUNT_DETIAL } from 'constants/agentTab'
import Pagination from 'components/common/pagination'
import Notfound from 'components/common/notfound'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/a/count'

const PAGE_SIZE = 20
class CountRecordContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
  }

  componentWillMount () {
    this.props.actions.getRecord({
      offset: 0,
      pageSize: PAGE_SIZE,
      type: this.props.location.query.activeTab
    })
  }

  componentDidMount () {
    Bridge.setNavTitle('收支明细')
  }

  render () {
    return (
      <div className='agent-count-record'>
        <Tabs>
          {AGENT_COUNT_DETIAL.map((item, i) => {
            return <Tab
              key={i}
              highlight={item.status === parseInt(this.props.location.query.activeTab || AGENT_COUNT_DETIAL[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.name}
            </Tab>
          })}
        </Tabs>
        <Pagination location={this.props.location} onPaging={() => { this._paging(this.props.data) }}
          data={this.props.data} size={PAGE_SIZE}>
          {!this.props.data && this.props.error
            ? <Error>{this.props.error.message || '未知错误'}</Error> : !this.props.data
            ? <Loading /> : this.props.data.length === 0 ? <Notfound>暂时没有记录</Notfound> : null
          }
          {
            this.props.data && this.props.data.length > 0 && this.props.data.map((item, i) => {
              return <Item data={item} router={router} key={i} />
            })
          }
        </Pagination>
      </div>
    )
  }

  _tab (tabIndex) {
    router.replace({
      pathname: '/a/count/record',
      query: assign({}, this.props.location.query, {
        activeTab: tabIndex
      })
    })
    this.setState({
      tabStatus: tabIndex
    })
    this.props.actions.getRecord({
      offset: 0,
      pageSize: PAGE_SIZE,
      type: tabIndex
    })
  }

  _paging (list) {
    this.setState({
      tabStatus: parseInt(this.props.location.query.activeTab || -1)
    })
    this.props.actions.getRecord({
      offset: list.length,
      pageSize: PAGE_SIZE,
      type: this.props.location.query.activeTab || -1
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.error) {
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
    data: state.agentCount.recordList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountRecordContainer)
