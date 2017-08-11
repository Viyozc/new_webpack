import React, { Component, PureComponent } from 'react'
import Style from './index.less'
import { router, limitFontSize } from 'utils'
import includes from 'lodash/includes'
import assign from 'lodash/assign'

import Error from 'components/common/error'
import Loading from 'components/common/loading'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import Select from 'components/common/select'
import Cell from 'components/shop/allocate/index/cell'

const PAGE_SIZE = 20;

export default class InsideAllot extends PureComponent {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showDistrict: false,
      showFilter: false,
      selectedShopIds: []
    }
  }
  componentWillMount () {
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }
  componentDidMount () {
  }
  componentWillReceiveProps (nextProps) {
    
  }
  render () {
    if (!(this.props.districtMapList) && !this.props.error) {
      return <Loading />
    }
    if (!(this.props.districtMapList && this.props.sellerMapList) && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    let {sellerMapList, districtMapList} = this.props
    sellerMapList = sellerMapList.map(item => {return {key: item.sellerName,value: item.sellerId}} )
    districtMapList = districtMapList.map(item => {return {key: item.cityName,value: item.cityCode}} )
    return (
      <div className='allocate-container'>
        {
          sellerMapList && districtMapList
          ? <div className='multi-chose clearfix'>
            <div className='float'>
              <button className='select-date' onClick={() => this.setState({showFilter: true})}>
                {this.props.location.query.sellerStatusName || sellerMapList[0].key}
                {this.state.showFilter ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
            <div className='float'>
              <button className='select-date' onClick={() => this.setState({showDistrict: true})}>
                {this.props.location.query.districtName || districtMapList[0].key}
                {this.state.showDistrict ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
          </div>
          : null
        }

        {this._renderList()}

        <div className='bottom clearfix'>
          <div className='left' onClick={this._allChoseShop.bind(this)}>
            {this.props.list && this.state.selectedShopIds.length !== 0 && this.state.selectedShopIds.length === this.props.list.length ? <div className='chose active'><i className='dianfont icon-gou' /></div> : <div className='chose' />}
            全选（{this.props.list && this.props.list.length || 0}）
          </div>
          <div className='right' onClick={this._allcoateTo.bind(this)}>分配小二</div>
        </div>

        {this.state.showDistrict ? <Select
          options={districtMapList}
          onChose={this._choseDistrict.bind(this)}
          selectedValue={this.props.location.query.district || districtMapList[0].value}
          onClose={() => this.setState({showDistrict: false})} /> : null}
        {this.state.showFilter ? <Select
          options={sellerMapList}
          onChose={this._choseSellerStatus.bind(this)}
          selectedValue={this.props.location.query.sellerStatus || sellerMapList[0].value}
          onClose={() => this.setState({showFilter: false})} /> : null}
      </div>
    )
  }
  _allcoateTo () {
    const {selectedShopIds} = this.state
    if (selectedShopIds.length === 0) return Toast.show('请选择门店')
    const item = this.props.list.find(item => item.shopId == selectedShopIds[0]);
    router.push(`/a/replaceBD/chose?shopIds=${selectedShopIds.join(',')}&shopName=${item.shopName}`)
  }
  _choseSellerStatus (value, item) {
    this.setState({
      showFilter: false,
      selectedShopIds: []
    })
    router.replace({pathname: this.props.location.pathname, query: assign({}, this.props.location.query, {sellerStatus: value, sellerStatusName: item.key})})
    window.location.reload()
  }
  _choseDistrict (value, item) {
    this.setState({
      showDistrict: false,
      selectedShopIds: []
    })
    router.replace({
      pathname: this.props.location.pathname, 
      query: assign({}, this.props.location.query, {district: item.value, districtName: item.key})
    })
    window.location.reload()
  }
  _renderList () {
    if (!this.props.list && !this.props.error) {
      return <Loading />
    }
    if (!this.props.list && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.list.length === 0) {
      return <Notfound>暂无门店</Notfound>
    }
    const list = this.props.list && this.props.list.map((item, i) => {
      return <Cell 
        key={i} {...item} 
        selectedShopIds={this.state.selectedShopIds} 
        onChoseShop={this._choseShop.bind(this)} />
    })
    
    return (
      <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
        {
          list
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
  }
}
