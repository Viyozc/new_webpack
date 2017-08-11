/**
 * Created by fanli on 2017/5/8.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'components/link'
import assign from 'lodash/assign'
import { router } from 'utils'
import * as Bridge from 'utils/bridge'
import Grid from 'components/a/team/detail/grid'

import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Dialog from 'components/common/dialog'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/a/team'

import Style from './detail.less'

class TeamDetailContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      name: '',
      phone: '',
      id: '',
      showDialog: false,
      isOnjob: true,
      status: 0,
      initialization: false,
      workState: ''
    }
  }

  componentWillMount () {
    let date = new Date()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    this.props.actions.getDetail({
      departmentId: this.props.location.query.departmentId,
      memberId: this.props.params.sellerId,
      month,
      year
    })
    Style.use()
  }
  componentDidMount () {
    Bridge.setNavTitle('员工详情')
  }

  render () {
    if (!this.props.data && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (!this.props.data) {
      return <Loading />
    }
    // const data1 = {
    //   title: '员工累计安装数据',
    //   list: [
    //     {num: this.props.data.data.thisMonthShopInstalling, txt: '待安装', link: ''},
    //     {num: this.props.data.data.thisMonthShopInstalled, txt: '安装完成', link: ''}
    //   ]
    // }
    const data2 = {
      title: '员工今日数据',
      list: [
        {num: this.props.data.data.dayInstallerDeviceNum || 0, txt: '今日安装设备数', link: ''},
        {num: this.props.data.data.offlineDevice || 0, txt: '今日离线设备数', link: ''},
        {num: this.props.data.data.todayOrder || 0, txt: '今日成功订单数', link: ''}
      ]
    }
    const data3 = {
      title: '员工当月数据',
      list: [
        {num: this.props.data.data.monthInstallerShopNum || 0, txt: '当月新安装门店数', link: ''},
        {num: this.props.data.data.monthInstallerDeviceNum || 0, txt: '当月新安装设备数', link: ''},
        // {num: '6%', txt: '当月无电池版设备占比', link: 'fdsafsafsdafs'},下版有
        {num: this.props.data.data.thisMonthRecycleDeviceNum || 0, txt: '当月回收设备数', link: ''},
        {num: `${this.props.data.data.thisMonthDeviceAverageDayOnline || 0}%`, txt: '当月日均设备在线率', link: ''},
        {num: this.props.data.data.monthTotalOrdersNum || 0, txt: '当月成功订单总数', link: ''},
        {num: this.props.data.data.thisMonthAverageDayOrder || 0, txt: '当月设备日均订单数', link: ''}
      ]
    }
    const data4 = {
      title: '员工累计数据',
      list: [
        {num: this.props.data.data.thisMonthShopAll || 0, txt: '累计安装门店数', link: ''},
        {num: this.props.data.data.totalDevice || 0, txt: '累计安装设备数', link: ''},
        {num: this.props.data.data.totalOrdersNum || 0, txt: '累计成功订单数', link: ''}
      ]
    }
    return (
      <div className='agent-team-detail'>
        <section className='employee-info'>
          <ul className='info'>
            <li className='line'>
              <label className='title'>姓名</label>
              <span className='txt'>{this.props.data.member.nickName}</span>
            </li>
            <li className='line'>
              <label className='title'>手机号码</label>
              <a href={`tel:${this.props.data.member.mobile}`} className='txt link'>{this.props.data.member.mobile}</a>
            </li>
            <li className='line'>
              <label className='title'>身份证号</label>
              <span className='txt'>{this.props.data.member.idCardNo}</span>
            </li>
          </ul>
        </section>
        {
          this.props.data.member.leader != 1 
          ?
          <section className='employee-info work-status' onClick={this._changeBDStatus.bind(this)}>
            <span className='status-title'>更改在职状态</span>
            <span className='bd-status'>
              {this.state.status === 0 ? '在职' : '离职'}
            </span>
            <i className='dianfont icon-xiayibu icon-font-style'></i>
          </section>
          : null
        }
          
        {/* <Grid list={data1.list} router={router} title={data1.title} /> */}
        { 
          this.state.status === 0 && this.state.initialization //1离职 0在职 
          ? 
          [
            <Grid key='0' list={data2.list} router={router} title={data2.title} />,
            <Grid key='1' list={data3.list} router={router} title={data3.title} />,
            <Grid key='2' list={data4.list} router={router} title={data4.title} />
          ]
          :
          null
        }
        
        {
          this.state.showDialog 
          ? 
          <Dialog onCancel={this._cancel.bind(this)} onConfirm={this._Confirm.bind(this)} >
            <div className="dialog-content">
              <div className="radio onjob" onClick={ e => this.setState({isOnjob: true}) }>
                <div className="star" style={{display: this.state.isOnjob ? 'block' : 'none' }} />
              </div>
              <span className="label">在职</span>
              <div className="radio leave" onClick={ e => this.setState({isOnjob: false}) }>
                <div className="star" style={{display: this.state.isOnjob ? 'none' : 'block' }} />
              </div>
              <span className="label">离职</span>
            </div>
          </Dialog>
          :null
        }
        {
          this.state.showMessage 
          ? 
          <Dialog type="alert" onConfirm={ () => this.setState({showMessage: ''}) }>
            {this.state.showMessage}
          </Dialog>
          : null
        }
      </div>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.error && nextProps.error.message) {
      this.setState({
        showMessage: nextProps.error.message
      })
    }else if(nextProps.error){
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if(nextProps.workState == 'success' && this.state.workState == ''){
      Toast.show('更改成功')
      setTimeout(()=>location.reload(), 1000)
    }else if(nextProps.data && nextProps.data.member){
      this.setState({
        isOnjob: nextProps.data.member.status === 0 ? true : false,
        status: nextProps.data.member.status,
        initialization: true,
        workState: ''
      })
    }
  }

  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }

  _changeBDStatus () {
    this.setState({
      showDialog: true
    })
  }

  _cancel () {
    this.setState({
      showDialog: false
    })
  }

  _Confirm () {
    const id = this.props.data.member.sellerId
    const status = +!this.state.isOnjob //取反转数字
    if(this.state.status === status){ return }
    this.setState({
      showDialog: false
    })
    this.props.actions.changeWorkState({
      sellerId: id,
      workState: status
    });
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.agentTeam.teamDetail,
    workState: state.agentTeam.workState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailContainer)
