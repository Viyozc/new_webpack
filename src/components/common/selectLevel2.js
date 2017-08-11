import React, { PureComponent } from 'react'
import Style from './selectLevel2.less'
import assign from 'lodash/assign'

export default class SelectLevel3Component extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      level1: {id: props.activeOptions.level1, name: '', index: parseInt(props.activeOptions.level1Index)},
      level2: {id: props.activeOptions.level2, name: ''},
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  componentWillReceiveProps (nextProps) {

  }
  render () {
    return (
      <div className={this.props.isShow ? 'modal-background show' : 'modal-background hide'} onClick={this.onClose.bind(this)}>
        <div className='select-level2' onClick={this.onStopPropagation.bind(this)}>
          <div className='head'>
            <button className='cancel-button' onClick={this.onClose.bind(this)}>取消</button>
            <button className='ok-button' onClick={this._bindSubmit.bind(this)}>确定</button>
          </div>
          <div className='content clearfix'>
            <ul className='left'>
              {this.props.options && this.props.options.map((item, i) => {
                return <li
                  key={i}
                  className={this.state.level1.id === item.id ? 'active' : null}
                  onClick={this.onChose.bind(this, item, 'level1', i)}>
                  {item.name}
                  {/*<i className="line-num">{this.props.options[i].cityList.length - 1}</i>*/}
                </li>
              })}
            </ul>
            <ul className='right'>
              {this.props.options && this.props.options[this.state.level1.index].childs.map((item, i) => {
                return <li
                  key={i}
                  className={this.state.level2.id === item.id ? 'active' : null}
                  onClick={this.onChose.bind(this, item, 'level2', i)}>
                  {item.name}
                  {/*{i === 0*/}
                    {/*? <i className="line-num">{this.props.options[this.state.level1.index].childrens.length - 1}</i>*/}
                    {/*: null}*/}
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // 点击li的时候
  onChose (option, type, index) {
    let obj = assign({}, this.state)
    obj[type] = option
    if (type === 'level1') {
      obj['level1'] = {id: option.id, name: option.name, index}
      obj['level2'] = {id: 0, name: '', index: 0}
    }
    if (type === 'level2') {
      obj['level2'] = {id: option.id, name: option.name, index}
    }
    this.setState(obj)
  }

  // 确定
  _bindSubmit () {
    this.props.onChose(this.state.level1, this.state.level2)
  }

  // 取消
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
