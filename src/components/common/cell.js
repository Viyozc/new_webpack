import React, { Component } from 'react'
import classnames from 'classnames'
import Style from './cell.less'
import Icon from './icon'

export default class Cell extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    const { children, htmlFor, className, href, icon } = this.props
    const Component = href ? 'a' : htmlFor ? 'label' : 'div'
    const cls = classnames({
      cell: true,
      [className]: className
    })
    return (
      <Component className={cls} {...this.props.others}>
        {icon ? <Icon name={icon} /> : null}
        {children}
      </Component>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

export class Cells extends Component {
  render () {
    const { className, ...others } = this.props
    const cls = classnames({
      cells: true,
      [className]: className
    })
    return (
      <div className={cls} {...others}>{this.props.children}</div>
    )
  }
}

export class CellFooter extends Component {
  render () {
    const cls = classnames({
      'cell-footer': true,
      [this.props.className]: this.props.className
    })
    return (
      <div className={cls}>
        {this.props.children}
      </div>
    )
  }
}

export class CellHeader extends Component {
  render () {
    return (
      <div className='cell-header'>
        {this.props.children}
      </div>
    )
  }
}

export class CellBody extends Component {
  render () {
    return (
      <div className='cell-body' style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

export class Line extends Component {
  render () {
    const cls = classnames({
      'cell-line': true,
      [this.props.className]: this.props.className
    })
    return (
      <div className={cls}>
        <div />
      </div>
    )
  }
}
