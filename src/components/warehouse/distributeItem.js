import React, { Component } from 'react'

import Style from './distributeItem.less'

export default class ItemComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    Style.use()
  }
  render () {
    const products = this.props.products.split('|').map((o) => Number(o))
    return (
      <div className='device-form'>
        {products[0]
        ? <div className='cell device'>
          <img src='//img.shenghuozhe.net/shz/2017/03/21/273w_261h_5A7571490086595.png' />
          <div className='price'>
            <p>设备数量(不带电池版)（台）</p>
            <p className='count'>{products[0]}</p>
          </div>
          <div className='input'>
            <span className={`check ${this.state['product0'] ? 'checked' : ''}`} onClick={this._check.bind(this, 0)}>
              <i className='dianfont icon-gou1' />
            </span>
          </div>
        </div>
        : null}
        {products[4]
        ? <div className='cell device'>
          <img src='//img.shenghuozhe.net/shz/2017/03/21/273w_261h_5D7841490086543.png' />
          <div className='price'>
            <p>设备数量(带电池版)（台）</p>
            <p className='count'>{products[4]}</p>
          </div>
          <div className='input'>
            <span className={`check ${this.state['product4'] ? 'checked' : ''}`} onClick={this._check.bind(this, 4)}>
              <i className='dianfont icon-gou1' />
            </span>
          </div>
        </div>
        : null}
        {products[1]
        ? <div className='cell battery'>
          <img src='//img.shenghuozhe.net/shz/2017/02/15/258w_156h_642031487127622.png@240w.jpg' />
          <div className='price'>
            <p>电源（个）</p>
            <p className='count'>{products[1]}</p>
          </div>
          <div className='input'>
            <span className={`check ${this.state['product1'] ? 'checked' : ''}`} onClick={this._check.bind(this, 1)}>
              <i className='dianfont icon-gou1' />
            </span>
          </div>
        </div>
        : null}
        {products[2]
        ? <div className='cell screw'>
          <img src='//img.shenghuozhe.net/shz/2017/03/28/216w_159h_FCA371490683657.png@240w.png' />
          <div className='price'>
            <p>适配器（个）</p>
            <p className='count'>{products[2]}</p>
          </div>
          <div className='input'>
            <span className={`check ${this.state['product2'] ? 'checked' : ''}`} onClick={this._check.bind(this, 2)}>
              <i className='dianfont icon-gou1' />
            </span>
          </div>
        </div>
        : null}
        {products[3]
        ? <div className='cell screw'>
          <img src='//img.shenghuozhe.net/shz/2017/03/06/240w_240h_9E8221488801357.jpg@240w.jpg' />
          <div className='price'>
            <p>餐牌（个）</p>
            <p className='count'>{products[3]}</p>
          </div>
          <div className='input'>
            <span className={`check ${this.state['product3'] ? 'checked' : ''}`} onClick={this._check.bind(this, 3)}>
              <i className='dianfont icon-gou1' />
            </span>
          </div>
        </div>
        : null}
      </div>
    )
  }
  _check (i) {
    let k = {}
    k['product' + i] = !this.state['product' + i]
    this.setState(k)
  }
  componentDidUpdate (prevProps, prevState) {
    const products = this.props.products.split('|').map((o) => Number(o))
    let enabled = !((products[0] && !this.state.product0) || (products[1] && !this.state.product1) || (products[2] && !this.state.product2) || (products[3] && !this.state.product3) || (products[4] && !this.state.product4))
    this.props.changeBtnStatus(enabled)
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
