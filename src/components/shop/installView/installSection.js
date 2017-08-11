import React, { Component } from 'react'
import * as Bridge from 'utils/bridge'
import Time from 'utils/time'

import Style from './installSection.less'
import Cell, { CellBody, CellFooter } from 'components/common/cell'
import Icon from 'components/common/icon'
import Section, { SectionBody } from 'components/common/section'
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
      <div>
        <Section className='install-progress'>
          <SectionBody>
            <Cell>
              <CellBody>已安装设备：</CellBody>
              <CellFooter>{this.props.deviceNos ? this.props.deviceNos.length : 0}</CellFooter>
            </Cell>
            {this.props.deviceNos ? <Cell>
              <p>{this.props.deviceNos.join('、 ')}</p>
            </Cell> : null}
            <Cell others={{style: {color: '#FF5E45'}}}>
              <CellBody>未安装设备：</CellBody>
              <CellFooter>{this.props.deviceNum + this.props.deviceWithBatteryNum - (this.props.deviceNos && this.props.deviceNos.length || 0)}</CellFooter>
            </Cell>
          </SectionBody>
        </Section>
        <Section className='install-section'>
          <SectionBody>
            <Cell>
              <CellBody>{STATUS.timeLabel}：</CellBody>
              <CellFooter>{Time.formatPureDate(this.props.installTime)}</CellFooter>
            </Cell>
          </SectionBody>
          <SectionBody>
            <Cell others={{onClick: this._openLocation.bind(this)}}>
              <CellBody>安装地址：</CellBody>
              <CellFooter>{this.props.shopAddress}</CellFooter>
              <Icon name='location' />
            </Cell>
          </SectionBody>
        </Section>
        <Section>
          <SectionBody>
            <Cell>
              <CellBody><p className='bd-title'>BD小二：{this.props.sellerName}</p></CellBody>
              <CellFooter><a className='tel-phone' href={`tel:${this.props.sellerMobile}`}>{this.props.sellerMobile}</a></CellFooter>
            </Cell>
            {this.props.customServiceName ? <Cell>
              <CellBody><p className='bd-title'>审批客服：{this.props.customServiceName}</p></CellBody>
              <CellFooter><a className='tel-phone' href={`tel:${this.props.customServiceMobile}`}>{this.props.customServiceMobile}</a></CellFooter>
            </Cell> : null}
            {this.props.warehouse ? <Cell>
              <CellBody><p className='bd-title'>仓库：{this.props.warehouse}</p></CellBody>
              <CellFooter><a className='tel-phone' href={`tel:${this.props.warehouseKeeperMobile}`}>{this.props.warehouseKeeperMobile}</a></CellFooter>
            </Cell> : null}
            {this.props.deliverName ? <Cell>
              <CellBody><p className='bd-title'>配送员：{this.props.deliverName}</p></CellBody>
              <CellFooter><a className='tel-phone' href={`tel:${this.props.deliverMobile}`}>{this.props.deliverMobile}</a></CellFooter>
            </Cell> : null}
          </SectionBody>
        </Section>
      </div>
    )
  }
  _openLocation () {
    Bridge.map({longitude: this.props.poiLongitude, latitude: this.props.poiLatitude, name: this.props.shopName, address: this.props.shopAddress})
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
