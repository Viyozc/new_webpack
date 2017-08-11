import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Style from './detail.less'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import SelectCityLevel3 from 'components/common/selectLevel3'
import Select from 'components/common/nakedSelect'
import ScrollOnTop from 'components/common/scrollOnTop'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/data'
import * as commonActions from 'actions/common'
import assign from 'lodash/assign'
import { router, limitFontSize } from 'utils'

class MonthRecoveryDeviceDetailContainer extends Component {
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
      memberId: this.props.location.query.memberId || 0
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
    this.props.actions.clearMonthData()
  }
  componentDidMount () {
    Bridge.setNavTitle('绩效-回收设备数详情')
    if (this.props.location.query.role === 'ceo') {
      this.props.actions.fetchAllMembersInCity()
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
          </div>
          : null}
        {/* 表格标题 */}
        <ScrollOnTop className="scroll-on-top-wap">
          <div className='shop-data-head'>
            <span className='th wid01'>
              <em className='txt'>员工</em>
            </span>
            <span className='th wid02'>
              <em className='txt'>回收设<br />备数</em>
              <button className='btn-up' onClick={() => this._choseSortType(1, 'RECYCLE_NUM', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(2, 'RECYCLE_NUM', 'DESC')} />
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
              <em className='txt'>回收设<br />备成功<br />订单数</em>
              <button className='btn-up' onClick={() => this._choseSortType(3, 'RECYCLE_SUCCESS_ORDER', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(4, 'RECYCLE_SUCCESS_ORDER', 'DESC')} />
              <i className={this.state.sortActiveIndex === 3
                    ? 'dianfont icon-jiantou active'
                    : 'dianfont icon-jiantou'}
                      />
              <i className={this.state.sortActiveIndex === 4
                    ? 'dianfont icon-jiantou0101 active'
                    : 'dianfont icon-jiantou0101'}
                      />
            </span>
            <span className='th wid04'>
              <em className='txt'>回收设备<br />日均订单数</em>
              <button className='btn-up' onClick={() => this._choseSortType(5, 'RECYCLE_AVERAGE_ORDER', 'ASC')} />
              <button className='btn-down' onClick={() => this._choseSortType(6, 'RECYCLE_AVERAGE_ORDER', 'DESC')} />
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
        {(!this.props.list) && !this.props.error ? <Loading />
          : null}
        {(this.props.error)
          ? <Error>{this.props.error.message}</Error>
          : null}
        {(!this.props.error && this.props.list && this.props.list.length === 0)
          ? <Notfound>暂无数据</Notfound>
          : null}
        {/* 数据列表 */}
        {!this.props.error && this.props.list && this.props.list.length > 0
        ? this.props.list.map((item, i) => {
          return <div className='shop-data-line' key={i}>
            <span className='td wid01'>
              {item.sellerNick}
              <i className={item.sellerStatus === 0 ? 'status status-leave' : 'status status-work'}>
                {item.sellerStatusText}
              </i>
            </span>
            <span className='td wid02'>{item.recycleNum}</span>
            <span className='td wid03'>{item.recycleSuccessOrderNum}</span>
            <span className='td wid04'>{item.recycleAverageOrder}</span>
          </div>
        }) : null}
      </div>
    )
  }

  // 选择排序类型点击三角
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
    )})
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

 // 访问接口
  _getData () {
    switch (this.props.location.query.role) {
      case 'ceo':
        this.props.actions.fetchMonthData({
          depType: this.state.level1,
          cityCode: this.state.level2,
          memberId: this.state.level3,
          perfSortField: this.state.sortDesc || 'RECYCLE_NUM',
          sortType: this.state.sortType || 'DESC',
          date: this.props.location.query.date,
          querySubData: true
        })
        break
      case 'agentSellerManager':
        this.props.actions.fetchMonthData({
          memberId: this.state.memberId,
          perfSortField: this.state.sortDesc || 'RECYCLE_NUM',
          sortType: this.state.sortType || 'DESC',
          date: this.props.location.query.date,
          querySubData: true
        })
        break
    }
  }

  _paging (list) {
    this._getData(true, list.length)
  }

}

function mapStateToProps (state, ownProps) {
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
    list: state.bdMonthDataPage && state.bdMonthDataPage.list,
    memberList: memberList,
    summaryData: state.bdMonthDataPage && state.bdMonthDataPage.summaryData,
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

export default connect(mapStateToProps, mapDispatchToProps)(MonthRecoveryDeviceDetailContainer)
