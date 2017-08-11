import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import PowerBankDetail from 'components/bd/device/powerBankDetail'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/device'
import assign from 'lodash/assign'
import Style from './supplyPowerBank.less'
import NProgress from 'utils/nprogress'

import { router } from 'utils'

class SupplyPowerBank extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: null,
      showModal: false
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    clearInterval(this.state.timer)
    this.props.actions.clearData()
    this.props.actions.cleanErrorMessage()
  }
  componentDidMount () {
    Bridge.setNavTitle('补充充电宝')
    this.state.timer && clearInterval(this.state.timer)
    this.setState({timeStamp: new Date().getTime()})
    let suggestSlot = this.props.location.query.suggest ? this.props.location.query.suggest.split('-') : ''
    this.setState({suggest: suggestSlot})
    this.setState({
      timer: setInterval(() => {
        this.props.actions.getBoxInfo({boxNo: this.props.location.query.boxNo, timestamp: this.state.timeStamp})
      }, 2000)
    })
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      if (nextProps.fetchRequest === 'DEVICE_SUPPLY_END') {
        NProgress.done()
        router.push('/home')
      }
    }
    if (nextProps.error) {
      NProgress.done()
      this.props.actions.cleanErrorMessage()
      Toast.show(nextProps.error.message)
    }
  }
  render () {
    if (!this.props.data && !this.props.error) {
      return <Loading />
    }
    if (!this.props.data && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div className='container'>
        <ul className='tabs'>
          <li className='tab' style={{width: '20%'}}>槽位</li>
          <li className='tab' style={{width: '30%'}}>设备编号</li>
          <li className='tab' style={{width: '30%'}}>状态</li>
          <li className='tab' style={{width: '20%'}}>电压</li>
        </ul>
        <div className='list'>
          {this.props.data && this.props.data.map((item, i) => {
            return <PowerBankDetail shouldAdd={this.state.suggest.indexOf(item.slot + 1 + '') > -1} key={i} device={item} />
          })}
        </div>
        <a className='bottom-button' href='javascript: void(0)' onClick={() => { this._handleClick() }} >确认完成补货</a>
        {/* 确认框 */}
        {this.state.showModal ? <div className='modal-background' onClick={this._cancelModal.bind(this)}>
          <div className='container' onClick={(e) => this._onStopPropagation(e)}>
            <div className='content'>
              <div className='title'>本次补充充电宝数量:<span>{this.props.newAdd.length || 0}</span></div>
              <ul className='description'>
                {this.props.newAdd.length
                  ? this.props.newAdd.map((item, i) => {
                    return <li className='item'>{item.slot + 1}号槽: <span>{item.powerBankNo}</span></li>
                  })
                : <li className='item'>本次没有补充充电宝</li>}
              </ul>
            </div>
            <div>
              <div className='button db-button' onClick={() => { this._cancelModal() }}><span>取消</span></div>
              <div className='button db-button' onClick={() => { this._onConfirm() }}><span>确认</span></div>
            </div>
          </div>
        </div> : null}
      </div>
    )
  }
  _onConfirm () {
    NProgress.start()
    this._cancelModal()
    this.props.actions.endSupply({boxNo: this.props.location.query.boxNo})
  }
  _onStopPropagation (e) {
    e.stopPropagation()
  }
  _cancelModal () {
    this.setState({showModal: false})
  }
  _handleClick () {
    this.setState({showModal: true})
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.supplyPage && state.supplyPage.data,
    fetchRequest: state.supplyPage && state.supplyPage.fetchRequest,
    fetch: state.supplyPage && state.supplyPage.fetch,
    total: state.supplyPage && state.supplyPage.data && state.supplyPage.data.filter((item) => item.status === 1).length,
    newAdd: state.supplyPage && state.supplyPage.data && state.supplyPage.data.filter((item) => item.newAdd)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplyPowerBank)
