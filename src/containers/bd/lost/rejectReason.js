import React, { Component } from 'react'
import { connect } from 'react-redux'
import assign from 'lodash/assign'
import * as actions from 'actions/bd/device'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import NProgress from 'utils/nprogress'
import * as Bridge from 'utils/bridge'

import { bindActionCreators } from 'redux'
import Style from './rejectReason.less'
import { clean } from 'actions/errorMessage'
import { router } from 'utils'
import ACTIONS from 'constants/actionTypes/bd/device'

class RejectReason extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      selectedKey: null,
      otherDes: null
    })
  }
  componentWillMount () {
    Bridge.setNavTitle('选择拒绝原因')
    Style.use()
  }
  componentDidMount () {
    this.props.location.query.lostType === '0' ? this.props.actions.fetchRefuseReasons({type: 14}) : this.props.actions.fetchRefuseReasons({type: 15})
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      if (nextProps.actionType && nextProps.actionType === ACTIONS.BD_DEVICE_LOST_REJECT) {
        NProgress.done()
        this.props.actions.clearLostDevicePage()
        router.push('/bd/lost/deviceList')
      }
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }
    if (this.props.reasonList && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  render () {
    if (!this.props.reasonList && !this.props.error) {
      return <Loading />
    }
    if (!this.props.reasonList && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.reasonList && this.props.reasonList.length === 0) {
      return <Notfound>暂无数据</Notfound>
    }
    return (
      <div className='device-list'>
        <div className='panel'>
          <p className='title'>选择拒绝原因</p>
          <div className='chose-container'>
            <ul>
              {this.props.reasonList && this.props.reasonList.map((item, i) => <li key={i} onClick={() => this.setState({selectedKey: item.key})}>
                <p>{item.value}</p>
                {this.state.selectedKey === item.key ? <div className='active'><div /></div> : <div className='inactive' />}
              </li>)}
            </ul>
          </div>
          <p className='reason'>拒绝原因</p>
          <div className='reason-info'>
            <textarea rows='4' placeholder='其它原因' onChange={(e) => this.setState({otherDes: e.target.value})} />
          </div>
        </div>
        <div className='handle-buttons'>
          <div onClick={() => { this._submit() }}>确认</div>
        </div>
      </div>
    )
  }
  _submit () {
    if (!this.state.selectedKey && !this.state.otherDes) {
      return Toast.show('请选择拒绝原因')
    }
    if (this.state.selectedKey === this.props.reasonList.pop().key && !this.state.otherDes) {
      return Toast.show('请填写其他原因')
    }
    let params = {
      optionId: this.state.selectedKey,
      refuseReason: this.state.otherDes,
      recordId: this.props.location.query.recordId
    }
    NProgress.start()
    this.props.actions.clearLostDevicePage()
    this.props.actions.fetchLostDeviceReject(params)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    fetch: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.fetch,
    actionType: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.actionType,
    reasonList: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.reasonList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RejectReason)

