import React, { Component, PropTypes } from 'react'
import { Link } from 'components/link'
import classnames from 'classnames'
import Style from './button.less'

export default class Button extends Component {
  static defaultProps = {
    fixedSpace: 15
  }
  static propTypes = {
    href: PropTypes.string,
    disabled: PropTypes.string,
    fixed: PropTypes.bool,
    fixedSpace: PropTypes.number
  }
  componentWillMount () {
    Style.use()
  }
  render () {
    const { children, fixed, className, fixedSpace, type, ...others } = this.props
    const Component = this.props.to ? Link : 'div'
    const cls = classnames({
      'dian-btn': true,
      'white': type === 'white',
      [className]: className
    })
    const style = fixed
      ? (Component === 'div')
      ? {
        display: 'block',
        position: 'fixed',
        left: fixedSpace,
        right: fixedSpace,
        bottom: fixedSpace
      } : {
        position: 'fixed',
        left: fixedSpace,
        right: fixedSpace,
        bottom: fixedSpace
      }
      : null

    if (others.disabled) {
      delete others.onClick
    }

    return (
      <Component {...others} className={cls} style={style}>{ children }</Component>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
