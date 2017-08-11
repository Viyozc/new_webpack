import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'components/link'
import Button from 'components/common/button'
import Cell, { CellBody, CellFooter } from 'components/common/cell'
import Section, { SectionBody } from 'components/common/section'
import { router, limitFontSize } from 'utils'
import Style from './item.less'

export default class ShopItemComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div>{this._renderDetail()}</div>
    )
  }
  _renderDetail () {
    let intStatus = parseInt(this.props.status)
    let className = this.props.className
    let others = this.props.others
    let cls = classnames({
      'shop-item': true,
      [className]: className
    })
    return (
      <Link className={cls} {...others} to={'/shops/' + this.props.shopId}>
        <div className='shop-item-header'>
          <h3>{limitFontSize(this.props.shopName, 10, true)}</h3>
        </div>

        <div className='shop-item-body'>
          <div className='shop-main'>
            <p>门店联系人：{this.props.contactName}</p>
            <p>联系人电话：{this.props.contactMobile}</p>
            <p>门店电话：{this.props.mobile}</p>
            <p>地址：{this.props.address}</p>
            <p>BD小二：{this.props.sellerNick}</p>
            <p>小二电话：{this.props.sellerMobile}</p>
          </div>
          {this.props.contracts ? <ul className='install-process'>
            {this.props.contracts.map((item, i) => {
              let statusClass
              if (intStatus === 0) {
                statusClass = 'status red'
              }
              if (intStatus === 4) {
                statusClass = 'status green'
              }
              return <li key={i} >
                <Section>
                  <SectionBody>
                    <Cell>
                      <CellBody>安装进度：</CellBody>
                      <CellFooter><span className={statusClass}>{item.subStatusLabel}</span></CellFooter>
                    </Cell>
                    <Cell>
                      <CellBody>安装时间要求：</CellBody>
                      <CellFooter>{item.installStartTime && item.installStartTime.substr(0, item.installStartTime.indexOf(' '))}</CellFooter>
                    </Cell>
                  </SectionBody>
                </Section>
              </li>
            })}
          </ul> : null}
        </div>

        <div className='shop-item-footer'>
          <div>
            <p>创建时间：{this.props.createTime}</p>
          </div>
          {!this.props.isManager && intStatus === 0 ? <Button onClick={(e) => { this._locationToSign(e) }}>申请安装</Button> : null}
        </div>
      </Link>
    )
  }
  _locationToSign (e) {
    e.stopPropagation()
    e.preventDefault()
    router.push('/shops/' + this.props.shopId + '/sign')
  }
  _locationToReclaim (e) {
    e.stopPropagation()
    e.preventDefault()
    router.push('/reclaim/bd/' + this.props.shopId + '/device')
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
