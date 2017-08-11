import React, { PureComponent } from 'react'
import Mum from 'components/common/mum'
import * as sessionStorage from 'utils/sessionStorage'

export default class PaginationA extends PureComponent {
  static defaultProps = {
    size: 20
  }
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    this.__onPaging = this._onPaging.bind(this)
    window.addEventListener('scroll', this.__onPaging)
    window.scrollTo(0, parseInt(sessionStorage.getItem(this.props.location && this.props.location.pathname) || 0))
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.__onPaging)
  }
  componentWillReceiveProps (nextProps) {
  }
  render () {
    return (
      <div data-kglog={this.props['data-kglog']} className={this.props.className}>
        {this.props.children}
        {this.props.complete || (this.props.data && this.props.data.length < this.props.size) ? null : <Mum />}
      </div>
    )
  }
  _onPaging () {
    this.props.location && sessionStorage.setItem(this.props.location.pathname, window.pageYOffset)
    let totalHeight = parseInt(window.getComputedStyle(document.body).height, 10)
    let offsetHeight = window.pageYOffset + window.innerHeight * 1.5
    if (offsetHeight >= totalHeight &&
      totalHeight > window.innerHeight &&
      !this.props.paging &&
      !this.props.complete) {
      this.props.onPaging && this.props.onPaging()
    }
  }
}
