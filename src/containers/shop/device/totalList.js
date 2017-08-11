import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Style from './list.less'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import DoubleSelect from 'components/common/doubleSelect'
import Select from 'components/common/select'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/shop/device/totalList'
import * as commonActions from 'actions/common'
import Tabs, { Tab } from 'components/common/tabs'
import assign from 'lodash/assign'
import Cell from 'components/shop/device/cell'
import { router, limitFontSize } from 'utils'
import Search from 'components/common/search'
import * as sessionStorage from 'utils/sessionStorage'
const PAGE_SIZE = 10
const TabConfig = [{
  label: '全部',
  status: 0
}, {
  label: '在线',
  status: 3
}, {
  label: '急需维护',
  status: 1
}, {
  label: '全店离线',
  status: 2
}]
const OrderConfig = [
  {
    key: '门店离线设备订单数',
    value: 0
  },
  {
    key: '门店离线设备数',
    value: 1
  },
  {
    key: '总订单数（累计）',
    value: 4
  },
  {
    key: '总设备数',
    value: 5
  }
]

class TotalListContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showOderType: false
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    sessionStorage.setItem(`${this.props.location.pathname}_search`, this.props.location.search)
  }
  componentDidMount () {
    Bridge.setNavTitle('累计安装设备')
    if (sessionStorage.getItem(`${this.props.location.pathname}_search`) !== this.props.location.search) {
      if (this.props.location.query.rightChoseValue || this.props.location.query.orderType) {
        this.props.actions.fetchDataSellerAllDevice({
          offset: 0,
          pageSize: PAGE_SIZE,
          memberId: this.props.location.query.rightChoseValue,
          cityCode: this.props.location.query.leftChoseValue,
          deviceStatus: this.props.location.query.deviceStatus,
          orderType: this.props.location.query.orderType
        })
      }
      this.props.actions.fetchBdMembersInCity()
    }
    if (this.props.location.query.rightChoseValue || this.props.location.query.orderType) {
      !this.props.list && this.props.actions.fetchDataSellerAllDevice({
        offset: 0,
        pageSize: PAGE_SIZE,
        memberId: this.props.location.query.rightChoseValue,
        cityCode: this.props.location.query.leftChoseValue,
        deviceStatus: this.props.location.query.deviceStatus,
        orderType: this.props.location.query.orderType
      })
    }
    !this.props.bdMembersInCity && this.props.actions.fetchBdMembersInCity()
  }
  componentWillReceiveProps (nextProps) {
    if (!this.props.bdMembersInCity && nextProps.bdMembersInCity) {
      if (nextProps.bdMembersInCity.cities && nextProps.bdMembersInCity.members &&
        !(nextProps.location.query.rightChoseValue || nextProps.location.query.orderType)) {
        router.replace({pathname: nextProps.location.pathname,
          query: assign({}, nextProps.location.query, {
            leftChoseKey: nextProps.bdMembersInCity.cities[0].key,
            leftChoseValue: nextProps.bdMembersInCity.cities[0].value,
            rightChoseKey: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].key,
            rightChoseValue: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].value,
            deviceStatus: TabConfig[0].status,
            orderTypeName: OrderConfig[0].key,
            orderType: OrderConfig[0].value})})
      } else {
        router.replace({pathname: nextProps.location.pathname,
          query: assign({}, nextProps.location.query, {
            deviceStatus: TabConfig[0].status,
            orderTypeName: OrderConfig[0].key,
            orderType: OrderConfig[0].value})})
      }
    }

    if (this.props.location.query.leftChoseValue !== nextProps.location.query.leftChoseValue ||
      this.props.location.query.rightChoseValue !== nextProps.location.query.rightChoseValue ||
      this.props.location.query.deviceStatus !== nextProps.location.query.deviceStatus ||
      this.props.location.query.orderType !== nextProps.location.query.orderType) {
      this.props.actions.fetchDataSellerAllDevice({
        offset: 0,
        pageSize: PAGE_SIZE,
        memberId: nextProps.location.query.rightChoseValue,
        cityCode: nextProps.location.query.leftChoseValue,
        deviceStatus: nextProps.location.query.deviceStatus,
        orderType: nextProps.location.query.orderType
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
          ? <div className='multi-chose clearfix'>
            <div className='float'>
              <DoubleSelect
                location={this.props.location}
                leftChoseKey={this.props.location.query.leftChoseKey}
                leftChoseValue={this.props.location.query.leftChoseValue}
                rightChoseKey={this.props.location.query.rightChoseKey}
                rightChoseValue={this.props.location.query.rightChoseValue}
                list={this.props.bdMembersInCity} />
            </div>
            <div className='float'>
              <button className='select-date' onClick={this._bindChoseOrderType.bind(this)}>
                {limitFontSize(this.props.location.query.orderTypeName || OrderConfig[0].key, 4, true)}
                {this.state.showOderType ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
          </div>
          : <button className='select-date' onClick={this._bindChoseOrderType.bind(this)}>
            {this.props.location.query.orderTypeName || OrderConfig[0].key}
            {this.state.showOderType ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
          </button>}
        <Tabs>
          {TabConfig.map((item, i) => {
            return <Tab
              key={item.status}
              highlight={item.status === parseInt(this.props.location.query.deviceStatus || TabConfig[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.label}
            </Tab>
          })}
        </Tabs>
        <div className='total-num'>
          <p>合计：</p>
          <p>设备数：{this.props.deviceCount || 0}</p>
          <p>门店数：{this.props.shopCount || 0}</p>
          <p>成功订单数：{this.props.successOrder || 0}</p>
        </div>
        <div className='title clearfix'>
          <div>设备编号</div>
          <div>成功订单</div>
          <div>退款订单</div>
        </div>
        {this._renderList()}
        {this.state.showOderType ? <Select
          options={OrderConfig}
          onChose={this._choseOrderType.bind(this)}
          selectedValue={parseInt(this.props.location.query.orderType) || OrderConfig[0].value}
          onClose={this._closeOrderType.bind(this)} /> : null}
      </div>
    )
  }
  _bindChoseOrderType () {
    this.setState({
      showOderType: true
    })
  }
  _choseOrderType (value, item) {
    this._closeOrderType()
    router.replace({pathname: this.props.location.pathname, query: assign({}, this.props.location.query, {orderType: value, orderTypeName: item.key})})
  }
  _closeOrderType () {
    this.setState({
      showOderType: false
    })
  }
  _renderList () {
    if (!this.props.list && !this.props.error) {
      return <Loading />
    }
    if (!this.props.list && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.list && this.props.list.length === 0) {
      return <Notfound>暂无订单</Notfound>
    }
    return (
      <Pagination location={this.props.location} onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
        {
        this.props.list && this.props.list.map((item, i) => {
          return <Cell key={i} {...item} hasTotalDevice />
        })
      }
      </Pagination>
    )
  }
  _paging (list) {
    this.props.actions.fetchDataSellerAllDevice({
      offset: this.props.list.length,
      pageSize: PAGE_SIZE,
      memberId: this.props.location.query.rightChoseValue,
      cityCode: this.props.location.query.leftChoseValue,
      deviceStatus: this.props.location.query.deviceStatus,
      orderType: this.props.location.query.orderType
    })
  }
  _tab (status) {
    router.replace({pathname: location.pathname, query: assign(this.props.location.query, {deviceStatus: status})})
  }
  _search (value) {
    router.push('/shop/search?keyword=' + value)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    bdMembersInCity: state.common && state.common.bdMembersInCity,
    list: state.shopAllDeviceList && state.shopAllDeviceList.list,
    deviceCount: state.shopAllDeviceList && state.shopAllDeviceList.deviceCount,
    shopCount: state.shopAllDeviceList && state.shopAllDeviceList.shopCount,
    successOrder: state.shopAllDeviceList && state.shopAllDeviceList.successOrder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalListContainer)
