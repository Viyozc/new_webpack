import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import Select from 'components/common/select'
import Style from './index.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/shop/allocate'
import * as sessionStorage from 'utils/sessionStorage'
import * as commonActions from 'actions/common'
import assign from 'lodash/assign'
import includes from 'lodash/includes'
import { router, limitFontSize } from 'utils'
import Cell from 'components/shop/allocate/index/cell'
import Allot from 'components/shop/allocate/index/allot'
import Search from 'components/common/search'
import Tabs, { Tab } from 'components/common/tabs'
import {allotTypeTabConfig} from 'constants/bd'
import SelectShopType from 'components/common/selectShopType'
const PAGE_SIZE = 20

class TodayNewInstallDeviceContainer extends Component {
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
    sessionStorage.setItem(`${this.props.location.pathname}_search`, this.props.location.search)
  }
  componentDidMount () {
    Bridge.setNavTitle('待分配小二门店')
    if (!this.props.location.query.tabStatus) {
      router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          tabStatus: allotTypeTabConfig[0].status
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
          {allotTypeTabConfig.map((item, i) => {
            return <Tab
              key={item.status}
              highlight={item.status === parseInt(this.props.location.query.tabStatus)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.label}
            </Tab>
          })}
        </Tabs>
        {this.props.location.query.tabStatus === `${allotTypeTabConfig[0].status}` ? <ChannelAllot {...this.props} /> : <InsideAllot {...this.props} />}
      </div>
    )
  }
  _tab (status) {
    if (status === Number(this.props.location.query.tabStatus)) {
      return
    } else {
      router.replace({pathname: location.pathname, query: {tabStatus: status}})
    }
  }
  _search (value) {
    router.push('/shop/search?keyword=' + value)
  }
}

function mapStateToProps (state, ownProps) {
  let typeAndSubType = state.common && state.common.typeAndSubType
  if (typeAndSubType && typeAndSubType.type[0].id !== 0) {
    typeAndSubType.type.unshift({id: 0, name: '类目'})
    // typeAndSubType.subType = assign({0: [{id: 0, name: '类目'}]}, typeAndSubType.subType)
  }
  return {
    typeAndSubType,
    error: state.errorMessage,
    list: state.shopAllocateIndexPage && state.shopAllocateIndexPage.list,
    districts: state.shopAllocateIndexPage && state.shopAllocateIndexPage.districts,
    sellerStatus: state.shopAllocateIndexPage && state.shopAllocateIndexPage.sellerStatus,
    fetchRequest: state.shopAllocateIndexPage && state.shopAllocateIndexPage.fetchRequest
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

class InsideAllot extends PureComponent {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showDistrict: false,
      showFilter: false,
      selectedShopIds: []
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
    this.props.actions.fetchIndexTabOption()
    if (this.props.location.query.sellerStatus && this.props.location.query.district) {
      this.props.actions.fetchIndexList({
        offset: 0,
        pageSize: PAGE_SIZE,
        district: this.props.location.query.district,
        sellerStatus: this.props.location.query.sellerStatus
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!this.props.districts &&
     nextProps.districts &&
     nextProps.sellerStatus &&
     !nextProps.location.query.sellerStatus &&
     !nextProps.location.query.district) {
      router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          sellerStatus: nextProps.location.query.sellerStatusName && nextProps.location.query.sellerStatus || nextProps.sellerStatus[0].id,
          sellerStatusName: nextProps.location.query.sellerStatusName || nextProps.sellerStatus[0].name,
          district: nextProps.location.query.districtName && nextProps.location.query.district || nextProps.districts[0],
          districtName: nextProps.location.query.districtName || nextProps.districts[0]
        })
      })
    }
    if (this.props.location.query !== nextProps.location.query) {
      this.props.actions.fetchIndexList({
        offset: 0,
        pageSize: PAGE_SIZE,
        district: nextProps.location.query.district,
        sellerStatus: nextProps.location.query.sellerStatus
      })
    }
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    if (!(this.props.districts) && !this.props.error) {
      return <Loading />
    }
    if (!(this.props.districts && this.props.sellerStatus) && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    let districts = this.props.districts.map((item, i) => {
      return {key: item, value: item}
    })
    let sellerStatus = this.props.sellerStatus.map((item, i) => {
      return {key: item.name, value: item.id + ''}
    })
    return (
      <div className='allocate-container'>
        {this.props.sellerStatus && this.props.districts
          ? <div className='multi-chose clearfix'>
            <div className='float'>
              <button className='select-date' onClick={() => this.setState({showDistrict: true})}>
                {this.props.location.query.districtName || districts[0].key}
                {this.state.showDistrict ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
            <div className='float'>
              <button className='select-date' onClick={() => this.setState({showFilter: true})}>
                {this.props.location.query.sellerStatusName || sellerStatus[0].key}
                {this.state.showFilter ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
          </div>
          : null}
        {this._renderList()}
        <div className='bottom clearfix'>
          <div className='left' onClick={this._allChoseShop.bind(this)}>
            {this.props.list && this.state.selectedShopIds.length !== 0 && this.state.selectedShopIds.length === this.props.list.length ? <div className='chose active'><i className='dianfont icon-gou' /></div> : <div className='chose' />}
            全选（{this.props.list && this.props.list.length || 0}）
          </div>
          <div className='right' onClick={this._allcoateTo.bind(this)}>分配小二</div>
        </div>
        {this.state.showDistrict ? <Select
          options={districts}
          onChose={this._choseDistrict.bind(this)}
          selectedValue={this.props.location.query.district || districts[0].value}
          onClose={() => this.setState({showDistrict: false})} /> : null}
        {this.state.showFilter ? <Select
          options={sellerStatus}
          onChose={this._choseSellerStatus.bind(this)}
          selectedValue={this.props.location.query.sellerStatus || sellerStatus[0].value}
          onClose={() => this.setState({showFilter: false})} /> : null}
      </div>
          )
  }
  _allcoateTo () {
    if (this.state.selectedShopIds.length === 0) return Toast.show('请选择门店')
    router.push(`/shop/allocate/chose?shopIds=${this.state.selectedShopIds.join(',')}`)
  }
  _choseSellerStatus (value, item) {
    this.setState({
      showFilter: false,
      selectedShopIds: []
    })
    router.replace({pathname: this.props.location.pathname, query: assign({}, this.props.location.query, {sellerStatus: value, sellerStatusName: item.key})})
  }
  _choseDistrict (value, item) {
    this.setState({
      showDistrict: false,
      selectedShopIds: []
    })
    router.replace({pathname: this.props.location.pathname, query: assign({}, this.props.location.query, {district: item.value, districtName: item.key})})
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
         return <Cell key={i} {...item} selectedShopIds={this.state.selectedShopIds} onChoseShop={this._choseShop.bind(this)} />
       })
     }
      </Pagination>
   )
  }
  _allChoseShop () {
    let selectedShopIds = []
    if (this.props.list && this.props.list.length !== this.state.selectedShopIds.length) {
      this.props.list && this.props.list.map((item, i) => {
        selectedShopIds.push(item.shopId)
      })
    }
    this.setState({
      selectedShopIds
    })
  }
  _choseShop (shopId) {
    let selectedShopIds = [].concat(this.state.selectedShopIds || [])
    if (includes(this.state.selectedShopIds, shopId)) {
      selectedShopIds.splice(this.state.selectedShopIds.indexOf(shopId), 1)
    } else {
      selectedShopIds.push(shopId)
    }
    this.setState({
      selectedShopIds
    })
  }
  _paging (list) {
    this.props.actions.fetchIndexList({
      offset: this.props.list.length,
      pageSize: PAGE_SIZE,
      district: this.props.location.query.district,
      sellerStatus: this.props.location.query.sellerStatus
    })
  }
}

class ChannelAllot extends PureComponent {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showDistrict: false,
      showShopType: false,
      showOrderStatus: false,
      selectedShopIds: []
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
    this.props.actions.fetchIndexTabOption()
    this.props.actions.fetchShopType()
    if (this.props.location.query.shopSubType && this.props.location.query.district && this.props.location.query.shopType) {
      this.props.actions.fetchAllotList({
        offset: 0,
        pageSize: PAGE_SIZE,
        district: this.props.location.query.district,
        subType: this.props.location.query.shopSubType,
        type: this.props.location.query.shopType
      })
    } else {
      router.replace({
        pathname: this.props.location.pathname,
        query: assign(this.props.location.query, {
          shopType: '0',
          shopSubType: '0',
          shopSubTypeName: '类目',
          district: '全部'
        })
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!this.props.districts &&
     nextProps.districts && !nextProps.location.query.district) {
      router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          district: nextProps.location.query.district && nextProps.location.query.district || nextProps.districts[0]
        })
      })
    }
    if (this.props.location.query !== nextProps.location.query) {
      this.props.actions.fetchAllotList({
        offset: 0,
        pageSize: PAGE_SIZE,
        district: nextProps.location.query.district,
        subType: nextProps.location.query.shopSubType,
        type: nextProps.location.query.shopType
      })
    }
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    if (!(this.props.typeAndSubType && this.props.districts && this.props.location.query.shopSubType) && !this.props.error) {
      return <Loading />
    }
    let districts = this.props.districts && this.props.districts.map((item, i) => {
      return {key: item, value: item}
    })
    return (
      <div className='channel-container' style={{paddingBottom: 50}}>
        <div className='multi-chose clearfix'>
          <div className='float'>
            <button className='select-date' onClick={() => this.setState({showDistrict: true})}>
              {this.props.location.query.district || districts[0].key}
              {this.state.showDistrict ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
            </button>
          </div>
          <div className='float'>
            <button className='shop-type' onClick={() => this.setState({showShopType: true})}>
              {limitFontSize(this.props.location.query.shopSubTypeName, 3, true)}
              {this.state.showShopType ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
            </button>
          </div>
        </div>
        {this._renderList()}
        <div className='bottom clearfix'>
          <div className='left' onClick={this._allChoseShop.bind(this)}>
            {this.props.list && this.state.selectedShopIds.length !== 0 && this.state.selectedShopIds.length === this.props.list.length ? <div className='chose active'><i className='dianfont icon-gou' /></div> : <div className='chose' />}
            全选（{this.props.list && this.props.list.length || 0}）
          </div>
          <div className='right' onClick={this._allcoateTo.bind(this)}>分配小二</div>
        </div>
        {this.state.showDistrict ? <Select
          options={districts}
          onChose={this._choseDistrict.bind(this)}
          selectedValue={this.props.location.query.district || districts[0].value}
          onClose={() => this.setState({showDistrict: false})} /> : null}
        {this.state.showShopType ? <SelectShopType
          options={this.props.typeAndSubType}
          onChose={this._choseShopType.bind(this)}
          shopType={{id: parseInt(this.props.location.query.shopType), name: null}}
          shopSubType={{id: parseInt(this.props.location.query.shopSubType), name: this.props.location.query.shopSubTypeName}}
          onClose={this._closeShopType.bind(this)} /> : null}
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
      return <Notfound>暂无门店</Notfound>
    }
    return (
      <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
        {
       this.props.list && this.props.list.map((item, i) => {
         return <Allot key={i} {...item} selectedShopIds={this.state.selectedShopIds} onChoseShop={this._choseShop.bind(this)} />
       })
     }
      </Pagination>
   )
  }
  _allcoateTo () {
    if (this.state.selectedShopIds.length === 0) return Toast.show('请选择门店')
    router.push(`/shop/allocate/chose?shopIds=${this.state.selectedShopIds.join(',')}`)
  }
  _allChoseShop () {
    let selectedShopIds = []
    if (this.props.list && this.props.list.length !== this.state.selectedShopIds.length) {
      this.props.list && this.props.list.map((item, i) => {
        selectedShopIds.push(item.shopId)
      })
    }
    this.setState({
      selectedShopIds
    })
  }
  _choseShop (shopId) {
    let selectedShopIds = [].concat(this.state.selectedShopIds || [])
    if (includes(this.state.selectedShopIds, shopId)) {
      selectedShopIds.splice(this.state.selectedShopIds.indexOf(shopId), 1)
    } else {
      selectedShopIds.push(shopId)
    }
    this.setState({
      selectedShopIds
    })
  }
  _paging (list) {
    this.props.actions.fetchAllotList({
      offset: this.props.list.length,
      pageSize: PAGE_SIZE,
      district: this.props.location.query.district,
      subType: this.props.location.query.shopSubType,
      type: this.props.location.query.shopType
    })
  }
  _closeShopType () {
    this.setState({
      showShopType: false
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
  _choseDistrict (value, item) {
    this.setState({
      showDistrict: false,
      selectedShopIds: []
    })
    router.replace({pathname: this.props.location.pathname, query: assign({}, this.props.location.query, {district: item.value})})
  }
}
