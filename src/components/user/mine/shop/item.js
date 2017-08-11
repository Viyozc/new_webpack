import React, { Component } from 'react'
import { Link } from 'components/link'
import Style from './item.less'
import { limitFontSize } from 'utils'

export default class Item extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <Link className='li' to={'/user/mine/shops/' + this.props.shopId + '/device'}>
        <p className='shop-name'>{limitFontSize(this.props.shopName, 10, true)}</p>
        <p className='num'><span className='circle online' /> 在线 {this.props.onlineDeviceNum || 0}</p>
        <p className='num'><span className='circle offline' /> 离线 {this.props.offlineDeviceNum || 0}</p>
        <i className='dianfont icon-xuanze' />
      </Link>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
