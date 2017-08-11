import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Style from './list.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/dc'
import assign from 'lodash/assign'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import * as Bridge from 'utils/bridge'
import Tab from 'components/dc/tab'
import ShopData, { ShopDataHead } from 'components/dc/shopData'
import OrderData, { OrderDataHead } from 'components/dc/orderData'
import UserData, { UserDataHead } from 'components/dc/userData'
import DeviceUseRateData, { DeviceUseRateDataHead } from 'components/dc/deviceUseRateData'
import DeviceData, { DeviceDataHead } from 'components/dc/deviceData'
import { CATGORY_STATUS } from 'constants/dc'
import Pagination from 'components/common/pagination'
const PAGE_SIZE = 20

class ListContainer extends Component {
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
    this.props.actions.cleanList()
  }
  componentDidMount () {
    this.props.actions.fetchCity()
    this._fetchData(this.props, assign({}, this.props.location.query, {offset: 0, pageSize: PAGE_SIZE}))
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.location.query !== nextProps.location.query) {
      this._fetchData(nextProps, assign({}, nextProps.location.query, {offset: 0, pageSize: PAGE_SIZE}))
    }
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    if (!this.props.list && !this.props.error) {
      return <Loading />
    }
    if (!this.props.list && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div>
        <Tab {...this.props} />
        {this._renderList()}
      </div>
    )
  }
  _renderList () {
    if (this.props.list && this.props.list.length === 0) {
      return <Notfound>{'暂无数据'}</Notfound>
    }
    switch (parseInt(this.props.location.query.status || 0)) {
      case CATGORY_STATUS[1].status:
        return <div className='table'>
          <OrderDataHead />
          <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
            {
            this.props.list && this.props.list.map((item, i) => {
              return <OrderData key={i} {...item} />
            })
          }
          </Pagination>
        </div>
      case CATGORY_STATUS[2].status:
        return <div className='table'>
          <UserDataHead />
          <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
            {
            this.props.list && this.props.list.map((item, i) => {
              return <UserData key={i} {...item} />
            })
          }
          </Pagination>
        </div>
      case CATGORY_STATUS[3].status:
        return <div className='table'>
          <DeviceUseRateDataHead />
          <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
            {
            this.props.list && this.props.list.map((item, i) => {
              return <DeviceUseRateData key={i} {...item} />
            })
          }
          </Pagination>
        </div>
      case CATGORY_STATUS[4].status:
        return <div className='table'>
          <DeviceDataHead />
          <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
            {
            this.props.list && this.props.list.map((item, i) => {
              return <DeviceData key={i} {...item} />
            })
          }
          </Pagination>
        </div>
      default :
        return <div className='table'>
          <ShopDataHead />
          <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
            {
            this.props.list && this.props.list.map((item, i) => {
              return <ShopData key={i} {...item} />
            })
          }
          </Pagination>
        </div>
    }
  }
  _paging (list) {
    this._fetchData(this.props, assign({}, this.props.location.query, {offset: list.length, pageSize: PAGE_SIZE}))
  }
  _fetchData (props, query) {
    query.cityCode = query.cityCode && query.cityCode.split(',')
    query.isKa = query.isKa && query.isKa.split(',')
    switch (parseInt(props.location.query.status || 0)) {
      case CATGORY_STATUS[1].status:
        Bridge.setNavTitle(CATGORY_STATUS[1].name)
        props.actions.fetchDcOrderList(query)
        break
      case CATGORY_STATUS[2].status:
        Bridge.setNavTitle(CATGORY_STATUS[2].name)
        props.actions.fetchDcUserList(query)
        break
      case CATGORY_STATUS[3].status:
        Bridge.setNavTitle(CATGORY_STATUS[3].name)
        props.actions.fetchDcDeviceUseRateList(query)
        break
      case CATGORY_STATUS[4].status:
        Bridge.setNavTitle(CATGORY_STATUS[4].name)
        props.actions.fetchDcDeviceList(query)
        break
      default :
        Bridge.setNavTitle(CATGORY_STATUS[0].name)
        props.actions.fetchDcShopList(query)
    }
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.dc && state.dc.list,
    city: state.dc && state.dc.city
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
