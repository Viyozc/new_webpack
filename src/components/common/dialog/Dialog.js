import React, { Component } from 'react'
import Style from './dialog.less'
/*
 * @ add by yutang
 * @ onCancel: 取消按键
 * @ onConfirm: 确认按键
*/

export default class dialog extends Component {
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return (
      <div className="dialog-back">
        <div className="dialog-box">
          <div className="dialog-box-content">{this.props.children}</div>
          <div className="dialog-box-bottons">
            <div className="wrap">
              {
                this.props.type == 'alert'
                ?
                null
                :
                <botton className="white" onClick={this.props.onCancel}>取消</botton>
              }
              <botton onClick={this.props.onConfirm}>确认</botton>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
