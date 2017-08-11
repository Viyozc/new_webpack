import React, { Component } from 'react'
import Style from './status.less'
import Icon from 'components/common/icon'

export default class Status extends Component {
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    let node
    if (this.props.status === 'success') {
      node = (
        <div className='panel'>
          <Icon name='tianjiachenggong success' />
          <p>{this.props.content}</p>
        </div>
            )
    }
    if (this.props.status === 'fail') {
      node = (
        <div className='panel'>
          <Icon name='cuowu1 fail' />
          <p>{this.props.content}</p>
        </div>
            )
    }
    return (
      <div className='fetch-status' onClick={(e) => { this._preventEvent(e) }}>
        {node}
      </div>
    )
  }
  _preventEvent (e) {
    e.stopPropagation()
    e.preventDefault()
  }
}
