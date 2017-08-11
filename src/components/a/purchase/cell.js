import React, { PureComponent } from 'react'
import Style from './cell.less'
export default class CellComponent extends PureComponent {
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return this._renderDetail()
  }
  _renderDetail () {
    return <div className='item'>
      <div className='header' style={{height: 40}}>
        <p>申请时间</p>
        <p>{this.props.purchaseTime}</p>
        <div className='right'>
          <p className={this.props.status === 2 ? 'green' : 'red'}>{this.props.statusText}</p>
        </div>
      </div>
      {this._renderChildItem()}
      <div className='footer' style={{height: 40}}>
        <div className='right'>
          <p>总金额：<span className='total-amount'>{this.props.totalAmount}元</span></p>
        </div>
      </div>
    </div>
  }
  _renderChildItem () {
    return <div className='child-item'>
      {this.props.items && this.props.items.map((item, i) => {
        return <p>{item.name}：{item.count}{item.unit}</p>
      })}
      {this.props.status === 2 ? <p>物流信息：{this.props.expressCompany} {this.props.expressNo}</p> : null}
      <p className='h6'>设备配件包含：适配器、数据线、卡牌</p>
    </div>
  }
}
