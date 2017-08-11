import React, { Component } from 'react'
import Style from './search.less'

export default class Search extends Component {
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return (
      <div className='search-bar'>
        <div className='search-panel'>
          <i className='dianfont icon-sousuo' />
          <input type='text' ref={(ref) => { this.search = ref }} placeholder={this.props.placeholder} defaultValue={this.props.value} />
          <button onClick={() => this.props.onClick(this.search.value)}>搜</button>
        </div>
      </div>
    )
  }
}
