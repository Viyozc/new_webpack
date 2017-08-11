import React, { Component } from 'react'
import Style from './select.less'
import _ from 'lodash'

export default class NakedSelectComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedValue: this.props.multiple ? this.props.selectedValue : [this.props.selectedValue]
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  componentWillReceiveProps (nextProps) {
    this.state = {
      selectedValue: nextProps.multiple ? nextProps.selectedValue : [nextProps.selectedValue]
    }
  }
  render () {
    let liNode
    liNode = this.props.options && this.props.options.map((option, i) => {
      // 不能按严格模式判断是否相等
      return (this.state.selectedValue == option.value)
        ? <div key={i} onClick={this.onChose.bind(this, option.value, option, i)} className='li active'>
            <div className='model-check'><i className='dianfont icon-gou' /> {option.key}</div>
          </div>
        : <div key={i} onClick={this.onChose.bind(this, option.value, option, i)} className='li'>
            <div className='model-check'>{option.key}</div>
          </div>
    })
    return (
      <div className={this.props.isShow ? 'modal-background show' : 'modal-background hide'} onClick={this.onClose.bind(this)}>
        <div className='container' onClick={this.onStopPropagation.bind(this)}>
          {this.props.multiple
            ? <div className='head'>
              <button className='cancel-button' onClick={this.onClose.bind(this)}>取消</button>
              <button className='ok-button' onClick={this._bindSubmit.bind(this)}>确定</button>
            </div>
            : null
          }
          <div className='content'>
            {liNode}
          </div>
        </div>
      </div>
    )
  }
  onChose (value, option, i) {
    if (this.props.multiple) {
      if (!value || value === '') {
        this.setState({
          selectedValue: ['']
        })
        return
      }
      let afterChose = this.state.selectedValue
      if (afterChose[0] === '') {
        afterChose.splice(0, 1)
      }
      let index = afterChose.indexOf(value)
      if (index > -1 && afterChose.length > 1) {
        afterChose.splice(index, 1)
      } else {
        afterChose = afterChose.concat([value])
      }
      this.setState({
        selectedValue: afterChose
      })
    } else {
      this.props.selectedValue !== value && this.props.onChose(value, option, i)
    }
  }
  _bindSubmit () {
    this.props.onChose(this.state.selectedValue)
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
