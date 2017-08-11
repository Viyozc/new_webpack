import React, { PureComponent } from 'react'
import Style from './alertChoseDeviceType.less'

export default class AlertRepair extends PureComponent {
  componentWillMount () {
    Style.use()
    this.setState({
      productId: -1,
      checkIndex: -1
    })
  }

  componentWillUnmount () {
    Style.unuse()
  }

  render () {
    let isShowClass = this.props.isShowOpc ? 'common-alert-opc-chose-device show' : 'common-alert-opc-chose-device hide'
    return (
      <div className={isShowClass} onClick={() => this._cancel()}>
        <article className='white-wap'>
          <dl className='white-dl'>
            <dt className='title'>请选择设备类型</dt>
            {this.state.checkIndex === 0 ? <dd className='device-types clearfix'>
              <span className='device-type active' onClick={(e) => this._changeProductId(10, 0, e)}>
                <i className='dianfont check icon-tianjiachenggong' />
              </span>
              <span className='device-type normal' onClick={(e) => this._changeProductId(11, 1, e)}>
                <i className='dianfont check icon-tianjiachenggong' />
              </span>
            </dd> : null}
            {this.state.checkIndex === 1 ? <dd className='device-types clearfix'>
              <span className='device-type normal' onClick={(e) => this._changeProductId(10, 0, e)}>
                <i className='dianfont check icon-tianjiachenggong' />
              </span>
              <span className='device-type active' onClick={(e) => this._changeProductId(11, 1, e)}>
                <i className='dianfont check icon-tianjiachenggong' />
              </span>
            </dd> : null}
            {this.state.checkIndex === -1 ? <dd className='device-types clearfix'>
              <span className='device-type normal' onClick={(e) => this._changeProductId(10, 0, e)}>
                <i className='dianfont check icon-tianjiachenggong' />
              </span>
              <span className='device-type normal' onClick={(e) => this._changeProductId(11, 1, e)}>
                <i className='dianfont check icon-tianjiachenggong' />
              </span>
            </dd> : null}
            <dd className='btns'>
              <button className='btn btn-cancel' onClick={() => this._cancel()}>取消</button>
              {this.state.checkIndex !== -1
                ? <button className='btn btn-confirm active' onClick={(e) => this._confirm(e)}>确定</button>
                : <button className='btn btn-confirm normal' onClick={(e) => this._confirm(e)}>确定</button>
              }
            </dd>
          </dl>
        </article>
      </div>
    )
  }

  _confirm (e) {
    this.onStopPropagation(e)
    if (this.state.checkIndex !== -1 && !this.props.type) {
      this.props.router.push(`/shops/${this.props.installNo || 0}/install/confirmPoi?shopId=${this.props.shopId}&productId=${this.state.productId}&oldDeviceNo=${this.props.oldDeviceNo || ''}`)
    }
    if (this.state.checkIndex !== -1 && this.props.type === 'repair') {
      this.props.router.push(`/workOrder/repair/repairPoi?shopId=${this.props.shopId}&productId=${this.state.productId}&oldDeviceNo=${this.props.oldDeviceNo || ''}`)
    }
  }

  _changeProductId (productId, checkIndex, e) {
    this.onStopPropagation(e)
    this.setState({
      productId,
      checkIndex
    })
  }

  _cancel () {
    this.setState({
      productId: -1,
      checkIndex: -1
    })
    this.props.closeOpc()
  }

  onStopPropagation (e) {
    e.stopPropagation()
    e.preventDefault()
  }
}
