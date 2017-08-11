import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Style from './data.less'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/paginationA'
import SelectShopType from 'components/common/selectShopType'
import DoubleSelect from 'components/common/doubleSelect'
import Select from 'components/common/select'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/data'
import * as commonActions from 'actions/common'
import Tabs, { Tab } from 'components/common/tabs'
import assign from 'lodash/assign'
import isEqual from 'lodash/isEqual'
import { Title, Cell } from 'components/channel/data/todayCell'
import OrderCell from 'components/shop/orderListItem'
import { router, limitFontSize } from 'utils'
import Search from 'components/common/search'
import * as sessionStorage from 'utils/sessionStorage'
import { DataTabConfig, DataOrderConfig, DataSortType } from 'constants/channel'
import { BdDataTabConfig, BdDataTimes, BdDataOrderStatus } from 'constants/bd'
const PAGE_SIZE = 10

class TodayNewInstallDeviceContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    if (!this.props.location.query.role) {
      return router.goBack()
    }
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    sessionStorage.setItem(`${this.props.location.pathname}_search`, this.props.location.search)
  }
  componentDidMount () {
    Bridge.setNavTitle('今日成功订单')
    if (!this.props.location.query.tabStatus) {
      router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          tabStatus: BdDataTabConfig[0].status
        })
      })
    }
  }
  render () {
    if (!this.props.location.query.tabStatus) {
      return <Loading />
    }
    return (
      <div>
        <Search onClick={this._search.bind(this)} placeholder={'搜索门店'} />
        <Tabs>
          {BdDataTabConfig.map((item, i) => {
            return <Tab
              key={item.status}
              highlight={item.status === parseInt(this.props.location.query.tabStatus)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.label}
            </Tab>
          })}
        </Tabs>
        {this.props.location.query.tabStatus === `${BdDataTabConfig[0].status}` ? <ShopTotal {...this.props} /> : <OrderList {...this.props} />}
      </div>
    )
  }
  _tab (status) {
    router.replace({pathname: location.pathname, query: {role: this.props.location.query.role, tabStatus: status}})
  }
  _search (value) {
    router.push('/shop/search?keyword=' + value)
  }
}

function mapStateToProps (state, ownProps) {
  let bdMembersInCity = null
  let districts = null
  let members = null
  let typeAndSubType = state.common && state.common.typeAndSubType
  if (typeAndSubType && typeAndSubType.type[0].id !== 0) {
    typeAndSubType.type.unshift({id: 0, name: '类目'})
    // typeAndSubType.subType = assign({0: [{id: 0, name: '类目'}]}, typeAndSubType.subType)
  }
  switch (ownProps.location.query.role) {
    case 'agentSellerManager':
    case 'ceo':
      if (state.common && state.common.bdMembersInCity) {
        bdMembersInCity = assign({}, state.common.bdMembersInCity)
        for (let key in bdMembersInCity.members) {
          bdMembersInCity.members[key][0].key = '员工'
        }
      }
      break
    case 'agentSeller':
      if (state.common && state.common.district) {
        districts = state.common.district.map((item, i) => { return {key: item.districtName, value: item.districtCode} })
        districts[0].key = '区域'
      }
      break
  }
  return {
    error: state.errorMessage,
    bdMembersInCity,
    typeAndSubType,
    districts,
    members,
    orderList: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.orderList,
    orderComplete: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.orderComplete,
    orderPaging: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.orderPaging,
    orderDeviceCount: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.orderDeviceCount,
    orderShopCount: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.orderShopCount,
    orderSuccessOrder: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.orderSuccessOrder,
    list: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.list,
    complete: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.complete,
    paging: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.paging,
    deviceCount: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.deviceCount,
    shopCount: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.shopCount,
    successOrder: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.successOrder,
    createOrder: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.createOrder,
    refundOrder: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.refundOrder,
    scanNum: state.bdDataTodaySuccessOrderPage && state.bdDataTodaySuccessOrderPage.scanNum
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayNewInstallDeviceContainer)

class ShopTotal extends PureComponent {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showShopType: false,
      showDistrict: false,
      showMember: false,
      showTimes: false
    }
  }
  componentDidMount () {
    if (!this.props.list && this.props.location.query.shopSubType) {
      this.props.actions.fetchBdMembersInCity()
      this.props.actions.fetchDistrict()
      this.props.actions.fetchShopType()
      this.props.actions.fetchTodaySuccessOrderList(assign({offset: 0, pageSize: PAGE_SIZE}, this.props.location.query))
    }

    if (sessionStorage.getItem(`${this.props.location.pathname}_search`) !== this.props.location.search) {
      !this.props.typeAndSubType && this.props.actions.fetchShopType()
      switch (this.props.location.query.role) {
        case 'agentSellerManager':
        case 'ceo':
          !this.props.bdMembersInCity && this.props.actions.fetchBdMembersInCity()
          if (this.props.bdMembersInCity && this.props.typeAndSubType) {
            if (this.props.location.query.shopSubType) {
              this.props.actions.fetchTodaySuccessOrderList(assign({offset: 0, pageSize: PAGE_SIZE}, this.props.location.query))
            } else {
              router.replace({
                pathname: this.props.location.pathname,
                query: assign(this.props.location.query, {
                  deviceStatus: DataTabConfig[0].status,
                  dataSortField: DataOrderConfig[0].key,
                  sortType: DataSortType[0],
                  cityCode: '0',
                  cityName: '城市',
                  memberId: '0',
                  memberName: '员工',
                  shopType: '0',
                  shopSubType: '0',
                  shopSubTypeName: '类目',
                  timeString: BdDataTimes[0].value,
                  timeStringName: BdDataTimes[0].key
                })
              })
            }
          }
          break
        case 'agentSeller':
          !this.props.districts && this.props.actions.fetchDistrict()
          if (this.props.districts && this.props.typeAndSubType) {
            if (this.props.location.query.shopSubType) {
              this.props.actions.fetchTodaySuccessOrderList(assign({offset: 0, pageSize: PAGE_SIZE}, this.props.location.query))
            } else {
              router.replace({
                pathname: this.props.location.pathname,
                query: assign(this.props.location.query, {
                  deviceStatus: DataTabConfig[0].status,
                  dataSortField: DataOrderConfig[0].key,
                  sortType: DataSortType[0],
                  districtCode: '0',
                  districtName: '区域',
                  shopType: '0',
                  shopSubType: '0',
                  shopSubTypeName: '类目',
                  timeString: BdDataTimes[0].value,
                  timeStringName: BdDataTimes[0].key
                })
              })
            }
          }
          break
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    switch (nextProps.location.query.role) {
      case 'agentSellerManager':
      case 'ceo':
        if (nextProps.bdMembersInCity && nextProps.typeAndSubType && !nextProps.location.query.shopSubType) {
          router.replace({
            pathname: nextProps.location.pathname,
            query: assign(nextProps.location.query, {
              deviceStatus: DataTabConfig[0].status,
              dataSortField: DataOrderConfig[0].key,
              sortType: DataSortType[0],
              cityCode: '0',
              cityName: '城市',
              memberId: '0',
              memberName: '员工',
              shopType: '0',
              shopSubType: '0',
              shopSubTypeName: '类目',
              timeString: BdDataTimes[0].value,
              timeStringName: BdDataTimes[0].key
            })
          })
        }
        break
      case 'agentSeller':
        if (nextProps.districts && nextProps.typeAndSubType && !nextProps.location.query.shopSubType) {
          router.replace({
            pathname: nextProps.location.pathname,
            query: assign(nextProps.location.query, {
              deviceStatus: DataTabConfig[0].status,
              dataSortField: DataOrderConfig[0].key,
              sortType: DataSortType[0],
              districtCode: '0',
              districtName: '区域',
              shopType: '0',
              shopSubType: '0',
              shopSubTypeName: '类目',
              timeString: BdDataTimes[0].value,
              timeStringName: BdDataTimes[0].key
            })
          })
        }
        break
    }
    if (!isEqual(this.props.location.query, nextProps.location.query)) {
      this.props.actions.fetchTodaySuccessOrderList(assign({offset: 0, pageSize: PAGE_SIZE}, nextProps.location.query))
    }
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    if (!this.props.location.query.shopSubType) {
      return <Loading />
    }
    switch (this.props.location.query.role) {
      case 'agentSellerManager':
      case 'ceo':
        if (!(this.props.list && this.props.bdMembersInCity && this.props.typeAndSubType) && !this.props.error) {
          return <Loading />
        }
        if (!(this.props.list && this.props.bdMembersInCity && this.props.typeAndSubType) && this.props.error) {
          return <Error>{this.props.error.message || '未知错误'}</Error>
        }
        break
      case 'agentSeller':
        if (!(this.props.list && this.props.districts && this.props.typeAndSubType) && !this.props.error) {
          return <Loading />
        }
        if (!(this.props.list && this.props.districts && this.props.typeAndSubType) && this.props.error) {
          return <Error>{this.props.error.message || '未知错误'}</Error>
        }
        break
    }
    return (
      <div>
        {this._renderOption()}
        <div className='total'>
          <p className='total-title'>总体合计：</p>
          <ul className='clearfix'>
            <li>门店数：{this.props.shopCount || 0}</li>
            <li>设备数：{this.props.deviceCount || 0}</li>
            <li>扫码次数：{this.props.scanNum || 0}</li>
            <li>创建订单：{this.props.createOrder || 0}</li>
            <li>成功订单：{this.props.successOrder || 0}</li>
            <li>退款订单：{this.props.refundOrder || 0}</li>
          </ul>
        </div>
        <Title location={this.props.location} />
        {this._renderList()}
        {this.state.showTimes ? <Select
          multiple
          options={BdDataTimes}
          onChose={this._choseTimes.bind(this)}
          selectedValue={this.props.location.query.timeString && this.props.location.query.timeString.split(',') || ['']}
          onClose={this._closeTimes.bind(this)} /> : null}
        {this.state.showDistrict ? <Select
          options={this.props.districts}
          onChose={this._choseDistrict.bind(this)}
          selectedValue={parseInt(this.props.location.query.districtCode)}
          onClose={this._closeDistrict.bind(this)} /> : null}
        {this.state.showMember ? <Select
          options={this.props.members}
          onChose={this._choseMember.bind(this)}
          selectedValue={parseInt(this.props.location.query.memberId)}
          onClose={this._closeMember.bind(this)} /> : null}
        {this.state.showShopType ? <SelectShopType
          options={this.props.typeAndSubType}
          onChose={this._choseShopType.bind(this)}
          shopType={{id: parseInt(this.props.location.query.shopType), name: null}}
          shopSubType={{id: parseInt(this.props.location.query.shopSubType), name: this.props.location.query.shopSubTypeName}}
          onClose={this._closeShopType.bind(this)} /> : null}
      </div>
    )
  }
  _renderOption () {
    switch (this.props.location.query.role) {
      case 'agentSellerManager':
      case 'ceo':
        return this.props.bdMembersInCity && this.props.typeAndSubType
          ? <div className='multi-chose agent-seller-manager clearfix'>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseTimes.bind(this)}>
                {limitFontSize(this.props.location.query.timeStringName, 3, true)}
                {this.state.showTimes ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
            <div className='float'>
              <DoubleSelect
                onChoseLeft={this._choseLeft.bind(this)}
                onChoseRight={this._choseRight.bind(this)}
                location={this.props.location}
                leftChoseKey={this.props.location.query.cityName}
                leftChoseValue={this.props.location.query.cityCode}
                rightChoseKey={this.props.location.query.memberName}
                rightChoseValue={this.props.location.query.memberId}
                list={this.props.bdMembersInCity} />
            </div>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseShopType.bind(this)}>
                {limitFontSize(this.props.location.query.shopSubTypeName, 3, true)}
                {this.state.showShopType ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
          </div>
          : null
      case 'agentSeller':
        return this.props.typeAndSubType && this.props.districts
          ? <div className='multi-chose agent-seller clearfix'>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseTimes.bind(this)}>
                {limitFontSize(this.props.location.query.timeStringName, 3, true)}
                {this.state.showTimes ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseDistrict.bind(this)}>
                {limitFontSize(this.props.location.query.districtName, 3, true)}
                {this.state.showDistrict ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseShopType.bind(this)}>
                {limitFontSize(this.props.location.query.shopSubTypeName, 3, true)}
                {this.state.showShopType ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
          </div>
          : null
    }
  }
  _renderList () {
    if (this.props.list && this.props.list.length === 0) {
      return <Notfound>暂无订单</Notfound>
    }
    return (
      <Pagination complete={this.props.complete} paging={this.props.paging} location={this.props.location} onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
        {
        this.props.list && this.props.list.map((item, i) => {
          return <Cell key={i} index={i} {...item} triggerChangeOpenStatus={this.props.actions.triggerTodaySuccessOrderChangeOpenStatus} />
        })
      }
      </Pagination>
    )
  }
  _choseLeft (value, option) {
    router.replace({pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        cityName: option.key,
        cityCode: option.value,
        memberName: this.props.bdMembersInCity.members[value][0].key,
        memberId: this.props.bdMembersInCity.members[value][0].value})})
  }
  _choseRight (value, option) {
    router.replace({pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        memberName: option.key,
        memberId: option.value})})
  }
  _bindChoseShopType () {
    this.setState({
      showShopType: true
    })
  }
  _choseShopType (shopType, shopSubType) {
    this._closeShopType()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        shopSubType: shopSubType && shopSubType.id,
        shopSubTypeName: shopSubType && shopSubType.name,
        shopType: shopType && shopType.id
      })
    })
  }
  _closeShopType () {
    this.setState({
      showShopType: false
    })
  }
  _bindChoseDistrict () {
    this.setState({
      showDistrict: true
    })
  }
  _choseDistrict (value, option) {
    this._closeDistrict()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        districtCode: option.value,
        districtName: option.key
      })
    })
  }
  _closeDistrict () {
    this.setState({
      showDistrict: false
    })
  }
  _bindChoseMember () {
    this.setState({
      showMember: true
    })
  }
  _choseMember (value, option) {
    this._closeMember()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        memberId: option.value,
        memberName: option.key
      })
    })
  }
  _closeMember () {
    this.setState({
      showMember: false
    })
  }
  _bindChoseTimes () {
    this.setState({
      showTimes: true
    })
  }
  _choseTimes (values) {
    let timeStringName = []
    values.forEach((item) => {
      if (!item) {
        timeStringName.push(BdDataTimes[0].key)
      } else {
        for (let i = 0; i < BdDataTimes.length; i++) {
          if (item === BdDataTimes[i].value) {
            timeStringName.push(BdDataTimes[i].key)
            break
          }
        }
      }
    })
    this._closeTimes()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        timeString: values.join(','),
        timeStringName: timeStringName.join(',')
      })
    })
  }
  _closeTimes () {
    this.setState({
      showTimes: false
    })
  }
  _paging (list) {
    this.props.actions.fetchTodaySuccessOrderList(assign({offset: list.length, pageSize: PAGE_SIZE}, this.props.location.query))
  }
}

class OrderList extends PureComponent {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showShopType: false,
      showTimes: false,
      showOrderStatus: false
    }
  }
  componentDidMount () {
    if (!this.props.orderList && this.props.location.query.orderStatus) {
      this.props.actions.fetchBdMembersInCity()
      this.props.actions.fetchDistrict()
      this.props.actions.fetchShopType()
      this.props.actions.fetchTodaySuccessOrderOrderList(assign({offset: 0, pageSize: PAGE_SIZE}, this.props.location.query))
    }

    if (sessionStorage.getItem(`${this.props.location.pathname}_search`) !== this.props.location.search) {
      !this.props.typeAndSubType && this.props.actions.fetchShopType()
      switch (this.props.location.query.role) {
        case 'agentSellerManager':
        case 'ceo':
          !this.props.bdMembersInCity && this.props.actions.fetchBdMembersInCity()
          if (this.props.bdMembersInCity && this.props.typeAndSubType) {
            if (this.props.location.query.orderStatus) {
              this.props.actions.fetchTodaySuccessOrderOrderList(assign({offset: 0, pageSize: PAGE_SIZE}, this.props.location.query))
            } else {
              router.replace({
                pathname: this.props.location.pathname,
                query: assign(this.props.location.query, {
                  cityCode: '0',
                  cityName: '城市',
                  memberId: '0',
                  memberName: '员工',
                  orderStatus: BdDataOrderStatus[0].value,
                  orderStatusName: BdDataOrderStatus[0].key,
                  timeString: BdDataTimes[0].value,
                  timeStringName: BdDataTimes[0].key
                })
              })
            }
          }
          break
        case 'agentSeller':
          !this.props.districts && this.props.actions.fetchDistrict()
          if (this.props.districts && this.props.typeAndSubType) {
            if (this.props.location.query.orderStatus) {
              this.props.actions.fetchTodaySuccessOrderList(assign({offset: 0, pageSize: PAGE_SIZE}, this.props.location.query))
            } else {
              router.replace({
                pathname: this.props.location.pathname,
                query: assign(this.props.location.query, {
                  orderStatus: BdDataOrderStatus[0].value,
                  orderStatusName: BdDataOrderStatus[0].key,
                  timeString: BdDataTimes[0].value,
                  timeStringName: BdDataTimes[0].key,
                  shopType: '0',
                  shopSubType: '0',
                  shopSubTypeName: '类目'
                })
              })
            }
          }
          break
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    switch (nextProps.location.query.role) {
      case 'agentSellerManager':
      case 'ceo':
        if (nextProps.bdMembersInCity && nextProps.typeAndSubType && !nextProps.location.query.orderStatus) {
          router.replace({
            pathname: nextProps.location.pathname,
            query: assign(nextProps.location.query, {
              cityCode: '0',
              cityName: '城市',
              memberId: '0',
              memberName: '员工',
              orderStatus: BdDataOrderStatus[0].value,
              orderStatusName: BdDataOrderStatus[0].key,
              timeString: BdDataTimes[0].value,
              timeStringName: BdDataTimes[0].key
            })
          })
        }
        break
      case 'agentSeller':
        if (nextProps.districts && nextProps.typeAndSubType && !nextProps.location.query.orderStatus) {
          router.replace({
            pathname: nextProps.location.pathname,
            query: assign(nextProps.location.query, {
              orderStatus: BdDataOrderStatus[0].value,
              orderStatusName: BdDataOrderStatus[0].key,
              timeString: BdDataTimes[0].value,
              timeStringName: BdDataTimes[0].key,
              shopType: '0',
              shopSubType: '0',
              shopSubTypeName: '类目'
            })
          })
        }
        break
    }
    if (!isEqual(this.props.location.query, nextProps.location.query)) {
      this.props.actions.fetchTodaySuccessOrderOrderList(assign({offset: 0, pageSize: PAGE_SIZE}, nextProps.location.query))
    }
    if (nextProps.orderList && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    if (!this.props.location.query.orderStatus) {
      return <Loading />
    }
    switch (this.props.location.query.role) {
      case 'agentSellerManager':
      case 'ceo':
        if (!(this.props.orderList && this.props.bdMembersInCity && this.props.typeAndSubType) && !this.props.error) {
          return <Loading />
        }
        if (!(this.props.orderList && this.props.bdMembersInCity && this.props.typeAndSubType) && this.props.error) {
          return <Error>{this.props.error.message || '未知错误'}</Error>
        }
        break
      case 'agentSeller':
        if (!(this.props.orderList && this.props.districts && this.props.typeAndSubType) && !this.props.error) {
          return <Loading />
        }
        if (!(this.props.orderList && this.props.districts && this.props.typeAndSubType) && this.props.error) {
          return <Error>{this.props.error.message || '未知错误'}</Error>
        }
        break
    }
    return (
      <div>
        {this._renderOption()}
        <div className='total'>
          <p className='total-title'>总体合计：</p>
          <ul className='clearfix'>
            <li>门店数：{this.props.orderShopCount || 0}</li>
            <li>设备数：{this.props.orderDeviceCount || 0}</li>
            <li>成功订单：{this.props.orderSuccessOrder || 0}</li>
          </ul>
        </div>
        <div className='order-list-title clearfix'>
          <span className='th shop-name'>所在<br />门店</span>
          <span className='th create-time'>创建<br />时间</span>
          <span className='th device-no'>设备<br />编号</span>
          <span className='th user-nick'>用户<br />昵称</span>
          <span className='th pay-way'>支付<br />方式</span>
          <span className='th order-status'>订单<br />状态</span>
        </div>
        {this._renderList()}
        {this.state.showTimes ? <Select
          multiple
          options={BdDataTimes}
          onChose={this._choseTimes.bind(this)}
          selectedValue={this.props.location.query.timeString && this.props.location.query.timeString.split(',') || ['']}
          onClose={this._closeTimes.bind(this)} /> : null}
        {this.state.showOrderStatus ? <Select
          options={BdDataOrderStatus}
          onChose={this._choseOrderStatus.bind(this)}
          selectedValue={parseInt(this.props.location.query.orderStatus)}
          onClose={this._closeStatusOrder.bind(this)} /> : null}
      </div>
    )
  }
  _renderOption () {
    switch (this.props.location.query.role) {
      case 'agentSellerManager':
      case 'ceo':
        return this.props.bdMembersInCity && this.props.typeAndSubType
          ? <div className='multi-chose agent-seller-manager-list clearfix'>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseTimes.bind(this)}>
                {limitFontSize(this.props.location.query.timeStringName, 3, true)}
                {this.state.showTimes ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
            <div className='float'>
              <DoubleSelect
                onChoseLeft={this._choseLeft.bind(this)}
                onChoseRight={this._choseRight.bind(this)}
                location={this.props.location}
                leftChoseKey={this.props.location.query.cityName}
                leftChoseValue={this.props.location.query.cityCode}
                rightChoseKey={this.props.location.query.memberName}
                rightChoseValue={this.props.location.query.memberId}
                list={this.props.bdMembersInCity} />
            </div>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseOrderStatus.bind(this)}>
                {limitFontSize(this.props.location.query.orderStatusName, 3, true)}
                {this.state.showOrderStatus ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
          </div>
          : null
      case 'agentSeller':
        return this.props.typeAndSubType && this.props.districts
          ? <div className='multi-chose agent-seller-list clearfix'>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseTimes.bind(this)}>
                {limitFontSize(this.props.location.query.timeStringName, 3, true)}
                {this.state.showTimes ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseOrderStatus.bind(this)}>
                {limitFontSize(this.props.location.query.orderStatusName, 3, true)}
                {this.state.showOrderStatus ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
          </div>
          : null
    }
  }
  _renderList () {
    if (this.props.orderList && this.props.orderList.length === 0) {
      return <Notfound>暂无订单</Notfound>
    }
    return (
      <Pagination complete={this.props.orderComplete} paging={this.props.orderPaging} location={this.props.location} onPaging={() => { this._paging(this.props.orderList) }} data={this.props.orderList} size={PAGE_SIZE}>
        {
        this.props.orderList && this.props.orderList.map((item, i) => {
          return <OrderCell key={i} {...item} />
        })
      }
      </Pagination>
    )
  }
  _choseLeft (value, option) {
    router.replace({pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        cityName: option.key,
        cityCode: option.value,
        memberName: this.props.bdMembersInCity.members[value][0].key,
        memberId: this.props.bdMembersInCity.members[value][0].value})})
  }
  _choseRight (value, option) {
    router.replace({pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        memberName: option.key,
        memberId: option.value})})
  }
  _bindChoseTimes () {
    this.setState({
      showTimes: true
    })
  }
  _choseTimes (values) {
    let timeStringName = []
    values.forEach((item) => {
      if (!item) {
        timeStringName.push(BdDataTimes[0].key)
      } else {
        for (let i = 0; i < BdDataTimes.length; i++) {
          if (item === BdDataTimes[i].value) {
            timeStringName.push(BdDataTimes[i].key)
            break
          }
        }
      }
    })
    this._closeTimes()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        timeString: values.join(','),
        timeStringName: timeStringName.join(',')
      })
    })
  }
  _closeTimes () {
    this.setState({
      showTimes: false
    })
  }
  _bindChoseOrderStatus () {
    this.setState({
      showOrderStatus: true
    })
  }
  _choseOrderStatus (value, option) {
    this._closeStatusOrder()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        orderStatus: option.value,
        orderStatusName: option.key
      })
    })
  }
  _closeStatusOrder () {
    this.setState({
      showOrderStatus: false
    })
  }
  _paging (list) {
    this.props.actions.fetchTodaySuccessOrderOrderList(assign({offset: list.length, pageSize: PAGE_SIZE, orderId: list[list.length - 1].orderId}, this.props.location.query))
  }
}
