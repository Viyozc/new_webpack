import { TabConfig } from 'constants/channel'
import React, { PureComponent } from 'react'
import { router } from 'utils'
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
    switch (parseInt(this.props.status)) {
      case TabConfig[0].status:
        return <div className='item'>
          <div className='header' style={{height: 40}}>
            <p>{this.props.agentName}</p>
            <div className='right'>
              <p className='red'>{this.props.statusText}</p>
            </div>
          </div>
          {this._renderChildItem(TabConfig[0].status)}
          <div className='footer clearfix' style={{height: 40}}>
            <div className='button-list'>
              <button onClick={() => router.push('/channel/agent/create?id=' + this.props.id)}>编辑信息</button>
            </div>
          </div>
        </div>
      case TabConfig[1].status:
        return <div className='item'>
          <div className='header' style={{height: 40}}>
            <p>{this.props.agentName}</p>
            <div className='right'>
              <p className='red'>{this.props.statusText}</p>
            </div>
          </div>
          {this._renderChildItem(TabConfig[1].status)}
          <div className='footer clearfix' style={{height: 40}}>
            <div className='button-list'>
              <button onClick={() => router.push('/channel/agent/create?id=' + this.props.id)}>编辑信息</button>
            </div>
          </div>
        </div>
      case TabConfig[2].status:
        return <div className='item'>
          <div className='header' style={{height: 40}}>
            <p>{this.props.agentName}</p>
            <div className='right'>
              <p className='green'>{this.props.statusText}</p>
            </div>
          </div>
          {this._renderChildItem(TabConfig[2].status)}
          <div className='footer clearfix' style={{height: 40}}>
            <p>合作时间</p>
            <p>{this.props.agentStartTime}</p>
          </div>
        </div>
      default :
        return null
    }
  }
  _renderChildItem (status) {
    return <div className='child-item'>
      <p>结算账号名称：{this.props.accountName}</p>
      {this.props.accountByAlipay ? <p>支付宝账号：{this.props.accountByAlipay}</p> : null}
      {this.props.accountBank ? <p>开户银行：{this.props.accountBank}</p> : null}
      {this.props.accountByBankCard ? <p>银行卡账号：{this.props.accountByBankCard}</p> : null}
      <p>城市：{this.props.city && this.props.city.cityName}</p>
      <p>联系人：{this.props.contactName} {this.props.contactMobile}</p>
      <p>累计代理金额：{this.props.totalAgencyFee}元</p>
      <p>代理级别：{this.props.level && this.props.level.levelValue}</p>
      <p>合作有效期截止：{this.props.agentEndTime}</p>
      {TabConfig[1].status === status ? <p>拒绝原因：{this.props.comments}</p> : null}
    </div>
  }
}
