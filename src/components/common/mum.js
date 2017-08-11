import React, { Component } from 'react'
import Style from './mum.less'

export default class Mum extends Component {
  constructor (props) {
    super(props)
    this.defaultProps = {
      width: 20,
      height: 20
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
      <div className='mum'>
        <img src='//img.shenghuozhe.net/shz/2016/11/10/124w_124h_DD9811478753968.gif' style={{
          width: this.props.width,
          height: this.props.height
        }} />
      </div>
    )
  }
}
