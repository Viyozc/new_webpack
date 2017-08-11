import React, { Component } from 'react'
import { Link } from 'components/link'
import Style from './cell.less'
import { params, batteryInDevice } from 'utils'

export default class Cell extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    return (
      <div className='device-cell'>
        <Link className='shop clearfix' to={'/shops/' + this.props.shopId}>
          <div className='install'>
            <p className='install-name'>{this.props.shopName}</p>
          </div>
          <div className='install-chose'>{`设备总数：${this.props.deviceCount || 0}`}<i className='dianfont icon-xuanze'/>
          </div>
        </Link>
        {this._renderList()}
      </div>
    )
  }

  _renderList () {
    let _this = this
    if (this.props.devices.length === 0) {
      return <div className='child-notfound'>暂无设备</div>
    }
    return <table>
      <tbody>
      {this.props.devices.map((item, i) => {
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
              <p>{item.statusText ? <span className={backColor}>{item.statusText}</span> : null} <span
                style={{color: '#909090'}}>{item.lastOfflineTime}</span></p>
              <p>{item.recycleTime ? <span className='grey'>回收</span> : null} <span
                style={{color: '#909090'}}>{item.recycleTime}</span></p>
              <p>{batteryInDevice(item.battery) && (parseInt(item.status) === 0 || parseInt(item.status) === 1) ? <span
                className='green'>{`电量：${item.battery}%`}</span> : null} {!batteryInDevice(item.battery) && (item.status === 0 || item.status === 1) ?
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
