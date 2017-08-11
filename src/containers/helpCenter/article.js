import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/'
import * as commonActions from 'actions/common'
import Pagination from 'components/common/pagination'
import { ARTICLES, CONTENT } from 'constants/helpCenter'
import Style from './article.less'
import { router } from 'utils'

const PAGES = 5

class HelpArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imageList: null,
      currentPage: 1
    }
  }
  componentWillMount () {
    Bridge.setNavTitle(ARTICLES[this.props.location.query.type].title)
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    window.removeEventListener('scroll', this._counting)
  }
  componentDidMount () {
    this._counting = this._counting.bind(this)
    window.addEventListener('scroll', this._counting)
    this.setState({imageList: CONTENT[this.props.location.query.type].slice(0, PAGES)})
  }
  componentWillReceiveProps (nextProps) {
    this.props.actions.cleanErrorMessage()
  }
  render () {
    return (
      this.props.location.query.type !== '1'
      ? <div className='help-center'>
        <div className='page' style={{ position: 'fixed', color: '#777', opacity: 0.8, right: 10 }}>第{this.state.currentPage}/{CONTENT[this.props.location.query.type].length}页</div>
        <Pagination onPaging={() => { this._paging(this.state.imageList) }} data={this.state.imageList} size={PAGES}>
          {this.state.imageList && this.state.imageList.map((item, i) => {
            return <div key={i} className='item'>
              <img key={i} src={item} />
            </div>
          })}
        </Pagination>
      </div>
      : <div style={{padding: 10}}>
        <article>
          <dl className='dl'>
            <dt>今日数据</dt>
            <dd>1、今日离线设备数：今日所有安装在门店的设备中当前状态为离线的设备</dd>
            <dd>2、今日成功订单数：所有安装设备（包括最新安装的设备）今日产生的成功支付的订单</dd>
            <dd>3、今日新安装设备数：今日新安装的设备数量（不包括维修设备）</dd>
            <dd>4、今日新安装门店数：今日新安装的门店数量</dd>
            <dd>5、今日低电量设备数：今日所有安装在门店的设备中目前电量低于30%的设备</dd>
            <dd>6、3天无订单门店数：门店安装第一台设备的时间距离现在，天数在3天及3天以上，且3天记天以上没有产生成功订单的门店，包括之前有订单但是最近3天或连续3天以上没有订单的门店</dd>
            <dt>累计数据</dt>
            <dd>1、累计门店数：截至目前，所有的门店数量总和（总数），包括安装门店和全店回收设备门店</dd>
            <dd>2、累计安装门店数：截至目前，仍有安装设备的门店数总和（总数）</dd>
            <dd>3、累计回收门店数：截至目前，已经全店回收的门店数总和（总数）</dd>
            <dd>4、累计设备数：截至目前，所有的产生过安装行为的设备总和，包括已安装的和回收的</dd>
            <dd>5、累计安装设备数：截止目前，仍处于门店安装状态的总和（总数）</dd>
            <dd>6、累计回收设备数：截止目前，已经被回收掉的设备总和（总数）</dd>
            <dd>7、累计成功订单数：截止目前，所有的成功支付的订单总和（总数）</dd>
            <dt>指标数据</dt>
            <dd>1、设备日均订单数：E(门店的当日成功订单/门店当日安装的总设备数)/自然日天数N</dd>
            <dd>2、当日离线设备：当日18小时之内没有在线状态的设备(主要区间是6-24点)</dd>
            <dd>3、当日在线设备：当日18小时以内有过在线状态的设备(主要区间是6-24点)</dd>
            <dd>4、在线设备日均订单数：E(门店的当日成功订单/门店当日在线设备数)/自然日天数N</dd>
            <dd>5、设备日均在线率：E(当日在线设备/当日总设备数)/自然日天数N</dd>
            <dd>6、门店平均设备数：【平均每家门店的设备数】当前所有的已安装设备数/当前所有已安装门店数</dd>
            <dd>7、门店日均设备数：统计周期内，单个门店平均每天的已安装设备数</dd>
            <dd>8、门店设备平均订单数：单日门店成功订单数/门店所有的已安装设备数</dd>
            <dt>漏斗模型</dt>
            <dd>1、创建订单数：所有创建的订单数（未支付订单+成功支付订单+退款订单）</dd>
            <dd>2、成功订单数：所有支付成功的订单数（订单状态为成功支付的订单）</dd>
            <dd>3、退款订单数：所有订单状态为退款的订单（自动退款，客服退款，用户退款）</dd>
          </dl>
        </article>
      </div>
    )
  }

  _paging (list) {
    let total = list.length
    let loadPages = CONTENT[this.props.location.query.type].slice(total, total + PAGES)
    this.setState({ imageList: [].concat(list, loadPages) })
  }
  _counting () {
    if (this.props.location.query.type === '1') return
    let scrollHeight = document.body.scrollTop
    if (!scrollHeight) {
      return this.setState({currentPage: 1})
    }
    let height = parseInt(window.getComputedStyle(document.getElementsByClassName('item')[0], null)['height'])
    this.setState({currentPage: Math.ceil(scrollHeight / (height))})
  }
}
function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpArticle)
