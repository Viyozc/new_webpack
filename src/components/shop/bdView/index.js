import React, { Component } from 'react'
import Tabs, { Tab } from 'components/common/tabs'
import Badge from 'components/common/badge'
import Button from 'components/common/button'
import Search from 'components/common/search'
import AlertAuditing from 'components/common/alertAuditing'
import Select from 'components/common/select'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Item from 'components/shop/bdView/item'
import DoubleSelect from 'components/common/doubleSelect'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'
import assign from 'lodash/assign'
import { BD_STATUS } from 'constants/bd'
import * as sessionStorage from 'utils/sessionStorage'
const PAGE_SIZE = 20
const OPTION_TYPE = 12
export default class ShopBdView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabStatus: 0,
      showReasonReject: false,
      shopId: '',
      page: 0,
      isShowOpc: false
    }
  }

  componentDidMount () {
    Bridge.setNavTitle('我的门店')
    if (sessionStorage.getItem(`${this.props.location.pathname}_search`) !== this.props.location.search) {
      if (this.props.location.query.rightChoseValue || this.props.location.query.leftChoseValue) {
        this.props.actions.fetchShopGetCounts(this.props.location.query.rightChoseValue, this.props.location.query.leftChoseValue)
        this.props.actions.fetchShopGets(
          parseInt(this.props.location.query.activeTab || BD_STATUS[0].status),
          0,
          PAGE_SIZE,
          this.props.location.query.rightChoseValue,
          this.props.location.query.leftChoseValue)
        this.setState({
          tabStatus: parseInt(this.props.location.query.activeTab || BD_STATUS[0].status)
        })
      }
      this.props.actions.fetchBdMembersInCity()
    }
    if (this.props.location.query.rightChoseValue || this.props.location.query.leftChoseValue) {
      !this.props.bdList && this.props.actions.fetchShopGetCounts(this.props.location.query.rightChoseValue, this.props.location.query.leftChoseValue)
      !this.props.bdList && this.props.actions.fetchShopGets(
        parseInt(this.props.location.query.activeTab || BD_STATUS[0].status),
        0,
        PAGE_SIZE,
        this.props.location.query.rightChoseValue,
        this.props.location.query.leftChoseValue)
      this.setState({
        tabStatus: parseInt(this.props.location.query.activeTab || BD_STATUS[0].status)
      })
    }
    !this.props.bdMembersInCity && this.props.actions.fetchBdMembersInCity()
    this.props.actions.getOptions(OPTION_TYPE)
  }

  componentWillUnmount () {
    sessionStorage.setItem(`${this.props.location.pathname}_search`, this.props.location.search)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.bdMembersInCity && nextProps.bdMembersInCity) {
      if (nextProps.bdMembersInCity.cities && nextProps.bdMembersInCity.members) {
        !nextProps.location.query.rightChoseValue && router.replace({
          pathname: nextProps.location.pathname,
          query: assign({}, nextProps.location.query, {
            leftChoseKey: nextProps.bdMembersInCity.cities[0].key,
            leftChoseValue: nextProps.bdMembersInCity.cities[0].value,
            rightChoseKey: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].key,
            rightChoseValue: nextProps.bdMembersInCity.members[nextProps.bdMembersInCity.cities[0].value][0].value
          })
        })
      } else {
        this.props.actions.fetchShopGetCounts()
        this.setState({
          tabStatus: parseInt(this.props.location.query.activeTab || BD_STATUS[0].status)
        })
        this.props.actions.fetchShopGets(
          parseInt(this.props.location.query.activeTab || BD_STATUS[0].status),
          0,
          PAGE_SIZE)
      }
    }

    if (this.props.location.query.leftChoseValue !== nextProps.location.query.leftChoseValue || this.props.location.query.rightChoseValue !== nextProps.location.query.rightChoseValue) {
      this.props.actions.fetchShopGetCounts(nextProps.location.query.rightChoseValue, nextProps.location.query.leftChoseValue)
      this.setState({
        tabStatus: parseInt(this.props.location.query.activeTab || BD_STATUS[0].status)
      })
      this.props.actions.fetchShopGets(
        parseInt(this.props.location.query.activeTab || BD_STATUS[0].status),
        0,
        PAGE_SIZE,
        nextProps.location.query.rightChoseValue,
        nextProps.location.query.leftChoseValue)
    }

    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'success') {
      if (nextProps.fetchType === 'FETCH_DATA_SELLER_UNABLEINSTALL') {
        this._choseReasonReject()
        this.props.actions.fetchShopGets(
          parseInt(0),
          0,
          PAGE_SIZE)
      }
    }

    //  渠道经理 审核
    if (this.props.submitStatus === 'request' && nextProps.submitStatus === 'success') {
      Toast.show('提交成功')
      this.setState({
        isShowOpc: false
      })
    }
  }

  render () {
    return (
      <div>
        <Search onClick={this._search.bind(this)} placeholder={'搜索门店'} />
        {this.props.bdMembersInCity && this.props.bdMembersInCity.cities && this.props.bdMembersInCity.members
          ? <DoubleSelect
            location={this.props.location}
            leftChoseKey={this.props.location.query.leftChoseKey}
            leftChoseValue={this.props.location.query.leftChoseValue}
            rightChoseKey={this.props.location.query.rightChoseKey}
            rightChoseValue={this.props.location.query.rightChoseValue}
            list={this.props.bdMembersInCity} />
          : null}
        <Tabs>
          {BD_STATUS.map((item, i) => {
            return <Tab
              key={i}
              highlight={item.status === parseInt(this.props.location.query.activeTab || BD_STATUS[0].status)}
              others={{onClick: () => { this._tab(item.status) }}}>
              {item.name}{this.props.bdTabsCount && this.props.bdTabsCount[item.totalCountKey] > 0 ? <Badge>{this.props.bdTabsCount[item.totalCountKey] > 99 ? '99+' : this.props.bdTabsCount[item.totalCountKey]}</Badge> : null}
            </Tab>
          })}
        </Tabs>
        <div style={{paddingBottom: '82px'}}>{this._renderList()}</div>
        {this.props.role === 'agentSeller' || this.props.role === 'agencyBoss' || this.props.role === 'agencyBD' ? <Button fixed={!!1} to='/shop/create'>签约门店</Button> : null}
        {this.state.showReasonReject ? <Select
          options={this.props.reasonOptions}
          onClose={this._choseReasonReject.bind(this)}
          onChose={this.shanSubmit.bind(this)}
        /> : null }
        <AlertAuditing isShowOpc={this.state.isShowOpc} type={this.state.auditingType} refuse={this._refuse.bind(this)} pass={this._pass.bind(this)} cancel={this._cancel.bind(this)} />
      </div>
    )
  }

  // 审核拒绝
  _refuse (e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.actions.channelShopAuditing({
      shopId: this.state.shopId,
      checkStatus: this.state.auditingType
    })
  }

  // 取消
  _cancel (e) {
    this.setState({
      isShowOpc: false
    })
  }

  // 确认通过
  _pass (e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.actions.channelShopAuditing({
      shopId: this.state.shopId,
      checkStatus: this.state.auditingType
    })
  }

  // 点击审核拒绝／审核通过按钮
  _auditing (type, shopId) {
    this.setState({
      isShowOpc: true,
      auditingType: type,
      shopId
    })
  }

  shanSubmit (value, option) {
    let res = {}
    res.option = value
    res.shopId = this.state.shopId
    this.props.actions.fetchShamStore(res)
  }

  _choseReasonReject (value, item) {
    this.setState({
      showReasonReject: false,
      shopId: ''
    })
  }

  _search (value) {
    router.push('/shop/search?keyword=' + value)
  }

  _renderList () {
    if (!this.props.bdList && !this.props.error) {
      return <Loading />
    }
    if (!this.props.bdList && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.bdList && this.props.bdList.length === 0) {
      return <Notfound>暂无门店</Notfound>
    }
    return (
      <Pagination location={this.props.location} onPaging={() => { this._paging(this.props.bdList) }}data={this.props.bdList} size={PAGE_SIZE}>
        {
          this.props.bdList && this.props.bdList.map((item, i) => {
            return <Item auditing={this._auditing.bind(this)} Bridge={Bridge} {...item} role={this.props.role}tabStatus={this.state.tabStatus} key={i} isManager={this.props.role === 'agentSellerManager'} />
          })
        }
      </Pagination>
    )
  }

  _tab (tabIndex) {
    // 防止加载role时候role为空，导致tab待审核时候闪烁
    let page = this.state.page
    this.setState({
      page: page + 1
    })
    router.replace({
      pathname: '/shops',
      query: assign({}, this.props.location.query, {
        activeTab: tabIndex
      })
    })
    this.props.actions.fetchShopGetCounts(this.props.location.query.rightChoseValue, this.props.location.query.leftChoseValue)
    this.setState({
      tabStatus: tabIndex
    })
    this.props.actions.fetchShopGets(
      tabIndex,
      0,
      PAGE_SIZE,
      this.props.location.query.rightChoseValue,
      this.props.location.query.leftChoseValue)
  }

  _paging (list) {
    this.setState({
      tabStatus: parseInt(this.props.location.query.activeTab || BD_STATUS[0].status)
    })
    this.props.actions.fetchShopGets(
      parseInt(this.props.location.query.activeTab || BD_STATUS[0].status),
      list.length,
      PAGE_SIZE,
      this.props.location.query.rightChoseValue,
      this.props.location.query.leftChoseValue
    )
  }

}
