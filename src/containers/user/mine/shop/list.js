import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Search from 'components/common/search'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import DoubleSelect from 'components/common/doubleSelect'
import Item from 'components/user/mine/shop/item'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/user/mine/shop'
import * as commonActions from 'actions/common'
import assign from 'lodash/assign'
import { router } from 'utils'
const PAGE_SIZE = 10

class ListContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }
  componentDidMount () {
    Bridge.setNavTitle('我的门店')
    if (this.props.location.query.rightChoseValue || this.props.location.query.leftChoseValue) {
      this.props.actions.fetchMyShopList({
        offset: 0,
        pageSize: PAGE_SIZE,
        memberId: this.props.location.query.rightChoseValue,
        cityCode: this.props.location.query.leftChoseValue
      })
    }
    this.props.actions.fetchBdMembersInCity()
  }
  componentWillReceiveProps (nextProps) {
    if (!this.props.bdMembersInCity && nextProps.bdMembersInCity) {
      if (nextProps.bdMembersInCity.cities && nextProps.bdMembersInCity.members) {
        !nextProps.location.query.rightChoseValue && router.replace({pathname: nextProps.location.pathname,
          query: assign({}, nextProps.location.query, {
            leftChoseKey: nextProps.bdMembersInCity.cities[0].key,
            leftChoseValue: nextProps.bdMembersInCity.cities[0].value,
            rightChoseKey: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].key,
            rightChoseValue: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].value})})
      } else {
        this.props.actions.fetchMyShopList({
          offset: 0,
          pageSize: PAGE_SIZE
        })
      }
    }

    if (this.props.location.query.leftChoseValue !== nextProps.location.query.leftChoseValue || this.props.location.query.rightChoseValue !== nextProps.location.query.rightChoseValue) {
      this.props.actions.fetchMyShopList({
        offset: 0,
        pageSize: PAGE_SIZE,
        memberId: nextProps.location.query.rightChoseValue,
        cityCode: nextProps.location.query.leftChoseValue
      })
    }

    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    return (
      <div>
        <Search onClick={this._search.bind(this)} placeholder={'搜索门店'} />
        {this.props.bdMembersInCity && this.props.bdMembersInCity.cities && this.props.bdMembersInCity.members
          ? <DoubleSelect
            location={this.props.location}
            leftChoseKey={this.props.location.query.leftChoseKey}
            leftChoseValue={this.props.location.query.leftChoseValue}
            rightChoseKey={this.props.location.query.rightChoseKey}
            rightChoseValue={this.props.location.query.rightChoseValue}
            list={this.props.bdMembersInCity} />
          : null}
        {this._renderList()}
      </div>
    )
  }
  _search (value) {
    router.push('/shop/search?keyword=' + value)
  }
  _renderList () {
    if (!this.props.list && !this.props.error) {
      return <Loading />
    }
    if (!this.props.list && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.list && this.props.list.length === 0) {
      return <Notfound>暂无门店</Notfound>
    }
    return (
      <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
        {
        this.props.list && this.props.list.map((item, i) => {
          return <Item key={i} {...item} />
        })
      }
      </Pagination>
    )
  }
  _paging (list) {
    this.props.actions.fetchMyShopList({
      offset: this.props.list.length,
      pageSize: PAGE_SIZE,
      memberId: this.props.location.query.rightChoseValue,
      cityCode: this.props.location.query.leftChoseValue
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    bdMembersInCity: state.common && state.common.bdMembersInCity,
    list: state.userMineShopList && state.userMineShopList.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
