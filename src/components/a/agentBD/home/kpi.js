import React, { Component } from 'react'
import { Link } from 'components/link'
import DeviceCell from 'components/home/deviceCell'
import Time from 'utils/time'
import { params } from 'utils'

export default class KPI extends Component {
  componentWillMount () {
  }

  render () {
    if (!this.props.user || !this.props.data) return null
    let kpiOptions = this._options(this.props.user, this.props.data, this.props.selectedDate)
    return (
      <div>{kpiOptions}</div>
    )
  }

  _options (user, data, selectedDate) {
    let selectedNextDate = new Date(selectedDate.split('-').join('/') + '/1').getTime()
    let isThisMoth = new Date(selectedDate.split('-').join('/') + '/1').getMonth() === new Date().getMonth()
    selectedNextDate = Time.getDateStrByMonth(selectedNextDate, 1)
    selectedNextDate = selectedNextDate.substr(0, 7)
    selectedNextDate = selectedNextDate.split('-')[0] + '-' + parseInt(selectedNextDate.split('-')[1])
    const role = user.roleName_en
    let options = []
    switch (role) {
      case 'agentSeller':
      case 'agentSellerManager':
        data = data['sellerSaleData']
        data.thisMonthDeviceOrder = data.thisMonthDeviceAchieveSuccessOrder +
          data.thisMonthDeviceUnachieveSuccessOrder +
          data.thisMonthDeviceAchieveRefundOrder +
          data.thisMonthDeviceUnachieveRefundOrder
        data.nextMonthDeviceOrder = data.nextMonthDeviceAchieveSuccessOrder +
          data.nextMonthDeviceUnachieveSuccessOrder +
          data.nextMonthDeviceAchieveRefundOrder +
          data.nextMonthDeviceUnachieveRefundOrder
        if (isThisMoth) {
          options = options.concat([
            <div key={0} className='analyse clearfix'>
              <DeviceCell title='累计离线设备' value={data.offlineDevice}
                onClick={this._bindLocationTo.bind(this, '/shop/device/offlineList')} />
              <DeviceCell title='今日订单' value={data.todayOrder}
                onClick={this._bindLocationTo.bind(this, '/shop/orderList')} />
              <DeviceCell title='累计安装设备' value={data.totalDevice}
                onClick={this._bindLocationTo.bind(this, '/shop/device/totalList')} />
            </div>,
            <div key={1} className='kpi'>
              <p className='title'>安装数据</p>
              <div className='data'>
                <Link to={{pathname: '/shops', query: {roleIndex: 0, activeTab: 0}}} className='shop-tab'>
                  <p>待安装门店 <i className='dianfont icon-xuanze' /></p>
                  <p>{data.thisMonthShopNew}</p>
                </Link>
                <Link to={{pathname: '/shops', query: {roleIndex: 0, activeTab: 4}}} className='shop-tab'>
                  <p>已安装门店 <i className='dianfont icon-xuanze' /></p>
                  <p>{data.thisMonthShopInstalled}</p>
                </Link>
                <Link to={{pathname: '/shops', query: {roleIndex: 0, activeTab: -1}}} className='shop-tab'>
                  <p>全部门店 <i className='dianfont icon-xuanze' /></p>
                  <p>{data.thisMonthShopAll}</p>
                </Link>
              </div>
            </div>
          ])
        }
        options = options.concat([
          <div key={2} className='kpi'>
            <p className='title'>考核数据</p>
            <div className='data need'>
              <div
                onClick={this._bindLocationTo.bind(this, '/shop/avgDayOrderList?selectedDate=' + this.props.selectedDate)}
                className='shop-tab'>
                <p>本月<br />日均订单数 {<i className='dianfont icon-xuanze' />}</p>
                <p>{data.thisMonthAverageDayOrder}</p>
              </div>
              <div
                onClick={this._bindLocationTo.bind(this, '/shop/device/avgDayOnlineRateList?selectedDate=' + this.props.selectedDate)}
                className='shop-tab'>
                <p>本月设备<br />日均在线率 {<i className='dianfont icon-xuanze' />}</p>
                <p>{`${data.thisMonthDeviceAverageDayOnline || 0}%`}</p>
              </div>
              <div
                onClick={this._bindLocationTo.bind(this, '/shop/device/recycleList?selectedDate=' + this.props.selectedDate)}
                className='shop-tab'>
                <p>本月<br />回收设备数 {<i className='dianfont icon-xuanze' />}</p>
                <p>{data.thisMonthRecycleDeviceNum}</p>
              </div>
              <div
                onClick={role !== 'agentSellerManager' ? this._bindLocationTo.bind(this, '/shop/device/list?' + params({
                  title: '当前考核期数据',
                  checkStatus: 1,
                  selectedDate: this.props.selectedDate
                })) : null} className='shop-tab'>
                <p>当前考核期达标设备数 {role !== 'agentSellerManager' ? <i className='dianfont icon-xuanze' /> : null}</p>
                <p>{data.thisMonthDeviceAchieve}</p>
              </div>
              <div
                onClick={role !== 'agentSellerManager' ? this._bindLocationTo.bind(this, '/shop/device/list?' + params({
                  title: '当前考核期数据',
                  checkStatus: 2,
                  selectedDate: this.props.selectedDate
                })) : null} className='shop-tab'>
                <p>当前考核期未达标设备数 {role !== 'agentSellerManager' ? <i className='dianfont icon-xuanze' /> : null}</p>
                <p>{data.thisMonthDeviceUnachieve}</p>
              </div>
              <div className='shop-tab'>
                <p>当前考核期订单笔数</p>
                <p>{data.thisMonthDeviceOrder}</p>
              </div>
              <div
                onClick={role !== 'agentSellerManager' ? this._bindLocationTo.bind(this, '/shop/device/list?' + params({
                  title: '下个考核期数据',
                  checkStatus: 1,
                  selectedDate: selectedNextDate
                })) : null} className='shop-tab'>
                <p>下个考核期达标设备数 {role !== 'agentSellerManager' ? <i className='dianfont icon-xuanze' /> : null}</p>
                <p>{data.nextMonthDeviceAchieve}</p>
              </div>
              <div
                onClick={role !== 'agentSellerManager' ? this._bindLocationTo.bind(this, '/shop/device/list?' + params({
                  title: '下个考核期数据',
                  checkStatus: 2,
                  selectedDate: selectedNextDate
                })) : null} className='shop-tab'>
                <p>下个考核期未达标设备数 {role !== 'agentSellerManager' ? <i className='dianfont icon-xuanze' /> : null}</p>
                <p>{data.nextMonthDeviceUnachieve}</p>
              </div>
              <div className='shop-tab'>
                <p>下个考核期订单笔数</p>
                <p>{data.nextMonthDeviceOrder}</p>
              </div>
            </div>
          </div>
        ])
        break
      case 'installer':
        data = data['installerData'] || {}
        options = [
          <div key={0} className='analyse clearfix'>
            <DeviceCell title='已安装' value={data['installed']}
              onClick={() => this.props.onLocationTo('/shops?activeTab=2&roleIndex=1')} />
            <DeviceCell title='已维修' value={data['repaired'] || 0}
              onClick={() => this.props.onLocationTo('/workOrder/repair?activeTab=1')} />
          </div>
        ]
        break
      default:
        options = []
    }
    return options
  }

  _bindLocationTo (path) {
    this.props.onLocationTo(path)
  }

  componentWillUnmount () {
  }
}
