import { BD_DEVICE_LIST_TAB_CONFIG } from 'constants/bd'
import React, { Component } from 'react'
import NProgress from 'utils/nprogress'
import Confirm from 'components/bd/device/confirm'
import {router} from 'utils'

import Style from './cell.less'

export default class ShopItemComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showLostModal: false,
      modalText: '撤销申请后, 此遗失记录将会被删除',
      confirmType: null
    }
  }
  componentWillMount () {
    Style.use()
  }

  componentWillUnmount () {
    Style.unuse()
  }

  render () {
    return (<div>
      {this._renderDetail()}
      {this.state.showLostModal
      ? <Confirm
        title={this.state.modalText}
        okDo={(e) => { this._bindCacelLost(e) }}
        cancelDo={() => { this.setState({showLostModal: false}) }}
      /> : null
      }
    </div>)
  }

  _renderDetail () {
    switch (parseInt(this.props.type)) {
      case BD_DEVICE_LIST_TAB_CONFIG[0].type:
        return <div className='item'>
          <p>申领时间</p>
          <p>{this.props.applyGetTime}</p>
          {this._renderChildItem()}
          <div className='footer clearfix' style={{height: 40}}>
            <div className='button-list'>
              <button onClick={this._bindCancelGet.bind(this)}>撤回</button>
            </div>
          </div>
        </div>
      case BD_DEVICE_LIST_TAB_CONFIG[1].type:
        return <div className='item'>
          <p>申请退回时间</p>
          <p>{this.props.applyBackTime}</p>
          {this._renderChildItem()}
          <div className='footer clearfix' style={{height: 40}}>
            <div className='button-list'>
              <button onClick={this._bindCancelBack.bind(this)}>撤回</button>
            </div>
          </div>
        </div>
      case BD_DEVICE_LIST_TAB_CONFIG[2].type:
        return <div className='item'>
          <p>使用时间</p>
          <p>{this.props.useTime}</p>
          {this._renderUsedItem()}
        </div>
      case BD_DEVICE_LIST_TAB_CONFIG[3].type:
        return <div className='item'>
          <p>申请退回时间</p>
          <p>{this.props.applyBackTime}</p>
          {this._renderChildItemTwo()}
        </div>
      case BD_DEVICE_LIST_TAB_CONFIG[6].type:
        return <div className='item'>
          <p>{this.props.lostType === 2 ? '设备类型' : '设备编号'}: <span style={{float: 'right', paddingRight: 10, color: this.props.status === 0 ? '#FF5E45' : this.props.status === 1 ? '#3DCF55' : this.props.status === 2 ? '#D0021B' : null}}>{this.props.statusText}</span></p>
          {this.props.lostType === 2 ? this._renderSpareItem(this.props.devices) : this._renderLostItem(this.props.lostDeviceList)}
          {this.props.lostType !== 2 ? <div>
            <p style={{marginTop: 10}}>安装门店:</p>
            <div className='child-item' onClick={() => router.push(`/bd/device/lose/loseDetail?recordId=${this.props.recordId}&lostType=${this.props.lostType || ''}`)}>
              <p >门店名称: <span style={{marginLeft: 10}}>{this.props.shopName}</span></p>
              <p >联系人电话: <span style={{marginLeft: 10}}>{this.props.shopContactMobile}</span></p>
            </div>
          </div> : null
          }
          {this.props.refuseReason ? <div>
            <p>拒绝原因: </p>
            <div className='refuse'>{this.props.refuseReason}</div>
          </div> : null}
          <p className='lost-time'>申请时间: {this.props.createTime}</p>
          {this.props.status !== 0 ? <p className='lost-time'>审核时间: {this.props.auditTime}</p> : null}
          <div className='footer clearfix' style={{height: 40}}>
            <div className='button-list'>
              <button style={{color: '#797979', borderColor: '#797979'}} onClick={() => router.push(`/bd/device/findout?recordId=${this.props.recordId}&lostType=${this.props.lostType || ''}`)}>设备已找回</button>
              {this.props.status === 0 ? <button style={{marginLeft: 10}} onClick={() => { this.setState({showLostModal: true, confirmType: 'lostCancel'}) }}>撤销申请</button> : null}
            </div>
          </div>
        </div>
      case BD_DEVICE_LIST_TAB_CONFIG[7].type:
        return <div className='item'>
          <p>申领时间</p>
          <p>{this.props.applyGetTime}</p>
          {this._renderChildItem()}
          <p>领取时间</p>
          <p>{this.props.getedTime}</p>
        </div>
      case BD_DEVICE_LIST_TAB_CONFIG[8].type:
        return <div className='item'>
          <p>回收时间</p>
          <p>{this.props.recycleTime}</p>
          {this._renderUsedItem()}
        </div>
      case BD_DEVICE_LIST_TAB_CONFIG[4].type:
        return <div className='item'>
          <p>申请时间</p>
          <p>{this.props.applyGetTime}</p>
          {this._renderBorrowedItem()}
          <div className='footer clearfix' style={{height: 40}}>
            <div className='button-list'>
              <button style={{marginRight: 10}} onClick={this._bindRejectBorrow.bind(this)}>拒绝</button>
              <button style={{backgroundColor: '#3DCF55', color: '#FFF', border: 'none'}} onClick={this._bindAgreeBorrow.bind(this)}>同意</button>
            </div>
          </div>
        </div>
      case BD_DEVICE_LIST_TAB_CONFIG[5].type:
        return <div className='item'>
          <p>借出时间</p>
          <p>{this.props.borrowTime}</p>
          {this._renderBorrowedItem()}
        </div>
      default :
        return null
    }
  }
  _renderUsedItem () {
    return <div className='child-item'>
      {this.props.deviceNos ? <p className='word-break'>设备编号：{this.props.deviceNos}</p> : null}
      {this.props.products && this.props.products.map((item, i) => {
        return <p key={i}>{item.productName}: {item.normalNum}</p>
      })}
      <p>门店名称：{this.props.shopName}</p>
    </div>
  }
  _renderChildItem () {
    return <div className='child-item'>
      {this.props.products && this.props.products.map((item, i) => {
        return <p key={i}>{item.productName}: {item.normalNum}</p>
      })}
      <p>设备来源: { this.props.deviceOrigin }</p>
    </div>
  }
  _renderChildItemTwo () {
    return <div className='child-item'>
      {this.props.products && this.props.products.map((item, i) => {
        return <p key={i}>{item.productName}: {item.normalNum ? item.normalNum : 0}(正常件),{item.damageNum ? item.damageNum : 0}(损坏件)</p>
      })}
    </div>
  }
  _renderLostItem (list) {
    if (!list) return <div className='child-item'><p>暂无设备</p></div>
    let versionOne = list.filter(val => ~[4, 5, 6, 7].indexOf(val.deviceType))
    let versionTwo = list.filter(val => ~[9, 10, 12].indexOf(val.deviceType))
    let versionBox = list.filter(val => ~[8, 13].indexOf(val.deviceType))
    return <div className='child-item lost-item' onClick={() => router.push(`/bd/device/lose/loseDetail?recordId=${this.props.recordId}&lostType=${this.props.lostType || ''}`)}>
      {versionOne.length ? <p>座充一代: <span style={{paddingRight: 10}}>{versionOne.map((val, i) => { return val.deviceNo + '， ' })}</span></p> : null}
      {versionTwo.length ? <p>座充二代: <span style={{paddingRight: 10}}>{versionTwo.map((val, i) => { return val.deviceNo + '， ' })}</span></p> : null}
      {versionBox.length ? <p>盒子: <span style={{paddingRight: 10}}>{versionBox.map((val, i) => { return val.deviceNo + '， ' })}</span></p> : null}
    </div>
  }
  _renderSpareItem () {
    return <div className='child-item' onClick={() => router.push(`/bd/device/lose/loseDetail?recordId=${this.props.recordId}&lostType=${this.props.lostType || ''}`)}>
      {this.props.lostDeviceCount && this.props.lostDeviceCount.map((item, i) => {
        return <div key={i}>
          <p key={i}>{item.productName}: <span>{item.count}</span></p>
        </div>
      })}
    </div>
  }
  _renderBorrowedItem () {
    return <div className='child-item'>
      {this.props.products.map((item, i) => {
        return <p key={i}>{item.productName}: {item.normalNum}</p>
      })}
      {this.props.deviceOrigin ? <p className='word-break'>设备借出：{this.props.deviceOrigin}</p> : null}
    </div>
  }

  _bindCancelGet (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.actions.fetchCancelGet({id: this.props.id})
    NProgress.start()
  }

  _bindCancelBack (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.actions.fetchCancelBack({id: this.props.id})
    NProgress.start()
  }

  _bindCacelLost (e) {
    this.props.actions.fetchCancelLost({recordId: this.props.recordId})
    NProgress.start()
    this.setState({showLostModal: false})
  }

  _bindRejectBorrow (e) {
    e.stopPropagation
    e.preventDefault
    this.props.actions.fetchRejectBorrow({id: this.props.id})
    NProgress.start()
  }

  _bindAgreeBorrow (e) {
    e.stopPropagation
    e.preventDefault
    this.props.actions.fetchAgreeBorrow({id: this.props.id})
    NProgress.start()
  }
}

