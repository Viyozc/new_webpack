import React, { Component } from 'react'

import Cell, { CellBody, CellFooter } from 'components/common/cell'
import Section, { SectionHeader, SectionBody } from 'components/common/section'

import Style from './section.less'

export default class ShopSectionComponent extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    let others = this.props.others
    let shop = this.props.shop
    return (
      <div>
        <Section {...others}>
          <SectionHeader>
            <h3>门店信息</h3>
          </SectionHeader>
          <SectionBody>
            <Cell>
              <CellBody>门店联系人：</CellBody>
              <CellFooter>{shop.contactName}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>联系人电话：</CellBody>
              <CellFooter><a className='tel-phone'
                             href={`tel:${shop.contactMobile}`}>{shop.contactMobile}</a></CellFooter>
            </Cell>
            <Cell>
              <CellBody>备用联系人：</CellBody>
              <CellFooter>{shop.secondaryContactName}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>备用联系人电话：</CellBody>
              <CellFooter><a className='tel-phone'
                             href={`tel:${shop.secondaryContactMobile}`}>{shop.secondaryContactMobile}</a></CellFooter>
            </Cell>
            <Cell>
              <CellBody>门店电话：</CellBody>
              <CellFooter><a className='tel-phone' href={`tel:${shop.mobile}`}/>{shop.mobile}</CellFooter>
            </Cell>
            {shop.merchantName
              ? <Cell>
                <CellBody>公司名：</CellBody>
                <CellFooter>{shop.merchantName}</CellFooter>
              </Cell> : null}
            {shop.merchantContactName
              ? <Cell>
                <CellBody>公司联系人：</CellBody>
                <CellFooter>{shop.merchantContactName}</CellFooter>
              </Cell> : null}
            {shop.merchantContactMobile
              ? <Cell>
                <CellBody>联系人电话：</CellBody>
                <CellFooter><a className='tel-phone'
                               href={`tel:${shop.merchantContactMobile}`}/>{shop.merchantContactMobile}</CellFooter>
              </Cell> : null}
            <Cell>
              <CellBody>价格标准：</CellBody>
              <CellFooter>{shop.priceType}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>门店类型：</CellBody>
              <CellFooter>{shop.shopType}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>座位数：</CellBody>
              <CellFooter>{shop.seatNum}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>营业时间：</CellBody>
              <CellFooter>{shop.openingHours && shop.openingHours.join(',')}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>门店地址：</CellBody>
              <CellFooter>{shop.address}</CellFooter>
            </Cell>
          </SectionBody>
        </Section>
      </div>
    )
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
