import React, { Component } from 'react'
import Style from './error.less'

export default class Loading extends Component {
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return (
      <div className='loading'>
        <img src='//img.shenghuozhe.net/shz/2016/12/23/500w_500h_480BD1482478062.gif' />
        <p>努力加载中...</p>
      </div>
    )
  }
}
