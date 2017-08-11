import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'components/link'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Select from 'components/common/select'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/home'
import Style from './index.less'
import UserBar from 'components/home/user'
import Menu from 'components/home/menu'
import KPI from 'components/home/kpi'
import { router } from 'utils'

class HomeContainer extends Component {
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
    if (this.props.selectDate) {
      // 获取kpi数据
      this.props.actions.fetchDataPreview({
        year: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[0]) || this.props.selectDate[0].year,
        month: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[1]) || this.props.selectDate[0].month
      })
      if (!this.props.location.query.selectedDate) {
        router.replace({
          pathname: this.props.location.pathname,
          query: assign({}, this.props.location.query, {selectedDate: `${this.props.selectDate[0].year}-${this.props.selectDate[0].month}`})
        })
      }
    } else {
      // 获取下拉日期列表
      this.props.actions.fetchDataMonthList()
    }
  }

  componentWillReceiveProps (nextProps) {
    if ((!this.props.selectDate && nextProps.selectDate) || (this.props.location.query.selectedDate && this.props.location.query.selectedDate !== nextProps.location.query.selectedDate)) {
      this.props.actions.fetchDataPreview({
        year: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[0]) || nextProps.selectDate[0].year,
        month: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[1]) || nextProps.selectDate[0].month
      })
      if (!nextProps.location.query.selectedDate) {
        router.replace({
          pathname: this.props.location.pathname,
          query: assign({}, this.props.location.query, {selectedDate: `${nextProps.selectDate[0].year}-${nextProps.selectDate[0].month}`})
        })
      }
    }
    if (nextProps.data && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }

  render () {
    if (!this.props.data && !this.props.error) {
      return <Loading />
    }
    if (!this.props.data && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    let formatSelectDate = this.props.selectDate.map((item, i) => {
      return {key: `${item.year}-${item.month}`, value: `${item.year}-${item.month}`}
    })
    let role = this.props.data && this.props.data.agentEmployeeVO && this.props.data.agentEmployeeVO.roleName_en
    return (
      <div>
        <div className='cheader'>
          <UserBar
            user={this.props.data && this.props.data.agentEmployeeVO}
            selectedDate={this.props.location.query.selectedDate}
            showSelectDate={this.state.showSelectDate}
            onChoseDate={this._bindChoseDate}
            onScanQRCode={this._bindScanQRCode} />
          {this.props.location.query.selectedDate
            ? <KPI
              selectedDate={this.props.location.query.selectedDate}
              data={this.props.data}
              user={this.props.data && this.props.data.agentEmployeeVO}
              onLocationTo={this._bindLocationTo.bind(this)} />
            : null}
          <Link className='description' to='/home/kpi/description'>帮助中心 <i className='dianfont icon-xuanze' /></Link>
        </div>
        {role === 'agentSeller' || role === 'installer'
          ? <div className='install-process'>
            <p>我的门店</p>
            <Menu
              className='process-menu'
              columns={4}
              selectedDate={this.props.location.query.selectedDate}
              data={this.props.data}
              icons={this.props.data && this.props.data.icons2}
              user={this.props.data && this.props.data.agentEmployeeVO}
              onLocationTo={this._bindLocationTo.bind(this)} />
          </div>
          : null}
        <Menu
          columns={3}
          selectedDate={this.props.location.query.selectedDate}
          icons={this.props.data && this.props.data.icons}
          data={this.props.data}
          user={this.props.data && this.props.data.agentEmployeeVO}
          onLocationTo={this._bindLocationTo.bind(this)} />
        {this.state.showSelectDate
          ? <Select
            options={formatSelectDate}
            onChose={this._choseDate.bind(this)}
            selectedValue={this.props.location.query.selectedDate || `${this.props.selectDate[0].year}-${this.props.selectDate[0].month}`}
            onClose={this._closeDate.bind(this)} />
          : null
        }
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
    data: state.home && state.home.data,
    selectDate: state.home && state.home.selectDate
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
