import React, { Component } from 'react'
import Swiper from 'swiper'
import SwiperCss from 'swiper/dist/css/swiper.min.css'
import Style from './previewImage.less'

class PreviewImageContainer extends Component {
  componentWillMount () {
    SwiperCss.use()
    Style.use()
  }
  componentWillUnmount () {
    SwiperCss.unuse()
    Style.unuse()
    this.swiper = null
  }
  componentDidMount () {
    if (this.props.images && this.props.images.length > 1) {
      this.swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        centeredSlides: true,
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  }

  render () {
    return (
      <div className='preview-image' onClick={(e) => { this._preventClick(e) }}>
        <div className='swiper-container'>
          <div className='swiper-wrapper'>
            {this.props.images.map((image, i) => <div key={i} className='swiper-slide'><img className='swiper-lazy swiper-lazy-loaded' src={image} /></div>)}
          </div>
          {this.props.images && this.props.images.length > 1 ? <div className='swiper-pagination' /> : null}
        </div>
      </div>
    )
  }
  _preventClick (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onClose()
  }
}

export default PreviewImageContainer
