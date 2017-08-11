import React, { Component } from 'react'
import Style from './infoWindow.less'

export default class InfoWindowComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    const {options} = this.props
    return <div className='marker-container'>
      <h3 className='title'>{options.shopName}<span style={{color: '#26C541', fontSize: 12}}>{options.deviceNum || 0}台待安装</span></h3>
      <p className='address'>联系人：{options.contractName} </p>
      <p className='address'>联系人电话：{options.contractMobile}</p>
      <p className='address'>门店电话：{options.mobile}</p>
      <p className='address'>门店地址：{options.shopAddr}</p>
      <a className='view-navigation' onClick={this._go.bind(this)}><i className='dianfont icon-location' /></a>
      <div className='arrow' />
    </div>
  }
  _go () {
    this.props.onNavigation && this.props.onNavigation(this.props.options)
  }
}
