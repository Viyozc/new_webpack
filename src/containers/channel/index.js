import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'components/link'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Select from 'components/common/select'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/channel/'
import * as commonActions from 'actions/common'
import Style from './index.less'
import UserBar from 'components/home/user'
import Menu from 'components/home/menu'
import { TotalPanel, Head, Body, Card } from 'components/channel/totalPanel'
import { router } from 'utils'

class IndexContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showSelectDate: false
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
    Bridge.setNavTitle('首页')
    this.props.actions.fetchHomeData()
    if (this.props.location.query.selectedDate) {
      this.props.actions.fetchMonthData({
        year: this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[0],
        month: this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[1]
      })
    }
    if (this.props.monthList && this.props.monthList.length) {
      !this.props.location.query.selectedDate && router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          selectedDate: `${this.props.monthList[0].year}-${this.props.monthList[0].month}`
        })
      })
    } else {
      this.props.actions.fetchMonthList()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.monthList && nextProps.monthList && nextProps.monthList.length) {
      !nextProps.location.query.selectedDate && router.replace({
        pathname: nextProps.location.pathname,
        query: assign({}, nextProps.location.query, {
          selectedDate: `${nextProps.monthList[0].year}-${nextProps.monthList[0].month}`
        })
      })
    }
    if (this.props.location.query.selectedDate !== nextProps.location.query.selectedDate && nextProps.location.query.selectedDate) {
      this.props.actions.fetchMonthData({
        year: nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[0],
        month: nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[1]
      })
    }
    if (nextProps.homeData && nextProps.monthData && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (this.props.homeData !== nextProps.homeData && !nextProps.error) {
      let role = nextProps.homeData.role
      if (role === 'bdAgencyBoss' || role === 'bdAgencyBD') {
        return router.replace('/a/agentBD/home')
      }
    }
  }

  render () {
    if (!this.props.location.query.selectedDate) {
      return <Loading />
    }
    if (!(this.props.homeData && this.props.monthData) && !this.props.error) {
      return <Loading />
    }
    if (!(this.props.homeData && this.props.monthData) && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    let formatMonthList = this.props.monthList && this.props.monthList.map((item, i) => {
        return {key: `${item.year}-${item.month}`, value: `${item.year}-${item.month}`}
      })
    let homeData = this.props.homeData && this.props.homeData.sellerSaleData || {}
    let monthData = this.props.monthData && this.props.monthData.sellerSaleData || {}
    let role = this.props.homeData.agentEmployeeVO && this.props.homeData.agentEmployeeVO.roleName_en
    let todayData = homeData && homeData.dataMap && homeData.dataMap.today || {}
    let totalData = homeData && homeData.dataMap && homeData.dataMap.all || {}
    return (
      <div>
        <div className='cheader'>
          <UserBar
            user={this.props.homeData && this.props.homeData.agentEmployeeVO}
            onChoseDate={this._bindChoseDate.bind(this)}
            onScanQRCode={this._bindScanQRCode}/>
          <TotalPanel>
            <Head title='代理商今日数据' />
            <Body>
            <Card title='今日离线设备数' value={todayData.offlineDeviceNum || 0}
                  onClick={() => router.push('/channel/data/todayOfflineDevice?role=' + role)}/>
            <Card title='今日成功订单数' value={todayData.successOrder || 0}
                  onClick={() => router.push('/channel/data/todaySuccessOrder?role=' + role)}/>
            <Card title='今日新安装设备数' value={todayData.todayInstallDeviceNum || 0}
                  onClick={() => router.push('/channel/data/todayNewInstallDevice?role=' + role)}/>
            </Body>
          </TotalPanel>
          <TotalPanel>
            <Head title='代理商累计数据' />
            <Body>
            <Card title='累计安装门店数' value={totalData.shopCount || 0}
                  onClick={() => router.push('/channel/data/totalInstallShop?role=' + role)}/>
            <Card title='累计安装设备数' value={totalData.deviceCount || 0}
                  onClick={() => router.push('/channel/data/totalInstallDevice?role=' + role)}/>
            <Card title='累计成功订单数' value={totalData.successOrder || 0}
                  onClick={() => router.push('/channel/data/totalSuccessOrder?role=' + role)}/>
            </Body>
          </TotalPanel>
          <TotalPanel>
            <Head title='代理商当月数据'>
              {/** this.props.location.query.selectedDate
               ? <div className='select-month'>
               <button onClick={() => this._bindChoseDate()}>
               {this.props.location.query.selectedDate ? `${this.props.location.query.selectedDate.split('-')[0]}-${this.props.location.query.selectedDate.split('-')[1]}` : ''}
               {this.state.showSelectDate ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
               </button>
               </div>
               : null **/}
            </Head>
            <Body>
            <Card title='当月新安装门店数' value={monthData.monthInstallerShopNum || 0} onClick={null}/>
            <Card title='当月新安装设备数' value={monthData.monthInstallerDeviceNum || 0} onClick={null}/>
            <Card title='当月回收设备数' value={monthData.thisMonthRecycleDeviceNum || 0} onClick={null}/>
            <Card title='当月日均设备在线率' value={`${(monthData.thisMonthDeviceAverageDayOnline || 0).toFixed(2)}%`}
                  onClick={null}/>
            <Card title='当月成功订单总数' value={monthData.monthTotalOrdersNum || 0} onClick={null}/>
            <Card title='当月设备日均订单数' value={(monthData.thisMonthAverageDayOrder || 0).toFixed(2)} onClick={null}/>
            </Body>
          </TotalPanel>
          <Link className='description' to='/a/count/help'>帮助中心 <i className='dianfont icon-xuanze'/></Link>
        </div>
        <div className='install-process'>
          <p>{this.props.location.pathname === '/a/channel' ? '我的门店' : '代理商门店'}</p>
          <Menu
            className='process-menu'
            columns={3}
            data={this.props.homeData}
            icons={this.props.homeData && this.props.homeData.icons2}
            user={this.props.homeData && this.props.homeData.agentEmployeeVO}
            onLocationTo={this._bindLocationTo.bind(this)}/>
        </div>
        <Menu
          columns={3}
          selectedDate={this.props.location.query.selectedDate}
          icons={this.props.homeData && this.props.homeData.icons}
          data={this.props.homeData}
          user={this.props.homeData && this.props.homeData.agentEmployeeVO}
          onLocationTo={this._bindLocationTo.bind(this)}/>
        {this.state.showSelectDate && this.props.location.query.selectedDate
          ? <Select
            options={formatMonthList}
            onChose={this._choseDate.bind(this)}
            selectedValue={this.props.location.query.selectedDate}
            onClose={this._closeDate.bind(this)}/>
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

  _bindLocationTo (path) {
    // 测试网络
    if (/\/testNetwork/.test(path)) {
      Bridge.speedTest((res) => {
        Toast.show(JSON.stringify(res))
        if (res.data) {
          if (res.data.loss >= 2 || res.data.average > 100) {
            return Toast.show('当前网络状态较差')
          } else {
            return Toast.show('当前网络状态良好')
          }
        } else {
          return Toast.show('当前网络状态较差')
        }
      })
    } else {
      router.push(path)
    }
  }

  _bindScanQRCode () {
    Bridge.scanQRCode((res) => {
      if (/http/.test(res.data)) {
        location.href = res.data
      } else {
        Toast.show(res.data)
      }
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    monthList: state.common && state.common.monthList,
    homeData: state.channelIndexPage && state.channelIndexPage.homeData,
    monthData: state.channelIndexPage && state.channelIndexPage.monthData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
