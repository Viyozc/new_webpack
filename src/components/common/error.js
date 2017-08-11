import React, { Component } from 'react'
import Style from './error.less'

export default class Error extends Component {
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return (
      <div className='error'>
        <i className='dianfont icon-cuowu1' />
        <p>{this.props.children}</p>
      </div>
    )
  }
}
