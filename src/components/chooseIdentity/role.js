import React, { Component } from 'react'
import Style from './role.less'
import Icon from 'components/common/icon'

export default class ShopItemComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className={this.props.selected === this.props.index ? 'role active' : 'role'} onClick={() => { this.props.onChoose(this.props.index) }}>
        <div><Icon name={this.props.icon} />{this.props.name}</div>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
