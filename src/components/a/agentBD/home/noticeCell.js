import React, { Component } from 'react'
import Style from './noticeCell.less'
import Time from 'utils/time'

export default class NoticeCell extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    return (
      <div className='notice-cell'>
        <div className='icon'><i className='dianfont icon-dingdan' /></div>
        <div className='content'>
          <span className='time'>{Time.formatToInterval(1484879485 * 1000)}</span>
          <p className='title'>订单数据异常地址：外婆家西溪印象城店，数量：1台，设备编号：12345678900，设备状况：7日订单数量为0</p>
          <p className='desc'>地址：外婆家西溪印象城店，数量：1台，设备编号：12345678900，设备状况：7日订单数量为0</p>
        </div>
      </div>
    )
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
