import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'components/link'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import Tabs, { Tab } from 'components/common/tabs'
import SmallSelect from 'components/common/smallSelect'
import { router } from 'utils'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/user/mine/shop'
import Style from './device.less'
import Item from 'components/user/mine/shop/deviceItem'
import DeviceOrderItem from 'components/user/mine/shop/orderListItem'

import { SHOP_ORDER_LIST } from 'constants/shopTab'

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
  // {
  //   key: '已退款',
  //   value: 6
  // }
]
const PAGE_SIZE = 20

class DeviceContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      tabStatus: parseInt(this.props.location.query.activeTab)
    }
  }

  componentWillMount () {
    Style.use()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location.query.leftChoseValue !== nextProps.location.query.leftChoseValue ||
      this.props.location.query.rightChoseValue !== nextProps.location.query.rightChoseValue ||
      this.props.location.query.orderType !== nextProps.location.query.orderType ||
      this.props.location.query.orderStatus !== nextProps.location.query.orderStatus ||
      this.props.location.query.activeTab !== nextProps.location.query.activeTab

    ) {
      if (isNaN(nextProps.location.query.activeTab) || parseInt(nextProps.location.query.activeTab) === 0) {
        this.props.actions.fetchMyShopDeviceList({
          // id 等于 shopId
          shopId: this.props.params.id
        })
      }
      if (parseInt(nextProps.location.query.activeTab) === 1) {
        this.props.actions.fetchMyShopDeviceOrderList({
          offset: 0,
          pageSize: PAGE_SIZE,
          orderStatus: nextProps.location.query.orderStatus,
          shopId: this.props.params.id
        })
      }
    }
    if (this.props.shopInfo !== nextProps.shopInfo) {
      router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          shopName: nextProps.shopInfo.shopName
        })
      })
    }
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanMyShopDeviceList()
  }

  componentDidMount () {
    Bridge.setNavTitle('门店数据')
    if (this.state.tabStatus === 0) {
      this.props.actions.fetchMyShopDeviceList({
        // id 等于 shopId
        shopId: this.props.params.id
      })
    }
    if (this.state.tabStatus === 1) {
      this.props.actions.fetchMyShopDeviceOrderList({
        offset: 0,
        pageSize: PAGE_SIZE,
        shopId: this.props.params.id,
        orderStatus: this.props.location.query.orderStatus || 2
      })
    }
  }

  render () {
    return (
      <div className='device-list'>
        <Link className='shop clearfix' to={'/shops/' + this.props.params.id}>
          <div className='install'>
            <p className='install-name'>{this.props.location.query.shopName || ''}</p>
          </div>
          <div className='install-chose'><i className='dianfont icon-xuanze' /></div>
        </Link>
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
        <div className='screen clearfix'>
          {this.state.tabStatus === 1 ? <div className='float'><SmallSelect
            defaultKey={this.props.location.query.orderStatusName}
            defaultValue={this.props.location.query.orderStatus}
            location={this.props.location}
            keys={{key: 'orderStatusName', value: 'orderStatus'}}
            list={OrderTypeConfig}
          /></div> : null}
        </div>
        <div className='shop-detail'>合计：&nbsp;门店设备数&nbsp;{this.props.deviceCount}&nbsp;&nbsp;&nbsp;
          成功订单数&nbsp;{this.props.successOrder}</div>
        {this.state.tabStatus === 0 ? <div className='title clearfix'>
          <div>设备编号</div>
          <div>上线天数</div>
          <div>累计成功订单</div>
          <div>累计退款订单</div>
          <div>累计成功订单金额</div>
          <div>累计退款订单金额</div>
        </div> : null}
        {this.state.tabStatus === 1 ? <div className='order-list-title clearfix'>
          <span className='th device-no'>设备编号</span>
          <span className='th pay-time'>支付时间</span>
          <span className='th user-nick'>用户昵称</span>
          <span className='th pay-way'>支付方式</span>
          <span className='th order-status'>订单状态</span>
        </div> : null}
        {this._renderList()}
      </div>
    )
  }

  _renderList () {
    if (this.state.tabStatus === 0) {
      if (!this.props.shopInfo && !this.props.error) {
        return <Loading />
      }
      if (this.props.shopInfo && !this.props.shopInfo.shopId) {
        return <Notfound>暂无门店信息</Notfound>
      }
      if (this.props.shopInfo && this.props.shopInfo.data && this.props.shopInfo.data.length === 0) {
        return <Notfound>暂无设备</Notfound>
      }
      if (!this.props.shopInfo && this.props.error) {
        return <Error>{this.props.error.message || '未知错误'}</Error>
      }
      return <Item devices={this.props.shopInfo.data} shopName={this.props.shopInfo.shopName} />
    }

    if (this.state.tabStatus === 1) {
      if (!this.props.orderList && !this.props.error) {
        return <Loading />
      }
      if (!this.props.shopList && this.props.error) {
        return <Error>{this.props.error.message || '未知错误'}</Error>
      }
      let orderList = this.props.orderList
      if (orderList && orderList.length === 0) {
        return <Notfound>暂无订单</Notfound>
      }
      return (
        <Pagination location={this.props.location} onPaging={() => { this._paging(orderList) }}
          data={orderList} size={PAGE_SIZE}>
          {
            orderList && orderList.length > 0 && orderList.map((item, i) => {
              return <DeviceOrderItem key={i} {...item} />
            })
          }
        </Pagination>
      )
    }
  }

  _paging (list) {
    this.props.actions.fetchMyShopDeviceOrderList({
      offset: list.length,
      pageSize: PAGE_SIZE,
      orderStatus: this.props.location.query.orderStatus,
      shopId: this.props.params.id
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
        orderStatus: 2,
        orderStatusName: '已支付'
      })
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    shopInfo: state.userMineShopDevice && state.userMineShopDevice.info,
    deviceCount: state.userMineShopDevice && state.userMineShopDevice.deviceCount,
    shopCount: state.userMineShopDevice && state.userMineShopDevice.shopCount,
    successOrder: state.userMineShopDevice && state.userMineShopDevice.successOrder,
    orderList: state.userMineShopDevice && state.userMineShopDevice.orderList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceContainer)
