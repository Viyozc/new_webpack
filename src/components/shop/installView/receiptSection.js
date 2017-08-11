import React, { Component } from 'react'

import Style from './receiptSection.less'
import Cell, { CellBody, CellFooter } from 'components/common/cell'
import Section, { SectionHeader, SectionBody } from 'components/common/section'

export default class ShopSectionComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <Section className='receipt-section'>
        <SectionHeader>
          <h3>{this.props.shopName}</h3>
        </SectionHeader>
        <SectionBody>
          <Cell>
            <CellBody>联系人：</CellBody>
            <CellFooter>{this.props.contactName}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>联系人电话：</CellBody>
            <CellFooter><a className='tel-phone' href={`tel:${this.props.contactMobile}`}>{this.props.contactMobile}</a></CellFooter>
          </Cell>
          <Cell>
            <CellBody>备用联系人：</CellBody>
            <CellFooter>{this.props.secondaryContactName}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>备用联系人电话：</CellBody>
            <CellFooter><a className='tel-phone' href={`tel:${this.props.secondaryContactMobile}`}>{this.props.secondaryContactMobile}</a></CellFooter>
          </Cell>
          <Cell>
            <CellBody>设备数量(不带电池版)：</CellBody>
            <CellFooter>{this.props.deviceNum}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>设备数量(带电池版)：</CellBody>
            <CellFooter>{this.props.deviceWithBatteryNum}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>餐牌数量：</CellBody>
            <CellFooter>{this.props.brandNum}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>适配器数量：</CellBody>
            <CellFooter>{this.props.adapterNum}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>安装完成时间：</CellBody>
            <CellFooter>{this.props.installTime}</CellFooter>
          </Cell>
        </SectionBody>
      </Section>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
