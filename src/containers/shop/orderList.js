import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Style from './device/list.less'
import Style2 from './orderlist.less'

import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import DoubleSelect from 'components/common/doubleSelect'
import Select from 'components/common/select'
import SmallSelect from 'components/common/smallSelect'

import Cell from 'components/shop/orderCell'
import Search from 'components/common/search'
import Tabs, { Tab } from 'components/common/tabs'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/shop'
import * as commonActions from 'actions/common'

import assign from 'lodash/assign'
import { router, limitFontSize } from 'utils'
import * as sessionStorage from 'utils/sessionStorage'

import { SHOP_ORDER_LIST } from 'constants/shopTab'
import { TIMES_CONFIG } from 'constants/timesConfig'
import Item from '../../components/user/mine/shop/item'
import OrderListItem from 'components/shop/orderListItem'
const PAGE_SIZE = 20
const OrderConfig = [
  {
    key: '设备平均订单降序',
    value: 1
  },
  {
    key: '设备平均订单升序',
    value: 2
  },
  {
    key: '成功订单降序',
    value: 3
  },
  {
    key: '成功订单升序',
    value: 4
  }
]
const OrderTypeConfig = [
  {
    key: '全部',
    value: 0
  },
  {
    key: '待支付',
    value: 1
  },
  {
    key: '已支付',
    value: 2
  },
  {
    key: '自动退款',
    value: 3
  },
  {
    key: '用户退款',
    value: 4
  },
  {
    key: '客服退款',
    value: 5
  }
]
const timeConfig = TIMES_CONFIG
class ShopOrderListContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showOderType: false,
      times: '',
      tabStatus: parseInt(this.props.location.query.activeTab) || 0
    }
  }

  componentWillMount () {
    Style.use()
    Style2.use()
  }

  componentWillUnmount () {
    Style.unuse()
    Style2.unuse()
    this.props.actions.cleanErrorMessage()
    sessionStorage.setItem(`${this.props.location.pathname}_search`, this.props.location.search)
  }

  componentDidMount () {
    Bridge.setNavTitle('今日订单')
    if (sessionStorage.getItem(`${this.props.location.pathname}_search`) !== this.props.location.search) {
      if (this.props.location.query.rightChoseValue || this.props.location.query.orderType) {
        if (this.state.tabStatus === 0) { // 门店汇总
          this.props.actions.fetchDataSellerShopDetail({
            offset: 0,
            pageSize: PAGE_SIZE,
            memberId: this.props.location.query.rightChoseValue,
            cityCode: this.props.location.query.leftChoseValue,
            sort: this.props.location.query.orderType,
            timeString: decodeURIComponent(this.props.location.query.times || '')
          })
        }
        if (this.state.tabStatus === 1) { // 订单列表
          this.props.actions.fetchDataSellerOrderList({
            offset: 0,
            pageSize: PAGE_SIZE,
            memberId: this.props.location.query.rightChoseValue,
            cityCode: this.props.location.query.leftChoseValue,
            orderStatus: this.props.location.query.orderStatus,
            timeString: decodeURIComponent(this.props.location.query.times || '')
          })
        }
      } else {
        !this.props.bdMembersInCity && this.props.actions.fetchBdMembersInCity()
        if (this.state.tabStatus === 0) { // 门店汇总
          if (!this.props.shopList) {
            this.props.actions.fetchDataSellerShopDetail({
              offset: 0,
              pageSize: PAGE_SIZE,
              memberId: this.props.location.query.rightChoseValue,
              cityCode: this.props.location.query.leftChoseValue,
              sort: this.props.location.query.orderType,
              timeString: decodeURIComponent(this.props.location.query.times || '')
            })
          }
        }
        if (this.state.tabStatus === 1) { // 订单列表
          if (!this.props.orderList) {
            this.props.actions.fetchDataSellerOrderList({
              offset: 0,
              pageSize: PAGE_SIZE,
              memberId: this.props.location.query.rightChoseValue,
              cityCode: this.props.location.query.leftChoseValue,
              orderStatus: this.props.location.query.orderStatus,
              timeString: decodeURIComponent(this.props.location.query.times || '')
            })
          }
        }
      }
      this.props.actions.fetchBdMembersInCity()
    } else {
      !this.props.bdMembersInCity && this.props.actions.fetchBdMembersInCity()
      if (this.state.tabStatus === 0) { // 门店汇总
        if (!this.props.shopList) {
          this.props.actions.fetchDataSellerShopDetail({
            offset: 0,
            pageSize: PAGE_SIZE,
            memberId: this.props.location.query.rightChoseValue,
            cityCode: this.props.location.query.leftChoseValue,
            sort: this.props.location.query.orderType,
            timeString: decodeURIComponent(this.props.location.query.times || '')
          })
        }
      }
      if (this.state.tabStatus === 1) { // 订单列表
        if (!this.props.orderList) {
          this.props.actions.fetchDataSellerOrderList({
            offset: 0,
            pageSize: PAGE_SIZE,
            memberId: this.props.location.query.rightChoseValue,
            cityCode: this.props.location.query.leftChoseValue,
            orderStatus: this.props.location.query.orderStatus,
            timeString: decodeURIComponent(this.props.location.query.times || '')
          })
        }
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.bdMembersInCity && nextProps.bdMembersInCity &&
      !(nextProps.location.query.rightChoseValue ||
      nextProps.location.query.orderType ||
      nextProps.location.query.orderStatus)
    ) {
      if (nextProps.bdMembersInCity.cities && nextProps.bdMembersInCity.members) {
        router.replace({
          pathname: nextProps.location.pathname,
          query: assign({}, nextProps.location.query, {
            leftChoseKey: nextProps.bdMembersInCity.cities[0].key,
            leftChoseValue: nextProps.bdMembersInCity.cities[0].value,
            rightChoseKey: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].key,
            rightChoseValue: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].value,
            orderTypeName: OrderConfig[0].key,
            orderType: OrderConfig[0].value,
            orderStatusName: OrderTypeConfig[2].key,
            orderStatus: OrderTypeConfig[2].value,
            activeTab: this.props.location.query.activeTab || 0
          })
        })
      } else {
        router.replace({
          pathname: nextProps.location.pathname,
          query: assign({}, nextProps.location.query, {
            orderTypeName: OrderConfig[0].key,
            orderType: OrderConfig[0].value,
            orderStatusName: OrderTypeConfig[2].key,
            orderStatus: OrderTypeConfig[2].value,
            activeTab: this.props.location.query.activeTab || 0
          })
        })
      }
    }

    if (this.props.location.query.leftChoseValue !== nextProps.location.query.leftChoseValue ||
      this.props.location.query.rightChoseValue !== nextProps.location.query.rightChoseValue ||
      this.props.location.query.orderType !== nextProps.location.query.orderType ||
      this.props.location.query.orderStatus !== nextProps.location.query.orderStatus ||
      this.props.location.query.activeTab !== nextProps.location.query.activeTab ||
      decodeURIComponent(this.props.location.query.times) !== decodeURIComponent(nextProps.location.query.times)
    ) {
      this.setState({
        times: decodeURIComponent(nextProps.location.query.times || '')
      })
      if (parseInt(nextProps.location.query.activeTab) === 0) {
        this.props.actions.fetchDataSellerShopDetail({ // 门店汇总
          offset: 0,
          pageSize: PAGE_SIZE,
          memberId: nextProps.location.query.rightChoseValue,
          cityCode: nextProps.location.query.leftChoseValue,
          sort: nextProps.location.query.orderType,
          timeString: decodeURIComponent(nextProps.location.query.times || '')
        })
      }
      if (parseInt(nextProps.location.query.activeTab) === 1) {
        this.props.actions.fetchDataSellerOrderList({ // 订单详情
          offset: 0,
          pageSize: PAGE_SIZE,
          memberId: nextProps.location.query.rightChoseValue,
          cityCode: nextProps.location.query.leftChoseValue,
          orderStatus: nextProps.location.query.orderStatus,
          timeString: decodeURIComponent(nextProps.location.query.times || '')
        })
      }
    }
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }

  render () {
    return (
      <div className='order-list'>
        <Search onClick={this._search.bind(this)} placeholder={'搜索门店'} />
        <Tabs>
          {SHOP_ORDER_LIST.map((item, i) => {
            return <Tab
              key={i}
              highlight={item.status === parseInt(this.props.location.query.activeTab || SHOP_ORDER_LIST[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.name}
            </Tab>
          })}
        </Tabs>
        <div className='total-num'>
          <p>合计：</p>
          <p>设备数：{this.props.deviceCount || 0}</p>
          <p>门店数：{this.props.shopCount || 0}</p>
          <p>成功订单数：{this.props.successOrder || 0}</p>
        </div>
        <div className='screen clearfix'>
          {this.props.bdMembersInCity && this.props.bdMembersInCity.cities
            ? <div className='float'><DoubleSelect
              location={this.props.location}
              leftChoseKey={this.props.location.query.leftChoseKey}
              leftChoseValue={this.props.location.query.leftChoseValue}
              rightChoseKey={this.props.location.query.rightChoseKey}
              rightChoseValue={this.props.location.query.rightChoseValue}
              list={this.props.bdMembersInCity} /></div>
            : null}
          {this.props.bdMembersInCity && this.props.bdMembersInCity.members
            ? <div className='float'><SmallSelect
              multiple
              defaultKey={'时间段'}
              defaultValue={this.state.times ? this.state.times.split(',') : ['']}
              list={timeConfig}
              outSide={this._onTimeChange.bind(this)}
            /></div>
            : null}
          {this.props.bdMembersInCity && this.props.bdMembersInCity.members
            ? <div className='float'>
              {this.state.tabStatus === 0 || !this.state.tabStatus ? <SmallSelect
                defaultKey={this.props.location.query.orderTypeName}
                defaultValue={this.props.location.query.orderType}
                location={this.props.location}
                keys={{key: 'orderTypeName', value: 'orderType'}}
                list={OrderConfig}
              /> : null}
              {this.state.tabStatus === 1 ? <SmallSelect
                defaultKey={this.props.location.query.orderStatusName}
                defaultValue={this.props.location.query.orderStatus}
                location={this.props.location}
                keys={{key: 'orderStatusName', value: 'orderStatus'}}
                list={OrderTypeConfig}
              /> : null}</div>
            : null}
        </div>

        {this.state.tabStatus === 0 || !this.state.tabStatus ? <div className='title clearfix'>
          <div>设备编号</div>
          <div>成功订单</div>
          <div>退款订单</div>
        </div> : null}
        {this.state.tabStatus === 1 ? <div className='order-list-title clearfix'>
          <span className='th shop-name'>所在<br />门店</span>
          <span className='th create-time'>创建<br />时间</span>
          <span className='th device-no'>设备<br />编号</span>
          <span className='th user-nick'>用户<br />昵称</span>
          <span className='th pay-way'>支付<br />方式</span>
          <span className='th order-status'>订单<br />状态</span>
        </div> : null}
        {this._renderList()}
      </div>
    )
  }

  _bindChoseOrderType () {
    this.setState({
      showOderType: true
    })
  }

  _onTimeChange (times) {
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        times: times
      })
    })
  }

  _tab (tabIndex) {
    let status = parseInt(tabIndex)
    this.setState({
      tabStatus: parseInt(status)
    })
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        activeTab: status,
        leftChoseKey: '城市',
        leftChoseValue: 0,
        rightChoseKey: '小二',
        rightChoseValue: 0,
        orderStatus: 2,
        orderStatusName: '已支付',
        orderType: 1,
        orderTypeName: '设备平均订单降序',
        times: ''
      })
    })
  }

  _choseOrderType (value, item) {
    this._closeOrderType()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {orderType: value, orderTypeName: item.key})
    })
  }

  _closeOrderType () {
    this.setState({
      showOderType: false
    })
  }

  _renderList () {
    if (this.state.tabStatus === 0 || !this.state.tabStatus) {
      if (!this.props.shopList && !this.props.error) {
        return <Loading />
      }
      if (!this.props.shopList && this.props.error) {
        return <Error>{this.props.error.message || '未知错误'}</Error>
      }
      if (this.props.shopList && this.props.shopList.length === 0 && !this.props.error) {
        return <Notfound>暂无订单</Notfound>
      }
      let shopList = this.props.shopList
      return (
        <Pagination location={this.props.location} onPaging={() => { this._paging(shopList) }}
          data={shopList} size={PAGE_SIZE}>
          {
            shopList && shopList.map((item, i) => {
              return <Cell key={i} {...item} />
            })
          }
        </Pagination>
      )
    }
    if (this.state.tabStatus === 1) {
      if (!this.props.orderList && !this.props.error) {
        return <Loading />
      }
      if (!this.props.orderList && this.props.error) {
        return <Error>{this.props.error.message || '未知错误'}</Error>
      }
      if (this.props.orderList && this.props.orderList.length === 0 && !this.props.error) {
        return <Notfound>暂无订单</Notfound>
      }
      let orderList = this.props.orderList
      return (
        <Pagination location={this.props.location} onPaging={() => { this._paging(orderList) }}
          data={orderList} size={PAGE_SIZE}>
          {
            orderList && orderList.length > 0 && orderList.map((item, i) => {
              return <OrderListItem key={i} {...item} />
            })
          }
        </Pagination>

      )
    }
  }

  _paging (list) {
    if (this.state.tabStatus === 0) {
      this.props.actions.fetchDataSellerShopDetail({
        offset: list.length,
        pageSize: PAGE_SIZE,
        memberId: this.props.location.query.rightChoseValue,
        cityCode: this.props.location.query.leftChoseValue,
        sort: this.props.location.query.orderType,
        timeString: decodeURIComponent(this.props.location.query.times || '')
      })
    }
    if (this.state.tabStatus === 1) {
      this.props.actions.fetchDataSellerOrderList({
        offset: list.length,
        pageSize: PAGE_SIZE,
        memberId: this.props.location.query.rightChoseValue,
        cityCode: this.props.location.query.leftChoseValue,
        orderStatus: this.props.location.query.orderStatus,
        timeString: decodeURIComponent(this.props.location.query.times || '')
      })
    }
  }

  _search (value) {
    router.push('/shop/search?keyword=' + value)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    bdMembersInCity: state.common && state.common.bdMembersInCity,
    shopList: state.shopOrderList && state.shopOrderList.shopList,
    orderList: state.shopOrderList && state.shopOrderList.orderList,
    deviceCount: state.shopOrderList && state.shopOrderList.deviceCount,
    shopCount: state.shopOrderList && state.shopOrderList.shopCount,
    successOrder: state.shopOrderList && state.shopOrderList.successOrder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopOrderListContainer)
