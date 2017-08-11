import React, { Component } from 'react'
import Style from './tabs.less'
import classnames from 'classnames'

export default class Tabs extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    let { className, ...others } = this.props
    return (
      <div className={className ? `${className} clearfix` : `tabs`} {...others}>
        {this.props.children}
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

export class Tab extends Component {
  render () {
    let { className, highlight, others } = this.props
    let cls = classnames({
      tab: true,
      highlight: highlight,
      [className]: className
    })
    return (
      <a href='javascript:;' className={cls} {...others}>
        <span className="tab-word">{this.props.children}</span>
      </a>
    )
  }
}
