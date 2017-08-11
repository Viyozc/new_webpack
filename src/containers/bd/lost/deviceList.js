import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { router } from 'utils'
import assign from 'lodash/assign'
import isEqual from 'lodash/isEqual'
import * as actions from 'actions/bd/device'
import { clean } from 'actions/errorMessage'
import {BD_LOST_CHECK_TABS, BD_LOST_CHECK_STATUS} from 'constants/bd'
import Notfound from 'components/common/notfound'
import * as Bridge from 'utils/bridge'

import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Style from './deviceList.less'
import NProgress from 'utils/nprogress'
import Select from 'components/common/select'
import BDlist from 'components/bd/lost/bdList'

import Tabs, { Tab } from 'components/common/tabs'
import Pagination from 'components/common/pagination'
import Confirm from 'components/bd/device/confirm'
import ACTION_CONSTANTS from 'constants/actionTypes/bd/device'

const PAGE_SIZE = 20

const TIME_FILTER = [
  {key: '全部', value: 0},
  {key: '今天', value: 1},
  {key: '最近三天', value: 2},
  {key: '最近一周', value: 3},
  {key: '一个月内', value: 4}
]
const LOST_TYPE = [
  {key: '全部', value: -1},
  {key: '商家遗失', value: 0},
  {key: 'BD遗失', value: 2}
]
class DeviceList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: BD_LOST_CHECK_TABS[0].status,
      selected: null,
      selectedBD: this.props.location.query.bdId || '',
      showModal: false,
      showTime: false,
      timeType: 0,
      showBD: false,
      showLost: false,
      lostType: 0
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('遗失设备')
    Style.use()
  }
  _fetchDeviceList () {
    this.props.actions.fetchLostDeviceList({type: this.props.location.query.activeTab, offset: 0, pageSize: PAGE_SIZE, lostType: this.props.location.query.lostType || 0, timeType: this.props.location.query.timeType || 0})
  }
  componentDidMount () {
    if (!this.props.location.query.activeTab) {
      return router.replace('/bd/lost/deviceList?activeTab=' + BD_LOST_CHECK_TABS[0].status)
    }
    this._fetchDeviceList()
    this.props.actions.fetchAllBds()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      if (nextProps && (nextProps.actionType === ACTION_CONSTANTS.BD_DEVICE_LOST_AGREE)) {
        NProgress.done()
        this.props.actions.clearLostDevicePage()
        this._fetchDeviceList()
      }
    }
    if (!isEqual(this.props.location.query, nextProps.location.query)) {
      this._fetchDeviceList()
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }
    if (this.props.lostDeviceList && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    if ((!this.props.lostDeviceList || !this.props.bdList) && !this.props.error) {
      return <Loading />
    }
    let bdList = []
    this.props.bdList && this.props.bdList.list.map((val, i) => {
      bdList.push({key: val.name, value: val.id})
    })
    return (
      <div className='device-list'>
        <Tabs>
          {BD_LOST_CHECK_TABS.map((item, i) => {
            return <Tab
              key={i}
              highlight={item.status === parseInt(this.props.location.query.activeTab || 0)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.title}
            </Tab>
          })}
        </Tabs>
        {this._renderFilter()}
        {this._renderList()}
        {this.state.showModal
          ? <Confirm
            title='是否确认审核通过2232'
            cancelDo={this._cancelButton.bind(this)}
            okDo={this._okButton.bind(this)} />
          : null
        }
        {/* 无法联动
        {this.state.showBD
          ? <BDlist options={BDs}
            multiple
            selectedBDM={this.state.selectedBDM}
            selectedBD={this.state.selectedBD}
            onClose={() => this._closeOpt()}
            onChose={this._choseBD.bind(this)} />
          : null
        } */}
        {this.state.showBD
          ? <Select options={bdList || ''}
            selectedValue={this.state.selectedBD}
            onClose={() => this._closeOpt()}
            onChose={this._choseBD.bind(this)} />
          : null
        }
        {this.state.showTime
          ? <Select options={TIME_FILTER}
            selectedValue={this.state.timeType}
            onClose={() => this._closeOpt()}
            onChose={this._choseTime.bind(this)} />
          : null
        }
        {this.state.showLost
          ? <Select options={LOST_TYPE}
            selectedValue={this.state.lostType}
            onClose={() => this._closeOpt()}
            onChose={this._choseLostType.bind(this)} />
          : null
        }
      </div>
    )
  }
  _renderFilter () {
    return <div className='filter-tabs'>
      <div className='dropdown' onClick={() => this.setState({showBD: true})}>
        <span>全部BD</span>
        {this.state.showBD ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
      </div>
      <div className='dropdown' onClick={() => this.setState({showTime: true})}>
        <span>全部时间</span>
        {this.state.showOper ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
      </div>
      <div className='dropdown' onClick={() => this.setState({showLost: true})}>
        <span>遗失类别</span>
        {this.state.showOper ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
      </div>
    </div>
  }
  _renderList () {
    if (!this.props.lostDeviceList && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.lostDeviceList && this.props.lostDeviceList.length === 0) {
      return <Notfound>暂无记录</Notfound>
    }
    return (
      <Pagination onPaging={() => { this._paging(this.props.lostDeviceList) }} data={this.props.lostDeviceList} size={PAGE_SIZE}>
        {this.props.lostDeviceList && this.props.lostDeviceList.map((item, i) => {
          return (<div className='panel' key={i}>
            {item.lostType === 0 ? this._renderShopItem(item, i) : this._renderSpareItem(item, i)}
            {item.status === BD_LOST_CHECK_STATUS[2].status && item.refuseReason
            ? <div>
              <p className='device'>拒绝原因</p>
              <div className='detail'>{item.refuseReason}</div>
            </div>
            : null}
            <div className='judge'>
              <p className='time' ref='node'>申请时间: {item.createTime}</p>
              { item.status !== BD_LOST_CHECK_STATUS[0].status ? <p className='time'>审核时间: {item.auditTime}</p> : null}
              { item.status === BD_LOST_CHECK_STATUS[0].status ? <span onClick={() => router.push(`/bd/lost/rejectReason?recordId=${item.recordId}&lostType=${item.lostType || ''}`)} className='refuse'>拒绝审核</span> : null}
              { item.status === BD_LOST_CHECK_STATUS[0].status ? <span onClick={() => this._submit(item.recordId)} className='agree'>审核通过</span> : null}
            </div>
          </div>)
        })}
      </Pagination>
    )
  }
  _renderShopItem (item, i) {
    return <div className='panel' key={i}>
      <p className='title'>
        <span>设备详情</span>
        { item.status === BD_LOST_CHECK_STATUS[0].status ? <span className='state waiting'>{item.statusText}</span> : null}
        { item.status === BD_LOST_CHECK_STATUS[1].status ? <span className='state passed'>{item.statusText}</span> : null}
        { item.status === BD_LOST_CHECK_STATUS[2].status ? <span className='state reject'>{item.statusText}</span> : null}
      </p>
      <div className='user' onClick={() => { this._gotoDetail(item) }}>
        <p className='name'>BD:{item.sellerNick}</p>
        <p>手机号:{item.sellerMobile}</p>
        <p>门店名称:{item.shopName}</p>
        <p>联系人电话:{item.shopContactMobile}</p>
      </div>
      <p className='device'>设备类型:</p>
      {item.devices.length ? <div className='detail' onClick={() => { this._gotoDetail(item) }}>
        {item.devices && item.devices.map((device, i) => {
          return <p key={i}>{device.deviceType}: <span>{device.count}</span></p>
        })}
      </div>
      : <div className='detail'><p>无设备记录</p></div>}
    </div>
  }
  _renderSpareItem (item, i) {
    return <div className='panel' key={i}>
      <p className='title'>
        <span>小二信息</span>
        { item.status === BD_LOST_CHECK_STATUS[0].status ? <span className='state waiting'>{item.statusText}</span> : null}
        { item.status === BD_LOST_CHECK_STATUS[1].status ? <span className='state passed'>{item.statusText}</span> : null}
        { item.status === BD_LOST_CHECK_STATUS[2].status ? <span className='state reject'>{item.statusText}</span> : null}
      </p>
      <div className='user' onClick={() => { this._gotoDetail(item) }}>
        <p className='name'>BD:{item.sellerNick}</p>
        <p>手机号:{item.sellerMobile}</p>
      </div>
      <p className='device'>设备信息</p>
      <div className='detail' onClick={() => { this._gotoDetail(item) }}>
        {item.lostDeviceCount && item.lostDeviceCount.map((device, i) => {
          return <p key={i}>{device.productName}: <span>{device.count}</span></p>
        })}
      </div>
    </div>
  }
  _paging () {
    this.props.actions.fetchLostDeviceList({type: this.props.location.query.activeTab, pageSize: PAGE_SIZE, offset: this.props.lostDeviceList.length})
  }
  _submit (id) {
    this.setState({selected: id, showModal: true})
  }
  _okButton () {
    NProgress.start()
    this.setState({showModal: false})
    this.props.actions.fetchLostDeviceAgree({recordId: this.state.selected})
  }
  _cancelButton () {
    this.setState({showModal: false, selected: null})
  }
  _tab (type) {
    this._changeQuery({activeTab: type})
  }
  _choseBD (bd) {
    this._closeOpt()
    this.setState({selectedBD: bd})
    this._changeQuery({sellerId: bd})
  }
  _choseTime (val) {
    this._closeOpt()
    this.setState({timeType: val})
    this._changeQuery({timeType: val})
  }
  _choseLostType (val) {
    this._closeOpt()
    this.setState({lostType: val})
    this._changeQuery({lostType: val})
  }
  _closeOpt () {
    this.setState({showTime: false, showBD: false, showLost: false})
  }
  _changeQuery (obj) {
    router.replace({
      pathname: this.props.location.pathname,
      query: assign(this.props.location.query, obj)
    })
  }
  _gotoDetail (item) {
    router.push(`/bd/lost/lostDetail?recordId=${item.recordId}&lostType=${item.lostType}`)
  }

}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    fetch: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.fetch,
    actionType: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.actionType,
    lostDeviceList: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.lostList,
    bdList: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.bdList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList)

