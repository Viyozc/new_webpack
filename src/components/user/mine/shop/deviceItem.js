import React, { Component } from 'react'
import { Link } from 'components/link'
import Style from './deviceItem.less'
import { params, router, batteryInDevice } from 'utils'

export default class DeviceItem extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    let _this = this
    return (
      <div className='device-cell'>
        <table>
          <tbody>
            {this.props.devices && this.props.devices.map((item, i) => {
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
                <tr className='tr clearfix' key={i} onClick={(e) => this._boxHref(e, item)}>
                  <td>
                    <p>{item.productName}</p>
                    <p>{item.deviceNo}</p>
                    <p>{item.statusText ? <span
                      className={backColor}>{item.statusText}</span> : null} {parseInt(item.status) === 2 || parseInt(item.status) === 3 ? <span style={{color: '#909090'}}>{item.lastOfflineTime}</span> : null}</p>
                    <p>{item.recycleTime ? <span className='grey'>回收</span> : null} <span
                      style={{color: '#909090'}}>{item.recycleTime}</span></p>
                    <p>{batteryInDevice(item.battery) && (parseInt(item.status) === 0 || parseInt(item.status) === 1) ? <span
                      className='green'>{`电量：${item.battery}%`}</span> : null} {!batteryInDevice(item.battery) && (parseInt(item.status) === 0 || parseInt(item.status) === 1) ? <span className='green'>交流电</span> : null}</p>
                    {item.reason && item.reason.length ? <p className='battery-use'>离线原因：{item.reason.map((o, i) => <span key={i}>{o}</span>)}</p> : null}
                  </td>
                  <td>{item.dateNum}</td>
                  <td onClick={(e) => this._order(e, item)} className={item.productType === 8 ? '' : 'link-c'}>{item.successOrder}</td>
                  <td onClick={(e) => this._order(e, item)} className={item.productType === 8 ? '' : 'link-c'}>{item.refundOrder}</td>
                  <td>{(item.successAmount / 100).toFixed(2) }</td>
                  <td>{(item.refundAmount / 100).toFixed(2)}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    )
  }
  _boxHref (e, item) {
    e.stopPropagation()
    e.preventDefault()
    if (Number(item.productType) === 8) {
      router.push(`/user/mine/shops/boxlist/${item.deviceId}`)
    }
  }
  _order (e, item) {
    // temporary close the road of powerbank list
    if (Number(item.productType) !== 8) {
      e.stopPropagation()
      e.preventDefault()
      router.push(`/shop/device/orderList?deviceNo=${item.deviceNo}&shopName=${this.props.shopName}`)
    }
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
