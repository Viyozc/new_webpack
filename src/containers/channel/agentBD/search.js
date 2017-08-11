import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Search from 'components/common/search'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/channel/agentBD'
import Cell from 'components/channel/agentBD/cell'
import assign from 'lodash/assign'
import { router } from 'utils'
const PAGE_SIZE = 10

class SearchContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {}
  }

  componentWillMount () {
  }

  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }

  componentDidMount () {
    Bridge.setNavTitle('搜索结果')
    this.props.actions.fetchSearchList({
      offset: 0,
      pageSize: PAGE_SIZE,
      agentName: this.props.location.query.keyword
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }

  render () {
    return (
      <div>
        <Search onClick={this._search.bind(this)} value={this.props.location.query.keyword} placeholder={'搜索代理商'} />
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
      return <Notfound>暂无代理商</Notfound>
    }
    return <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
      {
        this.props.list && this.props.list.map((item, i) => {
          return <Cell {...item} key={i} />
        })
      }
    </Pagination>
  }

  _paging (list) {
    this.props.actions.fetchSearchList({
      offset: this.props.list.length,
      pageSize: PAGE_SIZE,
      agentName: this.props.location.query.keyword
    })
  }

  _search (value) {
    this.props.actions.fetchSearchList({
      offset: 0,
      pageSize: PAGE_SIZE,
      agentName: value
    })
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {keyword: value})
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.channelAgentBDSearchPage && state.channelAgentBDSearchPage.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
