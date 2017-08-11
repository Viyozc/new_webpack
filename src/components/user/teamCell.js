import React, { Component } from 'react'
import { Link } from 'components/link'
import Style from './teamCell.less'
import { params } from 'utils'

export default class TeamCell extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <Link className='tr clearfix' to={'/user/performance?' + params({sellerId: this.props.sellerId, sellerNick: this.props.sellerNick, selectedDate: this.props.selectedDate, departmentId: this.props.departmentId})}>
        <div className={this.props.sellerStatus ? 'leave' : ''}>{this.props.sellerNick}</div>
        <div>{this.props.thisMonthShopInstalled}</div>
        <div>{this.props.thisMonthDeviceAchieve}</div>
        <div>{this.props.nextMonthDeviceAchieve}</div>
        <div>{this.props.yesterdayOrder}</div>
        <div>{this.props.todayOrder}</div>
        <div>{`${parseFloat(((this.props.offlineRate || 0) * 100).toFixed(2))}%`}</div>
        <i className='dianfont icon-xuanze' />
      </Link>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
