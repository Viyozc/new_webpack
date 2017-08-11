import React, { Component } from 'react'
import Tabs, { Tab } from 'components/common/tabs'
import Search from 'components/common/search'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Item from 'components/a/agentBD/shops/list/item'
import SmallSelect from 'components/common/smallSelect'
import SelectShopType from 'components/common/selectShopType'
import * as Bridge from 'utils/bridge'
import { router, limitFontSize } from 'utils'
import assign from 'lodash/assign'
import { AGENT_BD_STATUS } from 'constants/actionTypes/a/agentBD/shops/list/tab'
import * as sessionStorage from 'utils/sessionStorage'
import Style from './index.less'
const PAGE_SIZE = 20

export default class agentBDShopList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabStatus: 0,
      typeKey: '分类',
      typeValue: -1,
      deepTypeKey: '',
      deepTypeValue: -1,
      areaKey: '',
      areaValue: -1,
      agentBDKey: '',
      agentBDValue: '0',
      deepTypeList: [],
      poiLongitude: '0',
      poiLatitude: '0',
      showShopType: false
    }
  }

  componentWillMount () {
    Style.use()
  }

  componentDidMount () {
    Bridge.setNavTitle('我的门店')
    if (sessionStorage.getItem(`${this.props.location.pathname}_search`) !== this.props.location.search) {

    }
    this.setState({
      tabStatus: parseInt(this.props.location.query.activeTab || AGENT_BD_STATUS[0].status)
    })
    this.props.actions.fetchArea()
    this.props.actions.fetchShopType()
  }

  componentWillUnmount () {
    sessionStorage.setItem(`${this.props.location.pathname}_search`, this.props.location.search)
  }

  //第一次加载数据
  _fetchData () {
    if (this.state.deepTypeValue && parseInt(this.state.deepTypeValue) !== -1 &&
      this.state.areaValue && parseInt(this.state.areaValue) !== -1 &&
      this.state.typeValue && parseInt(this.state.typeValue) !== -1 &&
      this.state.agentBDValue && parseInt(this.state.agentBDValue) !== -1) {
      this._getLocation((poiLatitude, poiLongitude) => {
        this.props.actions.fetchShopGets({
          status: this.props.location.query.activeTab || AGENT_BD_STATUS[0],
          offset: 0,
          pageSize: PAGE_SIZE,
          latitude: poiLatitude,
          longitude: poiLongitude,
          bdAgentId: this.state.agentBDValue,
          type: this.state.typeValue,
          subType: this.state.deepTypeValue,
          districtCode: this.state.areaValue || '0'
        })
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    // 初始化数据
    if (this.props.shopTypeList !== nextProps.shopTypeList && nextProps.shopTypeList) {
      this.setState({
        typeValue: nextProps.location.query.shopType || '0',
        typeKey: nextProps.location.query.shopTypeName || '分类',
        deepTypeValue: nextProps.location.query.shopSubType || '0',
        deepTypeKey: nextProps.location.query.shopSubTypeName || '全部'
      }, () => {
        this._fetchData()
      })
    }
    if (this.props.areaList !== nextProps.areaList && nextProps.areaList) {
      this.setState({
        areaValue: nextProps.areaList[0].value || '0',
        areaKey: nextProps.areaList[0].key || ''
      }, () => {
        this._fetchData()
      })
    }
    if (this.props.role !== nextProps.role && nextProps.role) {
      if (nextProps.role === 'bdAgencyBoss') {
        this.props.actions.getAgentBDList()
      }
    }
  }

  render () {
    return (
      <div>
        <Search onClick={this._search.bind(this)} placeholder={'搜索门店'}/>
        {/*如果是role=bdAgencyBoss显示区域 分类  BD代理列表，如果role=bdAgencyBD只显示区域 分类*/}
        {/*bd代理主管的selects*/}
        <div className="selects-wap">
          {this.props.role === 'bdAgencyBoss' ? <div className="selects selects-boss  clearfix">
            <SmallSelect
              className='selects-select'
              valueNotInUrl={true}
              defaultKey={this.state.areaKey || '区域'}
              defaultValue={this.state.areaValue || 0}
              list={this.props.areaList || []}
              outSide={this._onAreaChange.bind(this)}
            />
            <div className='float selects-select'>
              <button className='shop-type' onClick={() => this.setState({showShopType: true})}>
                {limitFontSize(this.props.location.query.shopSubTypeName || '分类', 3, true)}
              </button>
              {this.state.showShopType ? <i className='dianfont icon-jiantou'/> :
                <i className='dianfont icon-jiantou0101'/>}
            </div>
            {this.state.showShopType && this.props.shopTypeList ? <SelectShopType
              options={this.props.shopTypeList}
              onChose={this._choseShopType.bind(this)}
              shopType={{id: this.props.location.query.shopType || '0', name: null}}
              shopSubType={{
                id: parseInt(this.props.location.query.shopSubType || '0'),
                name: this.state.shopSubTypeName
              }}
              onClose={this._closeShopType.bind(this)}/> : null}
            {this.props.agentBDTeamList && this.props.agentBDTeamList.length > 0 ? <SmallSelect
              className='selects-select'
              valueNotInUrl={true}
              defaultKey={this.state.agentBDKey || '代理BD'}
              defaultValue={this.state.agentBDValue || 0}
              list={this.props.agentBDTeamList || []}
              outSide={this._onAgentBDChange.bind(this)}
            /> : null}
          </div>
            : null}
          {/*bd代理员工的selects*/}
          {this.props.role === 'bdAgencyBD' ? <div className="selects selects-bd clearfix">
            <SmallSelect
              className='selects-select'
              valueNotInUrl={true}
              defaultKey={this.state.areaKey || '区域'}
              defaultValue={this.state.areaValue || 0}
              list={this.props.areaList || []}
              outSide={this._onAreaChange.bind(this)}
            />
            <div className='float selects-select'>
              <button className='shop-type' onClick={() => this.setState({showShopType: true})}>
                {limitFontSize(this.props.location.query.shopSubTypeName || '分类', 3, true)}
              </button>
              {this.state.showShopType ? <i className='dianfont icon-jiantou'/> :
                <i className='dianfont icon-jiantou0101'/>}
            </div>
            {this.state.showShopType && this.props.shopTypeList ? <SelectShopType
              options={this.props.shopTypeList}
              onChose={this._choseShopType.bind(this)}
              shopType={{id: this.props.location.query.shopType || '0', name: null}}
              shopSubType={{
                id: parseInt(this.props.location.query.shopSubType || '0'),
                name: this.state.shopSubTypeName
              }}
              onClose={this._closeShopType.bind(this)}/> : null}
          </div> : null}
        </div>

        <div className="long-tab">
          <Tabs>
            {AGENT_BD_STATUS.map((item, i) => {
              return <Tab
                key={i}
                highlight={item.status === parseInt(this.props.location.query.activeTab || AGENT_BD_STATUS[0].status)}
                others={{onClick: () => { this._tab(item.status) }}}>
                {item.name}
              </Tab>
            })}
          </Tabs>
        </div>
        {this.props.role === 'bdAgencyBoss' ? <div className="data">
          签约门店总数：{this.props.shopNum}&nbsp;&nbsp;&nbsp;{/*安装设备总数：{this.props.deviceNum}*/}
        </div> : null}
        {this._renderList()}
      </div>
    )
  }

  _search (value) {
    router.push('/a/agentBD/search?keyword=' + value)
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
      <Pagination location={this.props.location} className="list" onPaging={() => { this._paging(this.props.bdList) }}
                  data={this.props.bdList} size={PAGE_SIZE}>
        {
          this.props.bdList && this.props.bdList.map((item, i) => {
            return <Item {...item} role={this.props.role}
                         tabStatus={this.state.tabStatus} key={i} isManager={this.props.role === 'agentSellerManager'}/>
          })
        }
      </Pagination>
    )
  }

  _closeShopType () {
    this.setState({
      showShopType: false
    })
  }

  _choseShopType (shopType, shopSubType) {
    this._closeShopType()
    this.setState({
      deepTypeValue: shopSubType && shopSubType.id,
      deepTypeKey: shopSubType && shopSubType.name,
      typeValue: shopType && shopType.id
    }, () => {
      router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          shopSubType: shopSubType && shopSubType.id,
          shopSubTypeName: shopSubType && shopSubType.name,
          shopType: shopType && shopType.id
        })
      })
      this.props.actions.fetchShopGets({
        status: this.props.location.query.activeTab,
        offset: 0,
        pageSize: PAGE_SIZE,
        latitude: this.state.poiLatitude,
        longitude: this.state.poiLongitude,
        bdAgentId: this.state.agentBDValue,
        type: this.state.typeValue,
        subType: this.state.deepTypeValue,
        districtCode: this.state.areaValue || '0'
      })
    })
  }

  //选择区域后的操作
  _onAreaChange (key, value) {
    this.setState({
      areaKey: key,
      areaValue: value
    }, () => {
      router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          areaKey: key,
          areaValue: value
        })
      })
      this.props.actions.fetchShopGets({
        status: this.props.location.query.activeTab,
        offset: 0,
        pageSize: PAGE_SIZE,
        latitude: this.state.poiLatitude,
        bdAgentId: this.state.agentBDValue,
        longitude: this.state.poiLongitude,
        type: this.state.typeValue,
        subType: this.state.deepTypeValue,
        districtCode: this.state.areaValue || '0'
      })
    })
  }

  //获取经纬度
  _getLocation (call) {
    Bridge.getLocation((res) => {
      if (!res.success) {
        this.setState({locatedError: true})
      } else if (res.data && res.data.split(',') && res.data.split(',').length) {
        this.setState({
          poiLongitude: res.data.split(',')[1],
          poiLatitude: res.data.split(',')[0]
        })
        call(res.data.split(',')[0], res.data.split(',')[1])
      }
    })
  }

  //选择BD代理之后的操作
  _onAgentBDChange (key, value) {
    this.setState({
      agentBDKey: key,
      agentBDValue: value
    }, () => {
      router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          agentBDKey: key,
          agentBDValue: value
        })
      })
      this.props.actions.fetchShopGets({
        status: this.props.location.query.activeTab,
        offset: 0,
        pageSize: PAGE_SIZE,
        latitude: this.state.poiLatitude,
        longitude: this.state.poiLongitude,
        type: this.state.typeValue,
        bdAgentId: this.state.agentBDValue,
        subType: this.state.deepTypeValue,
        districtCode: this.state.areaValue || '0'
      })
    })
  }

  _tab (tabIndex) {
    router.replace({
      pathname: '/a/agentBD/shops',
      query: assign({}, this.props.location.query, {
        activeTab: tabIndex
      })
    })
    this.setState({
      tabStatus: tabIndex
    })
    this.props.actions.fetchShopGets({
      status: tabIndex,
      offset: 0,
      pageSize: PAGE_SIZE,
      latitude: this.state.poiLatitude,
      longitude: this.state.poiLongitude,
      type: this.state.typeValue,
      subType: this.state.deepTypeValue,
      bdAgentId: this.state.agentBDValue,
      districtCode: this.state.areaValue || '0'
    })
  }

  _paging (list) {
    this.setState({
      tabStatus: parseInt(this.props.location.query.activeTab || AGENT_BD_STATUS[0].status)
    })
    this.props.actions.fetchShopGets({
      status: parseInt(this.props.location.query.activeTab || AGENT_BD_STATUS[0].status),
      offset: list.length,
      pageSize: PAGE_SIZE,
      latitude: this.state.poiLatitude,
      longitude: this.state.poiLongitude,
      bdAgentId: this.state.agentBDValue,
      type: this.state.typeValue,
      subType: this.state.deepTypeValue,
      districtCode: this.state.areaValue || '0'
    })
  }
}
