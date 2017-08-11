import React, { PureComponent } from 'react'
import Style from './selectCity.less'
import assign from 'lodash/assign'

export default class SelectShopTypeComponent extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      shopType: props.shopType,
      shopSubType: props.shopSubType
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return (
      <div className='modal-background' onClick={this.onClose.bind(this)}>
        <div className='container' onClick={this.onStopPropagation.bind(this)}>
          <div className='head'>
            <button className='cancel-button' onClick={this.onClose.bind(this)}>取消</button>
            <button className='ok-button' onClick={this._bindSubmit.bind(this)}>确定</button>
          </div>
          <div className='content clearfix'>
            <ul className='left'>
              {this.props.options.type && this.props.options.type.map((item, i) => {
                return <li key={i} className={this.state.shopType.id === item.id ? 'active' : null} onClick={this.onChose.bind(this, item, 'shopType')}>{item.name}</li>
              })}
            </ul>
            <ul className='right'>
              {this.props.options.subType && this.props.options.subType[this.state.shopType.id] && this.props.options.subType[this.state.shopType.id].map((item, i) => {
                return <li key={i} className={this.state.shopSubType && this.state.shopSubType.id === item.id ? 'active' : null} onClick={this.onChose.bind(this, item, 'shopSubType')}>{item.name}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  onChose (option, type) {
    let obj = assign({}, this.state)
    obj[type] = option
    if (type === 'shopType') {
      obj['shopSubType'] = {id: 0, name: option.name}
    }
    this.setState(obj)
  }
  _bindSubmit () {
    this.props.onChose(this.state.shopType, this.state.shopSubType)
  }
  onClose (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onClose()
  }
  onStopPropagation (e) {
    e.stopPropagation()
    e.preventDefault()
  }
}
SelectShopTypeComponent.defaultProps = {
  shopSubType: {},
  shopType: {}
}
