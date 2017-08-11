import React, { Component } from 'react'
import { Link } from 'components/link'
import Style from './section.less'
import { params } from 'utils'
export default class Section extends Component {
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <Link className='section' to={'/data/center/list?' + params(this.props.query || {})}>
        <div className='title'>
          <span>{this.props.title} {this.props.question ? <i className='dianfont icon-wenhao' onClick={this.props.onClick && this.props.onClick.bind(this)} /> : null}</span>
          <i className='dianfont icon-xuanze' />
        </div>
        <div className='content'>
          {this.props.children}
        </div>
        <div className='cover-line' />
      </Link>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

export class Label extends Component {
  render () {
    return (
      <div className='label'>
        <p className={this.props.type === 'rate' ? 'value active' : 'value'}>{this.props.value}</p>
        <p className='title'>{this.props.title}</p>
        {this.props.children}
      </div>
    )
  }
}
