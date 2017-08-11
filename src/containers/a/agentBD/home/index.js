import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Select from 'components/common/select'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/a/agentBD/home/'
import * as commonActions from 'actions/common'
import Style from './index.less'
import UserBar from 'components/a/agentBD/home/user'
import Menu from 'components/a/agentBD/home/menu'
import { TotalPanel, Head, Body, Card } from 'components/channel/totalPanel'
import { router } from 'utils'

class IndexContainer extends Component {
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
    Bridge.setNavTitle('首页')
    this.props.actions.fetchHomeData()
    if (this.props.location.query.selectedDate) {
      this.props.actions.fetchMonthData({
        year: this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[0],
        month: this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[1]
      })
    }
    if (this.props.monthList && this.props.monthList.length) {
      !this.props.location.query.selectedDate && router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          selectedDate: `${this.props.monthList[0].year}-${this.props.monthList[0].month}`
        })
      })
    } else {
      this.props.actions.fetchMonthList()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.monthList && nextProps.monthList && nextProps.monthList.length) {
      !nextProps.location.query.selectedDate && router.replace({
        pathname: nextProps.location.pathname,
        query: assign({}, nextProps.location.query, {
          selectedDate: `${nextProps.monthList[0].year}-${nextProps.monthList[0].month}`
        })
      })
    }
    if (this.props.location.query.selectedDate !== nextProps.location.query.selectedDate && nextProps.location.query.selectedDate) {
      this.props.actions.fetchMonthData({
        year: nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[0],
        month: nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[1]
      })
    }
    if (nextProps.homeData && nextProps.monthData && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }

  render () {
    if (!(this.props.homeData && this.props.monthData) && !this.props.error) {
      return <Loading />
    }
    if (!(this.props.homeData && this.props.monthData) && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    let formatMonthList = this.props.monthList && this.props.monthList.map((item, i) => {
      return {key: `${item.year}-${item.month}`, value: `${item.year}-${item.month}`}
    })
    return (
      <div>
        <div className='cheader'>
          <UserBar
            user={this.props.homeData && this.props.homeData.agentEmployeeVO}
            onChoseDate={this._bindChoseDate.bind(this)}
            onScanQRCode={this._bindScanQRCode} />
        </div>
        <div className='install-process'>
          <p>我的门店</p>
          <Menu
            className='process-menu'
            columns={3}
            data={this.props.homeData}
            icons={this.props.homeData && this.props.homeData.icons2}
            user={this.props.homeData && this.props.homeData.agentEmployeeVO}
            onLocationTo={this._bindLocationTo.bind(this)} />
        </div>
        <div className='install-process fix'>
          <Menu
            columns={3}
            selectedDate={this.props.location.query.selectedDate}
            icons={this.props.homeData && this.props.homeData.icons}
            data={this.props.homeData}
            user={this.props.homeData && this.props.homeData.agentEmployeeVO}
            onLocationTo={this._bindLocationTo.bind(this)} />
          {this.state.showSelectDate && this.props.location.query.selectedDate
            ? <Select
              options={formatMonthList}
              onChose={this._choseDate.bind(this)}
              selectedValue={this.props.location.query.selectedDate}
              onClose={this._closeDate.bind(this)} />
            : null
          }
        </div>

      </div>
    )
  }

  _bindChoseDate () {
    this.setState({
      showSelectDate: true
    })
  }

  _choseDate (value) {
    this._closeDate()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {selectedDate: value})
    })
  }

  _closeDate () {
    this.setState({
      showSelectDate: false
    })
  }

  _bindLocationTo (path) {
    // 测试网络
    if (/\/testNetwork/.test(path)) {
      Bridge.speedTest((res) => {
        Toast.show(JSON.stringify(res))
        if (res.data) {
          if (res.data.loss >= 2 || res.data.average > 100) {
            return Toast.show('当前网络状态较差')
          } else {
            return Toast.show('当前网络状态良好')
          }
        } else {
          return Toast.show('当前网络状态较差')
        }
      })
    } else {
      router.push(path)
    }
  }

  _bindScanQRCode () {
    Bridge.scanQRCode((res) => {
      if (/http/.test(res.data)) {
        location.href = res.data
      } else {
        Toast.show(res.data)
      }
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    monthList: state.common && state.common.monthList,
    homeData: state.agentBDHome && state.agentBDHome.data,
    monthData: state.agentBDHome && state.agentBDHome.selectDate
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
