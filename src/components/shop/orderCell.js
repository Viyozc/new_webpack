import React, { Component } from 'react'
import { Link } from 'components/link'
import Style from './device/cell.less'
import { params } from 'utils'

export default class OrderCell extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    return (
      <div className='device-cell'>
        <Link className='shop clearfix' to={'/user/mine/shops/' + this.props.shopId + '/device?activeTab=0'}>
          <div className='install'>
            <p className='install-name'>{this.props.shopName}</p>
          </div>
          <div
            className='install-chose'>{this.props.deviceCount ? `设备总数：${this.props.deviceCount || 0}` : null}&nbsp;&nbsp;
            设备平均订单数：{this.props.averageOrder ? `${this.props.averageOrder || 0}` : null}<i
              className='dianfont icon-xuanze'/></div>
        </Link>
        {this._renderList()}
      </div>
    )
  }

  _renderList () {
    let _this = this
    if (this.props.data.length === 0) {
      return <div className='child-notfound'>暂无设备</div>
    }
    return <table>
      <tbody>
      <tr className="tr clearfix">
        <td>
          <p>门店合计</p>
        </td>
        <td>{_this.props.totalOrderCount}</td>
        <td>{_this.props.totalRefundOrder}</td>
      </tr>
      {this.props.data.map((item, i) => {
        let backColor
        switch (parseInt(item.status)) {
          case -1:
            backColor = 'grey'
            break
          case 0:
          case 1:
            backColor = 'green'
            break
          case 2:
          case 3:
            backColor = 'red'
            break
          default:
            backColor = 'shawller-grey'
        }
        return (
          <tr className='tr clearfix' key={i}>
            <td>
              <p>{item.deviceNo}</p>
              <p>{item.par ? <span className='weidabiao'>{item.par}</span> : null}</p>
              <p>{item.statusText ? <span className={backColor}>{item.statusText}</span> : null}
                {parseInt(item.status) === 2 || parseInt(item.status) === 3 ? <span
                  style={{color: '#909090'}}><br/>离线时间:{item.lastOfflineTime}</span> : null}</p>
              <p>{item.battery && parseInt(item.battery) !== 0 ?  <span
                className='green'>{`电量：${item.battery}%`}</span> : null}
                {!item.battery && (parseInt(item.status) === 0 || parseInt(item.status) === 1) ?
                  <span className='green'>交流电</span> : null}</p>
              {item.reason && item.reason.length ?
                <p className='battery-use'>离线原因：{item.reason.map((o, i) => <span key={i}>{o}</span>)}</p> : null}
            </td>
            <td><Link to={'/shop/device/orderList?' + params({
              deviceNo: item.deviceNo,
              shopName: _this.props.shopName
            })}>{item.successOrder}</Link></td>
            <td><Link to={'/shop/device/orderList?' + params({
              deviceNo: item.deviceNo,
              shopName: _this.props.shopName
            })}>{item.refundOrder}</Link></td>
          </tr>
        )
      })
      }
      </tbody>
    </table>
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
