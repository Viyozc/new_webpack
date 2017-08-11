import React, { Component } from 'react'
import { router } from 'utils'
import assign from 'lodash/assign'
import Badge from 'components/common/badge'
import Tabs, { Tab } from 'components/common/tabs'
import Notfound from 'components/common/notfound'
import Loading from 'components/common/loading'
import Pagination from 'components/common/pagination'
import Item from 'components/shop/installView/item'
import Error from 'components/common/error'

import Style from './index.less'

const TabConfig = [{
  label: '待安装',
  status: 0,
  totalCountKey: 'waitInstall'
}, {
  label: '待商家确认',
  status: 1,
  totalCountKey: 'waitReceipt'
}, {
  label: '安装完成',
  status: 2,
  totalCountKey: 'success'
}]
const PAGE_SIZE = 20

export default class ShopInstallView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentDidMount () {
    this.pressHandler = this._press.bind(this)
    document.addEventListener('keypress', this.pressHandler)
    this.props.actions.getList(TabConfig[this.props.location.query.activeTab || 0].status, 0, PAGE_SIZE)
  }
  render () {
    const list = this.props.data && this.props.data.list
    if (!list && !this.props.error) {
      return <Loading />
    }
    if (!list && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div>
        <div className='search'><i className='dianfont icon-sousuo' /><input value={this.state.keyword || ''} onChange={this._changeKey.bind(this)} ref='keyword' placeholder='搜索门店' type='text' /><button onClick={this._search.bind(this)}>搜索</button><i onClick={() => { this.setState({keyword: ''}) }} className='dianfont icon-guanbi' /></div>
        <Tabs>
          {TabConfig.map((item, i) => {
            return <Tab
              key={i}
              highlight={i === parseInt(this.props.location.query.activeTab || 0)}
              others={{onClick: () => { this._tab(i) }}}>
              {item.label}{this.props.data.count && this.props.data.count[item.totalCountKey] > 0 ? <Badge>{this.props.data.count[item.totalCountKey] > 99 ? '99+' : this.props.data.count[item.totalCountKey]}</Badge> : null}
            </Tab>
          })}
        </Tabs>
        <div className='list'>
          {this._renderList(list)}
        </div>
      </div>
    )
  }
  _press (e) {
    if (e.keyCode === 13) {
      this._search()
    }
  }
  _changeKey (e) {
    this.setState({keyword: e.target.value})
  }
  _search () {
    this.props.actions.getList(TabConfig[this.props.location.query.activeTab || 0].status, 0, PAGE_SIZE, this.state.keyword)
  }
  _renderList (list) {
    if (list && list.length === 0) {
      return <Notfound>暂无数据</Notfound>
    }
    return <Pagination data={list} onPaging={this.paging.bind(this)} size={PAGE_SIZE}>
      {list.map((o, i) => {
        return <Item key={i} activeTab={TabConfig[this.props.location.query.activeTab || 0]} {...o} />
      })
      }
    </Pagination>
  }
  _tab (i) {
    // this.setState({activeTab: i})
    this.setState({keyword: ''})
    router.replace({pathname: location.pathname, query: assign(this.props.location.query, {activeTab: i})})
  }
  paging () {
    this.props.actions.getList(TabConfig[this.props.location.query.activeTab || 0].status, this.props.data.list.length, PAGE_SIZE)
  }
  componentDidUpdate (prevProps, prevState) {
    // if (this.state.activeTab !== prevState.activeTab) {
    //   this.props.actions.getList(TabConfig[this.state.activeTab].status, 0, PAGE_SIZE)
    // }
    if (prevProps.location.query.activeTab !== this.props.location.query.activeTab) {
      prevProps.actions.getList(TabConfig[this.props.location.query.activeTab].status, 0, PAGE_SIZE)
    }
  }
  componentWillUnmount () {
    Style.unuse()
    this.pressHandler && document.removeEventListener('keypress', this.pressHandler)
  }
}
