import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Style from './index.less'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/paginationA'
import SelectShopType from 'components/common/selectShopType'
import SelectCityLevel3 from 'components/common/selectLevel3'
import Select from 'components/common/nakedSelect'
import ScrollOnTop from 'components/common/scrollOnTop'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/data'
import * as commonActions from 'actions/common'
import Tabs, { Tab } from 'components/common/tabs'
import assign from 'lodash/assign'
import { router, limitFontSize } from 'utils'
import Search from 'components/common/search'
import RecoveryItem from './recovery/'
import { DEPARTMENT_LIST } from 'constants/departmentList'

const PAGE_SIZE = 20
const tabConfig = [
  {status: 0, name: '全部'},
  {status: 1, name: '全店回收'},
  {status: 2, name: '部分回收'}]

class Container extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      isisShowShoptype: false,
      tabIndex: this.props.location.query.tabIndex || 0,
      isisShowDepartment: false,
      isShowCity: false,
      isShowMember: false,
      sortActiveIndex: -1,
      sortDesc: '',
      sortType: ''
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
    sessionStorage.setItem(`${this.props.location.pathname}_search`, this.props.location.search)
  }

  componentDidMount () {
    Bridge.setNavTitle('累计回收设备成功订单数')
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
    return (
      <div>
        <Search onClick={this._search.bind(this)} placeholder={'搜索门店'} />
        {/** **************************** ceo 筛选 ******************************/}
        {this.props.location.query.role === 'ceo'
          ? <div className='select-wap select-wap-ceo'>
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
            {/* 城市 */}
            <button className='select city-level-3' onClick={() => this.setState({isShowCity: true})}>
              {limitFontSize(this.props.location.query.level3Name || '城市', 3, true)}
              {this.state.isShowCity ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            <SelectCityLevel3
              options={this.props.cityLevelList}
              onChose={this._choseCity.bind(this)}
              activeOptions={{
                level1: this.props.location.query.level1 || 0,
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
            {/* 部门 */}
            <button className='select department' onClick={() => this.setState({isShowDepartment: true})}>
              {limitFontSize(this.props.location.query.departmentName || '所有部门', 3, true)}
              {this.state.isShowDepartment ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            <Select
              options={DEPARTMENT_LIST}
              onChose={this._choseDepartment.bind(this)}
              selectedValue={this.props.location.query.departmentId || DEPARTMENT_LIST[0].value}
              onClose={this._closeDepartment.bind(this)}
              isShow={this.state.isShowDepartment} />
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
              highlight={item.status === (parseInt(this.props.location.query.tabIndex) || tabConfig[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.name}
            </Tab>
          })}
        </Tabs>
        {/* 合计 */}
        {this.props.summaryData && !this.props.error
        ? <div className='total'>
          <p className='total-title'>合计：</p>
          <ul className='clearfix'>
            <li>门店数：{this.props.summaryData.shopNo || 0}</li>
            <li>设备数：{this.props.summaryData.deviceNo || 0}</li>
            <li>成功订单：{this.props.summaryData.successOrderNo || 0}</li>
            <li>退款订单：{this.props.summaryData.refundOrderNo || 0}</li>
          </ul>
        </div> : null}
        {/* 表格标题 */}
        <ScrollOnTop className="scroll-on-top-wap">
          <div className='recovery-head'>
            <span className='th wid01'>
              <em className='txt'>设备编号</em>
            </span>
            <span className='th wid02'>
              <em className='txt'>成功<br />订单</em>
              <button className='btn-up' onClick={() => this._choseSortType(1, 'TOTAL_PAY_NUM', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(2, 'TOTAL_PAY_NUM', 'DESC')} />
              <i className={this.state.sortActiveIndex === 1
                    ? 'dianfont icon-jiantou active'
                    : 'dianfont icon-jiantou'}
                      />
              <i className={this.state.sortActiveIndex === 2
                    ? 'dianfont icon-jiantou0101 active'
                    : 'dianfont icon-jiantou0101'}
                      />
            </span>
            <span className='th wid03'>
              <em className='txt'>退款<br />订单</em>
              <button className='btn-up' onClick={() => this._choseSortType(3, 'TOTAL_REFUN', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(4, 'TOTAL_REFUN', 'DESC')} />
              <i className={this.state.sortActiveIndex === 3
                    ? 'dianfont icon-jiantou active'
                    : 'dianfont icon-jiantou'}
                      />
              <i className={this.state.sortActiveIndex === 4
                    ? 'dianfont icon-jiantou0101 active'
                    : 'dianfont icon-jiantou0101'} />
            </span>
            <span className='th wid04'>
              <em className='txt'>设备日均<br />订单数</em>
              <button className='btn-up' onClick={() => this._choseSortType(5, 'TOTAL_AVERAGE_ORDER', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(6, 'TOTAL_AVERAGE_ORDER', 'DESC')} />
              <i className={this.state.sortActiveIndex === 5
                    ? 'dianfont icon-jiantou active'
                    : 'dianfont icon-jiantou'}
                      />
              <i className={this.state.sortActiveIndex === 6
                    ? 'dianfont icon-jiantou0101 active'
                    : 'dianfont icon-jiantou0101'}
                      />
            </span>
          </div>
        </ScrollOnTop>
        {/* 异常处理 */}
        {(!this.props.recoveryList) && !this.props.error ? <Loading />
          : null}
        {this.props.error ? <Error>{this.props.error.message}</Error> : null}
        {(!this.props.error && this.props.recoveryList && this.props.recoveryList.length === 0)
          ? <Notfound>暂无数据</Notfound>
          : null}
        {/* 数据列表 */}
        {!this.props.error && this.props.recoveryList && this.props.recoveryList.length > 0
          ? <Pagination complete={this.props.complete} paging={this.props.paging} location={this.props.location} onPaging={() => { this._paging(this.props.recoveryList) }} data={this.props.recoveryList} size={PAGE_SIZE}>
            {
              this.props.recoveryList && this.props.recoveryList.map((item, i) => {
                return <RecoveryItem key={i} index={i} {...item} />
              })
            }
          </Pagination> : null}
      </div>
    )
  }

  _tab (status) {
    router.replace({
      pathname: location.pathname,
      query: assign({}, this.props.location.query,
        {
          role: this.props.location.query.role,
          tabIndex: status
        })
    })
    this.setState({
      tabIndex: status
    }, () => {
      this._getData()
    })
  }

  _search (value) {
    router.push('/shop/search?keyword=' + value)
  }

  // 选择排序类型
  _choseSortType (index, sort, sortType) {
    this.setState({
      sortActiveIndex: index,
      sortDesc: sort,
      sortType
    }, () => {
      this._getData()
    })
  }

  // ceo选择城市
  _choseCity (level1, level2, level3) {
    this._closeCity()
    router.replace({
      pathname: location.pathname,
      query: assign({}, this.props.location.query,
        {
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
      )
    })
    this.setState({
      level1: level1.id,
      level2: level2.id,
      level3: level3.id
    }, () => {
      this._getData()
    })
  }

  // 选择小二
  _choseMembers (value, option) {
    this._closeMembers()
    router.replace({
      pathname: location.pathname,
      query: assign({}, this.props.location.query, {
        memberId: option.value,
        memberName: option.key
      }
      )
    })
    this.setState({
      memberId: option.value
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

  // ceo选择部门
  _choseDepartment (value, option) {
    this._closeDepartment()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query,
        {
          departmentId: value,
          departmentName: option.key
        })
    })
    this.setState({
      departmentId: value
    }, () => {
      this._getData()
    })
  }

  // ceo关闭部门显示列表
  _closeDepartment () {
    this.setState({
      isShowDepartment: false
    })
  }

  // 访问接口
  _getData (isPagging, len) {
    switch (this.props.location.query.role) {
      case 'ceo':
        this.props.actions.fetchSummaryRecoveryList({
          offset: isPagging ? len : 0,
          pageSize: PAGE_SIZE,
          recycleType: this.state.tabIndex || 0,
          shopType: this.state.shopType || 0,
          shopSubType: this.state.shopSubType || 0,
          depType: this.state.level1 || 0,
          cityCode: this.state.level2 || 0,
          memberId: this.state.level3 || 0,
          dataSortField: this.state.sortDesc || 'TOTAL_PAY_NUM',
          sortType: this.state.sortType || 'DESC'
        })
        break
      case 'agentSellerManager':
        this.props.actions.fetchSummaryRecoveryList({
          offset: isPagging ? len : 0,
          pageSize: PAGE_SIZE,
          recycleType: this.state.tabIndex || 0,
          shopType: this.state.shopType || 0,
          shopSubType: this.state.shopSubType || 0,
          memberId: this.state.memberId || 0,
          dataSortField: this.state.sortDesc || 'TOTAL_PAY_NUM',
          sortType: this.state.sortType || 'DESC'
        })
        break
      case 'agentSeller':
        this.props.actions.fetchSummaryRecoveryList({
          offset: isPagging ? len : 0,
          pageSize: PAGE_SIZE,
          recycleType: this.state.tabIndex || 0,
          shopType: this.state.shopType || 0,
          shopSubType: this.state.shopSubType || 0,
          dataSortField: this.state.sortDesc || 'TOTAL_PAY_NUM',
          sortType: this.state.sortType || 'DESC'
        })
        break
    }
  }

  _paging (list) {
    this._getData(true, list.length)
  }

  // 隐藏类目list
  _closeShopType () {
    this.setState({
      isShowShoptype: false
    })
  }

  // 选择类目回调
  _choseShopType (shopType, shopSubType) {
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
      shopType: shopType && shopType.id
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
    recoveryList: state.bdSummaryDataRecoveryPage && state.bdSummaryDataRecoveryPage.recoveryList,
    complete: state.bdSummaryDataRecoveryPage && state.bdSummaryDataRecoveryPage.complete,
    paging: state.bdSummaryDataRecoveryPage && state.bdSummaryDataRecoveryPage.paging,
    memberList: memberList,
    summaryData: state.bdSummaryDataRecoveryPage && state.bdSummaryDataRecoveryPage.summaryData,
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
