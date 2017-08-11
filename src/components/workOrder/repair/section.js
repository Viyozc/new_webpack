import React, { Component } from 'react'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'

import Button from 'components/common/button'
import Cell, { CellBody, CellFooter } from 'components/common/cell'
import Section, { SectionHeader, SectionBody, SectionFooter } from 'components/common/section'
import Icon from 'components/common/icon'

import Style from './section.less'

export default class ShopSectionComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    let others = this.props.others
    let sectionFooter = <SectionFooter>
      <Button className='white white1' fixed onClick={this._detectDevice.bind(this)}>扫码测试</Button>
      <Button className='white white2' fixed onClick={() => { router.replace(`/workOrder/repair/devices?shopId=${this.props.shopId}&installNo=${this.props.id}`) }}>列表选取</Button>
      <Button className='complete' onClick={this.props.finish} fixed>维修完成</Button>
    </SectionFooter>
    return (
      <div>
        <Section {...others}>
          <SectionHeader>
            <h3>门店信息</h3>
          </SectionHeader>
          <SectionBody>
            <Cell>
              <CellBody>门店名称：</CellBody>
              <CellFooter>{this.props.shopName}</CellFooter>
            </Cell>
            <Cell>
              <CellBody>联系人：</CellBody>
              <CellFooter>{this.props.shopContactName} <a className='tel-phone' href={`tel:${this.props.shopContactMobile}`}>{this.props.shopContactMobile}</a></CellFooter>
            </Cell>
            <Cell>
              <CellBody>门店电话：</CellBody>
              <CellFooter><a className='tel-phone' href={`tel:${this.props.shopMobile}`}>{this.props.shopMobile}</a></CellFooter>
            </Cell>
            <Cell>
              <CellBody>维修申请时间：</CellBody>
              <CellFooter>{this.props.createTime}</CellFooter>
            </Cell>
          </SectionBody>
          <SectionBody>
            <Cell className='second' others={{onClick: this._openLocation.bind(this)}}>
              <CellBody>安装地址</CellBody>
              <CellFooter>{this.props.shopAddr}</CellFooter>
              <Icon name='location' />
            </Cell>
          </SectionBody>
        </Section>
        <Section {...others}>
          <SectionHeader>
            <h3>维修信息</h3>
          </SectionHeader>
          <SectionBody>
            <Cell>
              <CellBody>发起人：</CellBody>
              <CellFooter>{this.props.applierNick} <a className='tel-phone' href={`tel:${this.props.applierMobile}`}>{this.props.applierMobile}</a></CellFooter>
            </Cell>
            <Cell>
              <CellBody>BD小二：</CellBody>
              <CellFooter>{this.props.sellerNick} <a className='tel-phone' href={`tel:${this.props.sellerMobile}`}>{this.props.sellerMobile}</a></CellFooter>
            </Cell>
            <Cell>
              <CellBody>安装工：</CellBody>
              <CellFooter>{this.props.installerNick} <a className='tel-phone' href={`tel:${this.props.installerMobile}`}>{this.props.installerMobile}</a></CellFooter>
            </Cell>
            <Cell>
              <CellBody>维修原因：</CellBody>
              <CellFooter>{this.props.reason}</CellFooter>
            </Cell>
          </SectionBody>
        </Section>
        <Section {...others}>
          <SectionHeader>
            <h3>维修进展</h3>
          </SectionHeader>
          <SectionBody>
            {this.props.deviecWithBatteryNum ? <Cell>
              <CellBody>主机（电池版）</CellBody>
              <CellFooter>{this.props.deviecWithBatteryNum}</CellFooter>
            </Cell> : null}
            {this.props.deviecWithBatteryNum ? <Cell>
              <CellBody>主机（不含电池版）</CellBody>
              <CellFooter>{this.props.deviceNoBatteryNum}</CellFooter>
            </Cell> : null}
            {this.props.devices && this.props.devices.length
              ? this.props.devices.map((o, i) =>
                <Cell key={i} className={`${o.status === 0 ? 'not-complete' : 'complete'}`}>
                  <CellBody>设备编号：{o.deviceNo}</CellBody>
                  <CellFooter>{o.statusLabel}</CellFooter>
                </Cell>
            ) : null}
          </SectionBody>
        </Section>
        {this.props.status === 0 ? sectionFooter : null}
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
  _openLocation () {
    Bridge.map({longitude: this.props.shopPoiLongitude, latitude: this.props.shopPoiLatitude, name: this.props.shopName, address: this.props.shopAddr})
  }
  _detectDevice () {
    // if (this.props.deviceNo) {
    //   router.replace(`/workOrder/repair/test?deviceNo=${this.props.deviceNo}`)
    // } else {
    Bridge.scanQRCode((res) => {
      let str = res.data
      let deviceNo = str.match(/\/d\/(\S*)\//) ? str.match(/\/d\/(\S*)\//)[1] : ''
      if (!deviceNo) {
        deviceNo = str.match(/\/d\/(\S*)/) ? str.match(/\/d\/(\S*)/)[1] : ''
      }
      if (!deviceNo) {
        return Toast.show('二维码有问题，请联系管理员')
      } else {
        router.replace(`/workOrder/repair/test?deviceNo=${deviceNo}&shopId=${this.props.shopId}&installNo=${this.props.id}`)
      }
    })
    // }
  }
}
