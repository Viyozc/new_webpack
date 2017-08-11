import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'components/link'
import * as Bridge from 'utils/bridge'
import Tabs, { Tab } from 'components/common/tabs'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import Style from './list.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/device'
import assign from 'lodash/assign'
import Cell from 'components/bd/device/list/cell'
import { router } from 'utils'
import NProgress from 'utils/nprogress'
import { BD_DEVICE_LIST_TAB_CONFIG, BDM_DEVICE_LIST_TAB_CONFIG } from 'constants/bd'
const PAGE_SIZE = 20

let isBDM = window.localStorage.getItem('identity') === 'agentSellerManager'
let pageTab = isBDM ? BDM_DEVICE_LIST_TAB_CONFIG : BD_DEVICE_LIST_TAB_CONFIG
class ListContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showModal: false,
      applyFrom: null
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
    Bridge.setNavTitle('设备管理')
    if (this.props.location.query.type === '4') {
      return this.props.actions.fetchDeviceListLost({type: this.props.location.query.type, pageSize: PAGE_SIZE, offset: 0})
    }
    if (!this.props.location.query.type) {
      router.replace({pathname: this.props.location.pathname, query: {type: BD_DEVICE_LIST_TAB_CONFIG[0].type}})
    } else {
      this.props.actions.fetchDeviceList({type: this.props.location.query.type, pageSize: PAGE_SIZE, offset: 0})
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      if (nextProps.location.query.type !== '4') {
        this.props.actions.fetchDeviceList({type: nextProps.location.query.type, pageSize: PAGE_SIZE, offset: 0})
      } else {
        this.props.actions.fetchDeviceListLost({type: nextProps.location.query.type, pageSize: PAGE_SIZE, offset: 0})
      }
      NProgress.done()
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }
    if (this.props.location.query.type !== nextProps.location.query.type) {
      if (nextProps.location.query.type !== '4') {
        this.props.actions.fetchDeviceList({type: nextProps.location.query.type, pageSize: PAGE_SIZE, offset: 0})
      } else {
        this.props.actions.fetchDeviceListLost({type: nextProps.location.query.type, pageSize: PAGE_SIZE, offset: 0})
      }
      NProgress.done()
    }
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    if (!this.props.userProducts && !this.props.error) {
      return <Loading />
    }

    return (
      <div>
        <Tabs className='tabs-scroll'>
          {pageTab.map((item, i) => {
            return <Tab
              key={i}
              highlight={item.type === parseInt(this.props.location.query.type || BD_DEVICE_LIST_TAB_CONFIG[0].type)}
              others={{onClick: () => { this._tab(item.type) }}}>
              {item.label}
              {item.type === BD_DEVICE_LIST_TAB_CONFIG[0].type ? `(${this.props.waitGetCount || 0})` : null}
              {item.type === BD_DEVICE_LIST_TAB_CONFIG[1].type ? `(${this.props.waitBackCount || 0})` : null}
            </Tab>
          })}
        </Tabs>
        <div className='notice' onClick={() => router.push('/bd/lost/mydevice')}>我的设备：
          <div>{this.props.userProducts.map((item, i) => {
            return <span key={i}>{item.productName} : {item.normalNum};</span>
          })}
          </div>
        </div>
        <div style={{paddingBottom: 60}}>{this._renderList()}</div>
        <div className='bottom-button'>
          <Link to={'/bd/device/recycle'}>设备退回</Link>
          <div onClick={() => this.setState({showModal: true})}>申领设备</div>
        </div>
        { this.state.showModal
          ? <div className='modal'>
            <div className='panel'>
              <p className='title'>请选择设备来源</p>
              <p className={this.state.applyFrom === 1 ? 'store active' : 'store'} onClick={() => this.setState({applyFrom: 1})}>从仓库申领</p>
              <p className={this.state.applyFrom === 2 ? 'store active' : 'store'} onClick={() => this.setState({applyFrom: 2})}>从其他BD小二申领</p>
              <div className='buttons'>
                <div onClick={() => this.setState({showModal: false})}>取消</div>
                <div onClick={() => this._submit()}>确认</div>
              </div>
            </div>
          </div>
          : null}
      </div>
    )
  }
  _submit () {
    if (!this.state.applyFrom) {
      return Toast.show('请选择申请方式')
    }
    if (this.state.applyFrom === 1) {
      return router.push('/bd/device/apply')
    }
    if (this.state.applyFrom === 2) {
      return router.push('/bd/device/chooseBd')
    }
  }
  _renderList () {
    if (!this.props.list && !this.props.error) {
      return <Loading />
    }
    if (!this.props.list && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.list && this.props.list.length === 0) {
      return <Notfound>暂无设备</Notfound>
    }
    return (
      <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
        {
        this.props.list.map((item, i) => {
          return <Cell key={i} {...item} type={this.props.location.query.type} actions={this.props.actions} />
        })
      }
      </Pagination>
    )
  }
  _paging (list) {
    this.props.actions.fetchDeviceList({type: this.props.location.query.type, pageSize: PAGE_SIZE, offset: this.props.list.length})
  }
  _tab (type) {
    router.replace({pathname: this.props.location.pathname, query: {type}})
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.bdDeviceListPage && state.bdDeviceListPage.list,
    deviceNoBatteryNum: state.bdDeviceListPage && state.bdDeviceListPage.deviceNoBatteryNum,
    deviceWithBatteryNum: state.bdDeviceListPage && state.bdDeviceListPage.deviceWithBatteryNum,
    waitBackCount: state.bdDeviceListPage && state.bdDeviceListPage.waitBackCount,
    waitGetCount: state.bdDeviceListPage && state.bdDeviceListPage.waitGetCount,
    fetch: state.bdDeviceListPage && state.bdDeviceListPage.fetch,
    userProducts: state.bdDeviceListPage && state.bdDeviceListPage.userProducts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
