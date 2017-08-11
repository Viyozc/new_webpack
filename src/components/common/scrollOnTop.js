import React, { PureComponent } from 'react'
import Style from './scrollOnTop.less'

export default class Container extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isScroll: false
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentDidMount () {
    this.setState({
      scroll : this._scroll.bind(this)
    }, () => {
      window.addEventListener('scroll',  this.state.scroll)
    })
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.state.scroll)
  }
  componentWillReceiveProps (nextProps) {

  }
  render () {
    return (
      <div className={this.props.className + ' scroll-top-wap'}>
        <div className={this.state.isScroll ? 'scroll-top-fix-box fixed' : 'scroll-top-fix-box'}>
          {this.props.children}
        </div>
      </div>
    )
  }
  _scroll () {
    let wapOffetTop = document.querySelector('.scroll-top-wap').offsetTop
    let scrollTop = document.body.scrollTop
    if (scrollTop >= wapOffetTop) {
      this.setState({
        isScroll: true
      })
    }
    if (scrollTop < wapOffetTop) {
      this.setState({
        isScroll: false
      })
    }
  }
}
