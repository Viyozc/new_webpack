import React, { Component } from 'react'
import { Link } from 'components/link'
import Style from './index.less'
import { params } from 'utils'

export default class RecoveryList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showIndex: -1
    }
  }
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
          <div className='install-chose'>设备总数：{this.props.sumDeviceCount || 0} <i className='dianfont icon-xuanze' /></div>
        </Link>
        <table className="summary">
          <tbody>
            <tr className='tr clearfix' onClick={this.props.index === this.state.showIndex && this.state.isShow ? () => this._hide(this.props.index) : () => this._show(this.props.index)}>
              <td>
                门店合计：
              </td>
              <td>{this.props.totalSuccessOrderCount || 0}</td>
              <td>{this.props.totalRefundOrderCount || 0}</td>
              <td>{this.props.totaldeviceAverageOrder}<i className="dianfont icon-fenlei" /></td>
            </tr>
          </tbody>
        </table>
        {this._renderList()}
      </div>
    )
  }
  _renderList () {
    let _this = this
    if (this.props.devices.length === 0) {
      return <div className={this.props.index === this.state.showIndex && this.state.isShow
        ? 'child-notfound show'
        : 'child-notfound hide'}>暂无设备</div>
    }
    return <table className={this.props.index === this.state.showIndex && this.state.isShow ? 'child-notfound show' : 'child-notfound hide'}>
      <tbody>
        {this.props.devices.map((item, i) => {
          return (
            <tr className='tr clearfix' key={i}>
              <td>
                <p>{item.deviceNo}</p>
                <p>{item.par ? <span className='weidabiao'>{item.par}</span> : null}</p>
                <p>{item.recycleTime ? <span className='grey'>回收</span> : null} <span style={{color: '#909090'}}>{item.recycleTime}</span></p>
                {item.reason && item.reason.length ? <p className='battery-use'>离线原因：{item.reason.map((o, i) => <span key={i}>{o}</span>)}</p> : null}
              </td>
              <td><Link to={'/shop/device/orderList?' + params({deviceNo: item.deviceNo, shopName: _this.props.shopName})}>{item.successOrder}</Link></td>
              <td><Link to={'/shop/device/orderList?' + params({deviceNo: item.deviceNo, shopName: _this.props.shopName})}>{item.refundOrder}</Link></td>
              <td>{item.totalAverageOrder}</td>
            </tr>
          )
        })
        }
      </tbody>
    </table>
  }
  _show (index) {
    this.setState({showIndex: index, isShow: true})
  }
  _hide (index) {
    this.setState({showIndex: index, isShow: false})
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
