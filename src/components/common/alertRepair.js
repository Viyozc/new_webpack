import React, { PureComponent } from 'react'
import Style from './alertRepair.less'

export default class AlertRepair extends PureComponent {
  componentWillMount () {
    Style.use()
  }

  componentWillUnmount () {
    Style.unuse()
  }

  render () {
    let isShowClass = this.props.isShowOpc ? 'common-alert-opc-repair show' : 'common-alert-opc-repair hide'
    return (
      <div className={isShowClass} onClick={() => this._cancel()}>
        <article className='white-wap'>
          <button className='btn' onClick={this._detectDevice.bind(this)}>扫码维修</button>
          <button className='btn'
            onClick={() => { this.props.router.replace(`/workOrder/repair/devices?shopId=${this.props.shopId || ''}&installNo=${this.props.installNo || 0}`) }}>
            从设备列表里选择维修
          </button>
          <button className='btn' onClick={() => this._cancel()}>取消</button>
        </article>
      </div>
    )
  }

  _detectDevice () {
    // this.props.scanBack('https://b.dian.so/lhc/b/866873023057972')
    // this.props.scanBack('https://b.dian.so/lhc/d/521720126789')
    // return
    this.props.Bridge.scanQRCode((res) => {
      this.props.scanBack(res.data.split('/').pop())
    })
  }

  _cancel () {
    this.props.closeOpc()
  }

  onStopPropagation (e) {
    e.stopPropagation()
    e.preventDefault()
  }
}
