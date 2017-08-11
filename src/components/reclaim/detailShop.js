import React, { Component } from 'react'
import TimeUtil from 'utils/time'
import * as Bridge from 'utils/bridge'
import Style from '../shop/installView/section.less'
import InstallStyle from '../shop/installView/installSection.less'
import Icon from 'components/common/icon'
import Cell, { CellBody, CellFooter } from 'components/common/cell'
import Section, { SectionHeader, SectionBody } from 'components/common/section'

export default class ShopSectionComponent extends Component {
  componentWillMount () {
    Style.use()
    InstallStyle.use()
  }
  render () {
    return (
      <div>
        <Section>
          <SectionHeader>
            <h3>{this.props.shopName}</h3>
            <span className='status' style={{color: this.props.status === 1 ? '#3DCF55' : '#FF5E45'}}>{this.props.statusLabel}</span>
          </SectionHeader>
          <SectionBody>
            <Cell>
              <CellBody>联系人：</CellBody>
              <CellFooter>{this.props.contractName}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>联系人电话：</CellBody>
              <CellFooter><a className='tel-phone' href={`tel:${this.props.contractMobile}`}>{this.props.contractMobile}</a></CellFooter>
            </Cell>
            <Cell>
              <CellBody>门店电话：</CellBody>
              <CellFooter><a className='tel-phone' href={`tel:${this.props.mobile}`}>{this.props.mobile}</a></CellFooter>
            </Cell>
            <Cell>
              <CellBody>回收类型：</CellBody>
              <CellFooter>{this.props.typeLabel}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>回收人：</CellBody>
              <CellFooter>{this.props.recyclerName}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>设备数量(不带电池版)：</CellBody>
              <CellFooter>{this.props.expectDeviceNobatteryNum}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>设备数量(带电池版)：</CellBody>
              <CellFooter>{this.props.expectDeviceWithBatteryNum}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>适配器数量：</CellBody>
              <CellFooter>{this.props.expectAdapterNum}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>餐牌数量：</CellBody>
              <CellFooter>{this.props.expectBrandNum}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>工单号：</CellBody>
              <CellFooter>{this.props.recycleNo}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>创建时间：</CellBody>
              <CellFooter>{TimeUtil.format(new Date(this.props.createTime).getTime(), 'YYYY-MM-DD HH:mm')}</CellFooter>
            </Cell>
          </SectionBody>
        </Section>
        <Section className='install-section'>
          <SectionBody>
            <Cell others={{onClick: this._openLocation.bind(this)}}>
              <CellBody>安装地址：</CellBody>
              <CellFooter>{this.props.shopAddr}</CellFooter>
              <Icon name='location' />
            </Cell>
          </SectionBody>
        </Section>
      </div>
    )
  }
  _openLocation () {
    Bridge.map({longitude: this.props.poiLongitude, latitude: this.props.poiLatitude, name: this.props.shopName, address: this.props.shopAddr})
  }
  componentWillUnmount () {
    Style.unuse()
    InstallStyle.unuse()
  }
}
