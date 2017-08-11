import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import { router } from 'utils'
import * as Bridge from 'utils/bridge'
import { Link } from 'components/link'

import Loading from 'components/common/loading'
import Error from 'components/common/error'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/a/team'

import Style from './index.less'

class TeamContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      list: [],
      titles: [],
      isDimission: false,
    }
  }

  componentWillMount () {
    Style.use()
    let date = new Date()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    this.props.actions.getList({month, year})
  }

  componentDidMount () {
    Bridge.setNavTitle('我的团队')
    this.props.actions.getDimissionBDList()
  }

  render () {
    if (!this.props.data && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (!this.props.data) {
      return <Loading />
    }
    
    return (
      <div className='agent-team'>
        <div className="headbts">
          <button className={!this.state.isDimission?'active':''} onClick={this._renderBDList.bind(this)}>在职员工</button> 
          <button className={this.state.isDimission?'active':''} onClick={this._renderDimissionBDList.bind(this)}>离职员工</button> 
        </div>
        {
          !this.state.isDimission 
          ? 
          <dl className='table'>
            <dt className='tr head'>
              {this.state.titles.map((item, i) => {
                if (i === 0) {
                  return <span key={i} className={item.className}>{item.name}</span>
                } else {
                  return <span key={i} className={item.className}>
                    <span
                      className={`txt ${(this.state.titles[i].isDownActive || this.state.titles[i].isUpActive) ? 'active' : ''}`}>{item.name}</span>
                    {/* <i className={`arrow up ${this.state.titles[i].isUpActive ? 'active' : ''}`} */}
                    {/* onClick={() => this._sortUp(item.sortType, i)} /> */}
                    {/* <i className={`arrow down ${this.state.titles[i].isDownActive ? 'active' : ''}`} */}
                    {/* onClick={() => this._sortDown(item.sortType, i)} /> */}
                  </span>
                }
              })}
            </dt>
            {this.state.list && this.state.list.length > 0 && this.state.list.map((item, i) => {
              let bgColorClass = ''
              if (i % 2 === 0) {
                bgColorClass = 'even'
              } else {
                bgColorClass = 'odd'
              }
              return <dd
                onClick={() => { router.push(`/a/team/detail/${item.sellerId || ''}?departmentId=${item.departmentId || ''}`) }}
                key={i}
                className={`tr line ${bgColorClass}`}>
                <span className='name'>{item.sellerNick}</span>
                <span className='order-no'>{item.thisMonthAverageDayOrder || 0}</span>
                <span className='probability'>{`${item.thisMonthDeviceAverageDayOnline || 0}%`}</span>
                <span className='install-no'>{item.monthInstallerShopNum || 0}</span>
                <span className='shop-no'>{item.monthInstallerDeviceNum || 0}</span>
                <span className='recovery-no'>{item.thisMonthRecycleDeviceNum || 0}<i
                  className='dianfont icon-xiayibu' /></span>
              </dd>
            })}
          </dl>
          :
          <ul className="table">
            {
              this.props.dimissionList.map((item, index) => {
                return (
                  <li 
                    key={item.sellerId} 
                    className={'dimission tr line ' + (index % 2 ? 'odd' : 'even') }
                    onClick={() => { router.push(`/a/team/detail/${item.sellerId || ''}?isDimission=${this.state.isDimission}&departmentId=${item.departmentId || ''}`) }}
                  >
                    <span className="nickName">{item.nickName}</span>
                    <i className="dianfont icon-xiayibu icon-font-style"></i>
                  </li>
                )
              })
            }
          </ul>
        }
          
        <div className='btn-wap'>
          <Link to={'/a/team/add'} className='btn-add'>新增员工</Link>
        </div>
      </div>
    )
  }

  _renderBDList () {
    this.setState({
      isDimission: false
    })
  }

  _renderDimissionBDList () {
    this.setState({
      isDimission: true
    })
    
  }

  _sortUp (sortType, index) {
    let sortedArr = this.state.list
    let titles = this.state.titles
    titles.map((item, i) => {
      if (i === index) {
        item.isUpActive = true
        item.isDownActive = false
      } else {
        item.isUpActive = false
        item.isDownActive = false
      }
    })
    this.setState({
      list: sortedArr.sort((a, b) => { return a[sortType] > b[sortType] }),
      titles: titles
    })
  }

  _sortDown (sortType, index) {
    let sortedArr = this.state.list
    let titles = this.state.titles
    titles.map((item, i) => {
      if (i === index) {
        item.isUpActive = false
        item.isDownActive = true
      } else {
        item.isUpActive = false
        item.isDownActive = false
      }
    })
    this.setState({
      list: sortedArr.sort((a, b) => {
        return a[sortType] < b[sortType]
      })
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (this.props.data !== nextProps.data) {
      this.setState({
        list: nextProps.data,
        titles: [
          {className: 'name', sortType: '', name: '名称', isUpActive: false, isDownActive: false}, // 不参与排序
          {
            className: 'order-no',
            sortType: 'thisMonthAverageDayOrder',
            name: '设备日均订单数',
            isUpActive: false,
            isDownActive: false
          },
          {
            className: 'probability',
            sortType: 'thisMonthDeviceAverageDayOnline',
            name: '设备日均在线率',
            isUpActive: false,
            isDownActive: false
          },
          {
            className: 'shop-no',
            sortType: 'monthInstallerShopNum',
            name: '新安装门店数',
            isUpActive: false,
            isDownActive: false
          },
          {
            className: 'install-no',
            sortType: 'monthInstallerDeviceNum',
            name: '新安装设备数',
            isUpActive: false,
            isDownActive: false
          },
          {
            className: 'recovery-no',
            sortType: 'thisMonthRecycleDeviceNum',
            name: '回收设备数',
            isUpActive: false,
            isDownActive: false
          }
        ]
      })
    }
  }

  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.agentTeam.teamList,
    dimissionList: state.agentTeam.dimissionList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer)
