/**
 * Created by fanli on 2017/7/12.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Style from './index.less'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import SelectCityLevel3 from 'components/common/selectLevel3'
import SelectTimeLevel2 from 'components/common/selectLevel2'
import SelectShopType from 'components/common/selectShopType'
import ScrollOnTop from 'components/common/scrollOnTop'
import Select from 'components/common/nakedSelect'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/boxData'
import * as commonActions from 'actions/common'
import assign from 'lodash/assign'
import { router, limitFontSize } from 'utils'

class Container extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    let nowDate = new Date(),
      year = nowDate.getFullYear(),
      month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1,
      date = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
    this.state = {
      isShowMonth: false,
      isShowCity: false,
      isShowMember: false,
      sortActiveIndex: -1,
      sortDesc: '',
      sortType: '',
      level1: this.props.location.query.level1 || 0,
      level2: this.props.location.query.level2 || 0,
      level3: this.props.location.query.level3 || 0,
      memberId: this.props.location.query.memberId || 0,
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
  }
  componentWillReceiveProps (nextProps) {
    // 页面初始化时 先按日期排序
    if (!this.props.error && nextProps.list && nextProps.list !== this.props.list && nextProps.list.length > 0) {
      let list = nextProps.list
      this.setState({
        sortList: list.sort((a, b) => {
          return parseInt(b['listDate'] || 0) - parseInt(a['listDate' || 0])
        })
      })
    }
  }
  componentDidMount () {
    Bridge.setNavTitle('当日-成功订单金额')
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
      <div>
        {/** **************************** ceo 筛选 ******************************/}
        {this.props.location.query.role === 'ceo'
          ? <div className='select-wap select-wap-ceo'>
            {/* 城市 */}
            <button className='select city-level-3' onClick={() => this.setState({isShowCity: true})}>
              {limitFontSize(this.props.location.query.level3Name || '城市', 4, true)}
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
          </div>
          : null}
        {/** **************************** BD主管 筛选 ******************************/}
        {this.props.location.query.role === 'agentSellerManager'
          ? <div className='select-wap select-wap-bd-manager'>
            {/* 小二 */}
            <button className='select members' onClick={() => this.setState({isShowMember: true})}>
              {limitFontSize(this.props.location.query.memberName || '小二', 4, true)}
              {this.state.isShowMember ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            <Select
              options={this.props.memberList ? this.props.memberList : [{key: '小二', value: 0}]}
              onChose={this._choseMembers.bind(this)}
              selectedValue={parseInt(this.props.location.query.memberId) || 0}
              onClose={this._closeMembers.bind(this)}
              isShow={this.state.isShowMember} />
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
          </div>
          : null}
        {/** **************************** BD 筛选 ******************************/}
        {this.props.location.query.role === 'agentSeller'
          ? <div className='select-wap select-wap-bd'>
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
          </div>
          : null}
        {/* 合计 */}
        {this.props.summaryData && !this.props.error
        ? <div className='summary'>
          <span className='summary-ele'>
            <span className='num'>{(parseFloat(this.props.summaryData.todayIceDeposit || 0) / 100).toFixed(2)}</span>
            <span className='desc'>当日押金总额</span>
          </span>
          <span className='summary-ele'>
            <span className='num'>{(parseFloat(this.props.summaryData.todayChargeMoney || 0) / 100).toFixed(2)}</span>
            <span className='desc'>当日充值金额</span>
          </span>
          <span className='summary-ele'>
            <span className='num'>{(parseFloat(this.props.summaryData.todaySuccessOrderMoney || 0) / 100).toFixed(2)}</span>
            <span className='desc'>当日成功订单金额</span>
          </span>
          <span className='summary-ele'>
            <span className='num'>{(parseFloat(this.props.summaryData.todayAccountBalance || 0) / 100).toFixed(2)}</span>
            <span className='desc'>当日充值总余额</span>
          </span>
        </div> : null}
        {/* 表格标题 */}
        <ScrollOnTop className="scroll-on-top-wap">
          <div className='table-head'>
            <span className='th wid01'>
              <em className='txt'>时间</em>
              <button className='btn-up'
                onClick={() => this._choseSortType(1, 'listDate', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(2, 'listDate', 'DESC')} />
              <i className={this.state.sortActiveIndex === 1
                ? 'dianfont icon-jiantou active'
                : 'dianfont icon-jiantou'} />
              <i className={this.state.sortActiveIndex === 2
                ? 'dianfont icon-jiantou0101 active'
                : 'dianfont icon-jiantou0101'} />
            </span>
            <span className='th wid02'>
              <em className='txt'>押金<br />金额</em>
              <button className='btn-up' onClick={() => this._choseSortType(3, 'todayIceDepositList', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(4, 'todayIceDepositList', 'DESC')} />
              <i className={this.state.sortActiveIndex === 3
                ? 'dianfont icon-jiantou active'
                : 'dianfont icon-jiantou'} />
              <i className={this.state.sortActiveIndex === 4
                ? 'dianfont icon-jiantou0101 active'
                : 'dianfont icon-jiantou0101'} />
            </span>
            <span className='th wid03'>
              <em className='txt'>充值<br />金额</em>
              <button className='btn-up' onClick={() => this._choseSortType(5, 'todayChargeMoneyList', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(6, 'todayChargeMoneyList', 'DESC')} />
              <i className={this.state.sortActiveIndex === 5
                ? 'dianfont icon-jiantou active'
                : 'dianfont icon-jiantou'} />
              <i className={this.state.sortActiveIndex === 6
                ? 'dianfont icon-jiantou0101 active'
                : 'dianfont icon-jiantou0101'} />
            </span>
            <span className='th wid04'>
              <em className='txt'>成功订<br />单金额</em>
              <button className='btn-up' onClick={() => this._choseSortType(7, 'todaySuccessOrderMoneyList', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(8, 'todaySuccessOrderMoneyList', 'DESC')} />
              <i className={this.state.sortActiveIndex === 7
                ? 'dianfont icon-jiantou active'
                : 'dianfont icon-jiantou'} />
              <i className={this.state.sortActiveIndex === 8
                ? 'dianfont icon-jiantou0101 active'
                : 'dianfont icon-jiantou0101'} />
            </span>
          </div>
        </ScrollOnTop>
        {/* 异常处理 */}
        {(!this.props.list || !this.props.summaryData) && !this.props.error ? <Loading /> : null}
        {this.props.error ? <Error>{this.props.error.message}</Error> : null}
        {(!this.props.error && this.props.list && this.props.list.length === 0) ? <Notfound>暂无数据</Notfound> : null}
        {/* 数据列表 */}
        {this.props.list && this.props.summaryData && this.props.list.length > 0
          ? this.state.sortList.map((item, i) => {
            return <div className='table-line' key={i}>
              <span className='td wid01'>{item.listDate}</span>
              <span className='td wid02'>{(parseFloat(item.todayIceDepositList || 0) / 100).toFixed(2)}</span>
              <span className='td wid03'>{(parseFloat(item.todayChargeMoneyList || 0) / 100).toFixed(2)}</span>
              <span className='td wid04'>{(parseFloat(item.todaySuccessOrderMoneyList || 0) / 100).toFixed(2)}</span>
            </div>
          }) : null}
      </div>
    )
  }

  // 选择排序类型点击三角(sort 排序字段，sortType 排序类型)
  _choseSortType (index, sort, sortType) {
    this.props.actions.cleanErrorMessage()
    this.setState({
      sortActiveIndex: index
    })
    let list = this.props.list
    switch (sortType) {
      case 'ASC':
        this.setState({
          sortList: list.sort((a, b) => { return parseInt(a[sort] || 0) - parseInt(b[sort] || 0) })
        })
        break
      case 'DESC':
        this.setState({
          sortList: list.sort((a, b) => { return parseInt(b[sort] || 0) - parseInt(a[sort] || 0) })
        })
        break
    }
  }

  // ceo选择城市
  _choseCity (level1, level2, level3) {
    this.props.actions.cleanErrorMessage()
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

  // 选择时间段
  _choseTime (level1, level2) {
    this.props.actions.cleanErrorMessage()
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

  // ceo关闭城市
  _closeCity () {
    this.setState({
      isShowCity: false
    })
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

  // 访问接口
  _getData () {
    switch (this.props.location.query.role) {
      case 'ceo':
        // 合计数据
        this.props.actions.fetchBoxData({
          tab: this.state.tabIndex,
          categoryId: this.state.shopType || 0,
          subCategoryId: this.state.shopSubType || 0,
          depType: this.state.level1 || 0,
          cityCode: this.state.level2 || 0,
          memberId: this.state.level3 || 0,
          firLocation: 'TODAY_SUC_ORDER_MONEY',
          secLocations: 'DETAILS_TOTAL_COUNT',
          startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
          endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
          dateFormat: 'yyyy-MM-dd HH:mm:ss'
        })
        // 列表
        this.props.actions.fetchBoxData({
          tab: this.state.tabIndex,
          categoryId: this.state.shopType || 0,
          subCategoryId: this.state.shopSubType || 0,
          depType: this.state.level1 || 0,
          cityCode: this.state.level2 || 0,
          memberId: this.state.level3 || 0,
          firLocation: 'TODAY_SUC_ORDER_MONEY',
          secLocations: 'DETAILS_SHOP_COUNT',
          startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
          endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
          dateFormat: 'yyyy-MM-dd HH:mm:ss'
        })
        break
      case 'agentSellerManager':
        // 合计数据
        this.props.actions.fetchBoxData({
          tab: this.state.tabIndex,
          categoryId: this.state.shopType || 0,
          subCategoryId: this.state.shopSubType || 0,
          memberId: this.state.memberId || 0,
          firLocation: 'TODAY_SUC_ORDER_MONEY',
          secLocations: 'DETAILS_TOTAL_COUNT',
          startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
          endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
          dateFormat: 'yyyy-MM-dd HH:mm:ss'
        })
        // 列表数据
        this.props.actions.fetchBoxData({
          tab: this.state.tabIndex,
          categoryId: this.state.shopType || 0,
          subCategoryId: this.state.shopSubType || 0,
          memberId: this.state.memberId || 0,
          firLocation: 'TODAY_SUC_ORDER_MONEY',
          secLocations: 'DETAILS_SHOP_COUNT',
          startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
          endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
          dateFormat: 'yyyy-MM-dd HH:mm:ss'
        })
        break
      case 'agentSeller':
        // 合计数据
        this.props.actions.fetchBoxData({
          tab: this.state.tabIndex,
          categoryId: this.state.shopType || 0,
          subCategoryId: this.state.shopSubType || 0,
          firLocation: 'TODAY_SUC_ORDER_MONEY',
          secLocations: 'DETAILS_TOTAL_COUNT',
          startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
          endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
          dateFormat: 'yyyy-MM-dd HH:mm:ss'
        })
        // 列表数据
        this.props.actions.fetchBoxData({
          tab: this.state.tabIndex,
          categoryId: this.state.shopType || 0,
          subCategoryId: this.state.shopSubType || 0,
          firLocation: 'TODAY_SUC_ORDER_MONEY',
          secLocations: 'DETAILS_SHOP_COUNT',
          startDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[0] + ':' + '00:00',
          endDate: this.state.timeLevel1 + ' ' + this.state.timeLevel2.split('-')[1] + ':' + '00:00',
          dateFormat: 'yyyy-MM-dd HH:mm:ss'
        })
        break
    }
  }
}

function mapStateToProps (state, ownProps) {
  let typeAndSubType = state.common && state.common.typeAndSubType
  if (typeAndSubType && typeAndSubType.type[0].id !== 0) {
    typeAndSubType.type.unshift({id: 0, name: '类目'})
  }
  // 小二数据重组
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
    memberList: memberList,
    shopTypeList: typeAndSubType,
    summaryData: state.boxData && state.boxData.summaryData,
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

