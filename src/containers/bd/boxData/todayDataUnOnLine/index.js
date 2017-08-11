/**
 * Created by fanli on 2017/7/13.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Style from './index.less'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import SelectShopType from 'components/common/selectShopType'
import SelectCityLevel3 from 'components/common/selectLevel3'
import SelectTimeLevel2 from 'components/common/selectLevel2'
import ScrollOnTop from 'components/common/scrollOnTop'
import Select from 'components/common/nakedSelect'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/boxData'
import * as commonActions from 'actions/common'
import Tabs, { Tab } from 'components/common/tabs'
import assign from 'lodash/assign'
import { router, limitFontSize } from 'utils'

const PAGE_SIZE = 20
let OFFSET = 1
const tabConfig = [
  {status: 'ALL', name: '全部'},
  {status: 'URGENT_MAINTAIN', name: '急需维护'},
  {status: 'ALL_OFFLINE', name: '全店离线'}
]

class Container extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    let nowDate = new Date(),
      year = nowDate.getFullYear(),
      month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1,
      date = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
    this.state = {
      isisShowShoptype: false,
      tabIndex: this.props.location.query.tabIndex || tabConfig[0].status,
      isShowCity: false,
      isShowMember: false,
      sortActiveIndex: -1,
      sortDesc: '',
      sortType: '',
      showIndex: -1,
      timeLevel1: this.props.location.query.timeLevel1 || year + '-' + month + '-' + date,
      timeLevel1Index: this.props.location.query.timeLevel1Index || 0,
      timeLevel2: this.props.location.query.timeLevel2 || '00-24'
    }
  }
  componentWillMount () {
    if (!this.props.location.query.role) {
      return router.goBack()
    }
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.clearBoxDataAll()
    sessionStorage.setItem(`${this.props.location.pathname}_search`, this.props.location.search)
  }
  componentWillReceiveProps (nextProps) {

  }
  componentDidMount () {
    Bridge.setNavTitle('当日-离线设备数')
    this.props.actions.fetchShopType()
    if (this.props.location.query.role === 'ceo') {
      this.props.actions.fetchAllMembersInCity()
    }
    if (this.props.location.query.role === 'agentSellerManager') {
      this.props.actions.fetchBdMembersInCity()
    }
    this._getData()
  }
  render () {
    let timeList = [{}, {}, {}, {}, {}, {}, {}]
    let nowTime = new Date().getTime()
    timeList.map((item, i) => {
      let dayTime = new Date(nowTime - (24 * 60 * 60 * i * 1000)),
        year = dayTime.getFullYear(),
        month = (dayTime.getMonth() + 1) < 10 ? '0' + (dayTime.getMonth() + 1) : (dayTime.getMonth() + 1),
        date = dayTime.getDate() < 10 ? '0' + dayTime.getDate() : dayTime.getDate()
      let obj = {
        id: year + '-' + month + '-' + date,
        name: year + '-' + month + '-' + date,
        childs: [
          {id: '00-24', name: '所有时段'},
          {id: '00-03', name: '00-03'},
          {id: '03-06', name: '03-06'},
          {id: '06-09', name: '06-09'},
          {id: '09-12', name: '09-12'},
          {id: '12-15', name: '12-15'},
          {id: '15-18', name: '15-18'},
          {id: '18-21', name: '18-21'},
          {id: '21-24', name: '21-24'}
        ]
      }
      timeList[i] = obj
    })
    return (
      <div className='summary-wap'>
        <div className='tips'>
          创建订单：借出充电宝&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;成功订单：充电宝归还且成功结算
        </div>
        {/** **************************** ceo 筛选 ******************************/}
        {this.props.location.query.role === 'ceo'
          ? <div className='select-wap select-wap-ceo'>
            {/* 城市 */}
            <button className='select city-level-3' onClick={() => this.setState({isShowCity: true})}>
              {limitFontSize(this.props.location.query.level3Name || '城市', 3, true)}
              {this.state.isShowCity ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            <SelectCityLevel3
              options={this.props.cityLevelList}
              onChose={this._choseCity.bind(this)}
              activeOptions={{level1: this.props.location.query.level1 || 0,
                level1Index: this.props.location.query.level1Index || 0,
                level2: this.props.location.query.level2 || 0,
                level2Index: this.props.location.query.level2Index || 0,
                level3: this.props.location.query.level3 || 0,
                level3Index: this.props.location.query.level3Index || 0,
                level1Default: '所有城市',
                level2Default: '所有员工',
                level3Default: '所有代理'
              }}
              onClose={this._closeCity.bind(this)}
              isShow={this.state.isShowCity} />
            {/* 时间段 */}
            <button className='select city-level-2' onClick={() => this.setState({isShowTime: true})}>
              {limitFontSize(this.props.location.query.timeLevel1 && this.props.location.query.timeLevel2 ? (this.props.location.query.timeLevel1 + ' ' + this.props.location.query.timeLevel2) : '时间', 20, true)}
              {this.state.isShowTime ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            <SelectTimeLevel2
              options={timeList}
              onChose={this._choseTime.bind(this)}
              activeOptions={{
                level1: this.state.timeLevel1,
                level1Index: this.state.timeLevel1Index || 0,
                level2: this.state.timeLevel2
              }}
              onClose={this._closeTime.bind(this)}
              isShow={this.state.isShowTime} />
            {/* 类目 */}
            <button className='select shop-type' onClick={() => this.setState({isShowShoptype: true})}>
              {limitFontSize(this.props.location.query.shopSubTypeName ? decodeURI(this.props.location.query.shopSubTypeName) : '类目', 3, true)}
              {this.state.isShowShoptype ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            {this.state.isShowShoptype && this.props.shopTypeList ? <SelectShopType
              multile
              options={this.props.shopTypeList}
              onChose={this._choseShopType.bind(this)}
              shopType={{id: this.props.location.query.shopType || '0', name: null}}
              shopSubType={{
                id: parseInt(this.props.location.query.shopSubType || '0'),
                name: this.state.shopSubTypeName
              }}
              onClose={this._closeShopType.bind(this)} /> : null}
          </div>
          : null}
        {/** **************************** BD主管 筛选 ******************************/}
        {this.props.location.query.role === 'agentSellerManager'
          ? <div className='select-wap select-wap-bd-manager'>
            {/* 小二 */}
            <button className='select members' onClick={() => this.setState({isShowMember: true})}>
              {limitFontSize(this.props.location.query.memberName || '小二', 3, true)}
              {this.state.isShowMember ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            <Select
              options={this.props.memberList ? this.props.memberList : [{key: '小二', value: 0}]}
              onChose={this._choseMembers.bind(this)}
              selectedValue={parseInt(this.props.location.query.memberId) || 0}
              onClose={this._closeMembers.bind(this)}
              isShow={this.state.isShowMember} />
            {/* 时间段 */}
            <button className='select city-level-2' onClick={() => this.setState({isShowTime: true})}>
              {limitFontSize(this.props.location.query.timeLevel1 && this.props.location.query.timeLevel2 ? (this.props.location.query.timeLevel1 + ' ' + this.props.location.query.timeLevel2) : '时间', 20, true)}
              {this.state.isShowTime ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            <SelectTimeLevel2
              options={timeList}
              onChose={this._choseTime.bind(this)}
              activeOptions={{
                level1: this.state.timeLevel1,
                level1Index: this.state.timeLevel1Index || 0,
                level2: this.state.timeLevel2
              }}
              onClose={this._closeTime.bind(this)}
              isShow={this.state.isShowTime} />
            {/* 类目 */}
            <button className='select shop-type' onClick={() => this.setState({isShowShoptype: true})}>
              {limitFontSize(this.props.location.query.shopSubTypeName ? decodeURI(this.props.location.query.shopSubTypeName) : '类目', 3, true)}
              {this.state.isShowShoptype ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            {this.state.isShowShoptype && this.props.shopTypeList ? <SelectShopType
              options={this.props.shopTypeList}
              onChose={this._choseShopType.bind(this)}
              shopType={{id: this.props.location.query.shopType || '0', name: null}}
              shopSubType={{
                id: parseInt(this.props.location.query.shopSubType || '0'),
                name: this.state.shopSubTypeName
              }}
              onClose={this._closeShopType.bind(this)} /> : null}
          </div>
          : null}
        {/** **************************** BD 筛选 ******************************/}
        {this.props.location.query.role === 'agentSeller'
          ? <div className='select-wap select-wap-bd'>
            {/* 时间段 */}
            <button className='select city-level-2' onClick={() => this.setState({isShowTime: true})}>
              {limitFontSize(this.props.location.query.timeLevel1 && this.props.location.query.timeLevel2 ? (this.props.location.query.timeLevel1 + ' ' + this.props.location.query.timeLevel2) : '时间', 20, true)}
              {this.state.isShowTime ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            <SelectTimeLevel2
              options={timeList}
              onChose={this._choseTime.bind(this)}
              activeOptions={{
                level1: this.state.timeLevel1,
                level1Index: this.state.timeLevel1Index || 0,
                level2: this.state.timeLevel2
              }}
              onClose={this._closeTime.bind(this)}
              isShow={this.state.isShowTime} />
            {/* 类目 */}
            <button className='select shop-type' onClick={() => this.setState({isShowShoptype: true})}>
              {limitFontSize(this.props.location.query.shopSubTypeName ? decodeURI(this.props.location.query.shopSubTypeName) : '类目', 3, true)}
              {this.state.isShowShoptype ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            {this.state.isShowShoptype && this.props.shopTypeList ? <SelectShopType
              options={this.props.shopTypeList}
              onChose={this._choseShopType.bind(this)}
              shopType={{id: this.props.location.query.shopType || '0', name: null}}
              shopSubType={{
                id: parseInt(this.props.location.query.shopSubType || '0'),
                name: this.state.shopSubTypeName
              }}
              onClose={this._closeShopType.bind(this)} /> : null}
          </div>
          : null}
        <Tabs>
          {tabConfig.map((item, i) => {
            return <Tab
              key={item.status}
              highlight={item.status === (this.props.location.query.tabIndex || tabConfig[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.name}
            </Tab>
          })}
        </Tabs>
        {/* 合计 */}
        {this.props.summaryData && !this.props.error
          ? <div className='total'>
            <a href='/data/help' className='data-help'>?</a>
            <p className='total-title'>合计：</p>
            <ul className='clearfix'>
              <li>门店数：{this.props.summaryData.offlineShopNum || 0}</li>
              <li>盒子数：{this.props.summaryData.offlineBoxNum || 0}</li>
              <li>充电宝数：{this.props.summaryData.offlineDeviceNum || 0}</li>
              <li>扫码次数：{this.props.summaryData.offlineScanNum || 0}</li>
              <li>创建订单：{this.props.summaryData.offlineOrderNum || 0}</li>
              <li>成功订单：{this.props.summaryData.offlineSuccessOrderNum || 0}</li>
              <li>退款订单：{this.props.summaryData.offlineRefundOrderNum || 0}</li>
            </ul>
          </div> : null}
        {/* 表格标题 */}
        <div className='table-head'>
          <span className='th wid01'>
            <em className='txt'>设备编号</em>
          </span>
          <span className='th wid03'>
            <em className='txt'>今日扫<br />码次数</em>
            {/* 全部&急需维护排序字段 */}
            {this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN'
              ? <button className='btn-up' onClick={() => this._choseSortType(3, 'OFFLINE_SHOP_TODAY_SCAN_NUM', 'ASC')} /> : null}
            {this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN'
              ? <button className='btn-down' onClick={() => this._choseSortType(4, 'OFFLINE_SHOP_TODAY_SCAN_NUM', 'DESC')} /> : null}
            {/* 全店离线排序字段 */}
            {this.state.tabIndex === 'ALL_OFFLINE'
              ? <button className='btn-up' onClick={() => this._choseSortType(3, 'ALL_OFFLINE_SHOP_TODAY_SCAN_NUM', 'ASC')} /> : null}
            {this.state.tabIndex === 'ALL_OFFLINE'
              ? <button className='btn-down' onClick={() => this._choseSortType(4, 'ALL_OFFLINE_SHOP_TODAY_SCAN_NUM', 'DESC')} /> : null}
            <i className={this.state.sortActiveIndex === 3
                  ? 'dianfont icon-jiantou active'
                  : 'dianfont icon-jiantou'}
                    />
            <i className={this.state.sortActiveIndex === 4
                  ? 'dianfont icon-jiantou0101 active'
                  : 'dianfont icon-jiantou0101'} />
          </span>
          <span className='th wid04'>
            <em className='txt'>累计成<br />功订单</em>
            {/* 全部&急需维护排序字段 */}
            {this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN'
              ? <button className='btn-up' onClick={() => this._choseSortType(5, 'OFFLINE_SHOP_TODAY_SUCCESS_ORDER_NUM', 'ASC')} /> : null}
            {this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN'
              ? <button className='btn-down' onClick={() => this._choseSortType(6, 'OFFLINE_SHOP_TODAY_SUCCESS_ORDER_NUM', 'DESC')} /> : null}
            {/* 全店离线排序字段 */}
            {this.state.tabIndex === 'ALL_OFFLINE'
              ? <button className='btn-up' onClick={() => this._choseSortType(5, 'ALL_OFFLINE_SHOP_TODAY_SUCCESS_ORDER_NUM', 'ASC')} /> : null}
            {this.state.tabIndex === 'ALL_OFFLINE'
              ? <button className='btn-down' onClick={() => this._choseSortType(6, 'ALL_OFFLINE_SHOP_TODAY_SUCCESS_ORDER_NUM', 'DESC')} /> : null}
            <i className={this.state.sortActiveIndex === 5
                  ? 'dianfont icon-jiantou active'
                  : 'dianfont icon-jiantou'}
                    />
            <i className={this.state.sortActiveIndex === 6
                  ? 'dianfont icon-jiantou0101 active'
                  : 'dianfont icon-jiantou0101'}
                    />
          </span>
          <span className='th wid05'>
            <em className='txt'>累计退<br />款订单</em>
            {/* 全部&急需维护排序字段 */}
            {this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN'
              ? <button className='btn-up' onClick={() => this._choseSortType(7, 'OFFLINE_SHOP_TODAY_REFUND_ORDER_NUM', 'ASC')} /> : null}
            {this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN'
              ? <button className='btn-down' onClick={() => this._choseSortType(8, 'OFFLINE_SHOP_TODAY_REFUND_ORDER_NUM', 'DESC')} /> : null}
            {/* 全店离线排序字段 */}
            {this.state.tabIndex === 'ALL_OFFLINE'
              ? <button className='btn-up' onClick={() => this._choseSortType(7, 'ALL_OFFLINE_SHOP_TODAY_REFUND_ORDER_NUM', 'ASC')} /> : null}
            {this.state.tabIndex === 'ALL_OFFLINE'
              ? <button className='btn-down' onClick={() => this._choseSortType(8, 'ALL_OFFLINE_SHOP_TODAY_REFUND_ORDER_NUM', 'DESC')} /> : null}
            <i className={this.state.sortActiveIndex === 7
                  ? 'dianfont icon-jiantou active'
                  : 'dianfont icon-jiantou'}
                    />
            <i className={this.state.sortActiveIndex === 8
                  ? 'dianfont icon-jiantou0101 active'
                  : 'dianfont icon-jiantou0101'}
                    />
          </span>
        </div>
        {/* 异常处理 */}
        {(!this.props.list || !this.props.summaryData) && !this.props.error ? <Loading /> : null}
        {this.props.error ? <Error>{this.props.error.message}</Error> : null}
        {(!this.props.error && this.props.list && this.props.list.length === 0)
          ? <Notfound>暂无数据</Notfound>
          : null}
        {/* 数据列表 */}
        {this.props.list && this.props.summaryData && this.props.list.length > 0
          ?
          // <Pagination complete={this.props.complete} paging={this.props.paging} location={this.props.location} onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
            // {
              this.props.list && this.props.list.map((item, i) => {
                return <div key={i} className='device-cell'>
                  {/*<div className='shop clearfix'>*/}
                  <div className='shop clearfix' onClick={() => router.push('/shops/' + item.shopId || 0)}>
                    <div className='install'>
                      <p className='install-shop-name'>{item.shopName || ''}{(item.shopType === '0' || item.shopType === '1') ? <i className='shop-type zhiying'>直营</i> : item.shopType ? <i className='shop-type daili'>代理</i> : null}</p>
                      <p className='install-info'>员工：{item.shopSeller || ''} &nbsp; &nbsp;设备总数：{item.shopBoxNum || 0} &nbsp;&nbsp;离线设备数：{item.shopOfflineBoxNum || 0}</p>
                    </div>
                    <div className='install-chose'><i className='dianfont icon-xuanze' /></div>
                  </div>
                  <table className='summary'>
                    <tbody>
                      <tr className='tr clearfix' onClick={i === this.state.showIndex && this.state.isShow ? (e) => this._hide(e, i) : (e) => this._show(e, i, item.shopId)}>
                        <td className='wid01'>
                          门店合计：
                        </td>
                        <td className='wid03'>{item.todayScanNum || 0}</td>
                        <td className='wid04'>{item.totalSuccessOrderNum || 0}</td>
                        <td className='wid05'>{item.totalRefundOrderNum || 0}<i className='dianfont icon-fenlei' /></td>
                      </tr>
                    </tbody>
                  </table>
                  {this.props.deviceList && this.props.deviceList.length === 0 ? <div className={i === this.state.showIndex && this.state.isShow
                    ? 'child-notfound show'
                    : 'child-notfound hide'}>暂无设备</div>
                    : <table className={i === this.state.showIndex && this.state.isShow ? 'child-notfound show' : 'child-notfound hide'}>
                      <tbody>
                        {this.props.deviceList && this.props.deviceList.map((item2, j) => {
                          return (
                            <tr className='tr clearfix' key={j}>
                              <td className='wid01'>
                                <p className='device-name'>{item2.boxType}</p>
                                <p>{item2.boxNo || 0}</p>
                                <p>{item2.boxIsOnline === '0' ? <span className='status online green'>充电宝：{item2.boxPowerBankNum || 0}</span> : <span className='status red'>充电宝：{item2.boxPowerBankNum || 0}</span>}</p>
                                {/* <p>{item2.recycleTime ? <span className='grey'>回收</span> : null} <span style={{color: '#909090'}}>{item2.recycleTime}</span></p> */}
                                {item2.boxWhyOffline && item2.boxIsOnline !== '0' ? <p className='battery-use'>离线原因：{item2.boxWhyOffline}</p> : null}
                              </td>
                              <td className='wid03'>{item2.todayScanNum || 0}</td>
                              <td className='wid04'>{item2.totalSuccessOrderNum || 0}</td>
                              <td className='wid05'>{item2.totalRefundOrderNum || 0}</td>
                            </tr>
                          )
                        })
                        }
                      </tbody>
                    </table>}
                </div>
              })
            // }
          // </Pagination>
          : null}
      </div>
    )
  }

  // 列表数据的设备数据信息的显示隐藏
  _show (e, index, shopId) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({showIndex: index, isShow: true, shopId}, () => {
      this._getData(false, true)
    })
  }
  _hide (e, index) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({showIndex: index, isShow: false})
    this.props.actions.clearDeviceData()
  }

  _tab (status) {
    this.props.actions.cleanErrorMessage()
    this.props.actions.clearBoxDataAll()
    OFFSET = 1
    router.replace({
      pathname: location.pathname,
      query: assign({}, this.props.location.query, {
        role: this.props.location.query.role,
        tabIndex: status
      })})
    this.setState({
      tabIndex: status,
      sortActiveIndex: -1
    }, () => {
      this._getData()
    })
  }

  // 选择排序类型
  _choseSortType (index, sort, sortType) {
    this.props.actions.cleanErrorMessage()
    OFFSET = 1
    this.setState({
      sortActiveIndex: index,
      sortDesc: sort,
      sortType
    }, () => {
      this._getData()
    })
  }

  // 选择时间段
  _choseTime (level1, level2) {
    this.props.actions.cleanErrorMessage()
    OFFSET = 1
    router.replace({
      pathname: location.pathname,
      query: assign({}, this.props.location.query, {
        role: this.props.location.query.role,
        timeLevel1: level1.id,
        timeLevel1Index: level1.index,
        timeLevel2: level2.id
      })})
    this.setState({
      timeLevel1: level1.id,
      timeLevel1Index: level1.index,
      timeLevel2: level2.id,
      sortActiveIndex: -1
    }, () => {
      this._getData()
    })
    this._closeTime()
  }

  // 隐藏时间段
  _closeTime () {
    this.setState({
      isShowTime: false
    })
  }

  // ceo选择城市
  _choseCity (level1, level2, level3) {
    this.props.actions.cleanErrorMessage()
    OFFSET = 1
    this._closeCity()
    router.replace({
      pathname: location.pathname,
      query: assign({}, this.props.location.query, {
        level1: level1.id,
        level1Name: level1.name,
        level1Index: level1.index,
        level2: level2.id,
        level2Name: level2.name,
        level2Index: level2.index,
        level3: level3.id,
        level3Name: level3.name,
        level3Index: level3.index
      }
    )})
    this.setState({
      level1: level1.id,
      level2: level2.id,
      level3: level3.id,
      sortActiveIndex: -1
    }, () => {
      this._getData()
    })
  }

  // 选择小二
  _choseMembers (value, option) {
    this.props.actions.cleanErrorMessage()
    OFFSET = 1
    this._closeMembers()
    router.replace({
      pathname: location.pathname,
      query: assign({}, this.props.location.query, {
        memberId: option.value,
        memberName: option.key
      }
    )})
    this.setState({
      memberId: option.value,
      sortActiveIndex: -1
    }, () => {
      this._getData()
    })
  }

  // 关闭小二
  _closeMembers () {
    this.setState({
      isShowMember: false
    })
  }

  // ceo关闭城市
  _closeCity () {
    this.setState({
      isShowCity: false
    })
  }

  // 访问接口
  _getData (isPagging, isGetDetail) {
    if (!isGetDetail) {
      switch (this.props.location.query.role) {
        case 'ceo':
          this.props.actions.fetchBoxData({
            pageNum: isPagging ? OFFSET : 1,
            pageSize: PAGE_SIZE,
            tab: this.state.tabIndex || tabConfig[0].status,
            categoryId: this.state.shopType || 0,
            subCategoryId: this.state.shopSubType || 0,
            depType: this.state.level1 || 0,
            cityCode: this.state.level2 || 0,
            memberId: this.state.level3 || 0,
            dataSortField: this.state.sortDesc || (this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN' ? 'OFFLINE_SHOP_TODAY_SCAN_NUM' : 'ALL_OFFLINE_SHOP_TODAY_SCAN_NUM'),
            sortType: this.state.sortType || 'DESC',
            firLocation: 'TODAY_OFFLINE_DEVICE_NUM',
            secLocations: 'DETAILS_TOTAL_COUNT',
            startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
            endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
            dateFormat: 'yyyy-MM-dd HH:mm:ss'
          })
          this.props.actions.fetchBoxData({
            pageNum: isPagging ? OFFSET : 1,
            pageSize: PAGE_SIZE,
            tab: this.state.tabIndex || tabConfig[0].status,
            categoryId: this.state.shopType || 0,
            subCategoryId: this.state.shopSubType || 0,
            depType: this.state.level1 || 0,
            cityCode: this.state.level2 || 0,
            memberId: this.state.level3 || 0,
            dataSortField: this.state.sortDesc || (this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN' ? 'OFFLINE_SHOP_TODAY_SCAN_NUM' : 'ALL_OFFLINE_SHOP_TODAY_SCAN_NUM'),
            sortType: this.state.sortType || 'DESC',
            firLocation: 'TODAY_OFFLINE_DEVICE_NUM',
            secLocations: 'DETAILS_SHOP_COUNT',
            startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
            endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
            dateFormat: 'yyyy-MM-dd HH:mm:ss'
          })
          break
        case 'agentSellerManager':
          this.props.actions.fetchBoxData({
            pageNum: isPagging ? OFFSET : 1,
            pageSize: PAGE_SIZE,
            tab: this.state.tabIndex || tabConfig[0].status,
            categoryId: this.state.shopType || 0,
            subCategoryId: this.state.shopSubType || 0,
            memberId: this.state.memberId || 0,
            dataSortField: this.state.sortDesc || (this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN' ? 'OFFLINE_SHOP_TODAY_SCAN_NUM' : 'ALL_OFFLINE_SHOP_TODAY_SCAN_NUM'),
            sortType: this.state.sortType || 'DESC',
            firLocation: 'TODAY_OFFLINE_DEVICE_NUM',
            secLocations: 'DETAILS_TOTAL_COUNT',
            startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
            endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
            dateFormat: 'yyyy-MM-dd HH:mm:ss'
          })
          this.props.actions.fetchBoxData({
            pageNum: isPagging ? OFFSET : 1,
            pageSize: PAGE_SIZE,
            tab: this.state.tabIndex || tabConfig[0].status,
            categoryId: this.state.shopType || 0,
            subCategoryId: this.state.shopSubType || 0,
            memberId: this.state.memberId || 0,
            dataSortField: this.state.sortDesc || (this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN' ? 'OFFLINE_SHOP_TODAY_SCAN_NUM' : 'ALL_OFFLINE_SHOP_TODAY_SCAN_NUM'),
            sortType: this.state.sortType || 'DESC',
            firLocation: 'TODAY_OFFLINE_DEVICE_NUM',
            secLocations: 'DETAILS_SHOP_COUNT',
            startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
            endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
            dateFormat: 'yyyy-MM-dd HH:mm:ss'
          })
          break
        case 'agentSeller':
          this.props.actions.fetchBoxData({
            pageNum: isPagging ? OFFSET : 1,
            pageSize: PAGE_SIZE,
            tab: this.state.tabIndex || tabConfig[0].status,
            categoryId: this.state.shopType || 0,
            subCategoryId: this.state.shopSubType || 0,
            dataSortField: this.state.sortDesc || (this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN' ? 'OFFLINE_SHOP_TODAY_SCAN_NUM' : 'ALL_OFFLINE_SHOP_TODAY_SCAN_NUM'),
            sortType: this.state.sortType || 'DESC',
            firLocation: 'TODAY_OFFLINE_DEVICE_NUM',
            secLocations: 'DETAILS_TOTAL_COUNT',
            startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
            endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
            dateFormat: 'yyyy-MM-dd HH:mm:ss'
          })
          this.props.actions.fetchBoxData({
            pageNum: isPagging ? OFFSET : 1,
            pageSize: PAGE_SIZE,
            tab: this.state.tabIndex || tabConfig[0].status,
            categoryId: this.state.shopType || 0,
            subCategoryId: this.state.shopSubType || 0,
            dataSortField: this.state.sortDesc || (this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN' ? 'OFFLINE_SHOP_TODAY_SCAN_NUM' : 'ALL_OFFLINE_SHOP_TODAY_SCAN_NUM'),
            sortType: this.state.sortType || 'DESC',
            firLocation: 'TODAY_OFFLINE_DEVICE_NUM',
            secLocations: 'DETAILS_SHOP_COUNT',
            startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
            endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
            dateFormat: 'yyyy-MM-dd HH:mm:ss'
          })
          break
      }
    } else {
      switch (this.props.location.query.role) {
        case 'ceo':
          this.props.actions.fetchBoxData({
            tab: this.state.tabIndex || tabConfig[0].status,
            categoryId: this.state.shopType || 0,
            subCategoryId: this.state.shopSubType || 0,
            depType: this.state.level1 || 0,
            cityCode: this.state.level2 || 0,
            memberId: this.state.level3 || 0,
            dataSortField: this.state.sortDesc || (this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN' ? 'OFFLINE_SHOP_TODAY_SCAN_NUM' : 'ALL_OFFLINE_SHOP_TODAY_SCAN_NUM'),
            sortType: this.state.sortType || 'DESC',
            shopId: this.state.shopId,
            firLocation: 'TODAY_OFFLINE_DEVICE_NUM',
            secLocations: 'DETAILS_BOX_COUNT',
            startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
            endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
            dateFormat: 'yyyy-MM-dd HH:mm:ss'
          })
          break
        case 'agentSellerManager':
          this.props.actions.fetchBoxData({
            tab: this.state.tabIndex || tabConfig[0].status,
            categoryId: this.state.shopType || 0,
            subCategoryId: this.state.shopSubType || 0,
            memberId: this.state.memberId || 0,
            dataSortField: this.state.sortDesc || (this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN' ? 'OFFLINE_SHOP_TODAY_SCAN_NUM' : 'ALL_OFFLINE_SHOP_TODAY_SCAN_NUM'),
            shopId: this.state.shopId,
            sortType: this.state.sortType || 'DESC',
            firLocation: 'TODAY_OFFLINE_DEVICE_NUM',
            secLocations: 'DETAILS_BOX_COUNT',
            startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
            endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
            dateFormat: 'yyyy-MM-dd HH:mm:ss'
          })
          break
        case 'agentSeller':
          this.props.actions.fetchBoxData({
            tab: this.state.tabIndex || tabConfig[0].status,
            categoryId: this.state.shopType || 0,
            subCategoryId: this.state.shopSubType || 0,
            dataSortField: this.state.sortDesc || (this.state.tabIndex === 'ALL' || this.state.tabIndex === 'URGENT_MAINTAIN' ? 'OFFLINE_SHOP_TODAY_SCAN_NUM' : 'ALL_OFFLINE_SHOP_TODAY_SCAN_NUM'),
            sortType: this.state.sortType || 'DESC',
            shopId: this.state.shopId,
            firLocation: 'TODAY_OFFLINE_DEVICE_NUM',
            secLocations: 'DETAILS_BOX_COUNT',
            startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
            endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
            dateFormat: 'yyyy-MM-dd HH:mm:ss'
          })
          break
      }
    }
  }

  _paging () {
    OFFSET++
    this._getData(true)
  }

  // 隐藏类目list
  _closeShopType () {
    this.setState({
      isShowShoptype: false
    })
  }

  // 选择类目回调
  _choseShopType (shopType, shopSubType) {
    this.props.actions.cleanErrorMessage()
    OFFSET = 1
    this._closeShopType()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        shopSubType: shopSubType && shopSubType.id,
        shopSubTypeName: shopSubType && shopSubType.name,
        shopType: shopType && shopType.id
      })
    })
    this.setState({
      shopSubType: shopSubType && shopSubType.id,
      shopType: shopType && shopType.id,
      sortActiveIndex: -1
    }, () => {
      this._getData()
    })
  }
}

function mapStateToProps (state, ownProps) {
  let typeAndSubType = state.common && state.common.typeAndSubType
  if (typeAndSubType && typeAndSubType.type[0].id !== 0) {
    typeAndSubType.type.unshift({id: 0, name: '类目'})
  }
  let memberList = [{value: 0, key: '小二'}]
  state.common && state.common.bdMembers && state.common.bdMembers.map((item, i) => {
    item.member.map((item2, j) => {
      if (item2.id !== 0) {
        memberList.push({value: item2.id, key: item2.nickName})
      }
    })
  })
  return {
    error: state.errorMessage,
    list: state.boxData && state.boxData.list,
    complete: state.boxData && state.boxData.complete,
    paging: state.boxData && state.boxData.paging,
    memberList: memberList,
    summaryData: state.boxData && state.boxData.summaryData,
    deviceList: state.boxData && state.boxData.deviceList,
    isGotDevice: state.boxData && state.boxData.isGotDevice,
    shopTypeList: typeAndSubType,
    cityLevelList: state.common && state.common.cityLevel3List
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)

