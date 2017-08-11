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
import * as actions from 'actions/a/agentBD/team'

import Style from './index.less'

class TeamContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      list: [],
      titles: []
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
            return <dd key={i}
              className={`tr line ${bgColorClass}`}>
              <span className='name'>{item.sellerNick}</span>
              <span className='sign-no'>{item.signedShopNum || 0}</span>
              <span className='installed'>{`${item.installedShopNum || 0}`}</span>
              <span className='unable-no'>{item.invalidShopNum || 0}</span>
              <span className='thirsty-in-no'>{item.beforeThirtyDayRecycleNum || 0}</span>
              <span className='thirsty-out-no'>{item.afterThirtyDayRecycleNum || 0}</span>
            </dd>
          })}
        </dl>
        <div className='btn-wap'>
          <Link to={'/a/agentBD/team/add'} className='btn-add'>新增员工</Link>
        </div>
      </div>
    )
  }

  // _sortUp (sortType, index) {
  //   let sortedArr = this.state.list
  //   let titles = this.state.titles
  //   titles.map((item, i) => {
  //     if (i === index) {
  //       item.isUpActive = true
  //       item.isDownActive = false
  //     } else {
  //       item.isUpActive = false
  //       item.isDownActive = false
  //     }
  //   })
  //   this.setState({
  //     list: sortedArr.sort((a, b) => { return a[sortType] > b[sortType] }),
  //     titles: titles
  //   })
  // }

  // _sortDown (sortType, index) {
  //   let sortedArr = this.state.list
  //   let titles = this.state.titles
  //   titles.map((item, i) => {
  //     if (i === index) {
  //       item.isUpActive = false
  //       item.isDownActive = true
  //     } else {
  //       item.isUpActive = false
  //       item.isDownActive = false
  //     }
  //   })
  //   this.setState({
  //     list: sortedArr.sort((a, b) => {
  //       return a[sortType] < b[sortType]
  //     })
  //   })
  // }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (this.props.data !== nextProps.data) {
      this.setState({
        list: nextProps.data,
        titles: [
          {
            className: 'name',
            name: '姓名'
            // sortType: '',
            // isUpActive: false,
            // isDownActive: false
          }, // 不参与排序
          {
            className: 'sign-no',
            name: '签约门店数'
            // sortType: 'thisMonthAverageDayOrder',
            // isUpActive: false,
            // isDownActive: false
          },
          {
            className: 'installed',
            name: '已安装门店数'
            // sortType: 'thisMonthDeviceAverageDayOnline',
            // isUpActive: false,
            // isDownActive: false
          },
          {
            className: 'unable-no',
            name: '无法安装'
            // sortType: 'thisMonthRecycleDeviceNum',
            // isUpActive: false,
            // isDownActive: false
          },
          {
            className: 'thirsty-in-no',
            name: '30天之内回收'
            // sortType: 'thisMonthRecycleDeviceNum',
            // isUpActive: false,
            // isDownActive: false
          },
          {
            className: 'thirsty-out-no',
            name: '30天之后回收'
            // sortType: 'thisMonthRecycleDeviceNum',
            // isUpActive: false,
            // isDownActive: false
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
    data: state.agentBDTeam.teamList
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
