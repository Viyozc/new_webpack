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
import * as actions from 'actions/a/agentBD/shops/search'
import Item from 'components/a/agentBD/shops/list/item'
import assign from 'lodash/assign'
import { router } from 'utils'
const PAGE_SIZE = 10

class ShopSearchContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      poiLongitude: '0',
      poiLatitude: '0'
    }
  }

  componentWillMount () {

  }

  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }

  componentDidMount () {
    Bridge.setNavTitle('搜索结果')
    this._getLocation()
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
        <Search onClick={this._search.bind(this)} value={this.props.location.query.keyword} placeholder={'搜索门店'} />
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
      return <Notfound>无相关门店</Notfound>
    }
    return <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
      {
        this.props.list && this.props.list.map((item, i) => {
          return <Item {...item} key={i} tabStatus={parseInt(item.status)} role={this.props.role || ''} />
        })
      }
    </Pagination>
  }

  _paging (list) {
    this.props.actions.fetchShopSearchList({
      offset: this.props.list.length,
      pageSize: PAGE_SIZE,
      latitude: this.state.poiLatitude,
      longitude: this.state.poiLongitude,
      name: this.props.location.query.keyword
    })
  }

  // 获取经纬度
  _getLocation () {
    Bridge.getLocation((res) => {
      if (!res.success) {
        this.setState({locatedError: true})
      } else if (res.data && res.data.split(',') && res.data.split(',').length) {
        this.setState({
          poiLongitude: res.data.split(',')[1],
          poiLatitude: res.data.split(',')[0]
        }, () => {
          this.props.actions.fetchShopSearchList({
            offset: 0,
            pageSize: PAGE_SIZE,
            latitude: this.state.poiLatitude,
            longitude: this.state.poiLongitude,
            name: this.props.location.query.keyword
          })
        })
      }
    })
  }

  _search (value) {
    this.props.actions.fetchShopSearchList({
      offset: 0,
      pageSize: PAGE_SIZE,
      latitude: this.state.poiLatitude,
      longitude: this.state.poiLongitude,
      name: value
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
    role: state.agentBDSearchShopList && state.agentBDSearchShopList.role || '',
    list: state.agentBDSearchShopList && state.agentBDSearchShopList.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopSearchContainer)
