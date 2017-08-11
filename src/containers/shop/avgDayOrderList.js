import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Style from './avgDayOrderList.less'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import DoubleSelect from 'components/common/doubleSelect'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/shop/avgDayOrderList'
import * as commonActions from 'actions/common'
import assign from 'lodash/assign'
import { router } from 'utils'
import Search from 'components/common/search'

class AvgDayOrderListContainer extends Component {
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
    Bridge.setNavTitle('本月设备日均订单数')
    if (this.props.location.query.rightChoseValue) {
      this.props.actions.fetchDataSellerShopAvgDayOrderList({
        memberId: this.props.location.query.rightChoseValue,
        managerId: this.props.location.query.managerId,
        cityCode: this.props.location.query.leftChoseValue,
        year: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[0]) || this.props.selectDate[0].year,
        month: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[1]) || this.props.selectDate[0].month
      })
    }
    this.props.actions.fetchBdMembersInCity()
  }
  componentWillReceiveProps (nextProps) {
    if (!this.props.bdMembersInCity && nextProps.bdMembersInCity && !nextProps.location.query.rightChoseValue) {
      if (nextProps.bdMembersInCity.cities && nextProps.bdMembersInCity.members) {
        router.replace({pathname: nextProps.location.pathname,
          query: assign({}, nextProps.location.query, {
            leftChoseKey: nextProps.bdMembersInCity.cities[0].key,
            leftChoseValue: nextProps.bdMembersInCity.cities[0].value,
            rightChoseKey: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].key,
            rightChoseValue: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].value,
            year: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[0]) || nextProps.selectDate[0].year,
            month: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[1]) || nextProps.selectDate[0].month})})
      } else {
        this.props.actions.fetchDataSellerShopAvgDayOrderList({
          year: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[0]) || nextProps.selectDate[0].year,
          month: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[1]) || nextProps.selectDate[0].month
        })
      }
    }

    if (this.props.location.query.leftChoseValue !== nextProps.location.query.leftChoseValue ||
      this.props.location.query.rightChoseValue !== nextProps.location.query.rightChoseValue) {
      this.props.actions.fetchDataSellerShopAvgDayOrderList({
        memberId: nextProps.location.query.rightChoseValue,
        managerId: nextProps.location.query.managerId,
        cityCode: nextProps.location.query.leftChoseValue,
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
      <div>
        <Search onClick={this._search.bind(this)} placeholder={'搜索门店'} />
        {this.props.bdMembersInCity && this.props.bdMembersInCity.cities && this.props.bdMembersInCity.members
          ? <DoubleSelect
            location={this.props.location}
            leftChoseKey={this.props.location.query.leftChoseKey}
            leftChoseValue={this.props.location.query.leftChoseValue}
            rightChoseKey={this.props.location.query.rightChoseKey}
            rightChoseValue={this.props.location.query.rightChoseValue}
            list={this.props.bdMembersInCity} />
          : null}
        <div className='total-num'>
          <div className='num'><span>{this.props.averageDay}</span></div>
          <p>本月设备日均订单数</p>
          <p>KPI达标指数(<span className='kpi'>>0.67</span>)</p>
        </div>
        <div className='title clearfix'>
          <div>日期</div>
          <div>安装总设备数</div>
          <div>当日成功订单数</div>
          <div>设备日均订单数</div>
        </div>
        {this.props.list.map((item, i) => {
          return <div key={i} className='tr clearfix' >
            <div >{item.date}</div>
            <div>{item.deviceNum}</div>
            <div>{item.orderNum}</div>
            <div>{item.averageDayNum}</div>
          </div>
        })}
      </div>
    )
  }
  _search (value) {
    router.push('/shop/search?keyword=' + value)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    bdMembersInCity: state.common && state.common.bdMembersInCity,
    list: state.shopAvgDayOrderList && state.shopAvgDayOrderList.list,
    averageDay: state.shopAvgDayOrderList && state.shopAvgDayOrderList.averageDay
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvgDayOrderListContainer)
