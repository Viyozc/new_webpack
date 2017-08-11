import React, { Component } from 'react'
import Style from './item.less'

export default class Item extends Component {
  componentWillMount () {
    Style.use()
  }

  render () {
    let data = this.props.data
    return <div className='item'
                onClick={() => { if (data.type === 0) this.props.router.push(`/a/count/record/detail/${data.id}`) }}>
      <span className='description'>
        <label className='title'>{data.description}-{data.statusText}</label>
        <time className='desc'>{data.createTime}</time>
        {data.serialNo ? <span className='desc'>流水号:{data.serialNo}</span> : null}
      </span>
      <span className='money'>
        {data.type === 0 ? <i className='green'>+{data.amount}</i> : null}
        {data.type === 1 ? <i className='red'>-{data.amount}</i> : null}
        <i className='left-money'>余额：{data.balance}元</i>
      </span>
      {data.type === 0 ? <i className='dianfont icon-xuanze'/> : null}

    </div>
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
