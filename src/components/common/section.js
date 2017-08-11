import React, { Component } from 'react'
import Style from './section.less'
import classnames from 'classnames'

export default class Section extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    let { className, ...others } = this.props
    let cls = classnames({
      section: true,
      [className]: className
    })
    return (
      <section className={cls} {...others}>
        {this.props.children}
      </section>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

export class SectionHeader extends Component {
  render () {
    return (
      <div className='section-header'>
        {this.props.children}
      </div>
    )
  }
}

export class SectionBody extends Component {
  render () {
    return (
      <div className='section-body'>
        {this.props.children}
      </div>
    )
  }
}

export class SectionFooter extends Component {
  render () {
    return (
      <div className='section-footer'>
        {this.props.children}
      </div>
    )
  }
}
