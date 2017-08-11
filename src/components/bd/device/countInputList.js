import React, { Component } from 'react'

import Style from './countInputList.less'

export default class Chose extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    let item = this.props.item
    return (
      <div className='cell'>
        <div className='name'>
          {item.productName}
        </div>
        <div className='input'>
          <button onClick={() => this.props._minus(item.productId)}>-</button>
          <input type='number'
            value={this.props.value || 0}
            onChange={(e) => this.props._change(item.productId, e.target.value)}
            pattern='[0-9]*' />
          <button className='add' onClick={() => this.props._add(item.productId)}>+</button>
        </div>
      </div>
    )
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
