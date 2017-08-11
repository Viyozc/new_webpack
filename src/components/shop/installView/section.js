import React, { Component } from 'react'
import TimeUtil from 'utils/time'
import Style from './section.less'
import Cell, { CellBody, CellFooter, Line } from 'components/common/cell'
import Section, { SectionHeader, SectionBody } from 'components/common/section'
import {
  INSTALL_STATUS
} from 'constants/install'

export default class ShopSectionComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    const STATUS = INSTALL_STATUS[this.props.status]
    return (
      <Section>
        <SectionHeader>
          <h3>{this.props.shopName}</h3>
          <span className='status' style={{color: STATUS.color}}>{this.props.statusVal}</span>
        </SectionHeader>
        <SectionBody>
          <Cell>
            <CellBody>门店联系人：</CellBody>
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
            <CellBody>门店电话：</CellBody>
            <CellFooter><a className='tel-phone' href={`tel:${this.props.shopMobile}`}>{this.props.shopMobile}</a></CellFooter>
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
              <CellBody>联系人电话：</CellBody>
              <CellFooter><a className='tel-phone' href={`tel:${this.props.merchantContactMobile}`} />{this.props.merchantContactMobile}</CellFooter>
            </Cell> : null}
          <Cell>
            <CellBody>客户每天借电次数：</CellBody>
            <CellFooter>{this.props.chargeFrequency}</CellFooter>
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
            <CellBody>适配器数量：</CellBody>
            <CellFooter>{this.props.adapterNum}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>餐牌数量：</CellBody>
            <CellFooter>{this.props.brandNum}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>订单号：</CellBody>
            <CellFooter>{this.props.installNo}</CellFooter>
          </Cell>
          <Cell>
            <CellBody>创建时间：</CellBody>
            <CellFooter>{TimeUtil.format(new Date(this.props.createTime.split('-').join('/')).getTime(), 'YYYY-MM-DD HH:mm')}</CellFooter>
          </Cell>
          {this.props.devicePosition && this.props.devicePosition.length ? <Line className='line' /> : null}
          {this.props.devicePosition && this.props.devicePosition.map((item, i) => {
            return <Cell key={i}>
              <CellBody>设备{item.device}：</CellBody>
              <CellFooter>{item.position ? item.position + '号桌/包间' : ''}</CellFooter>
            </Cell>
          })}
        </SectionBody>
      </Section>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
