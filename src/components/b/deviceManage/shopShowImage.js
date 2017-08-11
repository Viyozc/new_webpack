import React, { Component } from 'react'
import Style from './shopShowImage.less'

export default class ShopShowImage extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return <div className='shop-show-image'>
      <dl className='image-dl'>
        <dt className='title'>门店展示图片</dt>
        <dd className='line'>
          <span className='uploader' />
        </dd>
      </dl>
    </div>
  }
  componentWillUnmount () {
    Style.unuse()
  }

}
