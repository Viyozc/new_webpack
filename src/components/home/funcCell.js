import React, { Component } from 'react'
import Badge from 'components/common/badge'
import Style from './funcCell.less'

export default class FuncCell extends Component {
  constructor (props) {
    super(props)
    this.state = {
      funcCellWidth: (parseInt(window.getComputedStyle(document.body).width, 10) - 20 - (8 * (props.columns - 1))) / props.columns
    }
  }
  componentWillMount () {
    Style.use()
  }
  render () {
    let [x, y] = this.props.img.split('|')
    let iconStyle = {
      backgroundImage: `url(${this.props.back ? this.props.back : '//img.shenghuozhe.net/shz/2017/02/27/600w_600h_613C01488180138.png'})`,
      backgroundPosition: `-${Number(x) * 50}px -${Number(y) * 50}px`
    }
    return (
      <button className={`func-cell func-cell-${this.props.columns}`} onClick={this.props.onClick && this.props.onClick.bind(this)} style={{width: this.state.funcCellWidth, height: this.state.funcCellWidth}}>
        {this.props.badge ? <Badge className='home-badge'>{this.props.badge > 99 ? '99+' : this.props.badge}</Badge> : null}
        <div className='img' style={iconStyle} />
        <p>{this.props.title}</p>
      </button>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
