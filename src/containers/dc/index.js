import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Tabs, { Tab } from 'components/common/tabs'
import Alert from 'components/common/alert'
import Style from './index.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/dc'
import assign from 'lodash/assign'
import { DC_STATUS, CATGORY_STATUS } from 'constants/dc'
import Section, { Label } from 'components/dc/section'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'

class IndexContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      alert: false
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
    Bridge.setNavTitle('数据中心')
    this.props.actions.fetchData({type: this.props.location.query.activeTab || DC_STATUS[0].type})
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.location.query.activeTab !== nextProps.location.query.activeTab) {
      this.props.actions.fetchData({type: nextProps.location.query.activeTab})
    }
    if (nextProps.data && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    return (
      <div>
        <Tabs>
          {DC_STATUS.map((item, i) => {
            return <Tab
              key={i}
              highlight={item.type === parseInt(this.props.location.query.activeTab || DC_STATUS[0].type)}
              others={{onClick: () => { this._bindTab(item.type, item.showName1, item.showName2) }}}>
              {item.name}
            </Tab>
          })}
        </Tabs>
        {this._render()}
      </div>
    )
  }
  _render () {
    if (!this.props.data && !this.props.error) {
      return <Loading />
    }
    if (!this.props.data && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div>
        <Section query={{status: CATGORY_STATUS[3].status, dateType: this.props.location.query.activeTab || DC_STATUS[0].type}} title={CATGORY_STATUS[3].name} question onClick={this._bindOpenQuestionModel.bind(this)}>
          <Label type='rate' value={this.props.data.usage.avgOrderPerDevice.toFixed(2)} title={(this.props.location.query.showName1 || DC_STATUS[0].showName1) + '设备平均订单数'} >
            <div className='device'>
              <p><span>{(this.props.location.query.showName1 || DC_STATUS[0].showName1) + '成功充电订单数' + this.props.data.usage.orderCount.toFixed(1)}</span></p>
              <p>{(this.props.location.query.showName1 || DC_STATUS[0].showName1) + '在线设备数' + this.props.data.usage.onlineDeviceCount.toFixed(1)}</p>
            </div>
          </Label>
          <Label type='rate' value={(this.props.data.usage.deviceUseRate * 100).toFixed(2) + '%'} title={(this.props.location.query.showName1 || DC_STATUS[0].showName1) + '设备使用率'} >
            <div className='device'>
              <p><span>{(this.props.location.query.showName1 || DC_STATUS[0].showName1) + '使用的设备数' + this.props.data.usage.usedDeviceCount.toFixed(1)}</span></p>
              <p>{(this.props.location.query.showName1 || DC_STATUS[0].showName1) + '在线设备数' + this.props.data.usage.onlineDeviceCount.toFixed(1)}</p>
            </div>
          </Label>
          <Label type='rate' value={(this.props.data.usage.deviceOnlineRate * 100).toFixed(2) + '%'} title={(this.props.location.query.showName1 || DC_STATUS[0].showName1) + '设备在线率'} >
            <div className='device'>
              <p><span>{(this.props.location.query.showName1 || DC_STATUS[0].showName2) + '在线设备数' + this.props.data.usage.onlineDeviceCount.toFixed(1)}</span></p>
              <p>{(this.props.location.query.showName1 || DC_STATUS[0].showName2) + '总设备数' + this.props.data.usage.deviceCount.toFixed(1)}</p>
            </div>
          </Label>
        </Section>
        <Section query={{status: CATGORY_STATUS[0].status, dateType: this.props.location.query.activeTab || DC_STATUS[0].type}} title={CATGORY_STATUS[0].name}>
          <Label value={this.props.data.shop.shopInstalled} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '安装完成门店数'} />
        </Section>
        <Section query={{status: CATGORY_STATUS[4].status, dateType: this.props.location.query.activeTab || DC_STATUS[0].type}} title={CATGORY_STATUS[4].name}>
          <Label value={this.props.data.device.deviceInstalled} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '安装完成设备数'} />
        </Section>
        <Section query={{status: CATGORY_STATUS[1].status, dateType: this.props.location.query.activeTab || DC_STATUS[0].type}} title={CATGORY_STATUS[1].name}>
          <Label value={this.props.data.order.scanNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '扫码数'} />
          <Label value={this.props.data.order.orderNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '创建订单数'} />
          <Label value={this.props.data.order.payNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '付款订单数'} />
          <Label value={this.props.data.order.successNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '成功充电订单数'} />
          <Label value={this.props.data.order.autoRefundNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '打开失败自动退款数'} />
          <Label value={this.props.data.order.userRefundNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '用户申请退款数'} />
          <Label value={this.props.data.order.kefuRefundNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '客服发起退款数'} />
        </Section>
        <Section query={{status: CATGORY_STATUS[2].status, dateType: this.props.location.query.activeTab || DC_STATUS[0].type}} title={CATGORY_STATUS[2].name}>
          <Label value={this.props.data.user.scanUserNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '扫码用户数'} />
          <Label value={this.props.data.user.authUserNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '新注册用户数'} />
          <Label value={this.props.data.user.orderUserNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '创建订单用户数'} />
          <Label value={this.props.data.user.payUserNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '付款订单用户数'} />
          <Label value={this.props.data.user.successUserNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '充电成功用户数'} />
          <Label value={this.props.data.user.autoRefundUserNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '打开失败退款用户数'} />
          <Label value={this.props.data.user.userRefundUserNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '申请退款用户数'} />
          <Label value={this.props.data.user.kefuRefundUserNum} title={(this.props.location.query.showName2 || DC_STATUS[0].showName2) + '客服发起退款用户数'} />
        </Section>
        {this.state.alert
          ? <Alert onClose={this._bindClose.bind(this)} disabledTitle buttonText={'我知道了'}>
            <p>{(this.props.location.query.showName1 || DC_STATUS[0].showName1) + '设备平均订单数=' + (this.props.location.query.showName1 || DC_STATUS[0].showName1) + '成功充电订单数/' + (this.props.location.query.showName2 || DC_STATUS[0].showName2) + '总设备数'}</p>
            <p>{(this.props.location.query.showName1 || DC_STATUS[0].showName1) + '设备使用率=' + (this.props.location.query.showName1 || DC_STATUS[0].showName1) + '使用的设备数/' + (this.props.location.query.showName2 || DC_STATUS[0].showName2) + '总设备数'}</p>
            <p>{(this.props.location.query.showName1 || DC_STATUS[0].showName1) + '设备在线率=' + (this.props.location.query.showName1 || DC_STATUS[0].showName1) + '在线设备数/' + (this.props.location.query.showName2 || DC_STATUS[0].showName2) + '总设备数'}</p>
          </Alert>
          : null
        }
      </div>
    )
  }
  _bindTab (type, showName1, showName2) {
    router.replace({pathname: '/data/center', query: assign({}, this.props.location.query, {activeTab: type, showName1, showName2})})
  }
  _bindClose () {
    this.setState({
      alert: false
    })
  }
  _bindOpenQuestionModel (e) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      alert: true
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.dc && state.dc.data
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
