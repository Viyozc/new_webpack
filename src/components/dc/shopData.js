import React, { Component } from 'react'
import Style from './data.less'

export class ShopDataHead extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='th clearfix'>
        <div className='td' style={{width: '25%'}}>时间</div>
        <div className='td' style={{width: '25%'}}>城市</div>
        <div className='td' style={{width: '25%'}}>商家属性</div>
        <div className='td' style={{width: '25%'}}>安装完成门店数</div>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

export default class ShopData extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='tr clearfix'>
        <div className='td' style={{width: '25%'}}>{this.props.head}</div>
        <div className='td' style={{width: '25%'}}>{this.props.city}</div>
        <div className='td' style={{width: '25%'}}>{this.props.ka}</div>
        <div className='td' style={{width: '25%'}}>{this.props.shopInstalled}</div>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
