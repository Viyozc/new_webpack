import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'components/link'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Select from 'components/common/nakedSelect'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/'
import * as commonActions from 'actions/common'
import Style from './index.less'
import UserBar from 'components/home/user'
import Menu from 'components/home/menu'
import { TotalPanel, Head, Body, Card } from 'components/channel/totalPanel'
import { router, params } from 'utils'

class IndexContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    let nowDate = new Date(),
      year = nowDate.getFullYear(),
      month = (nowDate.getMonth() + 1) < 10 ? '0'+ (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1),
      day = nowDate.getDate() < 10 ? '0'+nowDate.getDate() : nowDate.getDate()
    this.state = {
      showSelectDate: false,
      showSelectDay: false,
      isShowTableDevice:
        this.props.location.query.isShowTableDevice
        ? this.props.location.query.isShowTableDevice === 'true'
          ? true
          : false
        : true,
      isShowBoxDevice:
        this.props.location.query.isShowBoxDevice
          ? this.props.location.query.isShowBoxDevice === 'true'
            ? true
            : false
          : false,
      departmentId: this.props.location.query.departmentId || 0,
      selectedDayId: this.props.location.query.selectedDayId || year + '-' + month + '-' + day
    }
  }

  componentWillMount () {
    // 设置页面默认显示
    Style.use()
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }

  componentDidMount () {
    Bridge.setNavTitle('首页')
    // 首页座充数据
    if(this.state.isShowTableDevice){
      this.props.actions.fetchHomeData()
      this.props.actions.fetchMonthData()
    }
    if(this.state.isShowBoxDevice){
      this.props.actions.fetchHomeData()
      this.props.actions.fetchMonthData()
      this.props.actions.fetchHomeBoxData({
        date: this.state.selectedDayId,
        firLocation: 'HOME',
        secLocations: 'HOME_TODAY',
        dateFormat: 'yyyy-MM-dd',
        depType: this.state.departmentId
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) {
      Toast.show('服务端错误')
      this.props.actions.cleanErrorMessage()
    }
  }

  render () {
    if (this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.state.isShowTableDevice && (!this.props.homeData || !this.props.monthData ) && !this.props.error) {
      return <Loading />
    }
    if (this.state.isShowBoxDevice && (!this.props.homeBoxData || !this.props.homeData) && !this.props.error) {
      return <Loading />
    }
    // 前6个月列表
    // let formatMonthList = this.props.monthList && this.props.monthList.map((item, i) => {
    //   return {key: `${item.year}-${item.month}`, value: `${item.year}-${item.month}`}
    // })
    // 前7天列表
    let formatDayList = [{}, {}, {}, {}, {}, {}, {}]
    formatDayList.map((item, i) => {
      let nowTime = new Date().getTime()
      let year = new Date(nowTime - (24 * 60 * 60 * 1000 * i)).getFullYear()
      let month = new Date(nowTime - (24 * 60 * 60 * 1000 * i)).getMonth() + 1
      let day = new Date(nowTime - (24 * 60 * 60 * 1000 * i)).getDate()
      formatDayList[i] = {key: (year + '-' +month < 10 ? '0' + month : month + '-' + day < 10 ? '0' + day : day), value: (year + '-' +month < 10 ? '0' + month : month + '-' + day < 10 ? '0' + day : day)}
    })

    // 座充数据
    let homeData = this.props.homeData && this.props.homeData.sellerSaleData || {}
    homeData.thisMonthDeviceOrder = homeData.thisMonthDeviceAchieveSuccessOrder +
      homeData.thisMonthDeviceUnachieveSuccessOrder +
      homeData.thisMonthDeviceAchieveRefundOrder +
      homeData.thisMonthDeviceUnachieveRefundOrder
    homeData.nextMonthDeviceOrder = homeData.nextMonthDeviceAchieveSuccessOrder +
      homeData.nextMonthDeviceUnachieveSuccessOrder +
      homeData.nextMonthDeviceAchieveRefundOrder +
      homeData.nextMonthDeviceUnachieveRefundOrder
    let role = this.props.homeData && this.props.homeData.agentEmployeeVO.roleName_en
    let todayData = homeData && homeData.dataMap && homeData.dataMap.today || {}
    let totalData = homeData && homeData.dataMap && homeData.dataMap.all || {}
    let recycleData = homeData && homeData.dataMap && homeData.dataMap.recycle || {}

    // 盒子数据
    let homeBoxData = this.props.homeBoxData || {}
    // 座充绩效数据
    let zcMonthData = this.props.monthData || {}
    return (
      <div>
        <div className='cheader'>
          <UserBar
            user={this.props.homeData && this.props.homeData.agentEmployeeVO}
            onChoseDate={this._bindChoseDate.bind(this)}
            onScanQRCode={this._bindScanQRCode}
            activeDepartmentId={this.props.location.query.departmentId || 0}
            activeDepartmentName={this.props.location.query.departmentName || '所有部门'}
            isShowDepartment={role === 'ceo' ? (this.state.isShowTableDevice ? false : true) : null}
            onChoseDepartment={this._onChoseDepartment.bind(this)}
            isBd={true}
          />
          <div className='home-tab'>
            <button onClick={() => this._tab(0)} className={this.state.isShowTableDevice ? 'home-tab-title active' : 'home-tab-title'}>座充</button>
            <button onClick={() => this._tab(1)} className={this.state.isShowBoxDevice ? 'home-tab-title active' : 'home-tab-title'}>盒子</button>
          </div>
          {this.state.isShowTableDevice
            // 座充数据
            ? <div className='data'><TotalPanel>
              <Head title='当日数据' />
              <Body>
                {/*<Card title='当日新安装门店' value={todayData.todayInstallShopNum || 0}*/}
                  {/*onClick={() => router.push('/channel/data/todayNewInstallDevice?role=' + role)} />*/}
                <Card title='当日离线设备数' value={todayData.offlineDeviceNum || 0}
                      onClick={() => router.push('/channel/data/todayOfflineDevice?role=' + role)} />
                <Card title='当日成功订单数' value={todayData.successOrder || 0}
                  onClick={() => router.push('/bd/data/todaySuccessOrder?role=' + role)} />
                <Card title='当日新安装设备数' value={todayData.todayInstallDeviceNum || 0}
                  onClick={() => router.push('/channel/data/todayNewInstallDevice?role=' + role)} />
                {/*<Card title='当日回收设备数' value={todayData.offlineDeviceNum || 0}*/}
                  {/*onClick={() => router.push('/channel/data/todayOfflineDevice?role=' + role)} />*/}
              </Body>
            </TotalPanel>
            <TotalPanel>
                <Head title='累计数据' />
                <Body>
                  <Card title='累计安装门店数' value={totalData.shopCount || 0}
                    onClick={() => router.push('/channel/data/totalInstallShop?role=' + role)} />
                  <Card title='累计安装设备数' value={totalData.deviceCount || 0}
                    onClick={() => router.push('/channel/data/totalInstallDevice?role=' + role)} />
                  <Card title='累计成功订单数' value={totalData.successOrder || 0}
                    onClick={() => router.push('/channel/data/totalSuccessOrder?role=' + role)} />
                  {/*<Card title='设备日均订单数' value={totalData.successOrder || 0}*/}
                    {/*onClick={() => router.push('/channel/data/totalSuccessOrder?role=' + role)} />*/}
                  <Card title='累计回收设备成功订单数' value={recycleData.successOrder || 0}
                        onClick={() => router.push('/bd/data/summaryRecovery?role=' + role)} />
                </Body>
              </TotalPanel>
              <TotalPanel>
                <Head title='团队绩效数据' />
                <Body>
                <Card title='绩效新安装门店数' value={zcMonthData.newInstallShopNum || 0}
                      onClick={() => router.push('/bd/data/monthNewShop?role=' + role)} />
                <Card title='绩效成功订单金额' value={zcMonthData.successOrderPrice || 0}
                      onClick={() => router.push('/bd/data/monthSuccessOrderAndMoney?role=' + role)} />
                <Card title='绩效新安装设备数' value={zcMonthData.newInstallDeviceNum || 0}
                      onClick={() => router.push('/bd/data/monthNewInstallDevice?role=' + role)} />
                <Card title='绩效日均设备在线率' value={`${zcMonthData.averageOnline ? Math.ceil(zcMonthData.averageOnline*100) : 0}%`}
                      onClick={() => router.push('/bd/data/monthDayOnLineRate?role=' + role)} />
                <Card title='绩效回收设备数' value={zcMonthData.recycleNum || 0}
                      onClick={() => router.push('/bd/data/monthRecoveryDevice?role=' + role)} />
                <Card title='绩效设备日均订单数' value={(zcMonthData.averageOrder || 0).toFixed(2)}
                      onClick={() => router.push('/bd/data/monthDayDeviceOrder?role=' + role)} />
                </Body>
              </TotalPanel>
            </div>
            // 盒子数据渲染
            : <div className='data'><TotalPanel>
              <Head title='当日数据'>
                { this.state.selectedDay
                  ? <div className='select-month'>
                    <button onClick={() => this._bindChoseDay()}>
                      {this.props.location.query.selectedDay || formatDayList[0].key}
                      {this.state.showSelectDay ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
                    </button>
                  </div>
                  : null }
              </Head>
              <Body>
                <Card title='当日新安装设备数' value={homeBoxData.todayInstallDeviceNum || 0}
                  onClick={() => router.push('/bd/boxData/todayDataNewInstallDevice?role=' + role)} />
                <Card title='当日借出充电宝' value={homeBoxData.todayLoanDeviceNum || 0}
                  onClick={() => router.push('/bd/boxData/todayDataBorrowBattery?role=' + role)} />
                <Card title='当日成功订单数（归还）' value={homeBoxData.todaySucOrder || 0}
                  onClick={() => router.push('/bd/boxData/todayDataSuccessOrder?role=' + role)} />
                {role === 'ceo' ? <Card title='当日净增押金金额' value={(parseFloat(homeBoxData.todayIceDeposit || 0)/100).toFixed(2)}
                                        onClick={() => router.push('/bd/boxData/todayDataNewAddDeposit?role=' + role)} /> : null}
                {role === 'ceo' ? <Card title='当日成功订单金额' value={(parseFloat(homeBoxData.todaySucOrderMoney || 0)/100).toFixed(2)}
                  onClick={() => router.push('/bd/boxData/todayDataSuccessOrderMoney?role=' + role)} /> : null}
                {role === 'ceo' ? <Card title='当日用户充值总额' value={(parseFloat(homeBoxData.todayChargeMoney || 0)/100).toFixed(2)}
                  onClick={() => router.push('/bd/boxData/todayDataUserChargeAllMoney?role=' + role)} /> : null}
                <Card title='当日离线设备数' value={homeBoxData.todayOfflineDeviceNum || 0}
                      onClick={() => router.push('/bd/boxData/todayDataUnOnLine?role=' + role)} />
              </Body>
            </TotalPanel>
            {/*<TotalPanel>*/}
                {/*<Head title='团队月度数据'>*/}
                  {/*{ this.props.location.query.selectedDate*/}
                   {/*? <div className='select-month'>*/}
                     {/*<button onClick={() => this._bindChoseDate()}>*/}
                       {/*{this.props.location.query.selectedDate ? `${this.props.location.query.selectedDate.split('-')[0]}-${this.props.location.query.selectedDate.split('-')[1]}` : ''}*/}
                       {/*{this.state.showSelectDate ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}*/}
                     {/*</button>*/}
                   {/*</div>*/}
                   {/*: null }*/}
                {/*</Head>*/}
                {/*<Body>*/}
                  {/*<Card title='当月安装设备数' value={todayData.todayInstallShopNum || 0}*/}
                    {/*onClick={() => router.push('/channel/data/todayNewInstallDevice?role=' + role)} />*/}
                  {/*<Card title='当月借出充电宝' value={todayData.todayInstallShopNum || 0}*/}
                    {/*onClick={() => router.push('/bd/data/todaySuccessOrder?role=' + role)} />*/}
                  {/*<Card title='当月归还总数' value={todayData.todayInstallShopNum || 0}*/}
                    {/*onClick={() => router.push('/channel/data/todayNewInstallDevice?role=' + role)} />*/}
                  {/*<Card title='当月成功订单金额' value={`${(todayData.todayInstallShopNum || 0).toFixed(2)}%`}*/}
                    {/*onClick={() => router.push('/channel/data/todayOfflineDevice?role=' + role)} />*/}
                  {/*<Card title='当月日均设备在线率' value={todayData.todayInstallShopNum || 0}*/}
                    {/*onClick={() => router.push('/channel/data/todayOfflineDevice?role=' + role)} />*/}
                  {/*<Card title='当月设备日均借出数' value={(todayData.todayInstallShopNum || 0).toFixed(2)}*/}
                    {/*onClick={() => router.push('/channel/data/todayOfflineDevice?role=' + role)} />*/}
                  {/*<Card title='当月设备日均归还数' value={(todayData.todayInstallShopNum || 0).toFixed(2)}*/}
                    {/*onClick={() => router.push('/channel/data/todayOfflineDevice?role=' + role)} />*/}
                  {/*<Card title='当月回收设备数' value={(todayData.todayInstallShopNum || 0).toFixed(2)}*/}
                    {/*onClick={() => router.push('/channel/data/todayOfflineDevice?role=' + role)} />*/}
                {/*</Body>*/}
              {/*</TotalPanel>*/}
              <TotalPanel>
                <Head title='累计数据' />
                <Body>
                  <Card title='累计安装门店数' value={homeBoxData.totalInstallShopNum || 0}
                    onClick={() => router.push('/bd/boxData/summaryInstallShop?role=' + role)} />
                  <Card title='累计安装设备数' value={homeBoxData.totalInstallDeviceNum || 0}
                    onClick={() => router.push('/bd/boxData/summaryInstallDevice?role=' + role)} />
                  <Card title='累计成功订单数' value={homeBoxData.totalSucOrder || 0}
                    onClick={() => router.push('/bd/boxData/summarySuccessOrder?role=' + role)} />
                  <Card title='累计未归还充电宝' value={homeBoxData.totalNoReturnDeviceNum || 0}
                    onClick={() => router.push('/bd/boxData/summaryNoReturnBattery?role=' + role)} />
                  {role === 'ceo' ? <Card title='累计押金金额' value={(parseFloat(homeBoxData.totalDeposit || 0)/100).toFixed(2)}
                    onClick={() => router.push('/bd/boxData/summaryDepositMoney?role=' + role)} /> : null}
                  {role === 'ceo' ? <Card title='累计账户余额' value={(parseFloat(homeBoxData.totalAccountBalance || 0)/100).toFixed(2)}
                    onClick={() => router.push('/bd/boxData/summaryLeftMoney?role=' + role)} /> : null}
                </Body>
              </TotalPanel></div>}
          <Link className='description' to='/data/help'>帮助中心 <i className='dianfont icon-xuanze' /></Link>
        </div>
        <div className='install-process'>
          <p>我的门店</p>
          <Menu
            className='process-menu'
            columns={3}
            data={this.props.homeData}
            icons={this.props.homeData && this.props.homeData.icons2}
            user={this.props.homeData && this.props.homeData.agentEmployeeVO}
            onLocationTo={this._bindLocationTo.bind(this)} />
        </div>
        <Menu
          columns={3}
          selectedDate={this.props.location.query.selectedDate}
          icons={this.props.homeData && this.props.homeData.icons}
          data={this.props.homeData}
          user={this.props.homeData && this.props.homeData.agentEmployeeVO}
          onLocationTo={this._bindLocationTo.bind(this)} />
        {/*<Select*/}
          {/*key={1}*/}
          {/*options={formatMonthList}*/}
          {/*onChose={this._choseDate.bind(this)}*/}
          {/*selectedValue={this.props.location.query.selectedDate}*/}
          {/*isShow={this.state.showSelectDate}*/}
          {/*onClose={this._closeDate.bind(this)} />*/}
        <Select
          key={2}
          options={formatDayList}
          onChose={this._choseDay.bind(this)}
          selectedValue={this.props.location.query.selectedDay}
          isShow={this.state.showSelectDay}
          onClose={this._closeDay.bind(this)} />
      </div>
    )
  }

  _bindChoseDay () {
    this.setState({
      showSelectDay: true
    })
  }

  // 显示月份list
  _bindChoseDate () {
    this.setState({
      showSelectDate: true
    })
  }

  // 选择月份
  // _choseDate (value, options) {
  //   this._closeDate()
  //   router.replace({
  //     pathname: this.props.location.pathname,
  //     query: assign({}, this.props.location.query, {selectedDate: value})
  //   })
  //   this.props.actions.fetchHomeData()
  //
  //   // 盒子数据-当日数据
  //   this.props.actions.fetchHomeBoxData({
  //     date: value,
  //     firLocation: 'HOME',
  //     secLocations: 'HOME_TODAY',
  //     depType: this.state.departmentId
  //   })
  //   // 盒子数据-累计数据
  //   this.props.actions.fetchHomeBoxData({
  //     date: -1,
  //     firLocation: 'HOME',
  //     secLocations: 'HOME_TOTAL',
  //     depType: this.state.departmentId
  //   })
  // }

  // 选择天
  _choseDay (value, options) {
    this._closeDay()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {selectedDay: value,selectedDayId: options.key})
    })
    // this.props.actions.fetchHomeData()
    this.props.actions.fetchHomeBoxData({
      date: this.state.selectedDayId,
      firLocation: 'HOME',
      secLocations: 'HOME_TODAY',
      dateFormat: 'yyyy-MM-dd',
      depType: this.state.departmentId
    })

  }

  // 隐藏月份列表
  // _closeDate () {
  //   this.setState({
  //     showSelectDate: false
  //   })
  // }

  // 隐藏天列表
  _closeDay () {
    this.setState({
      showSelectDay: false
    })
  }

  _onChoseDepartment (value, option, i) {
    this.setState({
      departmentId: value,
      departmentName: option.key
    }, () => {
      this.props.actions.fetchHomeBoxData({
        date: this.state.selectedDayId,
        firLocation: 'HOME',
        secLocations: 'HOME_TODAY',
        dateFormat: 'yyyy-MM-dd',
        depType: this.state.departmentId
      })
    })
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {departmentId: value,departmentName: option.key})
    })
    // this.props.actions.fetchHomeData()
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

  _tab (index) {
    // 座充
    if (index === 0) {
      this.setState({isShowTableDevice: true, isShowBoxDevice: false}, () => {
        this.props.actions.fetchHomeData()
        this.props.actions.fetchMonthData()
      })
      router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          isShowTableDevice: true,
          isShowBoxDevice: false
        })
      })
    }
    // 盒子
    if (index === 1) {
      this.setState({isShowTableDevice: false, isShowBoxDevice: true}, () => {
        // 盒子数据-当日数据&累计数据
        this.props.actions.fetchHomeBoxData({
          date: this.state.selectedDayId,
          firLocation: 'HOME',
          dateFormat: 'yyyy-MM-dd',
          depType: this.state.departmentId
        })
      })
      router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          isShowTableDevice: false,
          isShowBoxDevice: true
        })
      })
    }
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    homeData: state.bdIndexPage && state.bdIndexPage.homeData,
    homeBoxData: state.bdIndexPage && state.bdIndexPage.homeBoxData,
    monthData: state.bdIndexPage && state.bdIndexPage.monthData
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
