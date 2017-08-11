import React, { Component, PropTypes } from 'react'
import Style from './bindInfo.less'

export default class BindInfoComponent extends Component {
  static propTypes = {
    shopName: PropTypes.string,
    deviceNo: PropTypes.string
  }
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='bind-info'>
        <h4>请确认设备信息</h4>
        <p>门店名称：{this.props.shopName}</p>
        <p>设备号：{this.props.deviceNo}</p>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
