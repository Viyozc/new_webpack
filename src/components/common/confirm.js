import React, { Component } from 'react'
import Style from './confirm.less'
/**
 * @ type: confirm / alert
 * @ title: 显示标题
 * @ content: 提示内容
 * @ cancelModal: 点击空白取消模态框
 * @ onCancel: 取消按键
 * @ onConfirm: 确认按键
 *
 * @ export
 * @ class Alert
 * @ extends {Component}
 */

export default class Alert extends Component {
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return (
      <div className={'modal-background ' + this.props.className} onClick={this.props.cancelModal && this._cancelModal.bind(this)}>
        <div className='container'onClick={this.onStopPropagation.bind(this)}>
          <div className='content'>
            {!this.props.title ? null : <div className='title'>{this.props.title || '是否确认'}</div>}
            <div className='description'>{this.props.content || '是否确认选择'}</div>
          </div>
          {this.props.type === 'confirm'
          ? <div>
            <div className='button db-button' onClick={() => { this.props.onCancel && this.props.onCancel() }}><span>{this.props.cancelTxt || '取消'}</span></div>
            <div className='button db-button' onClick={() => { this.props.onConfirm && this.props.onConfirm() }}><span>{this.props.okTxt || '确认'}</span></div>
          </div>
          : this.props.type === 'alert'
          ? <div className='button' onClick={() => { this.props.onConfirm && this.props.onConfirm() }}><span>{this.props.okTxt || '确认'}</span></div>
          : <div className='button' onClick={() => { this.props.onConfirm && this.props.onConfirm() }}><span>{this.props.okTxt || '确认'}</span></div>}
        </div>
      </div>
    )
  }
  onStopPropagation (e) {
    e.stopPropagation()
    e.preventDefault()
  }
  _cancelModal (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.cancelModal()
  }
}
