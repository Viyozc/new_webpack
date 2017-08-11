import React, { Component } from 'react'
import Style from './noticeCell.less'

export default class User extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  componentWillMount () {
    Style.use()
  }

  render () {
    if (!this.props.user) {
      return <div className='top clearfix' style={{textAlign: 'left'}}>
        {this.props.selectedDate
          ? <div className='center'>
            <button onClick={() => this.props.onChoseDate()}>
              {this.props.selectedDate ? `${this.props.selectedDate.split('-')[0]}-${this.props.selectedDate.split('-')[1]}` : ''}
              {this.props.showSelectDate ? <i className='dianfont icon-jiantou' />
              : <i className='dianfont icon-jiantou0101' />}
            </button>
          </div>
          : null}

        <div className='switch'>
          <span className='switch-title'>消息通知开关</span>
          {
            this.state.isOpen
              ? <button className='switch-button switch-button-open' onTouchEnd={() => this.switch()}>
                <i className='button' />
              </button>
              : <button className='switch-button switch-button-close' onTouchEnd={() => this.switch()}>
                <i className='button' />
              </button>
          }
        </div>

      </div>
    }
    let user = this.props.user
    return (
      <div className='top clearfix'>
        <div className='left'>
          <div className='desc clearfix'>
            <div className='nick'>{user.nickName}</div>
            <div className='role-name-zh'>{user.roleName_zh}</div>
          </div>
        </div>
        <div className='right clearfix'>
          <div className='qrcode' onClick={() => this.props.onScanQRCode()}>
            <i className='dianfont icon-saoyisao' />
          </div>
        </div>
      </div>
    )
  }

  switch () {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false
      })
    } else {
      this.setState({
        isOpen: true
      })
    }
  }

  componentWillUnmount () {
    Style.unuse()
  }
}
