import React, { PureComponent } from 'react'
import Style from './selectCity.less'
import assign from 'lodash/assign'

export default class SelectCityComponent extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      province: props.province,
      city: props.city
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
              {this.props.options.provinces && this.props.options.provinces.map((item, i) => {
                return <li key={i} className={this.state.province.cityCode === item.cityCode ? 'active' : null} onClick={this.onChose.bind(this, item, 'province')}>{item.cityName}</li>
              })}
            </ul>
            <ul className='right'>
              {this.props.options.cities && this.props.options.cities[this.state.province.cityCode] && this.props.options.cities[this.state.province.cityCode].map((item, i) => {
                return <li key={i} className={this.state.city && this.state.city.cityCode === item.cityCode ? 'active' : null} onClick={this.onChose.bind(this, item, 'city')}>{item.cityName}</li>
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
    if (type === 'province') {
      obj['city'] = null
    }
    this.setState(obj)
  }
  _bindSubmit () {
    if (this.props.needCity) {
      if (!this.state.city) return Toast.show('请选择城市')
      this.props.onChose(this.state.province, this.state.city)
    } else {
      this.props.onChose(this.state.province, this.state.city)
    }
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
SelectCityComponent.defaultProps = {
  city: {},
  province: {}
}
