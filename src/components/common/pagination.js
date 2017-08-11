import React, { Component } from 'react'
import Mum from 'components/common/mum'
import * as sessionStorage from 'utils/sessionStorage'

export default class Pagination extends Component {
  static defaultProps = {
    size: 20
  }
  constructor (props) {
    super(props)
    this.state = {
      paging: false,
      complete: this._calcComplete(props.data)
    }
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
    if (nextProps.data !== this.props.data) {
      this.setState({
        paging: false,
        complete: this._calcComplete(nextProps.data, this.props.data)
      })
    }
  }
  render () {
    return (
      <div data-kglog={this.props['data-kglog']} className={this.props.className}>
        {this.props.children}
        {this.state.complete || (this.props.data && this.props.data.length < this.props.size) ? null : <Mum />}
      </div>
    )
  }
  _onPaging () {
    this.props.location && sessionStorage.setItem(this.props.location.pathname, window.pageYOffset)
    let totalHeight = parseInt(window.getComputedStyle(document.body).height, 10)
    let offsetHeight = window.pageYOffset + window.innerHeight * 1.5
    if (offsetHeight >= totalHeight &&
            totalHeight > window.innerHeight &&
            !this.state.paging &&
            !this.state.complete) {
            // next page
      this.setState({
        paging: true
      })
      this.props.onPaging && this.props.onPaging()
    }
  }
  _calcComplete (data, prevData) {
    if (!data || !data.length) {
      return true
    }
    return (data.length % this.props.size) > 0 || (!!prevData && prevData.length === data.length)
  }
}
