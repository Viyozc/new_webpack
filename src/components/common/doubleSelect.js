import React, { Component } from 'react'
import Select from './select'
import assign from 'lodash/assign'
import Style from './doubleSelect.less'
import { router, limitFontSize } from 'utils'

export default class DoubleSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showLeftSelect: false,
      showRightSelect: false
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return <div>
      <ul className='double-select'>
        <li>
          <button className='select-city-member' onClick={this._bindChoseCity.bind(this)}>
            {limitFontSize(this.props.leftChoseKey || `${this.props.list.cities[0].key}`, 3, true)}
            {this.state.showLeftSelect ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
          </button>
        </li>
        <li>
          <button className='select-city-member' onClick={this._bindChoseMember.bind(this)}>
            {limitFontSize(this.props.rightChoseKey || `${this.props.list.members[this.props.list.cities[0].value][0].key}`, 3, true)}
            {this.state.showRightSelect ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
          </button>
        </li>
      </ul>
      {this.state.showLeftSelect ? <Select
        options={this.props.list.cities}
        onChose={this._choseCity.bind(this)}
        selectedValue={parseInt(this.props.leftChoseValue || this.props.list.cities[0].value)}
        onClose={this._closeCity.bind(this)} /> : null}
      {this.state.showRightSelect ? <Select
        options={this.props.list.members[this.props.leftChoseValue || this.props.list.cities[0].value]}
        onChose={this._choseMember.bind(this)}
        selectedValue={parseInt(this.props.rightChoseValue || this.props.list.members[this.props.list.cities[0].value][0].value)}
        onClose={this._closeMember.bind(this)} /> : null}
    </div>
  }
  _bindChoseCity () {
    this.setState({
      showLeftSelect: true
    })
  }
  _choseCity (value, option) {
    this._closeCity()
    if (this.props.onChoseLeft) {
      return this.props.onChoseLeft(value, option)
    }
    router.replace({pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        leftChoseKey: option.key,
        leftChoseValue: option.value,
        rightChoseKey: this.props.list.members[value][0].key,
        rightChoseValue: this.props.list.members[value][0].value})})
  }
  _closeCity () {
    this.setState({
      showLeftSelect: false
    })
  }
  _bindChoseMember () {
    this.setState({
      showRightSelect: true
    })
  }
  _choseMember (value, option) {
    this._closeMember()
    if (this.props.onChoseLeft) {
      return this.props.onChoseRight(value, option)
    }
    router.replace({pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        rightChoseKey: option.key,
        rightChoseValue: option.value})})
  }
  _closeMember () {
    this.setState({
      showRightSelect: false
    })
  }
}
