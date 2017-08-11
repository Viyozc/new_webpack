import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Search from 'components/common/search'
import Pagination from 'components/common/pagination'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/shop'
import Style from './shopList.less'
import assign from 'lodash/assign'
import { router } from 'utils'
const PAGE_SIZE = 10

class ShopSearchContainer extends Component {
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
    Bridge.setNavTitle('搜索门店')
    if (this.props.location.query.keyword) {
      this.props.actions.fetchSignedShopList({
        offset: 0,
        pageSize: PAGE_SIZE,
        name: this.props.location.query.keyword
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    return (
      <div>
        <div className='notice'>请先确认门店是否已经被签约，避免重复签约</div>
        <Search onClick={this._search.bind(this)} value={this.props.location.query.keyword} placeholder={'搜索门店'} />
        {this.props.location.query.keyword && this.props.list && this.props.list.length > 0 ? <div className='create-shop'>
          <p>+ 该门店还未被签约，新建门店</p>
          <button onClick={() => this._createShop()}>新建门店</button>
        </div> : null}
        {this.props.location.query.keyword ? this._renderList() : null}
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
      return <div className='notfound'>
        <i className='dianfont icon-meiyouneirong' />
        <p>未找到门店？点击新建门店</p>
        <button onClick={() => this._createShop()}>新建门店</button>
      </div>
    }
    return <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
      {
      this.props.list && this.props.list.map((item, i) => {
        return <div className='item' key={i}>
          <div className='avatar' style={{backgroundImage: `url(${item.picUrl})`}} />
          <div className='info'>
            <span className={item.status === 0 ? 'status red' : 'status green'}>{item.status === 0 ? '待安装' : '已安装'}</span>
            <p className='shop-name'>{item.name}</p>
            <p className='address'>{item.address}</p>
            <div className='contract clearfix'>
              <div className='title'>门店联系人：</div>
              <div className='content'>{item.contactName} {item.contactMobile}</div>
            </div>
            <div className='bd clearfix'>
              <div className='title'>BD:</div>
              <div className='content'>{item.sellerName} {item.sellerMobile}</div>
            </div>
          </div>
        </div>
      })
      }
    </Pagination>
  }
  _paging (list) {
    this.props.actions.fetchSignedShopList({
      offset: this.props.list.length,
      pageSize: PAGE_SIZE,
      name: this.props.location.query.keyword
    })
  }
  _search (value) {
    value && this.props.actions.fetchSignedShopList({
      offset: 0,
      pageSize: PAGE_SIZE,
      name: value
    })
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {keyword: value})
    })
  }
  _createShop () {
    Bridge.getAddress({keyword: this.props.location.query.typeName}, (response) => {
      if (response.error) return Toast.show(response.error)
      this.props.actions.selectAddress(response.data)
      router.goBack()
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.shopSearchSigned && state.shopSearchSigned.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopSearchContainer)
