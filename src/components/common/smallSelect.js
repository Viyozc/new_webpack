import React, { Component } from 'react'
import Select from './select'
import assign from 'lodash/assign'
import Style from './smallSelect.less'
import { router } from 'utils'

export default class SmallSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false
    }
  }

  componentWillMount () {
    Style.use()
  }

  componentWillUnmount () {
    Style.unuse()
  }

  render () {
    return <div className={this.props.className}>
      <ul className='small-select'>
        <li>
          <div className='select' onClick={this._bindChose.bind(this)}>
            <button>
              {this.props.defaultKey || `${this.props.list[0].key}`}
            </button>
            {this.state.isShow ? <i className='dianfont icon-jiantou'/> : <i className='dianfont icon-jiantou0101'/>}
          </div>
        </li>
      </ul>
      {this.state.isShow ? <Select
        multiple={this.props.multiple}
        options={this.props.list}
        onChose={this._chose.bind(this)}
        selectedValue={!this.props.multiple ? parseInt(this.props.defaultValue || this.props.list[0].value) : this.props.defaultValue || this.props.list[0].value.toString()}
        onClose={this._close.bind(this)} /> : null}
    </div>

  }

  _bindChose () {
    if (this.props.list.length > 0) {
      this.setState({
        isShow: true
      })
    } else {
      this.props.outSide()
    }
  }

  _chose (value, option, index) {
    this._close()
    if (this.props.valueNotInUrl) { //判断是否把key value放到url上
      if (this.props.outSide) {
        if (typeof value === 'array') {
          value = value.join(',')
          if (value.indexOf(',') > -1 && value.indexOf('-1') > -1) {
            value = value.replace('-1,', '')
          } else {
            value = value.replace('-1', '')
          }
          this.props.outSide(value)
        } else {
          this.props.outSide(option.key, option.value, index)
        }
      }
    } else {
      if (this.props.outSide) {
        value = value.join(',')
        if (value.indexOf(',') > -1 && value.indexOf('-1') > -1) {
          value = value.replace('-1,', '')
        } else {
          value = value.replace('-1', '')
        }
        this.props.outSide(value)
      } else {
        let obj = {}
        obj[this.props.keys.key] = option.key
        obj[this.props.keys.value] = option.value
        router.replace({
          pathname: this.props.location.pathname,
          query: assign({}, this.props.location.query, obj)
        })
      }
    }

  }

  _close () {
    this.setState({
      isShow: false
    })
  }
}
