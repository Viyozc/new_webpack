import React, { Component } from 'react'
import Style from './bindSuccess.less'

export default class BindSuccessComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='bind-success'>
        {this.props.children}
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
