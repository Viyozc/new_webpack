import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Style from './performance.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/user/performance'
import assign from 'lodash/assign'
import TeamCell from 'components/user/teamCell'
import { params, router } from 'utils'
import Select from 'components/common/select'
import { fetchDataMonthList } from 'actions/home'
import Time from 'utils/time'

class TeamContainer extends Component {
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
    Bridge.setNavTitle(this.props.location.query.sellerNick)
    if (this.props.selectDate) {
      this.props.actions.fetchDataSellerTeamMember({
        memberId: this.props.location.query.sellerId,
        departmentId: this.props.location.query.departmentId,
        year: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[0]) || this.props.selectDate[0].year,
        month: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[1]) || this.props.selectDate[0].month
      })
    } else {
      this.props.actions.fetchDataMonthList()
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.location.query.sellerId !== nextProps.location.query.sellerId) {
      Bridge.setNavTitle(nextProps.location.query.sellerNick)
      this.props.actions.clearCurrentData()
    }
    if (
      (!this.props.selectDate && nextProps.selectDate) ||
      (this.props.location.query.selectedDate !== nextProps.location.query.selectedDate) ||
      (this.props.location.query.sellerId !== nextProps.location.query.sellerId)) {
      this.props.actions.fetchDataSellerTeamMember({
        memberId: nextProps.location.query.sellerId,
        departmentId: nextProps.location.query.departmentId,
        year: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[0]) || nextProps.selectDate[0].year,
        month: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[1]) || nextProps.selectDate[0].month
      })
    }
    if (nextProps.info && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    if (!this.props.info && !this.props.error) {
      return <Loading />
    }
    if (!this.props.info && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    let formatSelectData = this.props.selectDate && this.props.selectDate.map((item, i) => {
      return {key: `${item.year}-${item.month}`, value: `${item.year}-${item.month}`}
    })
    let selectedNextDate = new Date(this.props.location.query.selectedDate.split('-').join('/') + '/1').getTime()
    let isThisMoth = new Date(this.props.location.query.selectedDate.split('-').join('/') + '/1').getMonth() === new Date().getMonth()
    selectedNextDate = Time.getDateStrByMonth(selectedNextDate, 1)
    selectedNextDate = selectedNextDate.substr(0, 7)
    selectedNextDate = selectedNextDate.split('-')[0] + '-' + parseInt(selectedNextDate.split('-')[1])
    return (
      <div>
        {/** this.props.selectDate
          ? <button className='select-date' onClick={this._bindChoseDate.bind(this)}>
            {this.props.location.query.selectedDate || `${this.props.selectDate[0].year}-${this.props.selectDate[0].month}`}
            {this.state.showSelectDate ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
          </button>
          : null **/}
        <p className='category'>员工信息</p>
        {this.props.info.member
        ? <div className='employee'>
          <div className='name clearfix'>
            <div>姓名</div>
            <div>{this.props.info.member.nickName || this.props.location.query.sellerNick}</div>
          </div>
          <div className='phone clearfix'>
            <div>联系电话</div>
            <div><a href={'tel:' + this.props.info.member.mobile}>{this.props.info.member.mobile}</a></div>
          </div>
          <div className='email clearfix'>
            <div>邮箱</div>
            <div>{this.props.info.member.email}</div>
          </div>
        </div>
        : null}
        <p className='category'>工作业绩</p>
        {this.props.info.data
        ? <div>
          {isThisMoth ? <div className='analyse'>
            <div onClick={() => router.push({pathname: '/shops', query: {roleIndex: 0, activeTab: 0}})}>
              <p>待安装门店 <i className='dianfont icon-xuanze' /></p>
              <p>{this.props.info.data.thisMonthShopNew}</p>
            </div>
            <div onClick={() => router.push({pathname: '/shops', query: {roleIndex: 0, activeTab: 4}})}>
              <p>已安装门店 <i className='dianfont icon-xuanze' /></p>
              <p>{this.props.info.data.thisMonthShopInstalled}</p>
            </div>
            <div onClick={() => router.push({pathname: '/shops', query: {roleIndex: 0, activeTab: -1}})}>
              <p>全部门店 <i className='dianfont icon-xuanze' /></p>
              <p>{this.props.info.data.thisMonthShopAll}</p>
            </div>
          </div> : null}
          <div className='analyse'>
            <div onClick={() => router.push('/shop/avgDayOrderList?' + params({selectedDate: this.props.location.query.selectedDate, managerId: this.props.location.query.sellerId}))}>
              <p>本月<br />日均订单数 {<i className='dianfont icon-xuanze' />}</p>
              <p>{this.props.info.data.thisMonthAverageDayOrder}</p>
            </div>
            <div onClick={() => router.push('/shop/device/avgDayOnlineRateList?' + params({selectedDate: this.props.location.query.selectedDate, managerId: this.props.location.query.sellerId}))}>
              <p>本月<br />设备日均在线率 {<i className='dianfont icon-xuanze' />}</p>
              <p>{`${this.props.info.data.thisMonthDeviceAverageDayOnline || 0}%`}</p>
            </div>
            <div onClick={() => router.push('/shop/device/recycleList?' + params({selectedDate: this.props.location.query.selectedDate, managerId: this.props.location.query.sellerId}))}>
              <p>本月<br />回收设备数 {<i className='dianfont icon-xuanze' />}</p>
              <p>{this.props.info.data.thisMonthRecycleDeviceNum}</p>
            </div>
          </div>
          <div className='analyse' onClick={!this.props.info.data.isLeader ? this._locationToDeviceList.bind(this, '/shop/device/list?' + params({title: '当前考核期数据', checkStatus: 1, managerId: this.props.location.query.sellerId, selectedDate: this.props.location.query.selectedDate})) : null}>
            <div className='need-kpi'>
              <p>当前考核期达标设备数</p>
              <p>{this.props.info.data.thisMonthDeviceAchieve}</p>
            </div>
            <div className='opacity order-kpi'>
              <p>成功订单</p>
              <p>{this.props.info.data.thisMonthDeviceAchieveSuccessOrder}</p>
            </div>
            <div className='opacity order-kpi'>
              <p>退款订单</p>
              <p>{this.props.info.data.thisMonthDeviceAchieveRefundOrder}</p>
            </div>
            {!this.props.info.data.isLeader ? <i className='dianfont icon-xuanze' /> : null}
          </div>
          <div className='analyse' onClick={!this.props.info.data.isLeader ? this._locationToDeviceList.bind(this, '/shop/device/list?' + params({title: '当前考核期数据', checkStatus: 2, managerId: this.props.location.query.sellerId, selectedDate: this.props.location.query.selectedDate})) : null}>
            <div className='need-kpi'>
              <p>当前考核期未达标设备数</p>
              <p>{this.props.info.data.thisMonthDeviceUnachieve}</p>
            </div>
            <div className='opacity order-kpi'>
              <p>成功订单</p>
              <p>{this.props.info.data.thisMonthDeviceUnachieveSuccessOrder}</p>
            </div>
            <div className='opacity order-kpi'>
              <p>退款订单</p>
              <p>{this.props.info.data.thisMonthDeviceUnachieveRefundOrder}</p>
            </div>
            {!this.props.info.data.isLeader ? <i className='dianfont icon-xuanze' /> : null}
          </div>
          <div className='analyse' onClick={!this.props.info.data.isLeader ? this._locationToDeviceList.bind(this, '/shop/device/list?' + params({title: '下个考核期数据', checkStatus: 1, managerId: this.props.location.query.sellerId, selectedDate: selectedNextDate})) : null}>
            <div className='need-kpi'>
              <p>下个考核期达标设备数</p>
              <p>{this.props.info.data.nextMonthDeviceAchieve}</p>
            </div>
            <div className='opacity order-kpi'>
              <p>成功订单</p>
              <p>{this.props.info.data.nextMonthDeviceAchieveSuccessOrder}</p>
            </div>
            <div className='opacity order-kpi'>
              <p>退款订单</p>
              <p>{this.props.info.data.nextMonthDeviceAchieveRefundOrder}</p>
            </div>
            {!this.props.info.data.isLeader ? <i className='dianfont icon-xuanze' /> : null}
          </div>
          <div className='analyse' onClick={!this.props.info.data.isLeader ? this._locationToDeviceList.bind(this, '/shop/device/list?' + params({title: '下个考核期数据', checkStatus: 2, managerId: this.props.location.query.sellerId, selectedDate: selectedNextDate})) : null}>
            <div className='need-kpi'>
              <p>下个考核期未达标设备数</p>
              <p>{this.props.info.data.nextMonthDeviceUnachieve}</p>
            </div>
            <div className='opacity order-kpi'>
              <p>成功订单</p>
              <p>{this.props.info.data.nextMonthDeviceUnachieveSuccessOrder}</p>
            </div>
            <div className='opacity order-kpi'>
              <p>退款订单</p>
              <p>{this.props.info.data.nextMonthDeviceUnachieveRefundOrder}</p>
            </div>
            {!this.props.info.data.isLeader ? <i className='dianfont icon-xuanze' /> : null}
          </div>
        </div>
        : null}
        {this.props.info.team && this.props.info.team.length > 0
        ? <div>
          <p className='category'>TA的团队</p>
          <div className='title clearfix'>
            <div>姓名</div>
            <div>本月<br />安装完成门店</div>
            <div>本月<br />已达标设备</div>
            <div>下月<br />已达标设备</div>
            <div>昨日<br />订单</div>
            <div>今日<br />订单</div>
            <div>今日<br />离线率</div>
          </div>
          {this.props.info.team && this.props.info.team.map((item, i) => {
            return <TeamCell key={i} {...item} selectedDate={this.props.location.query.selectedDate} />
          })}
        </div>
        : null
        }
        {this.state.showSelectDate
          ? <Select
            options={formatSelectData}
            onChose={this._choseDate.bind(this)}
            selectedValue={this.props.location.query.selectedDate || `${this.props.selectDate[0].year}-${this.props.selectDate[0].month}`}
            onClose={this._closeDate.bind(this)} />
          : null
        }
      </div>
    )
  }
  _locationToDeviceList (path) {
    router.push(path)
  }
  _bindChoseDate () {
    this.setState({
      showSelectDate: true
    })
  }
  _choseDate (value) {
    this._closeDate()
    router.replace({pathname: this.props.location.pathname, query: assign({}, this.props.location.query, {selectedDate: value})})
  }
  _closeDate () {
    this.setState({
      showSelectDate: false
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    info: state.userTeamMember && state.userTeamMember.info,
    selectDate: state.home && state.home.selectDate
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean,
      fetchDataMonthList: fetchDataMonthList
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer)
