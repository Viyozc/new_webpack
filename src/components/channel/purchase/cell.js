import { ApprovalTabConfig } from 'constants/channel'
import React, { PureComponent } from 'react'
import { router } from 'utils'
import PreviewImage from 'components/common/previewImage'
import Style from './cell.less'

export default class CellComponent extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {previewImage: false}
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return <div>
      {this._renderDetail()}
      {
        this.state.previewImage && this.props.purchaseApplyPic
        ? <PreviewImage images={[this.props.purchaseApplyPic]} onClose={() => { this.setState({previewImage: false}) }} />
        : null
      }
    </div>
  }
  _renderDetail () {
    switch (parseInt(this.props.status)) {
      case ApprovalTabConfig[0].status:
        return <div className='item'>
          <div className='header' style={{height: 40}}>
            <p>申请时间</p>
            <p>{this.props.createTime}</p>
            <div className='right'>
              <p className='red'>{this.props.statusText}</p>
            </div>
          </div>
          {this._renderChildItem()}
          <div className='total-amount'>总金额：<span className='span'>{this.props.totalAmount}元</span></div>
          <div className='footer clearfix' style={{height: 40}}>
            <div className='button-list'>
              <button onClick={() => this.props.actions.fetchApproval({id: this.props.id})}>审核通过</button>
            </div>
          </div>
        </div>
      case ApprovalTabConfig[1].status:
        return <div className='item'>
          <div className='header' style={{height: 40}}>
            <p>申请时间</p>
            <p>{this.props.createTime}</p>
            <div className='right'>
              <p className='red'>{this.props.statusText}</p>
            </div>
          </div>
          {this._renderChildItem()}
          <div className='total-amount'>总金额：<span className='span'>{this.props.totalAmount}元</span></div>
          <div className='footer clearfix' style={{height: 40}}>
            <div className='button-list'>
              <button onClick={() => router.push(`/channel/purchase/${this.props.id}/create/express`)}>输入物流信息</button>
            </div>
          </div>
        </div>
      case ApprovalTabConfig[2].status:
        return <div className='item'>
          <div className='header' style={{height: 40}}>
            <p>申请时间</p>
            <p>{this.props.createTime}</p>
            <div className='right'>
              <p className='green'>{this.props.statusText}</p>
            </div>
          </div>
          {this._renderChildItem()}
          <div className='total-amount'>总金额：<span className='span'>{this.props.totalAmount}元</span></div>
        </div>
      default :
        return null
    }
  }
  _renderChildItem () {
    return <div className='child-item'>
      <div
        onClick={() => this.setState({previewImage: true})}
        className='purchase-apply-pic'
        style={{backgroundImage: `url(${this.props.purchaseApplyPic})`}} />
      <p key={-1}>代理商：{this.props.agentName}</p>
      {this.props.items && this.props.items.map((item, i) => {
        return <p key={i}>{item.name}：{item.count}{item.unit}</p>
      })}
      {this.props.status === ApprovalTabConfig[2].status ? <p key={this.props.items.length + 1}>物流信息：{this.props.expressCompany} {this.props.expressNo}</p> : null}
    </div>
  }
}
