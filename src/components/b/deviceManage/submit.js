import React, { Component } from 'react'
import Style from './submit.less'

export default class Service extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return <div className='submit'>
      <button onClick={this.props.onClick.bind(this)} className='btn-submit'>保存修改</button>
    </div>
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
