import React, { Component } from 'react'
import { router } from 'utils'
import Style from './section.less'
import Button from 'components/common/button'
import Cell, { CellBody, CellFooter } from 'components/common/cell'
import Section, { SectionHeader, SectionBody, SectionFooter } from 'components/common/section'

export default class ShopSectionComponent extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    let others = this.props.others
    let statusClass
    let intStatus = parseInt(this.props.status)
    if (intStatus === 0) {
      statusClass = 'status red'
    }
    if (intStatus === 4) {
      statusClass = 'status green'
    }
    switch (this.props.index) {
      case 0:
        return (
          <Section {...others}>
            <SectionHeader>
              <h3>门店信息</h3>
              <span className={statusClass}>{this.props.statusLabel}</span>
            </SectionHeader>
            <SectionBody>
              <Cell>
                <CellBody>门店名称：</CellBody>
                <CellFooter>{this.props.shopName}</CellFooter>
              </Cell>
              <Cell>
                <CellBody>门店ID：</CellBody>
                <CellFooter>{this.props.shopId}</CellFooter>
              </Cell>
              <Cell>
                <CellBody>门店联系人：</CellBody>
                <CellFooter>{this.props.contactName}</CellFooter>
              </Cell>
              <Cell>
                <CellBody>门店联系人电话：</CellBody>
                <CellFooter>
                  <a className='tel-phone' href={`tel:${this.props.contactMobile}`}>{this.props.contactMobile}</a>
                </CellFooter>
              </Cell>
              <Cell>
                <CellBody>门店电话：</CellBody>
                <CellFooter>
                  <a className='tel-phone' href={`tel:${this.props.mobile}`}>{this.props.mobile}</a>
                </CellFooter>
              </Cell>
              <Cell>
                <CellBody>备用联系人：</CellBody>
                <CellFooter>{this.props.secondaryContactName}</CellFooter>
              </Cell>
              <Cell>
                <CellBody>备用联系人电话：</CellBody>
                <CellFooter>
                  <a className='tel-phone'
                     href={`tel:${this.props.secondaryContactMobile}`}>{this.props.secondaryContactMobile}</a>
                </CellFooter>
              </Cell>
              {this.props.merchantName
                ? <Cell>
                  <CellBody>公司名：</CellBody>
                  <CellFooter>{this.props.merchantName}</CellFooter>
                </Cell> : null}
              {this.props.merchantContactName
                ? <Cell>
                  <CellBody>公司联系人：</CellBody>
                  <CellFooter>{this.props.merchantContactName}</CellFooter>
                </Cell> : null}
              {this.props.merchantContactMobile
                ? <Cell>
                  <CellBody>公司联系人电话：</CellBody>
                  <CellFooter>
                    <a className='tel-phone'
                       href={`tel:${this.props.merchantContactMobile}`}>{this.props.merchantContactMobile}</a>
                  </CellFooter>
                </Cell> : null}
              <Cell>
                <CellBody>客户每天借电次数：</CellBody>
                <CellFooter>{this.props.chargeFrequency}</CellFooter>
              </Cell>
              {this.props.priceTypeText
                ? <Cell>
                  <CellBody>价格标准：</CellBody>
                  <CellFooter>{this.props.priceTypeText}</CellFooter>
                </Cell>
                : null}
              <Cell>
                <CellBody>门店类型：</CellBody>
                <CellFooter>{this.props.typeName}</CellFooter>
              </Cell>
              <Cell>
                <CellBody>座位数：</CellBody>
                <CellFooter>{this.props.seatNum}</CellFooter>
              </Cell>
              <Cell>
                <CellBody>营业时间：</CellBody>
                <CellFooter>
                  {this.props.openingHours && this.props.openingHours.map((item, i) => {
                    return <p key={i}>{item.start}-{item.end}</p>
                  })}
                </CellFooter>
              </Cell>
            </SectionBody>
            <SectionFooter>
              {/* {!this.props.isManager ? <Button onClick={() => { router.push('/shop/create?shopId=' + this.props.shopId) }}>编辑资料</Button> : null} */}
              {this.props.status !== 2 ? <Button
                onClick={() => { router.push('/shop/create?shopId=' + this.props.shopId) }}>编辑资料</Button> : null}

            </SectionFooter>
          </Section>
        )
      default:
        return null
    }
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
