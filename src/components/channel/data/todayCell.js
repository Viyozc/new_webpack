import React, { PureComponent } from 'react'
import { Link } from 'components/link'
import { router, params, batteryInDevice } from 'utils'
import assign from 'lodash/assign'
import { DataOrderConfig, DataSortType } from 'constants/channel'
import Style from './cell.less'
import ScrollOnTop from 'components/common/scrollOnTop'

class Title extends PureComponent {
  componentWillMount () {
    Style.use()
  }
  render () {
    let query = this.props.location.query
    return <ScrollOnTop className="scroll-on-top-wap"><table className='list-title'>
      <tbody>
        <tr>
          <td>设备编号</td>
          {DataOrderConfig.map((item, i) => {
            return <td className='order' key={i} onClick={this._changeUrl.bind(this, item.key)}>
              {item.name}
              <i className={item.key === query.dataSortField && query.sortType === DataSortType[1] ? 'dianfont icon-jiantou red' : 'dianfont icon-jiantou'} />
              <i className={item.key === query.dataSortField && query.sortType === DataSortType[0] ? 'dianfont icon-jiantou0101 red' : 'dianfont icon-jiantou0101'} />
            </td>
          })}
        </tr>
      </tbody>
    </table></ScrollOnTop>
  }
  _changeUrl (key) {
    if (this.props.location.query.dataSortField === key) {
      router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          sortType: DataSortType[0] === this.props.location.query.sortType ? DataSortType[1] : DataSortType[0]
        })
      })
    } else {
      router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          dataSortField: key,
          sortType: DataSortType[0]
        })
      })
    }
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

class Cell extends PureComponent {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='device-cell'>
        <Link className='shop clearfix' to={'/shops/' + this.props.shopId}>
          <div className='install'>
            <p className='install-name'>{this.props.shopName}</p>
            <p className='install-num'>{this.props.nickName ? `员工：${this.props.nickName}` : null} {`设备总数：${this.props.deviceCount || 0}`}</p>
          </div>
          <div className='install-chose'><i className='dianfont icon-xuanze' /></div>
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
    return <div className='child-found'>
      <i className='dianfont icon-fenlei' onClick={() => this.props.triggerChangeOpenStatus(this.props.index)} />
      <table>
        <tbody>
          <tr onClick={() => this.props.triggerChangeOpenStatus(this.props.index)}>
            <td>门店合计：</td>
            <td className='order'>{this.props.todayScanNumCount || 0}</td>
            <td className='order'>{this.props.todayCreateOrderCount || 0}</td>
            <td className='order'>{this.props.todaySuccessOrderCount || 0}</td>
            <td className='order'>{this.props.todayRefundOrderCount || 0}</td>
            <td className='order'>{this.props.todaydeviceAverageOrder || 0}</td>
          </tr>
          {this.props.open && this.props.devices.map((item, i) => {
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
              <tr className='tr' key={i}>
                <td>
                  <p>{item.deviceNo}</p>
                  <p>{item.par ? <span className='weidabiao'>{item.par}</span> : null}</p>
                  <p>{item.statusText ? <span className={backColor}>{item.statusText}</span> : null} <span style={{color: '#909090'}}>{item.lastOfflineTime}</span></p>
                  <p>{item.recycleTime ? <span className='grey'>回收</span> : null} <span style={{color: '#909090'}}>{item.recycleTime}</span></p>
                  <p>{batteryInDevice(item.battery) && (parseInt(item.status) === 0 || parseInt(item.status) === 1) ? <span className='green'>{`电量：${item.battery}%`}</span> : null} {!batteryInDevice(item.battery) && (item.status === 0 || item.status === 1) ? <span className='green'>交流电</span> : null}</p>
                  {item.reason && item.reason.length ? <p className='battery-use'>离线原因：{item.reason.map((o, i) => <span key={i}>{o}</span>)}</p> : null}
                </td>
                <td className='order'>{item.todayScanNum || 0}</td>
                <td className='order'>{item.todayCreateOrder || 0}</td>
                <td className='order'><Link to={'/shop/device/orderList?' + params({deviceNo: item.deviceNo, shopName: _this.props.shopName})}>{item.todaySuccessOrder || 0}</Link></td>
                <td className='order'><Link to={'/shop/device/orderList?' + params({deviceNo: item.deviceNo, shopName: _this.props.shopName})}>{item.todayRefundOrder || 0}</Link></td>
                <td className='order'>{item.todaySuccessOrder || 0}</td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

export {
  Cell,
  Title
}
