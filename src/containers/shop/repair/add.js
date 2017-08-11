import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Status from 'components/common/status'
import NProgress from 'utils/nprogress'
import { Line } from 'components/common/cell'
import Style from './add.less'
import * as actions from 'actions/shop'
import { clean } from 'actions/errorMessage'

class AddContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSuccess: false
    }
  }
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('申请备用机')
  }
  componentDidMount () {
    this.props.actions.fetchGetRepairMaxCount({applyType: 0})
  }
  componentWillUnmount () {
    Style.unuse()
    clearTimeout(this._timer)
    this.props.actions.cleanErrorMessage()
    this.props.actions.clearRepairAddForm()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
      this.setState({showSuccess: true})
      this._timer = setTimeout(() => {
        this.setState({showSuccess: false})
        router.goBack()
      }, 1000)
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
      if (nextProps.error) {
        Toast.show(nextProps.error.message || '未知错误')
        this.props.actions.cleanErrorMessage()
      }
    }
  }
  render () {
    if (!this.props.max && !this.props.error) {
      return <Loading />
    }
    if (!this.props.max && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return <div className='add-container'>
      <div className='install-form'>
        <div className='numbers'>
          <img src='//img.shenghuozhe.net/shz/2017/03/21/273w_261h_5A7571490086595.png' />
          <div className='price'>
            <p>请输入设备数量</p>
            <p className='notice-green'>限领{this.props.max[1] || 0}台</p>
          </div>
          <div className='input'>
            <button className='add-device' onClick={() => { this._plusDeviceNum() }}>+</button>
            <input type='number' onChange={(e) => { this._updateDeviceNum(e) }} value={this.props.form.deviceNum} pattern='[0-9]*' />
            <button onClick={() => { this._minusDeviceNum() }}>-</button>
          </div>
        </div>
        <Line className='device-line' />
        <div className='numbers'>
          <img src='//img.shenghuozhe.net/shz/2017/03/21/273w_261h_5D7841490086543.png' />
          <div className='price'>
            <p>请输入设备数量</p>
            <p className='notice-green'>限领{this.props.max[7] || 0}台</p>
          </div>
          <div className='input'>
            <button className='add-device' onClick={() => { this._plusDeviceWithBatteryNum() }}>+</button>
            <input type='number' onChange={(e) => { this._updateDeviceWithBatteryNum(e) }} value={this.props.form.deviceWithBatteryNum} pattern='[0-9]*' />
            <button onClick={() => { this._minusDeviceWithBatteryNum() }}>-</button>
          </div>
        </div>
        <Line className='device-line' />
        <div className='numbers'>
          <img src='//img.shenghuozhe.net/shz/2017/03/06/240w_240h_9E8221488801357.jpg@240w.jpg' />
          <div className='price'>
            <p>请输入餐牌数量</p>
          </div>
          <div className='input'>
            <button className='add-device' onClick={() => { this._plusBrandNum() }}>+</button>
            <input type='number' onChange={(e) => { this._updateBrandNum(e) }} value={this.props.form.brandNum} pattern='[0-9]*' />
            <button onClick={() => { this._minusBrandNum() }}>-</button>
          </div>
        </div>
        <Line className='device-line' />
        <div className='numbers'>
          <img src='//img.shenghuozhe.net/shz/2017/02/15/258w_156h_642031487127622.png@240w.jpg' />
          <div className='price'>
            <p>请输入电池数量</p>
          </div>
          <div className='input'>
            <button className='add-device' onClick={() => { this._plusBatteryNum() }}>+</button>
            <input type='number' onChange={(e) => { this._updateBatteryNum(e) }} value={this.props.form.batteryNum} pattern='[0-9]*' />
            <button onClick={() => { this._minusBatteryNum() }}>-</button>
          </div>
        </div>
        <div className='numbers'>
          <img src='//img.shenghuozhe.net/shz/2017/02/15/294w_117h_B8EF01487127731.png@240w.jpg' />
          <div className='price'>
            <p>请输入适配器数量</p>
          </div>
          <div className='input'>
            <button className='add-device' onClick={() => { this._plusAdapterNum() }}>+</button>
            <input type='number' onChange={(e) => { this._updateAdapterNum(e) }} value={this.props.form.adapterNum} pattern='[0-9]*' />
            <button onClick={() => { this._minusAdapterNum() }}>-</button>
          </div>
        </div>
      </div>
      <div className='bottom'>
        <span className='bottom-left'>总计：</span>
        <span className='bottom-left'><span>设备(无电池)</span><span className='count'>{this.props.form.deviceNum}</span></span>
        <span className='bottom-left'><span>设备(有电池)</span><span className='count'>{this.props.form.deviceWithBatteryNum}</span></span>
        <span className='bottom-left'><span>餐牌</span><span className='count'>{this.props.form.brandNum}</span></span>
        <span className='bottom-left'><span>电池</span><span className='count'>{this.props.form.batteryNum}</span></span>
        <span className='bottom-left'><span>适配器</span><span className='count'>{this.props.form.adapterNum}</span></span>
        <a onClick={this._triggerSubmit.bind(this)}>申领</a>
      </div>
      {this.state.showSuccess ? <Status status='success' content='申领成功' /> : null}
    </div>
  }
  _triggerSubmit () {
    let totalNum = parseInt(this.props.form.deviceNum) + parseInt(this.props.form.deviceWithBatteryNum) + parseInt(this.props.form.brandNum) + parseInt(this.props.form.batteryNum) + parseInt(this.props.form.adapterNum)
    if (totalNum <= 0) return Toast.show('请至少选择一种需要申领的备件')
    NProgress.start()
    this.props.form.deviceNoBatteryNum = this.props.form.deviceNum
    this.props.actions.contractRepairAdd(this.props.form)
  }
  _plusBrandNum () {
    this.props.actions.changeRepairBrandNumber((parseInt(this.props.form.brandNum) + 1) + '')
  }
  _minusBrandNum () {
    if (parseInt(this.props.form.brandNum) === 0) return
    this.props.actions.changeRepairBrandNumber((parseInt(this.props.form.brandNum) - 1) + '')
  }
  _updateBrandNum (e) {
    this.props.actions.changeRepairBrandNumber(e.target.value)
  }
  _plusAdapterNum () {
    this.props.actions.changeRepairAdapterNumber((parseInt(this.props.form.adapterNum) + 1) + '')
  }
  _minusAdapterNum () {
    if (parseInt(this.props.form.adapterNum) === 0) return
    this.props.actions.changeRepairAdapterNumber((parseInt(this.props.form.adapterNum) - 1) + '')
  }
  _updateAdapterNum (e) {
    this.props.actions.changeRepairAdapterNumber(e.target.value)
  }
  _plusDeviceNum () {
    if (parseInt(this.props.form.deviceNum) >= (this.props.max[1] || 0)) return Toast.show(`限领${this.props.max[1] || 0}台`)
    this.props.actions.changeRepairDeviceNumber((parseInt(this.props.form.deviceNum) + 1) + '')
  }
  _minusDeviceNum () {
    if (parseInt(this.props.form.deviceNum) === 0) return
    this.props.actions.changeRepairDeviceNumber((parseInt(this.props.form.deviceNum) - 1) + '')
  }
  _updateDeviceNum (e) {
    this.props.actions.changeRepairDeviceNumber((this.props.max && this.props.max[1] || 0) > parseInt(e.target.value) ? e.target.value : (this.props.max && this.props.max[1] + '' || '0'))
  }
  _plusDeviceWithBatteryNum () {
    if (parseInt(this.props.form.deviceWithBatteryNum) >= (this.props.max[7] || 0)) return Toast.show(`限领${this.props.max[7] || 0}台`)
    this.props.actions.changeRepairDeviceWithBatteryNumber((parseInt(this.props.form.deviceWithBatteryNum) + 1) + '')
  }
  _minusDeviceWithBatteryNum () {
    if (parseInt(this.props.form.deviceWithBatteryNum) === 0) return
    this.props.actions.changeRepairDeviceWithBatteryNumber((parseInt(this.props.form.deviceWithBatteryNum) - 1) + '')
  }
  _updateDeviceWithBatteryNum (e) {
    this.props.actions.changeRepairDeviceWithBatteryNumber((this.props.max && this.props.max[7] || 0) > parseInt(e.target.value) ? e.target.value : (this.props.max && this.props.max[7] + '' || '0'))
  }
  _plusBatteryNum () {
    this.props.actions.changeRepairBatteryNumber((parseInt(this.props.form.batteryNum) + 1) + '')
  }
  _minusBatteryNum () {
    if (parseInt(this.props.form.batteryNum) === 0) return
    this.props.actions.changeRepairBatteryNumber((parseInt(this.props.form.batteryNum) - 1) + '')
  }
  _updateBatteryNum (e) {
    this.props.actions.changeRepairBatteryNumber(e.target.value)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    form: state.shopRepairAdd,
    fetch: state.shopRepairAdd && state.shopRepairAdd.fetch,
    max: state.shopRepairAdd && state.shopRepairAdd.max
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContainer)
