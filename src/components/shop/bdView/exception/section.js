import React, { Component } from 'react'
import Style from '../section.less'
import Cell, { CellBody, CellFooter } from 'components/common/cell'
import Section, { SectionHeader, SectionBody } from 'components/common/section'

export default class ShopSectionComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    let intStatus = parseInt(this.props.status)
    let others = this.props.others
    let statusClass
    if (intStatus === 0) {
      statusClass = 'status red'
    }
    if (intStatus === 2) {
      statusClass = 'status green'
    }
    return (
      <Section {...others}>
        <SectionHeader>
          <h3>{this.props.shopName}</h3>
          <span className={statusClass}>{this.props.statusLabel}</span>
        </SectionHeader>
        <SectionBody>
          <Cell>
            <CellBody>门店联系人：</CellBody>
            <CellFooter>{this.props.objectVO.contactName}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>联系人电话：</CellBody>
            <CellFooter><a className='tel-phone' href={`tel:${this.props.objectVO.contactMobile}`}>{this.props.objectVO.contactMobile}</a></CellFooter>
          </Cell>
          <Cell>
            <CellBody>备用联系人：</CellBody>
            <CellFooter>{this.props.objectVO.secondaryContactName}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>备用联系人电话：</CellBody>
            <CellFooter><a className='tel-phone' href={`tel:${this.props.objectVO.secondaryContactMobile}`}>{this.props.objectVO.secondaryContactMobile}</a></CellFooter>
          </Cell>
          <Cell>
            <CellBody>门店电话：</CellBody>
            <CellFooter><a className='tel-phone' href={`tel:${this.props.objectVO.shopMobile}`}>{this.props.objectVO.shopMobile}</a></CellFooter>
          </Cell>
          {this.props.objectVO.merchantName
            ? <Cell>
              <CellBody>公司名：</CellBody>
              <CellFooter>{this.props.objectVO.merchantName}</CellFooter>
            </Cell> : null}
          {this.props.objectVO.merchantContactName
            ? <Cell>
              <CellBody>公司联系人：</CellBody>
              <CellFooter>{this.props.objectVO.merchantContactName}</CellFooter>
            </Cell> : null}
          {this.props.objectVO.merchantContactMobile
            ? <Cell>
              <CellBody>联系人电话：</CellBody>
              <CellFooter><a className='tel-phone' href={`tel:${this.props.objectVO.merchantContactMobile}`} />{this.props.objectVO.merchantContactMobile}</CellFooter>
            </Cell> : null}
          <Cell>
            <CellBody>设备数量(不带电池版)：</CellBody>
            <CellFooter>{this.props.objectVO.deviceNum}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>设备数量(带电池版)：</CellBody>
            <CellFooter>{this.props.objectVO.deviceWithBatteryNum}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>餐牌数量：</CellBody>
            <CellFooter>{this.props.objectVO.brandNum}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>适配器数量：</CellBody>
            <CellFooter>{this.props.objectVO.adapterNum}</CellFooter>
          </Cell>
        </SectionBody>
      </Section>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
