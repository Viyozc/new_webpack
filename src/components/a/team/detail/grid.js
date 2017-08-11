import React, { Component } from 'react'
import Style from './grid.less'

export default class Grid extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    let data = this.props.list
    return <section className='grid'>
      <p className='title'>{this.props.title}</p>
      <ul className='list clearfix'>
        {data && data.length > 0 && data.map((item, i) => {
          let bgColorClass = ''
          return <li onClick={() => { if (item.link !== '') this.props.router.push(`${item.link}`) }} key={i}
            className='item'>
            <span className='num'>{item.num}</span>
            <span className='tit'>{item.txt}{item.link ? <i className='dianfont icon-xuanze' /> : null}</span>
          </li>
        })}
      </ul>
    </section>
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
