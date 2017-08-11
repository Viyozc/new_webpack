import React, { Component, PropTypes } from 'react'
import Style from './logo.less'

export default class Logo extends Component {
  static defaultProps = {
    width: 110,
    height: 70
  }
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    inline: PropTypes.bool
  }
  componentWillMount () {
    Style.use()
  }
  render () {
    const src = '//img.shenghuozhe.net/shz/2017/05/05/236w_134h_9F0CB1493970576.png'
    const style = {
      display: this.props.inline ? 'inline' : 'block'
    }
    return (
      <img {...this.props} style={style} className='logo' src={src} />
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
