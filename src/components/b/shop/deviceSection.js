import React, { Component } from 'react'

import Cell, { CellBody, CellFooter } from 'components/common/cell'
import Section, { SectionHeader, SectionBody } from 'components/common/section'

import Style from './section.less'
import { Line } from '../../common/cell'

export default class DeviceSectionComponent extends Component {
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
            <h3>设备信息</h3>
          </SectionHeader>
          <SectionBody>
            <Cell>
              <CellBody>设备数量(不带电池版)：</CellBody>
              <CellFooter>{shop.deviceNum}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>设备数量(带电池版)：</CellBody>
              <CellFooter>{shop.deviceWithBatteryNum}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>押金金额：</CellBody>
              <CellFooter>无</CellFooter>
            </Cell>
            <Cell>
              <CellBody>安装时间要求：</CellBody>
              <CellFooter>{shop.installTime}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>充电宝盒子：</CellBody>
              <CellFooter>{shop.boxNum}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>安装时间要求：</CellBody>
              <CellFooter>{shop.boxIntallTime}</CellFooter>
            </Cell>
          </SectionBody>
        </Section>
      </div>
    )
  }

  _close () {}

  componentWillUnmount () {
    Style.unuse()
  }
}
