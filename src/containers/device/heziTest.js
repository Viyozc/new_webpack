import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import assign from 'lodash/assign'
import { router } from 'utils'
import Notfound from 'components/common/notfound'
import Loading from 'components/common/loading'
import Error from 'components/common/error'

import * as actions from 'actions/repair/heziTest/'
import { clean } from 'actions/errorMessage'

import Style from './heziTest.less'

class HeziDeviceBindContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      success: false,
      timer: null,
      isShowNoCompleteOpc: false,
      isHaveBroken: false,
      noTestPlace: '1, 2, 3, 4, 5, 6, 7, 8',
      isAllTest: sessionStorage.getItem('xiaodian-heziTest-isAllTest-' + this.props.location.query.deviceNo) === 'yes' ? true : false,
      status: [
        {timer: null, index: 0, isUnLocking: false, isUnLock: false, isTest: false, unLockingTime: 0, isFail: false},
        {timer: null, index: 1, isUnLocking: false, isUnLock: false, isTest: false, unLockingTime: 0, isFail: false},
        {timer: null, index: 2, isUnLocking: false, isUnLock: false, isTest: false, unLockingTime: 0, isFail: false},
        {timer: null, index: 3, isUnLocking: false, isUnLock: false, isTest: false, unLockingTime: 0, isFail: false},
        {timer: null, index: 4, isUnLocking: false, isUnLock: false, isTest: false, unLockingTime: 0, isFail: false},
        {timer: null, index: 5, isUnLocking: false, isUnLock: false, isTest: false, unLockingTime: 0, isFail: false},
        {timer: null, index: 6, isUnLocking: false, isUnLock: false, isTest: false, unLockingTime: 0, isFail: false},
        {timer: null, index: 7, isUnLocking: false, isUnLock: false, isTest: false, unLockingTime: 0, isFail: false}
      ]
    }
  }

  componentWillMount () {
    Bridge.setNavTitle('盒子设备测试')
    Style.use()
    this.props.actions.fetchHeziTestList({
      devId: this.props.location.query.deviceNo || ''
    })
  }

  componentDidMount () {
    clearInterval(this.state.timer)
    this.setState({
      timer: setInterval(() => {
        this.props.actions.fetchHeziTestList({
          devId: this.props.location.query.deviceNo || ''
        })
      }, 2000)
    })
  }

  render () {
    if (!this.props.data && !this.props.error) {
      return <Loading />
    }
    if (!this.props.data && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.data && this.props.data.length === 0) {
      return <Notfound>暂无数据</Notfound>
    }
    return (
      <div className='test-hezi'>
        <div className="test-head">
          <span className="wid01 wid">槽位</span>
          <span className="wid02 wid">设备编号</span>
          <span className="wid03 wid">状态</span>
          <span className="wid04 wid">电压</span>
          <span className="wid05 wid">操作</span>
        </div>
        <ul className='list clearfix'>
          {this.props.data && this.props.data.length > 0 && this.props.data.map((item, i) => {
            // let status = 0
            let status = parseInt(item.status)
            {/* 空插槽的状态 */}
            if (status === -1) {
              return <li className='item status-empty' key={i}>
                <span className="wid01 wid">
                  <i className='num'>{i + 1}</i>
                </span>
                <span className="wid-full wid">
                  <p className="txt">未测试<br/>请从其他任一槽位解锁充电宝插入此槽</p>
                </span>
              </li>
            }
            {/* 解锁完成的状态 */}
            if (status === 0) {
              return <li className='item status-tested' key={i}>
                {(this.state.status[i].isTest || this.state.isAllTest) ? <i className="tested-mark"><i className="txt">已测</i></i> : null}
                <span className="wid01 wid">
                  <i className='num'>{i + 1}</i>
                </span>
                <span className="wid-full01 wid">
                  <p className="txt">测试完成</p>
                </span>
                <span className="wid05 wid">
                  <i className="dianfont icon-duigou" />
                </span>
              </li>
            }
            {/* 已锁定的状态 */}
            if (status === 1 && !this.state.status[i].isFail && !this.state.status[i].isUnLocking) {
              return <li className='item status-locked' key={i}>
                {(this.state.status[i].isTest || this.state.isAllTest) ? <i className="tested-mark"><i className="txt">已测</i></i> : null}
                <span className="wid01 wid">
                        <i className='num'>{i + 1}</i>
                       </span>
                       <span className="wid02 wid">
                         <span className="device-no">{item.powerBankNo}</span>
                       </span>
                      <span className="wid03 wid">
                        <span className="txt"><i className="dianfont icon-suo" />已锁定</span>
                        {(item.powerBankStatus === 3 && item.powerBankStatusText !== '充放异常') ? <i className="broken">{item.powerBankStatusText}</i> : null}
                      </span>
                      <span className="wid04 wid">
                        <span className="battery">{item.battery}</span>
                      </span>
                      <span className="wid05 wid">
                        <button className="btn-unlock" onClick={() => this._unlock(i, item.slot)} >解锁</button>
                      </span>
              </li>
            }
            {/* 解锁成功的状态 */}
            if (!this.state.status[i].isUnLocking && status === 2) {
              return <li className='item status-unlocked' key={i}>
                {(this.state.status[i].isTest || this.state.isAllTest) ? <i className="tested-mark"><i className="txt">已测</i></i> : null}
                <span className="wid01 wid">
                  <i className='num'>{i + 1}</i>
                </span>
                <span className="wid02 wid">
                   <span className="device-no">{item.powerBankNo}</span>
                 </span>
                <span className="wid03 wid">
                  <span className="txt"><i className="dianfont icon-suo" />已解锁 待取出</span>
                  {(item.powerBankStatus === 3 && item.powerBankStatusText !== '充放异常') ? <i className="broken">{item.powerBankStatusText}</i> : null}
                </span>
                <span className="wid04 wid">
                  <span className="battery">{item.battery}</span>
                </span>
                <span className="wid05 wid">
                  <button className="btn-unlock half-opacity">解锁</button>
                </span>
              </li>
            }
            {/* 解锁中的状态 */}
            if (status === 1 && this.state.status[i].isUnLocking && !this.state.status[i].isFail) {
              return <li className='item status-unlocking' key={i}>
                {(this.state.status[i].isTest || this.state.isAllTest) ? <i className="tested-mark"><i className="txt">已测</i></i> : null}
                <span className="wid01 wid">
                  <i className='num'>{i + 1}</i>
                </span>
                <span className="wid02 wid">
                   <span className="device-no">{item.powerBankNo}</span>
                </span>
                <span className="wid03 wid">
                  <span className='lock-unlocking'>解锁中<i className='point one'>.</i><i
                  className='point two'>.</i><i
                  className='point three'>.</i></span>
                  {(item.powerBankStatus === 3 && item.powerBankStatusText !== '充放异常') ? <i className="broken">{item.powerBankStatusText}</i> : null}
                </span>
                <span className="wid04 wid">
                  <span className="battery">{item.battery}</span>
                </span>
                <span className="wid05 wid">
                  <button className="btn-unlock half-opacity">解锁</button>
                </span>
              </li>
            }
            {/* 解锁失败的状态 */}
            if (status === 1 && this.state.status[i].isFail) {
              return <li className='item status-fail' key={i}>
                {(this.state.status[i].isTest || this.state.isAllTest) ? <i className="tested-mark"><i className="txt">已测</i></i> : null}
                <span className="wid01 wid">
                  <i className='num'>{i + 1}</i>
                </span>
                <span className="wid02 wid">
                   <span className="device-no">{item.powerBankNo}</span>
                </span>
                <span className="wid03 wid">
                  <span className='lock-fail'>解锁失败</span>
                  {(item.powerBankStatus === 3 && item.powerBankStatusText !== '充放异常') ? <i className="broken">{item.powerBankStatusText}</i> : null}
                </span>
                <span className="wid04 wid">
                  <span className="battery">{item.battery}</span>
                </span>
                <span className="wid05 wid">
                  <button className="btn-reunlock" onClick={() => this._unlock(i, item.slot)} >重新解锁</button>
                </span>
              </li>
            }
          })}
        </ul>
        <div className='btns'>
          <button className='btn btn-change'
            onClick={() => { router.push(`/shops/0/install/confirmPoi?shopId=${this.props.location.query.shopId || ''}`) }}>
            更换设备
          </button>
          <button className='btn btn-working'
            onClick={() => {
              if (!this.state.isAllTest) {
                this._showNoCompleted()
              }
              // else if (this.state.isHaveBroken) {
              //   Toast.show('请替换并测试已损坏充电宝，在进行下一步')
              // }
              else {
                router.push({
                  pathname: '/device/confirm',
                  query: assign({deviceType: '8'}, this.props.location.query)
                })
              }
            }}>
            设备正常
          </button>
        </div>
        {this.state.isShowNoCompleteOpc ? <div className="opc-wap" onClick={() => {this.setState({isShowNoCompleteOpc: false})}}>
          <article className="white-wap">
            <p className="title">{this.state.noTestPlace.join(',')}槽位未完成测试</p>
            <p className="desc">取出充电宝后，请等左上角出现"已测"后再放回槽内</p>
            <div className="box-show">
              <div className="box-show-inner">
                <ul className="box-list clearfix">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((elem, i) => {
                    let noTestPlace = this.state.noTestPlace
                    let isEmpty = false
                    let num = -1
                    for (let j = 0; j < 8; j++) {
                      if (elem === noTestPlace[j]) {
                        isEmpty = true
                        num = elem
                      }
                    }
                    return <li className={!isEmpty ? 'box-item full' : 'box-item empty'} key={i}><i className="column" />{isEmpty ? <i className="num">{num}</i> : null}</li>
                  })}
                </ul>
              </div>
            </div>
            <div className="white-wap-btns">
              <button className="btn-close" onClick={() => {this.setState({isShowNoCompleteOpc: false})}}>我知道了</button>
            </div>
          </article>
        </div> : null}
      </div>

    )
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data !== nextProps.data && nextProps.data) {
      let data = nextProps.data
      let tempData = this.state.status
      let count = 0
      let countWorkBattery = 0
      let noTestPlace = []
      this.setState({
        isHaveSix: false
      })
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let status = parseInt(data[i].status)
          tempData[i].index = i
          if (data[i].powerBankStatus !== 3) {
            countWorkBattery ++
          }
          // 空槽位，已测
          if (status === 0) {
            clearInterval(tempData[i].timer)
            tempData[i].isTest = true
            tempData[i].isUnLocking = false
            tempData[i].unLockingTime = 0
            tempData[i].isFail = false
          }
          if (status === -1) {
            count--
          }
          if (tempData[i].isTest) {
            count++
          } else {
            noTestPlace.push(i + 1)
          }
          // 已解锁
          if (status === 2) {
            clearInterval(tempData[i].timer)
            tempData[i].isUnLock = true
            tempData[i].unLockingTime = 0
            tempData[i].isFail = false
            tempData[i].isUnLocking = false
          }
          // 已锁定
          if (status === 1 && tempData[i].unLockingTime >= 20 && tempData[i].isUnLocking) {
            clearInterval(tempData[i].timer)
            tempData[i].unLockingTime = 0
            tempData[i].isFail = true
            tempData[i].isUnLock = false
            tempData[i].isUnLocking = false
          }
        }
        this.setState({
          noTestPlace
        })
        if (count >= 8) {
          this.setState({
            isAllTest: true
          })
          sessionStorage.setItem('xiaodian-heziTest-isAllTest-' + this.props.location.query.deviceNo, 'yes')
        }
        if (countWorkBattery < 8) {
          this.setState({
            isHaveBroken: true
          })
        } else {
          this.setState({
            isHaveBroken: false
          })
        }
        this.setState({
          status: tempData
        })
      }
    }
  }

  _complete () {
    router.replace(`/shops/${this.props.location.query.shopId}`)
  }

  // 未全部测试完成
  _showNoCompleted () {
    this.setState({
      isShowNoCompleteOpc: true
    })
  }

  _unlock (index, slot) {
    this.props.actions.unlock({
      devId: this.props.location.query.deviceNo || '',
      slot
    })
    let statusArr = this.state.status
    for (let i = 0; i < statusArr.length; i++) {
      if (i === index) {
        statusArr[i].isUnLocking = true
        statusArr[i].isFail = false
        statusArr[i].timer = setInterval(() => {
          statusArr[i].unLockingTime++
        }, 2000)
      }
    }
    this.setState({
      status: statusArr
    })
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
    this.props.actions.clearErrorMessage()
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.heziTest && state.heziTest.list,
    lockStatus: state.heziTest && state.heziTest.lockStatus
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign({}, actions, {
      clearErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeziDeviceBindContainer)
