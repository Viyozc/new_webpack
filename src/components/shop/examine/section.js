import React, { Component } from 'react'
import Style from './section.less'
import Cell, { CellBody, CellFooter, Line } from 'components/common/cell'
import Section, { SectionHeader, SectionBody } from 'components/common/section'

export default class ShopSectionComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    let intStatus = parseInt(this.props.status)
    let others = this.props.others
    switch (this.props.index) {
      case 0:
        return (
          <Section {...others}>
            <SectionHeader>
              <h3>{this.props.shopName}</h3>
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
                <CellFooter><a className='tel-phone' href={`tel:${this.props.mobile}`}>{this.props.mobile}</a></CellFooter>
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
          </Section>
        )
      case 1:
        return (
          <Section {...others}>
            <SectionHeader>
              <h3>安装进度</h3>
              <span className={intStatus === 2 ? 'status green' : 'status red'}>{this.props.subStatusLabel}</span>
            </SectionHeader>
            <SectionBody>
              <Cell>
                <CellBody>订单号：</CellBody>
                <CellFooter>{this.props.contractNo}</CellFooter>
              </Cell>
              <Cell>
                <CellBody>创建时间：</CellBody>
                <CellFooter>{this.props.createTime}</CellFooter>
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
              {
                this.props.installer
                ? <Cell>
                  <CellBody>安装师傅：</CellBody>
                  <CellFooter>{this.props.installerName}</CellFooter>
                </Cell>
                : null
              }
              {
                this.props.installerMobile
                ? <Cell>
                  <CellBody>联系电话：</CellBody>
                  <CellFooter><a className='tel-phone' href={`tel:${this.props.installerMobile}`} />{this.props.installerMobile}</CellFooter>
                </Cell>
                : null
              }
              <Cell>
                <CellBody>安装时间要求：</CellBody>
                <CellFooter>{this.props.installStartTime.substr(0, this.props.installStartTime.indexOf(' '))}</CellFooter>
              </Cell>
              {this.props.receiptTime
                ? <Cell>
                  <CellBody>安装完成时间：</CellBody>
                  <CellFooter>{this.props.receiptTime}</CellFooter>
                </Cell>
                : null
              }
              <Cell>
                <CellBody>安装地址：</CellBody>
                <CellFooter>{this.props.address}</CellFooter>
              </Cell>
              {this.props.devicePosition ? <Line className='line' /> : null}
              {this.props.devicePosition && this.props.devicePosition.map((item, i) => {
                return <Cell key={i}>
                  <CellBody>设备{item.device}：</CellBody>
                  <CellFooter>{item.position ? item.position + '号桌/包间' : ''}</CellFooter>
                </Cell>
              })}
            </SectionBody>
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
