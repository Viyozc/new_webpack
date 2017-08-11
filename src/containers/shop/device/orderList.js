import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import Style from './orderList.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/shop/device/orderList'
import assign from 'lodash/assign'
import OrderCell from 'components/shop/device/orderCell'
const PAGE_SIZE = 20

class OrderListContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {}
  }

  componentWillMount () {
    Style.use()
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }

  componentDidMount () {
    Bridge.setNavTitle(this.props.location.query.shopName || '订单列表')
    this.props.actions.fetchDataSellerShopOrder({
      deviceNo: this.props.location.query.deviceNo,
      pageSize: PAGE_SIZE,
      offset: 0
    })
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
        <div className='order-num'>{this.props.location.query.deviceNo}</div>
        <div className='title clearfix'>
          <div>下单时间</div>
          <div>金额</div>
          <div>交易状态</div>
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
      return <Notfound>暂无订单</Notfound>
    }
    return (
      <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
        {
          this.props.list.map((item, i) => {
            return <OrderCell key={i} {...item} />
          })
        }
      </Pagination>
    )
  }

  _paging (list) {
    this.props.actions.fetchDataSellerShopOrder({
      deviceNo: this.props.location.query.deviceNo,
      pageSize: PAGE_SIZE,
      offset: this.props.list.length
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.shopDeviceOrderList && state.shopDeviceOrderList.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListContainer)
