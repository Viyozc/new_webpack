import React, { Component } from 'react'
import Style from './noticeCell.less'
import DepartmentList from 'components/common/nakedSelect'
import { DEPARTMENT_LIST } from 'constants/departmentList'

export default class User extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      isShowConfirmUnbind: false,
      isShowDepartment: false
    }
  }

  componentWillMount () {
    Style.use()
  }

  render () {
    if (!this.props.user) {
      return <div className='top clearfix' style={{textAlign: 'left'}}>
        {!this.props.isBd
          ? <div className='switch'>
            <span className='switch-title'>消息通知开关</span>
            {
              this.state.isOpen
                ? <button className='switch-button switch-button-open' onTouchEnd={() => this.switch()}>
                <i className='button'/>
              </button>
                : <button className='switch-button switch-button-close' onTouchEnd={() => this.switch()}>
                <i className='button'/>
              </button>
            }
          </div> : null}
        {!this.props.isBd
          ? <div className="unbind">
            <button className="btn-unbind" onClick={(e) => this._unbind(e)}>解除微信绑定</button>
          </div>
          : null}
          {!this.props.isBd
            ? <div className={this.state.isShowConfirmUnbind ? "opc-wap show" : "opc-wap hide"} onClick={(e) => this._hideConfirmUnbind(e)}>
              <article className="white-wap" onClick={(e) => {e.stopPropagation();e.preventDefault()}}>
                <i className="dianfont icon-querenjiebang" />
                <strong className="confirm-txt">是否确认解绑</strong>
                <p className="confirm-desc">解绑后可在其它微信号登录此账号</p>
                <div className="btns">
                  <button className="btn-confirm-unbind" onClick={(e) => this._confirmUnbind(e)}>解绑</button>
                  <button className="btn-cancel-unbind" onClick={(e) => this._hideConfirmUnbind(e)}>取消</button>
                </div>
              </article>
            </div>
            : null}
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
        <div className={this.props.isShowDepartment ? 'center show' : 'center hide'}>
          <button onClick={() => { this.setState({isShowDepartment: true}) }}>
            {this.props.activeDepartmentName}
            {this.state.isShowDepartment ? <i className='dianfont icon-jiantou' />
            : <i className='dianfont icon-jiantou0101' />}
          </button>
          <DepartmentList
            options={DEPARTMENT_LIST}
            onChose={this._departmentChose.bind(this)}
            selectedValue={this.props.activeDepartmentId}
            onClose={this._departmentClose.bind(this)}
            isShow={this.state.isShowDepartment} />
        </div>
        <div className='right clearfix'>
          <div className='qrcode' onClick={() => { this.props.onScanQRCode() }}>
            <i className='dianfont icon-saoyisao' />
          </div>
          {/* <Link className='notice' to={'/home/notice'}>
           <i className='dianfont icon-xiaoxi' />
           {user.msgNum ? <Badge className='home-badge'>{user.msgNum}</Badge> : null}
           </Link> */}
        </div>
      </div>
    )
  }

  // 选择某个部门
  _departmentChose (value, option, i) {
    this.props.onChoseDepartment(value, option, i)
    this.setState({
      isShowDepartment: false
    })
  }

  // 关闭时候的方法
  _departmentClose () {
    this.setState({
      isShowDepartment: false
    })
  }

  // b端解绑微信号
  _unbind () {
    this.setState({
      isShowConfirmUnbind: true
    })
  }

  // 确认解绑
  _confirmUnbind (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.actions.unbind({contactMobile: this.props.data.mobile, role: this.props.data.role})
  }

  _hideConfirmUnbind (e) {
    this.setState({
      isShowConfirmUnbind: false
    })
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
