import React, { Component } from 'react'

import Style from './materiel.less'

export default class Materiel extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    return (
      <div className='device-form'>
        <div visible={this.props.majorShow}>
          <p className='title'>请选择设备数量{this.props.deviceMaxCount && this.props.deviceMaxCount >= 0 ? <span className='limit'>本次限领{this.props.deviceMaxCount}台</span> : null}</p>
          {
          this.props.majorProducts.map((item, i) => {
            return <div className='cell device' key={i}>
              <img src={item.picUrl} />
              <div className='price'>
                <p style={{width: 157}}>请输入{item.productName}数量</p>
              </div>
              <div className='input'>
                <button className='add' onClick={this._addNum.bind(this, 'majorProducts', i)}>+</button>
                <input type='number'
                  value={this.props.majorProducts[i].normalNum}
                  pattern='[0-9]*' />
                <button onClick={this._minusNum.bind(this, 'majorProducts', i)}>-</button>
              </div>
            </div>
          })
          }
        </div>
        <div visible={this.props.majorShow}>
          <p className='title'>请选择配件数量</p>
          {
          this.props.accessories.map((item, i) => {
            return <div className='cell device' key={i}>
              <img src={item.picUrl} />
              <div className='price'>
                <p style={{width: 157}}>请输入{item.productName}数量</p>
              </div>
              <div className='input'>
                <button className='add' onClick={this._addNum.bind(this, 'accessories', i)}>+</button>
                <input type='number'
                  // ref={(ref) => { this.props.accessories[i].normalNum = ref }}
                  value={this.props.accessories[i].normalNum}
                  pattern='[0-9]*' />
                <button onClick={this._minusNum.bind(this, 'accessories', i)}>-</button>
              </div>
            </div>
          })
          }
        </div>
      </div>
    )
  }
  _addNum (type, index) {
    let newValue = this.props[type][index].normalNum + 1
    let uploadParams = {}
    uploadParams.type = type
    uploadParams.index = index
    uploadParams.newValue = newValue
    this.props.changeNum(uploadParams)
  }
  _minusNum (type, index) {
    if (this.props[type][index].normalNum === 0) {
      return
    }
    let newValue = this.props[type][index].normalNum - 1
    let uploadParams = {}
    uploadParams.type = type
    uploadParams.index = index
    uploadParams.newValue = newValue
    this.props.changeNum(uploadParams)
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
