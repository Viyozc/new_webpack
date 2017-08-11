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
import SelectShopType from 'components/common/selectShopType'
import Select from 'components/common/nakedSelect'
import ScrollOnTop from 'components/common/scrollOnTop'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/boxData'
import * as commonActions from 'actions/common'
import assign from 'lodash/assign'
import { router, limitFontSize } from 'utils'

const DATEFILTERTYPE = [
  {key: '按月', value: 'MONTH'},
  {key: '按日', value: 'DAY'}
]
class Container extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
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
      timeId: this.props.location.query.timeId || DATEFILTERTYPE[0].value
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
          let date1, date2
          if (parseInt(a['listDate'].split('-')[0]) < 100) {
            let month = parseInt(a['listDate'].split('-')[0]),
              date = parseInt(a['listDate'].split('-')[1])
            date1 = new Date().getFullYear() + '-' + month < 10 ? '0' + month : month + '-' + date
          } else {
            let year = a['listDate'].split('-')[0],
              month = parseInt(a['listDate'].split('-')[1]),
              date = '01'
            date1 = year + '-' + (month < 10 ? '0' + month : month) + '-' + date
          }
          if (parseInt(b['listDate'].split('-')[0]) < 100) {
            let month = parseInt(b['listDate'].split('-')[0]),
              date = parseInt(b['listDate'].split('-')[1])
            date2 = new Date().getFullYear() + '-' + month < 10 ? '0' + month : month + '-' + date
          } else {
            let year = b['listDate'].split('-')[0],
              month = parseInt(b['listDate'].split('-')[1]),
              date = '01'
            date2 = year + '-' + (month < 10 ? '0' + month : month) + '-' + date
          }
          return new Date(date2).getTime() - new Date(date1).getTime()
        })
      })
    }
  }
  componentDidMount () {
    Bridge.setNavTitle('累计-未归还充电宝')
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
            {/* 时间（按月／按日） */}
            <button className='select times' onClick={() => this.setState({isShowTime: true})}>
              {limitFontSize(this.props.location.query.timeName || DATEFILTERTYPE[0].key, 4, true)}
              {this.state.isShowTime ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            <Select
              options={DATEFILTERTYPE}
              onChose={this._choseTime.bind(this)}
              selectedValue={this.state.timeId || DATEFILTERTYPE[0].value}
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
            {/* 时间（按月／按日） */}
            <button className='select times' onClick={() => this.setState({isShowTime: true})}>
              {limitFontSize(this.props.location.query.timeName || DATEFILTERTYPE[0].key, 4, true)}
              {this.state.isShowTime ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            <Select
              options={DATEFILTERTYPE}
              onChose={this._choseTime.bind(this)}
              selectedValue={this.state.timeId || DATEFILTERTYPE[0].value}
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
            {/* 时间（按月／按天） */}
            <button className='select times' onClick={() => this.setState({isShowTime: true})}>
              {limitFontSize(this.props.location.query.timeName || DATEFILTERTYPE[0].key, 4, true)}
              {this.state.isShowTime ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
            </button>
            <Select
              options={DATEFILTERTYPE}
              onChose={this._choseTime.bind(this)}
              selectedValue={this.state.timeId || DATEFILTERTYPE[0].value}
              onClose={this._closeTime.bind(this)}
              isShow={this.state.isShowTime} />
          </div>
          : null}
        {/* 合计 */}
        {this.props.summaryData && !this.props.error
        ? <div className='summary'>
          <span className='num'>{this.props.summaryData.totalNotReturnDeviceNum || 0}</span>
          <span className='desc'>累计未归还充电宝</span>
        </div> : <div className='summary' />}
        {/* 表格标题 */}
        <ScrollOnTop className="scroll-on-top-wap">
          <div className='table-head'>
            <span className='th wid01'>
              <em className='txt'>时间</em>
              <button className='btn-up' onClick={() => this._choseSortType(1, 'listDate', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(2, 'listDate', 'DESC')} />
              <i className={this.state.sortActiveIndex === 1
                    ? 'dianfont icon-jiantou active'
                    : 'dianfont icon-jiantou'}
                      />
              <i className={this.state.sortActiveIndex === 2
                    ? 'dianfont icon-jiantou0101 active'
                    : 'dianfont icon-jiantou0101'}
                      />
            </span>
            <span className='th wid02'>
              <em className='txt'>借出<br />数量</em>
              <button className='btn-up' onClick={() => this._choseSortType(3, 'totalLoanDeviceNumList', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(4, 'totalLoanDeviceNumList', 'DESC')} />
              <i className={this.state.sortActiveIndex === 3
                    ? 'dianfont icon-jiantou active'
                    : 'dianfont icon-jiantou'}
                      />
              <i className={this.state.sortActiveIndex === 4
                    ? 'dianfont icon-jiantou0101 active'
                    : 'dianfont icon-jiantou0101'}
                      />
            </span>
            <span className='th wid03'>
              <em className='txt'>归还<br />数量</em>
              <button className='btn-up' onClick={() => this._choseSortType(5, 'totalReturnDeviceNumList', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(6, 'totalReturnDeviceNumList', 'DESC')} />
              <i className={this.state.sortActiveIndex === 5
                    ? 'dianfont icon-jiantou active'
                    : 'dianfont icon-jiantou'}
                      />
              <i className={this.state.sortActiveIndex === 6
                    ? 'dianfont icon-jiantou0101 active'
                    : 'dianfont icon-jiantou0101'}
                      />
            </span>
            <span className='th wid04'>
              <em className='txt'>未归还<br />充电宝</em>
              <button className='btn-up' onClick={() => this._choseSortType(7, 'totalNotReturnDeviceNumList', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(8, 'totalNotReturnDeviceNumList', 'DESC')} />
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
        </ScrollOnTop>
        {/* 异常处理 */}
        {(!this.props.list || !this.props.summaryData) && !this.props.error ? <Loading />
          : null}
        {(this.props.error)
          ? <Error>{this.props.error.message}</Error>
          : null}
        {(!this.props.error && this.props.list && this.props.list.length === 0)
          ? <Notfound>暂无数据</Notfound>
          : null}
        {/* 数据列表 */}
        {this.props.list && this.props.summaryData && this.props.list.length > 0
          ? this.state.sortList.map((item, i) => {
            return <div className='table-line' key={i}>
              <span className='td wid01'>{item.listDate}</span>
              <span className='td wid02'>{item.totalLoanDeviceNumList || 0}</span>
              <span className='td wid03'>{item.totalReturnDeviceNumList || 0}</span>
              <span className='td wid04'>{item.totalNotReturnDeviceNumList || 0}</span>
            </div>
          }) : null
            }
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
        if (sort === 'listDate') {
          this.setState({
            sortList: list.sort((a, b) => {
              let date1, date2
              if (parseInt(a['listDate'].split('-')[0]) < 100) {
                let month = parseInt(a['listDate'].split('-')[0]),
                  date = parseInt(a['listDate'].split('-')[1])
                date1 = new Date().getFullYear() + '-' + month < 10 ? '0' + month : month + '-' + date
              } else {
                let year = a['listDate'].split('-')[0],
                  month = parseInt(a['listDate'].split('-')[1]),
                  date = '01'
                date1 = year + '-' + (month < 10 ? '0' + month : month) + '-' + date
              }
              if (parseInt(b['listDate'].split('-')[0]) < 100) {
                let month = parseInt(b['listDate'].split('-')[0]),
                  date = parseInt(b['listDate'].split('-')[1])
                date2 = new Date().getFullYear() + '-' + month < 10 ? '0' + month : month + '-' + date
              } else {
                let year = b['listDate'].split('-')[0],
                  month = parseInt(b['listDate'].split('-')[1]),
                  date = '01'
                date2 = year + '-' + (month < 10 ? '0' + month : month) + '-' + date
              }
              return new Date(date1).getTime() - new Date(date2).getTime()
            })
          })
        } else {
          this.setState({
            sortList: list.sort((a, b) => {
              return parseInt(a[sort] || 0) - parseInt(b[sort] || 0)
            })
          })
        }
        break
      case 'DESC':
        if (sort === 'listDate') {
          this.setState({
            sortList: list.sort((a, b) => {
              let date1, date2
              if (parseInt(a['listDate'].split('-')[0]) < 100) {
                let month = parseInt(a['listDate'].split('-')[0]),
                  date = parseInt(a['listDate'].split('-')[1])
                date1 = new Date().getFullYear() + '-' + month < 10 ? '0' + month : month + '-' + date
              } else {
                let year = a['listDate'].split('-')[0],
                  month = parseInt(a['listDate'].split('-')[1]),
                  date = '01'
                date1 = year + '-' + (month < 10 ? '0' + month : month) + '-' + date
              }
              if (parseInt(b['listDate'].split('-')[0]) < 100) {
                let month = parseInt(b['listDate'].split('-')[0]),
                  date = parseInt(b['listDate'].split('-')[1])
                date2 = new Date().getFullYear() + '-' + month < 10 ? '0' + month : month + '-' + date
              } else {
                let year = b['listDate'].split('-')[0],
                  month = parseInt(b['listDate'].split('-')[1]),
                  date = '01'
                date2 = year + '-' + (month < 10 ? '0' + month : month) + '-' + date
              }
              return new Date(date2).getTime() - new Date(date1).getTime()
            })
          })
        } else {
          this.setState({
            sortList: list.sort((a, b) => { return parseInt(b[sort] || 0) - parseInt(a[sort] || 0) })
          })
        }
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
  _choseTime (value, option) {
    this.props.actions.cleanErrorMessage()
    this._closeTime()
    router.replace({
      pathname: location.pathname,
      query: assign({}, this.props.location.query, {
        timeId: option.value,
        timeName: option.key
      }
    )})
    this.setState({
      timeId: option.value,
      sortActiveIndex: -1
    }, () => {
      this._getData()
    })
  }

  // 关闭小二
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
          categoryId: this.state.shopType || 0,
          subCategoryId: this.state.shopSubType || 0,
          depType: this.state.level1 || 0,
          cityCode: this.state.level2 || 0,
          memberId: this.state.level3 || 0,
          firLocation: 'TOTAL_NOT_RETURN_DEVICE_NUM',
          secLocations: 'DETAILS_TOTAL_COUNT',
          dateFilterType: this.state.timeId
        })
        // 列表
        this.props.actions.fetchBoxData({
          categoryId: this.state.shopType || 0,
          subCategoryId: this.state.shopSubType || 0,
          depType: this.state.level1 || 0,
          cityCode: this.state.level2 || 0,
          memberId: this.state.level3 || 0,
          firLocation: 'TOTAL_NOT_RETURN_DEVICE_NUM',
          secLocations: 'DETAILS_SHOP_COUNT',
          dateFilterType: this.state.timeId
        })
        break
      case 'agentSellerManager':
        // 合计数据
        this.props.actions.fetchBoxData({
          categoryId: this.state.shopType || 0,
          subCategoryId: this.state.shopSubType || 0,
          memberId: this.state.memberId || 0,
          firLocation: 'TOTAL_NOT_RETURN_DEVICE_NUM',
          secLocations: 'DETAILS_TOTAL_COUNT',
          dateFilterType: this.state.timeId
        })
        // 列表数据
        this.props.actions.fetchBoxData({
          categoryId: this.state.shopType || 0,
          subCategoryId: this.state.shopSubType || 0,
          memberId: this.state.memberId || 0,
          firLocation: 'TOTAL_NOT_RETURN_DEVICE_NUM',
          secLocations: 'DETAILS_SHOP_COUNT',
          dateFilterType: this.state.timeId
        })
        break
      case 'agentSeller':
        // 合计数据
        this.props.actions.fetchBoxData({
          categoryId: this.state.shopType || 0,
          subCategoryId: this.state.shopSubType || 0,
          firLocation: 'TOTAL_NOT_RETURN_DEVICE_NUM',
          secLocations: 'DETAILS_TOTAL_COUNT',
          dateFilterType: this.state.timeId
        })
        // 列表数据
        this.props.actions.fetchBoxData({
          categoryId: this.state.shopType || 0,
          subCategoryId: this.state.shopSubType || 0,
          firLocation: 'TOTAL_NOT_RETURN_DEVICE_NUM',
          secLocations: 'DETAILS_SHOP_COUNT',
          dateFilterType: this.state.timeId
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
