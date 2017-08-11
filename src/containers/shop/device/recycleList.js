import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Style from './offlineList.less'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import DoubleSelect from 'components/common/doubleSelect'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/shop/device/recycleList'
import * as commonActions from 'actions/common'
import assign from 'lodash/assign'
import OfflineCell from 'components/shop/device/offlineCell'
import { router } from 'utils'
import Search from 'components/common/search'
const PAGE_SIZE = 10

class RecycleListContainer extends Component {
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
    Bridge.setNavTitle('本月回收设备数')
    if (this.props.location.query.rightChoseValue) {
      this.props.actions.fetchDataSellerShopDeviceRecycleList({
        offset: 0,
        pageSize: PAGE_SIZE,
        memberId: this.props.location.query.rightChoseValue,
        cityCode: this.props.location.query.leftChoseValue,
        year: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[0]) || this.props.selectDate[0].year,
        month: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[1]) || this.props.selectDate[0].month
      })
    }
    this.props.actions.fetchBdMembersInCity()
  }
  componentWillReceiveProps (nextProps) {
    if (!this.props.bdMembersInCity && nextProps.bdMembersInCity && !nextProps.location.query.rightChoseValue) {
      if (nextProps.bdMembersInCity.cities && nextProps.bdMembersInCity.members) {
        router.replace({pathname: nextProps.location.pathname,
          query: assign({}, nextProps.location.query, {
            leftChoseKey: nextProps.bdMembersInCity.cities[0].key,
            leftChoseValue: nextProps.bdMembersInCity.cities[0].value,
            rightChoseKey: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].key,
            rightChoseValue: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].value,
            year: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[0]) || nextProps.selectDate[0].year,
            month: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[1]) || nextProps.selectDate[0].month})})
      } else {
        this.props.actions.fetchDataSellerShopDeviceRecycleList({
          offset: 0,
          pageSize: PAGE_SIZE,
          year: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[0]) || nextProps.selectDate[0].year,
          month: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[1]) || nextProps.selectDate[0].month
        })
      }
    }

    if (this.props.location.query.leftChoseValue !== nextProps.location.query.leftChoseValue ||
      this.props.location.query.rightChoseValue !== nextProps.location.query.rightChoseValue) {
      this.props.actions.fetchDataSellerShopDeviceRecycleList({
        offset: 0,
        pageSize: PAGE_SIZE,
        memberId: nextProps.location.query.rightChoseValue,
        cityCode: nextProps.location.query.leftChoseValue,
        year: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[0]) || nextProps.selectDate[0].year,
        month: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[1]) || nextProps.selectDate[0].month
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
        <div className='total-num'>
          <p>合计：</p>
          <p>门店数：{this.props.shopCount || 0}</p>
          <p>回收设备数：{this.props.recycleDeviceCount || 0}</p>
        </div>
        <div className='title clearfix'>
          <div>设备编号</div>
          <div>成功订单</div>
          <div>退款订单</div>
        </div>
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
      return <Notfound>暂无回收设备</Notfound>
    }
    return (
      <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
        {
        this.props.list && this.props.list.map((item, i) => {
          return <OfflineCell key={i} {...item} />
        })
      }
      </Pagination>
    )
  }
  _paging (list) {
    this.props.actions.fetchDataSellerShopDeviceRecycleList({
      offset: this.props.list.length,
      pageSize: PAGE_SIZE,
      memberId: this.props.location.query.rightChoseValue,
      cityCode: this.props.location.query.leftChoseValue,
      year: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[0]) || this.props.selectDate[0].year,
      month: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[1]) || this.props.selectDate[0].month
    })
  }
  _search (value) {
    router.push('/shop/search?keyword=' + value)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    bdMembersInCity: state.common && state.common.bdMembersInCity,
    list: state.shopDeviceRecycleList && state.shopDeviceRecycleList.list,
    shopCount: state.shopDeviceRecycleList && state.shopDeviceRecycleList.shopCount,
    recycleDeviceCount: state.shopDeviceRecycleList && state.shopDeviceRecycleList.recycleDeviceCount
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecycleListContainer)
