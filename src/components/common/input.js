import React, { Component } from 'react'
import classnames from 'classnames'
import Style from './input.less'

export default class Input extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    const { className, ...others } = this.props
    const cls = classnames({
      input: true,
      [className]: className
    })
    return (
      <input className={cls} {...others} />
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
