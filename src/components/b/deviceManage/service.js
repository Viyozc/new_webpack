import React, { Component } from 'react'
import { router } from 'utils'
import Style from './service.less'

export default class Service extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return <div className='service'>
      <dl className='service-dl'>
        <dd className='line clearfix'>
          <label className='name'>BD小二：{this.props.bdNick}</label>
          <a className='phone' href={`tel:${this.props.bdMobile}`}>{this.props.bdMobile}</a>
        </dd>
        <dd className='line'>
          <a className='detail clearfix' onClick={() => router.push(`/b/shops/${this.props.shopId}`)}>
            <label className='title'>门店详情</label>
            <i className='dianfont icon-xuanze' />
          </a>
        </dd>
      </dl>
    </div>
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
