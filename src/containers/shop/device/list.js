import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import DoubleSelect from 'components/common/doubleSelect'
import Select from 'components/common/select'
import Style from './list.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/shop/device/list'
import * as commonActions from 'actions/common'
import Tabs, { Tab } from 'components/common/tabs'
import assign from 'lodash/assign'
import { router, limitFontSize } from 'utils'
import DeviceCell from 'components/shop/device/cell'
import Search from 'components/common/search'
const PAGE_SIZE = 5
const TabConfig = [{
  label: '全部',
  status: 0
}, {
  label: '考核期已达标',
  status: 1
}, {
  label: '考核期未达标',
  status: 2
}]
const OrderConfig = [
  {
    key: '订单数',
    value: 0
  },
  {
    key: '设备数',
    value: 1
  },
  {
    key: '离线设备数',
    value: 2
  }
]

class ListContainer extends Component {
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
  }
  componentDidMount () {
    Bridge.setNavTitle(this.props.location.query.title)
    if (this.props.location.query.rightChoseValue || this.props.location.query.orderType) {
      this.props.actions.fetchDataSellerShopList({
        memberId: this.props.location.query.memberId,
        managerId: this.props.location.query.managerId,
        offset: 0,
        pageSize: PAGE_SIZE,
        cityCode: this.props.location.query.leftChoseValue,
        checkStatus: this.props.location.query.checkStatus,
        orderType: this.props.location.query.orderType,
        year: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[0]) || this.props.selectDate[0].year,
        month: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[1]) || this.props.selectDate[0].month
      })
    }
    this.props.actions.fetchBdMembersInCity()
  }
  componentWillReceiveProps (nextProps) {
    if (!this.props.bdMembersInCity && nextProps.bdMembersInCity &&
      !(nextProps.location.query.rightChoseValue || nextProps.location.query.orderType)) {
      if (nextProps.bdMembersInCity.cities && nextProps.bdMembersInCity.members) {
        router.replace({pathname: nextProps.location.pathname,
          query: assign({}, nextProps.location.query, {
            leftChoseKey: nextProps.bdMembersInCity.cities[0].key,
            leftChoseValue: nextProps.bdMembersInCity.cities[0].value,
            rightChoseKey: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].key,
            rightChoseValue: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].value,
            checkStatus: nextProps.location.query.checkStatus || TabConfig[0].status,
            orderTypeName: OrderConfig[0].key,
            orderType: OrderConfig[0].value})})
      } else {
        router.replace({pathname: nextProps.location.pathname,
          query: assign({}, nextProps.location.query, {
            checkStatus: nextProps.location.query.checkStatus || TabConfig[0].status,
            orderTypeName: OrderConfig[0].key,
            orderType: OrderConfig[0].value
          })})
      }
    }

    if (this.props.location.query.leftChoseValue !== nextProps.location.query.leftChoseValue ||
      this.props.location.query.rightChoseValue !== nextProps.location.query.rightChoseValue ||
      this.props.location.query.checkStatus !== nextProps.location.query.checkStatus ||
      this.props.location.query.orderType !== nextProps.location.query.orderType) {
      this.props.actions.fetchDataSellerShopList({
        memberId: this.props.location.query.memberId,
        managerId: this.props.location.query.managerId,
        offset: 0,
        pageSize: PAGE_SIZE,
        cityCode: nextProps.location.query.leftChoseValue,
        checkStatus: nextProps.location.query.checkStatus,
        orderType: nextProps.location.query.orderType,
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
              highlight={item.status === parseInt(this.props.location.query.checkStatus || TabConfig[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.label}
            </Tab>
          })}
        </Tabs>
        {/** <div className='total-num'>
          <p>合计：</p>
          <p>设备数：{this.props.deviceCount || 0}</p>
          <p>门店数：{this.props.shopCount || 0}</p>
          <p>成功订单数：{this.props.successOrder || 0}</p>
        </div> **/}
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
      return <Notfound>暂无设备</Notfound>
    }
    return (
      <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
        {
        this.props.list && this.props.list.map((item, i) => {
          return <DeviceCell key={i} {...item} />
        })
      }
      </Pagination>
    )
  }
  _paging (list) {
    this.props.actions.fetchDataSellerShopList({
      memberId: this.props.location.query.memberId,
      managerId: this.props.location.query.managerId,
      year: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[0]) || this.props.selectDate[0].year,
      month: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[1]) || this.props.selectDate[0].month,
      offset: this.props.list.length,
      pageSize: PAGE_SIZE,
      cityCode: this.props.location.query.leftChoseValue,
      checkStatus: this.props.location.query.checkStatus,
      orderType: this.props.location.query.orderType
    })
  }
  _tab (status) {
    router.replace({pathname: location.pathname, query: assign(this.props.location.query, {checkStatus: status})})
  }
  _search (value) {
    router.push('/shop/search?keyword=' + value)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    bdMembersInCity: state.common && state.common.bdMembersInCity,
    list: state.shopDeviceList && state.shopDeviceList.list,
    deviceCount: state.shopDeviceList && state.shopDeviceList.deviceCount,
    shopCount: state.shopDeviceList && state.shopDeviceList.shopCount,
    successOrder: state.shopDeviceList && state.shopDeviceList.successOrder
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
