import React, { Component } from 'react'
import Style from './install.less'
import Cell, { Cells, CellBody, CellFooter, Line } from 'components/common/cell'
import Icon from 'components/common/icon'
import Status from 'components/common/status'
import SelectA from 'components/common/selectA'
import InstallDate from 'components/shop/bdView/installDate'
import NProgress from 'utils/nprogress'
import Input from 'components/common/input'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'
import assign from 'lodash/assign'
// const TIMES = [
//   '06:00-08:00',
//   '08:00-10:00',
//   '10:00-12:00',
//   '12:00-14:00',
//   '14:00-16:00',
//   '16:00-18:00',
//   '18:00-20:00',
//   '20:00-22:00',
//   '22:00-00:00'
// ]

export default class ShopInstallComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showReapply: props.location.query.redo === '2',
      showSuccess: false,
      showNextPage: false,
      showInstallDate: false
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentWillReceiveProps (nextProps) {
    if (!this.props.form.installDateList && nextProps.form.installDateList) {
      this.setState({
        showInstallDate: true
      })
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
      this.setState({showSuccess: true})
      this._timer = setTimeout(() => {
        this.setState({showSuccess: false})
        router.replace('/shops?roleIndex=0')
      }, 1000)
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }
  }
  render () {
    if (this.props.location.query.redo === '2' && this.state.showReapply) {
      return <div>
        <div className='comment-panel reapply-comment'>
          <textarea rows='4' placeholder='请填写重新申请理由' value={this.props.form.reapplyComment} onChange={this._bindChangeReapply.bind(this)} />
        </div>
        <a className='button' href='javascript: void(0)' onClick={() => { this._triggerRedoNext() }} >下一步</a>
      </div>
    }
    // <Line />
    // <p className='select-title'>分成比例</p>
    // <SelectA model={2} options={[{key: '大数据开发舒服',subKey:'', value: 'asfd'}, {key: '大数据开发舒服', value: 'asfd'}]} selectedValue={''} onChose={() => this._choseSelectOption.bind(this)} />
    if (this.state.showNextPage) {
      return <div className='install-next-form'>
        <p className='select-title'>价格标准</p>
        <SelectA model={2} options={this.props.form && this.props.form.standardInfo} color={'#FF7645'} selectedValue={this.props.form.priceType} onChose={this._choseStandardOption.bind(this)} />
        <a className='button prev-button' href='javascript: void(0)' onClick={() => { this._triggerPrevious() }} >上一步</a>
        <a className='button' href='javascript: void(0)' onClick={() => { this._triggerSubmit() }} >提交</a>
        {this.state.showSuccess ? <Status status='success' content='提交成功' /> : null}
      </div>
    } else {
      return (
        <div>
          <div className='install-form'>
            <p className='device-title'>请选择主机数量 <span className='notice-red'>单店首次安装建议不超过5台</span></p>
            <div className='numbers'>
              <img src='//img.shenghuozhe.net/shz/2017/03/21/273w_261h_5A7571490086595.png' />
              <div className='price'>
                <p>请输入设备数量</p>
              </div>
              <div className='input-num'>
                <button className='add-device' onClick={() => { this._plusDeviceNum() }}>+</button>
                <input type='number' onChange={(e) => { this._updateDeviceNum(e) }} value={this.props.form.deviceNum} pattern='[0-9]*' />
                <button onClick={() => { this._minusDeviceNum() }}>-</button>
              </div>
            </div>
            <Line />
            <div className='numbers'>
              <img src='//img.shenghuozhe.net/shz/2017/03/21/273w_261h_5D7841490086543.png' />
              <div className='price'>
                <p>请输入设备数量</p>
              </div>
              <div className='input-num'>
                <button className='add-device' onClick={() => { this._plusDeviceWithBatteryNum() }}>+</button>
                <input type='number' onChange={(e) => { this._updateDeviceWithBatteryNum(e) }} value={this.props.form.deviceWithBatteryNum} pattern='[0-9]*' />
                <button onClick={() => { this._minusDeviceWithBatteryNum() }}>-</button>
              </div>
            </div>
            <p className='device-title'>请选择配件数量 <span className='notice-red'>不得大于设备总数量</span></p>
            <div className='numbers'>
              <img src='//img.shenghuozhe.net/shz/2017/03/06/240w_240h_9E8221488801357.jpg@240w.jpg' />
              <div className='price'>
                <p>请输入餐牌数量</p>
              </div>
              <div className='input-num'>
                <button className='add-device' onClick={() => { this._plusBrandNum() }}>+</button>
                <input type='number' onChange={(e) => { this._updateBrandNum(e) }} value={this.props.form.brandNum} pattern='[0-9]*' />
                <button onClick={() => { this._minusBrandNum() }}>-</button>
              </div>
            </div>
            <Line className='device-line' />
            {/* <div className='numbers'>
              <img src='//img.shenghuozhe.net/shz/2016/12/25/258w_156h_475891482658732.jpg@240w.jpg' />
              <div className='price'>
                <p>请输入电池数量</p>
              </div>
              <div className='input-num'>
                <button className='add-device' onClick={() => { this._plusBatteryNum() }}>+</button>
                <input type='number' onChange={(e) => { this._updateBatteryNum(e) }} value={this.props.form.batteryNum} pattern='[0-9]*' />
                <button onClick={() => { this._minusBatteryNum() }}>-</button>
              </div>
            </div> */}
            <div className='numbers'>
              <img src='//img.shenghuozhe.net/shz/2017/03/28/216w_159h_FCA371490683657.png@240w.png' />
              <div className='price'>
                <p>请输入适配器数量</p>
              </div>
              <div className='input-num'>
                <button className='add-device' onClick={() => { this._plusAdapterNum() }}>+</button>
                <input type='number' onChange={(e) => { this._updateAdapterNum(e) }} value={this.props.form.adapterNum} pattern='[0-9]*' />
                <button onClick={() => { this._minusAdapterNum() }}>-</button>
              </div>
            </div>
            <div className='date-panel'>
              <Cells>
                <Cell className='install-date-cell' others={{ onClick: (e) => this._bindOpenSelectDateModal() }}>
                  <CellBody>安装日期</CellBody>
                  <CellFooter className='install-date'>{this.props.form.installDate} <Icon name='xuanze' /></CellFooter>
                </Cell>
              </Cells>
            </div>
            <div className='comment-panel'>
              <textarea rows='4' placeholder='请填写安装备注信息' value={this.props.form.comment} onChange={this._bindChangeTextarea.bind(this)} />
            </div>

            {/** <p className='time-title'>安装时间</p>
            <div className='time-options'>
              {TIMES.map((time, i) => {
                return <span key={i} onClick={() => { this._updateTime(time) }} className={time === this.props.form.installTime ? 'active' : null}>{time}</span>
              })}
            </div> **/}
          </div>
          {this.props.form && this.props.form.devicePosition && this.props.form.devicePosition.length > 0 ? this._renderDevicePosition() : null}
          {this.props.location.query.redo === '2' ? <a className='button prev-button' href='javascript: void(0)' onClick={() => { this._triggerRedoPrevious() }} >上一步</a> : null}
          {this.props.location.query.type === '1'
          ? <a className='button' href='javascript: void(0)' onClick={() => { this._triggerSubmit() }} >提交</a>
          : <a className='button' href='javascript: void(0)' onClick={() => { this._triggerNext() }} >下一步</a>}
          {this.state.showInstallDate ? <InstallDate list={this.props.form.installDateList} selected={this.props.form.installDate} onSelectInstallDate={this._bindSelectInstallDate.bind(this)} onClose={this._bindCloseSelectInstallDate.bind(this)} /> : null}
        </div>
      )
    }
  }
  _bindChangeTextarea (e) {
    this.props.actions.updateInstallComment(e.target.value)
  }
  _bindChangeReapply (e) {
    this.props.actions.updateReapplyComment(e.target.value)
  }
  _renderDevicePosition () {
    return <div>
      <div className='device-position-title'>设备预放位置</div>
      <ul className='device-position'>
        {this.props.form.devicePosition.map((item, i) => {
          return <li key={i} className='clearfix'>
            <div>设备{item.device}</div>
            <div>
              <Input
                type='number'
                className='input'
                pattern='[0-9]*'
                placeholder='请输入包间号/桌号'
                value={item.position || ''}
                onChange={this._handleChangeDevicePosition.bind(this, i)} />
            </div>
          </li>
        })}
      </ul>
    </div>
  }
  _choseStandardOption (value) {
    this.props.actions.choseStandardOption(value)
  }
  _triggerPrevious () {
    this.setState({
      showNextPage: false
    })
  }
  _triggerRedoNext () {
    if (!this.props.form.reapplyComment) return Toast.show('请填写重新申请理由')
    this.setState({
      showReapply: false
    })
  }
  _triggerRedoPrevious () {
    this.setState({
      showReapply: true
    })
  }
  _triggerNext () {
    if (!this._check()) return
    this.setState({
      showNextPage: true
    })
  }
  _check () {
    if (parseInt(this.props.form.deviceNum) === 0 && parseInt(this.props.form.deviceWithBatteryNum) === 0) return Toast.show('请添加设备数量')
    if (parseInt(this.props.form.deviceNum) + parseInt(this.props.form.deviceWithBatteryNum) < parseInt(this.props.form.brandNum)) return Toast.show('餐牌数量不得大于设备总数量')
    if (parseInt(this.props.form.deviceNum) + parseInt(this.props.form.deviceWithBatteryNum) < parseInt(this.props.form.batteryNum)) return Toast.show('电池数量不得大于设备总数量')
    if (parseInt(this.props.form.deviceNum) + parseInt(this.props.form.deviceWithBatteryNum) < parseInt(this.props.form.adapterNum)) return Toast.show('适配器数量不得大于设备总数量')
    // if (parseInt(this.props.form.batteryNum) === 0) return Toast.show('请添加电池数量')
    // if (parseInt(this.props.form.adapterNum) === 0) return Toast.show('请添加适配器数量')
    if (!this.props.form.installDate) return Toast.show('请选择安装日期')
    // if (!this.props.form.installTime) return Toast.show('请选择安装时间')
    if (new Date(this.props.form.installDate.split('-').join('/') + ' ' + this.props.form.installTime.substring(this.props.form.installTime.indexOf('-') + 1)) < new Date()) {
      return Toast.show('安装时间需在当前时间之后')
    }
    return true
  }
  _triggerSubmit () {
    if (this.props.location.query.type === '1') {
      if (!this._check()) return
    } else {
      if (!this.props.form.priceType) return Toast.show('请选择价格标准')
    }
    NProgress.start()
    this.props.actions.contractAdd(assign({}, this.props.form, {
      shopId: this.props.params.id,
      contractId: this.props.location.query.contractId,
      type: this.props.location.query.type,
      installStartTime: this.props.form.installDate + ' ' + this.props.form.installTime.substring(0, this.props.form.installTime.indexOf('-')),
      installEndTime: this.props.form.installDate + ' ' + this.props.form.installTime.substring(this.props.form.installTime.indexOf('-') + 1)
    }))
  }
  _handleChangeDevicePosition (index, event) {
    this.props.actions.changeDevicePosition({position: event.target.value, index})
  }
  _plusBrandNum () {
    if (parseInt(this.props.form.deviceNum) + parseInt(this.props.form.deviceWithBatteryNum) <= parseInt(this.props.form.brandNum)) return Toast.show('不得大于设备总数量')
    this.props.actions.changeBrandNumber((parseInt(this.props.form.brandNum) + 1) + '')
  }
  _minusBrandNum () {
    if (parseInt(this.props.form.brandNum) === 0) return
    this.props.actions.changeBrandNumber((parseInt(this.props.form.brandNum) - 1) + '')
  }
  _updateBrandNum (e) {
    this.props.actions.changeBrandNumber(e.target.value)
  }
  _plusAdapterNum () {
    if (parseInt(this.props.form.deviceNum) + parseInt(this.props.form.deviceWithBatteryNum) <= parseInt(this.props.form.adapterNum)) return Toast.show('不得大于设备总数量')
    this.props.actions.changeAdapterNumber((parseInt(this.props.form.adapterNum) + 1) + '')
  }
  _minusAdapterNum () {
    if (parseInt(this.props.form.adapterNum) === 0) return
    this.props.actions.changeAdapterNumber((parseInt(this.props.form.adapterNum) - 1) + '')
  }
  _updateAdapterNum (e) {
    this.props.actions.changeAdapterNumber(e.target.value)
  }
  _updateDeviceNum (e) {
    if (e.target.value && parseInt(e.target.value) > 100) return Toast.show('设备数不能超过100哦')
    this.props.actions.changeDeviceNumber(e.target.value)
  }
  _plusDeviceNum () {
    if (parseInt(this.props.form.deviceNum) === 100) return Toast.show('设备数不能超过100哦')
    this.props.actions.changeDeviceNumber((parseInt(this.props.form.deviceNum) + 1) + '')
  }
  _minusDeviceNum () {
    if (parseInt(this.props.form.deviceNum) === 0) return
    this.props.actions.changeDeviceNumber((parseInt(this.props.form.deviceNum) - 1) + '')
  }
  _updateDeviceWithBatteryNum (e) {
    if (e.target.value && parseInt(e.target.value) > 100) return Toast.show('设备数不能超过100哦')
    this.props.actions.changeDeviceWithBatteryNumber(e.target.value)
  }
  _plusDeviceWithBatteryNum () {
    if (parseInt(this.props.form.deviceWithBatteryNum) === 100) return Toast.show('设备数不能超过100哦')
    this.props.actions.changeDeviceWithBatteryNumber((parseInt(this.props.form.deviceWithBatteryNum) + 1) + '')
  }
  _minusDeviceWithBatteryNum () {
    if (parseInt(this.props.form.deviceWithBatteryNum) === 0) return
    this.props.actions.changeDeviceWithBatteryNumber((parseInt(this.props.form.deviceWithBatteryNum) - 1) + '')
  }
  _plusBatteryNum () {
    if (parseInt(this.props.form.deviceNum) + parseInt(this.props.form.deviceWithBatteryNum) <= parseInt(this.props.form.batteryNum)) return Toast.show('不得大于设备总数量')
    this.props.actions.changeBatteryNumber((parseInt(this.props.form.batteryNum) + 1) + '')
  }
  _minusBatteryNum () {
    if (parseInt(this.props.form.batteryNum) === 0) return
    this.props.actions.changeBatteryNumber((parseInt(this.props.form.batteryNum) - 1) + '')
  }
  _updateBatteryNum (e) {
    this.props.actions.changeBatteryNumber(e.target.value)
  }
  _bindGetDate () {
    Bridge.selectTime(true, false, this.props.form.installDate, (response) => {
      if (response.error) return Toast.show(response.error)
      this.props.actions.changeInstallDate(response.data)
    })
  }
  _bindOpenSelectDateModal () {
    if (this.props.form.installDateList) {
      this.setState({
        showInstallDate: true
      })
    } else {
      this.props.actions.fetchGetInstallTime({shopId: this.props.params.id})
    }
  }
  _bindSelectInstallDate (installDate) {
    this.setState({
      showInstallDate: false
    })
    this.props.actions.changeInstallDate(installDate)
  }
  _bindCloseSelectInstallDate () {
    this.setState({
      showInstallDate: false
    })
  }
  _updateTime (time) {
    this.props.actions.changeInstallTime(time)
  }
  componentWillUnmount () {
    Style.unuse()
    clearTimeout(this._timer)
  }
}
