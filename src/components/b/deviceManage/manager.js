import React, { Component } from 'react'
import Style from './manager.less'

export default class Manager extends Component {
  componentWillMount () {
    Style.use()
    this.state = {
      showNum: this.props.showNum
    }
  }
  render () {
    return <div className='manager'>
      <dl className='manager-dl'>
        <dt className='title'>
          <span className='title-txt'>门店设备管理员</span>
          <span className='title-tips'>修改后需要让管理员关注“小电商家”微信公众号</span>
        </dt>
        <dd className='line'>
          <ul className="list">
            <li className="item">
              <div className="item-line">
                <label className="title">姓名：</label>
                <input className="input input-name" type="text" />
              </div>
              <div className="item-line">
                <label className="title">手机号码：</label>
                <input className="input input-phone" type="number" />
              </div>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
