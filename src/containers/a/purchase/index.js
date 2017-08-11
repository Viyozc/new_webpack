import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import { Link } from 'components/link'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import Style from './index.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/a/purchase/'
import assign from 'lodash/assign'
import Cell from 'components/a/purchase/cell'
const PAGE_SIZE = 20

class IndexContainer extends Component {
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
    Bridge.setNavTitle('设备采购')
    this.props.actions.fetchList({pageSize: PAGE_SIZE, offset: 0})
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    return (
      <div className='purchase-index'>
        {this._renderList()}
        <Link className='button' to='/a/purchase/apply' >申请采购</Link>
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
      return <Notfound>暂无采购项</Notfound>
    }
    return (
      <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
        {
        this.props.list.map((item, i) => {
          return <Cell key={i} {...item} />
        })
      }
      </Pagination>
    )
  }
  _paging (list) {
    this.props.actions.fetchList({pageSize: PAGE_SIZE, offset: this.props.list.length})
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.aPurchaseIndexPage && state.aPurchaseIndexPage.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
