import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import NProgress from 'utils/nprogress'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/device'
import assign from 'lodash/assign'
import Style from './supplyFlow.less'
import { router } from 'utils'

let FLOW_INFO = [
  '请先扫描盒子底座二维码',
  '系统给出需补充的充电宝数量和槽位',
  '请根据系统建议, 依次插入充电宝',
  '确认补货完成'
]

class SupplyFlow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slotModal: false,
      overModal: false,
      offlineModal: false
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.clearData()
    this.props.actions.cleanErrorMessage()
  }
  componentDidMount () {
    Bridge.setNavTitle('充电宝补货流程')
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data && !nextProps.error) {
      NProgress.done()
      if (nextProps.fetchRequest === 'DEVICE_SUPPLY_START') {
        let suggest = this.state.suggest ? this.state.suggest.join('-') : ''
        return router.push(`/bd/device/supply/supplyPowerBank?boxNo=${this.state.boxNo || ''}&suggest=${suggest}`)
      }
      return this.setState({slotModal: true, suggest: nextProps.data.idleSlot || ''})
    }

    if (nextProps.error) {
      NProgress.done()
      if (nextProps.error.code === 328) return this.setState({overModal: true})
      if (nextProps.error.code === 327) return this.setState({offlineModal: true})
      return Toast.show(nextProps.error.message)
    }
  }
  render () {
    return (
      <div className='container'>
        <div className='flow'>
          {FLOW_INFO.map((item, i) => {
            return (<div className='item' key={i}>
              <div className='title'>
                <div className='number'>{i + 1}</div>
                <span className='guide'>{item}</span>
              </div>
              {i < FLOW_INFO.length - 1 ? <div className='dot'>
                <span /><span /><span />
              </div> : null}
            </div>)
          })}
        </div>
        {this.state.slotModal
          ? <div className='modal-background advice' onClick={this._cancelModal.bind(this)}>
            <div className='container' onClick={(e) => this._onStopPropagation(e)}>
              <div className='content'>
                <div className='image'>!</div>
                <div className='title'>建议</div>
                <ul className='description'>
                  <li className='item'>请补充<span style={{color: '#FFAF32'}}>{this.state.suggest && this.state.suggest.join(',') || ''}</span>号槽位</li>
                </ul>
              </div>
              <div>
                <div className='button db-button' onClick={() => { this._cancelModal() }}><span>取消</span></div>
                <div className='button db-button' style={{backgroundColor: '#3DCF55'}} onClick={() => { this._onConfirm() }}><span>开始补货</span></div>
              </div>
            </div>
          </div>
          : null
        }
        {this.state.overModal
          ? <div className='modal-background advice' onClick={this._cancelModal.bind(this)}>
            <div className='container' onClick={(e) => this._onStopPropagation(e)}>
              <div className='content'>
                <div className='image'>!</div>
                <div className='title'>建议</div>
                <ul className='description'>
                  <li className='item'>此设备不需要补充充电宝</li>
                </ul>
              </div>
              <div>
                <div className='button db-button' onClick={() => { this._cancelModal() }}><span>放弃补货</span></div>
                <div className='button db-button' onClick={() => { this._onConfirm() }}><span>仍然补货</span></div>
              </div>
            </div>
          </div>
          : null
        }
        {this.state.offlineModal
        ? <div className='modal-background advice' onClick={this._cancelModal.bind(this)}>
          <div className='container' onClick={(e) => this._onStopPropagation(e)}>
            <div className='content'>
              <div className='image cross' style={{color: '#FF5E45', borderColor: '#FF5E45'}}>x</div>
              <ul className='description' style={{paddingBottom: 10}}>
                <li className='item' >当前设备已离线, 请稍后重试</li>
              </ul>
            </div>
            <div><div className='button db-button' style={{width: '100%', color: '#26C541', background: '#FFF'}} onClick={() => { this._cancelModal() }}><span>知道了</span></div></div>
          </div>
        </div>
        : null}
        <a className='bottom-button' href='javascript: void(0)' onClick={() => { this._scanCode() }} >开始补充充电宝</a>
      </div>
    )
  }
  _onConfirm () {
    NProgress.start()
    this.props.actions.startSupply({boxNo: this.state.boxNo})
  }
  _onStopPropagation (e) {
    e.stopPropagation()
  }
  _cancelModal () {
    this.setState({overModal: false, offlineModal: false, slotModal: false})
  }

  _scanCode () {
    // this.setState({boxNo: '866873022988607', suggest: [5]})
    // this.props.actions.scanBoxInfo({boxNo: '866873022988607'})
    // router.push('/bd/device/supply/supplyPowerBank?mock')
    // return
    Bridge.scanQRCode((res) => {
      let str = res.data
      if (str.indexOf('/b/') < 0) return Toast.show('二维码有问题，请联系管理员')
      let boxNo = str.split('/').pop()
      if (!boxNo) {
        return Toast.show('二维码有问题，请联系管理员')
      } else {
        this.setState({boxNo})
        NProgress.start()
        this.props.actions.scanBoxInfo({boxNo})
      }
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.supplyPage && state.supplyPage.data,
    fetchRequest: state.supplyPage && state.supplyPage.fetchRequest,
    fetch: state.supplyPage && state.supplyPage.fetch
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplyFlow)
