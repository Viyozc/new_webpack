import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import { router } from 'utils'
import * as Bridge from 'utils/bridge'

import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Tabs, { Tab } from 'components/common/tabs'
import UserBar from 'components/home/user'
import Select from 'components/common/select'
import ShopList from 'components/b/home/shopList'
import DeviceCell from 'components/home/deviceCell'
import DeviceFullCell from 'components/home/deviceFullCell'

import { clean } from 'actions/errorMessage'
import * as bActions from 'actions/b'
import * as homeActions from 'actions/home'

import B_STATUS from 'constants/actionTypes/b/myShopTab'
import Style from './index.less'

class HomeContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showSelectDate: false,
      tabIndex: this.props.location.query.activeTab || 1
    }
  }

  componentWillMount () {
    Style.use()
  }

  componentDidMount () {
    Bridge.setNavTitle('我的门店')
    if (this.props.selectDate) {
      if (!this.props.location.query.selectedDate) {
        router.replace({
          pathname: this.props.location.pathname,
          query: assign({}, this.props.location.query, {selectedDate: `${this.props.selectDate[0].year}-${this.props.selectDate[0].month}`})
        })
      } else {
        this.props.actions.fetchMerchantHome({
          year: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[0]) || this.props.selectDate[0].year,
          month: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[1]) || this.props.selectDate[0].month,
          role: this.props.location.query.role
        })
      }
    } else {
      // 获取下拉日期列表
      this.props.actions.fetchDataMonthList()
    }
  }

  render () {
    if (!this.props.data && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (!this.props.selectDate || !this.props.data) {
      return <Loading />
    }
    let formatSelectDate = this.props.selectDate.map((item, i) => {
      return {key: `${item.year}-${item.month}`, value: `${item.year}-${item.month}`}
    })
    let homeData = this.props.data
    // let fc = homeData.role !== 'merchant' ? '¥' + homeData.shareNum : ''

    return (
      <div className='b-home-wap'>
        <div className='b-home'>
          <UserBar
            user={null}
            selectedDate={this.props.location.query.selectedDate}
            showSelectDate={this.state.showSelectDate}
            onChoseDate={this._bindChoseDate.bind(this)} {...this.props} />
          <div className='kpi clearfix'>
            <DeviceFullCell title='门店数' value={homeData.shopNum} />
            <DeviceCell title1='座充数' title2='离线数' value1={homeData.deviceNum} value2={homeData.deviceOfflineNum} />
            <DeviceCell title1='充电宝数' title2='离线数' value1={homeData.boxNum} value2={homeData.boxOfflineNum} />
          </div>
        </div>
        <Tabs>
          {B_STATUS.map((item, i) => {
            return <Tab
              key={i}
              highlight={item.status === parseInt(this.props.location.query.activeTab || B_STATUS[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.name}
            </Tab>
          })}
        </Tabs>
        <ShopList data={homeData} dataType={this.state.tabIndex} actions={this.props.actions}
          bShopEditCommentResult={this.props.bShopEditCommentResult}
          error={this.props.error} />
        {this.state.showSelectDate
          ? <Select
            options={formatSelectDate}
            onChose={this._choseDate.bind(this)}
            selectedValue={this.props.location.query.selectedDate || `${this.props.selectDate[0].year}-${this.props.selectDate[0].month}`}
            onClose={this._closeDate.bind(this)} />
          : null
        }
      </div>
    )
  }

  _bindChoseDate () {
    this.setState({
      showSelectDate: true
    })
  }

  _choseDate (value) {
    this._closeDate()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {selectedDate: value})
    })
  }

  _closeDate () {
    this.setState({
      showSelectDate: false
    })
  }

  _tab (tabIndex) {
    router.replace({
      pathname: '/b',
      query: assign({}, this.props.location.query, {
        activeTab: tabIndex
      })
    })
    this.setState({
      tabIndex
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (this.props.isUnBind === 'request' && nextProps.isUnBind === 'success') {
      Toast.show('解绑成功')
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
    if ((!this.props.selectDate && nextProps.selectDate) || (this.props.location.query.selectedDate !== nextProps.location.query.selectedDate)) {
      if (!nextProps.location.query.selectedDate) {
        router.replace({
          pathname: this.props.location.pathname,
          query: assign({}, this.props.location.query, {selectedDate: `${nextProps.selectDate[0].year}-${nextProps.selectDate[0].month}`})
        })
      } else {
        this.props.actions.fetchMerchantHome({
          year: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[0]) || nextProps.selectDate[0].year,
          month: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[1]) || nextProps.selectDate[0].month,
          role: nextProps.location.query.role
        })
      }
    }
  }

  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    selectDate: state.home && state.home.selectDate,
    data: state.bHome && state.bHome,
    isUnBind: state.isUnBind && state.isUnBind.isUnBind,
    bShopEditCommentResult: state.bShopEditComment && state.bShopEditComment.submitStatus
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(bActions, homeActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
