import React, { PureComponent } from 'react'
import Style from './alert.less'

export default class Alert extends PureComponent {
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return (
      <div className='modal-background' onClick={this.onStopPropagation.bind(this)}>
        <div className='container'>
          <div className='content' onClick={this.onStopPropagation.bind(this)}>
            {this.props.disabledTitle ? null : <div className='title'>操作提示</div>}
            <div className='description'>{this.props.children}</div>
          </div>
          <div className='button' onClick={() => { this.props.onClose() }}><span>{this.props.buttonText || '好'}</span></div>
        </div>
      </div>
    )
  }
  onStopPropagation (e) {
    e.stopPropagation()
    e.preventDefault()
  }
}
