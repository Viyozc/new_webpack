import React, { Component } from 'react'
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
import * as actions from 'actions/channel/data'
import * as commonActions from 'actions/common'
import Tabs, { Tab } from 'components/common/tabs'
import assign from 'lodash/assign'
import isEqual from 'lodash/isEqual'
import { Title, Cell } from 'components/channel/data/todayCell'
import { router, limitFontSize } from 'utils'
import Search from 'components/common/search'
import * as sessionStorage from 'utils/sessionStorage'
import { DataTabConfig, DataOrderConfig, DataSortType } from 'constants/channel'
const PAGE_SIZE = 10

class TodaySuccessOrderContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showShopType: false,
      showDistrict: false,
      showMember: false
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
    Bridge.setNavTitle('今日成功订单数')

    if (!this.props.list && this.props.location.query.shopSubType) {
      this.props.actions.fetchBdMembersInCity()
      this.props.actions.fetchDistrict()
      this.props.actions.fetchShopType()
      this.props.actions.fetchTodaySuccessOrderList(assign({offset: 0, pageSize: PAGE_SIZE}, this.props.location.query))
    }

    if (sessionStorage.getItem(`${this.props.location.pathname}_search`) !== this.props.location.search) {
      !this.props.typeAndSubType && this.props.actions.fetchShopType()
      switch (this.props.location.query.role) {
        case 'channelManager':
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
                  memberName: this.props.location.query.role === 'agentSellerManager' ? '员工' : '代理商',
                  shopType: '0',
                  shopSubType: '0',
                  shopSubTypeName: '类目'
                })
              })
            }
          }
          break
        case 'agencyBoss':
          !this.props.members && this.props.actions.fetchBdMembersInCity()
          !this.props.districts && this.props.actions.fetchDistrict()
          if (this.props.members && this.props.districts && this.props.typeAndSubType) {
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
                  memberId: '0',
                  memberName: '员工',
                  shopType: '0',
                  shopSubType: '0',
                  shopSubTypeName: '类目'
                })
              })
            }
          }
          break
        case 'agencyBD':
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
      case 'channelManager':
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
              memberName: nextProps.location.query.role === 'agentSellerManager' ? '员工' : '代理商',
              shopType: '0',
              shopSubType: '0',
              shopSubTypeName: '类目'
            })
          })
        }
        break
      case 'agencyBoss':
        if (nextProps.members && nextProps.districts && nextProps.typeAndSubType && !nextProps.location.query.shopSubType) {
          router.replace({
            pathname: nextProps.location.pathname,
            query: assign(nextProps.location.query, {
              deviceStatus: DataTabConfig[0].status,
              dataSortField: DataOrderConfig[0].key,
              sortType: DataSortType[0],
              districtCode: '0',
              districtName: '区域',
              memberId: '0',
              memberName: '员工',
              shopType: '0',
              shopSubType: '0',
              shopSubTypeName: '类目'
            })
          })
        }
        break
      case 'agencyBD':
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
              shopSubTypeName: '类目'
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
      case 'channelManager':
        if (!(this.props.list && this.props.bdMembersInCity && this.props.typeAndSubType) && !this.props.error) {
          return <Loading />
        }
        if (!(this.props.list && this.props.bdMembersInCity && this.props.typeAndSubType) && this.props.error) {
          return <Error>{this.props.error.message || '未知错误'}</Error>
        }
        break
      case 'agencyBoss':
        if (!(this.props.list && this.props.districts && this.props.members && this.props.typeAndSubType) && !this.props.error) {
          return <Loading />
        }
        if (!(this.props.list && this.props.districts && this.props.members && this.props.typeAndSubType) && this.props.error) {
          return <Error>{this.props.error.message || '未知错误'}</Error>
        }
        break
      case 'agencyBD':
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
        <Search onClick={this._search.bind(this)} placeholder={'搜索门店'} />
        {this._renderOption()}
        <Tabs>
          {DataTabConfig.map((item, i) => {
            return <Tab
              key={item.status}
              highlight={item.status === parseInt(this.props.location.query.deviceStatus)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.label}
            </Tab>
          })}
        </Tabs>
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
        {this.state.showShopType ? <SelectShopType
          options={this.props.typeAndSubType}
          onChose={this._choseShopType.bind(this)}
          shopType={{id: parseInt(this.props.location.query.shopType), name: null}}
          shopSubType={{id: parseInt(this.props.location.query.shopSubType), name: this.props.location.query.shopSubTypeName}}
          onClose={this._closeShopType.bind(this)} /> : null}
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
      </div>
    )
  }
  _renderOption () {
    switch (this.props.location.query.role) {
      case 'channelManager':
        return this.props.bdMembersInCity && this.props.typeAndSubType
          ? <div className='multi-chose channel-manager clearfix'>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseShopType.bind(this)}>
                {limitFontSize(this.props.location.query.shopSubTypeName, 3, true)}
                {this.state.showShopType ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
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
          </div>
          : null
      case 'agencyBoss':
        return this.props.members && this.props.typeAndSubType && this.props.districts
          ? <div className='multi-chose agency-boss clearfix'>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseShopType.bind(this)}>
                {limitFontSize(this.props.location.query.shopSubTypeName, 3, true)}
                {this.state.showShopType ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseDistrict.bind(this)}>
                {limitFontSize(this.props.location.query.districtName, 3, true)}
                {this.state.showDistrict ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseMember.bind(this)}>
                {limitFontSize(this.props.location.query.memberName, 3, true)}
                {this.state.showMember ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
          </div>
          : null
      case 'agencyBD':
        return this.props.typeAndSubType && this.props.districts
          ? <div className='multi-chose agency-bd clearfix'>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseShopType.bind(this)}>
                {limitFontSize(this.props.location.query.shopSubTypeName, 3, true)}
                {this.state.showShopType ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
            <div className='float'>
              <button className='shop-type' onClick={this._bindChoseDistrict.bind(this)}>
                {limitFontSize(this.props.location.query.districtName, 3, true)}
                {this.state.showDistrict ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
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
  _paging (list) {
    this.props.actions.fetchTodaySuccessOrderList(assign({offset: list.length, pageSize: PAGE_SIZE}, this.props.location.query))
  }
  _tab (status) {
    router.replace({pathname: location.pathname, query: assign(this.props.location.query, {deviceStatus: status})})
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
    case 'channelManager':
      if (state.common && state.common.bdMembersInCity) {
        bdMembersInCity = assign({}, state.common.bdMembersInCity)
        for (let key in bdMembersInCity.members) {
          bdMembersInCity.members[key][0].key = '代理商'
        }
      }
      break
    case 'agencyBoss':
      if (state.common && state.common.district) {
        districts = state.common.district.map((item, i) => { return {key: item.districtName, value: item.districtCode} })
        districts[0].key = '区域'
      }
      if (state.common && state.common.bdMembersInCity) {
        members = [{key: '员工', value: 0}]
        for (let key in state.common.bdMembersInCity.members) {
          for (let i = 1; i < state.common.bdMembersInCity.members[key].length; i++) {
            members.push({key: state.common.bdMembersInCity.members[key][i].key, value: state.common.bdMembersInCity.members[key][i].value})
          }
        }
      }
      break
    case 'agencyBD':
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
    list: state.channelDataTodaySuccessOrderPage && state.channelDataTodaySuccessOrderPage.list,
    complete: state.channelDataTodaySuccessOrderPage && state.channelDataTodaySuccessOrderPage.complete,
    paging: state.channelDataTodaySuccessOrderPage && state.channelDataTodaySuccessOrderPage.paging,
    deviceCount: state.channelDataTodaySuccessOrderPage && state.channelDataTodaySuccessOrderPage.deviceCount,
    shopCount: state.channelDataTodaySuccessOrderPage && state.channelDataTodaySuccessOrderPage.shopCount,
    successOrder: state.channelDataTodaySuccessOrderPage && state.channelDataTodaySuccessOrderPage.successOrder,
    createOrder: state.channelDataTodaySuccessOrderPage && state.channelDataTodaySuccessOrderPage.createOrder,
    refundOrder: state.channelDataTodaySuccessOrderPage && state.channelDataTodaySuccessOrderPage.refundOrder,
    scanNum: state.channelDataTodaySuccessOrderPage && state.channelDataTodaySuccessOrderPage.scanNum
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodaySuccessOrderContainer)
