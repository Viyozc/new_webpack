import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Style from './team.less'
import { clean } from 'actions/errorMessage'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import * as actions from 'actions/user/team'
import assign from 'lodash/assign'
import TeamCell from 'components/user/teamCell'
import { router } from 'utils'
import Select from 'components/common/select'
import * as homeActions from 'actions/home'

class TeamContainer extends Component {
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
    Bridge.setNavTitle('我的团队')
    if (this.props.selectDate) {
      this.props.actions.fetchDataSellerMyTeam({
        year: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[0]) || this.props.selectDate[0].year,
        month: (this.props.location.query.selectedDate && this.props.location.query.selectedDate.split('-')[1]) || this.props.selectDate[0].month
      })
    } else {
      this.props.actions.fetchDataMonthList()
    }
  }
  componentWillReceiveProps (nextProps) {
    if ((!this.props.selectDate && nextProps.selectDate) || (this.props.location.query.selectedDate !== nextProps.location.query.selectedDate)) {
      this.props.actions.fetchDataSellerMyTeam({
        year: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[0]) || nextProps.selectDate[0].year,
        month: (nextProps.location.query.selectedDate && nextProps.location.query.selectedDate.split('-')[1]) || nextProps.selectDate[0].month
      })
    }
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    let formatSelectData = this.props.selectDate && this.props.selectDate.map((item, i) => {
      return {key: `${item.year}-${item.month}`, value: `${item.year}-${item.month}`}
    })
    return (
      <div>
        {/** this.props.selectDate
          ? <button className='select-date' onClick={this._bindChoseDate.bind(this)}>
            {this.props.location.query.selectedDate || `${this.props.selectDate[0].year}-${this.props.selectDate[0].month}`}
            {this.state.showSelectDate ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
          </button>
          : null **/}
        <div className='title clearfix'>
          <div>姓名</div>
          <div>本月<br />安装完成门店</div>
          <div>本月<br />已达标设备</div>
          <div>下月<br />已达标设备</div>
          <div>昨日<br />订单</div>
          <div>今日<br />订单</div>
          <div>今日<br />离线率</div>
        </div>
        {this._renderList()}
        {this.state.showSelectDate
          ? <Select
            options={formatSelectData}
            onChose={this._choseDate.bind(this)}
            selectedValue={this.props.location.query.selectedDate || `${this.props.selectDate[0].year}-${this.props.selectDate[0].month}`}
            onClose={this._closeDate.bind(this)} />
          : null
        }
      </div>
    )
  }
  _renderList () {
    if (!this.props.list && !this.props.error) {
      return <Loading />
    }
    if (!this.props.list && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.list && this.props.list.length === 0) {
      return <Notfound>暂无团队成员</Notfound>
    }
    return (
      <div>
        {
          this.props.list && this.props.list.map((item, i) => {
            return <TeamCell key={i} {...item} selectedDate={this.props.location.query.selectedDate} />
          })
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
    router.replace({pathname: this.props.location.pathname, query: assign({}, this.props.location.query, {selectedDate: value})})
  }
  _closeDate () {
    this.setState({
      showSelectDate: false
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.userTeam && state.userTeam.list,
    selectDate: state.home && state.home.selectDate
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, homeActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer)
