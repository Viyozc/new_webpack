import React, { Component } from 'react'
import { router, batteryInDevice } from 'utils'
import Notfound from 'components/common/notfound'
import Style from './shopList.less'
import * as varify from 'utils/varify'
import Loading from '../../common/loading'

export default class ShopList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHaveBox: false,
      isHaveZC: false,
      isActive: [],
      nowActive: {pindex: -1, index: -1},
    }
  }

  componentWillMount () {
    Style.use()
    let data = this.props.data
    let newIsActive = []
    let boxShopNo = 0
    let zcShopNo = 0
    if (data.shopVOs || data.shopVOs.length) {
      data.shopVOs.map((o, i) => {
        let arr = []
        //座充
        if (parseInt(this.props.dataType) === 1) {
          if (o.deviceVOs && o.deviceVOs.length > 0) {
            zcShopNo++
            o.deviceVOs.map((d, j) => {
              arr.push({isActive: false, isFocus: false, comment: d.comment})
            })
            newIsActive.push(arr)
          }
        }
        //充电宝
        if (parseInt(this.props.dataType) === 2) {
          if (o.boxVOs && o.boxVOs.length > 0) {
            boxShopNo++
            o.boxVOs.map((box, z) => {
              arr.push({isActive: false, isFocus: false, comment: box.comment})
            })
            newIsActive.push(arr)
          }
        }
      })
    }
    this.setState({
      data
    })
    this.setState({
      isHaveBox: boxShopNo > 0 ? true : false,
      isHaveZC: zcShopNo > 0 ? true : false,
      isActive: newIsActive,
    })
  }

  componentDidMount () {

  }

  render () {
    if (!this.state.data) {
      return <Loading/>
    }
    if (!this.state.data.shopVOs || !this.state.data.shopVOs.length) {
      return <Notfound>还没有门店</Notfound>
    }
    return <div className='list'>
      {
        this.state.data.shopVOs.map((o, i) => {
          let link = this.state.data.role !== 'merchant' ? `/b/shops/${o.shopId}` : `/b/deviceManage/${o.shopId}`
          return <div key={i} className='shop'>
            {/*座充*/}
            {(parseInt(this.props.dataType) === 1 && o.deviceVOs && o.deviceVOs.length) ? <article>
              <header className='shop-head'>
                <ul className='list'>
                  <li className='item' onClick={() => o.shopStatus === 4 ? window.location.href=link : null}>
                    {o.shopStatus === 4 ? <i className='dianfont icon-xuanze'/> :
                      <span className='wait-install'>待安装</span>}
                    <span className='shop-name'>{o.shopName}</span>
                    <br />
                    <span className='shop-device-name'>设备管理员：{o.deviceKeeper}</span>
                  </li>
                  <li className='item clearfix'>
                    <span className='shop-service-name'>BD小二：{o.bdNick}</span>
                    <a className='shop-device-phone' href={`tel:${o.bdMobile}`}>{o.bdMobile}</a>
                  </li>
                </ul>
              </header>
              <section className='shop-body'>
                <dl className='device-info'>
                  <dt className='title'>
                    <lable className='title-txt cell01'>设备编号</lable>
                    <lable className='title-txt cell02'>成功<br />订单</lable>
                    <lable className='title-txt cell03'>退款<br />订单</lable>
                    <lable className='title-txt cell04'>当前<br />电量</lable>
                  </dt>
                  {o.deviceVOs.length
                    ? o.deviceVOs.map((d, j) => {
                      let backColor
                      switch (parseInt(d.status)) {
                        case -1:
                          backColor = 'grey'
                          break
                        case 0:
                        case 1:
                          backColor = 'green'
                          break
                        case 2:
                        case 3:
                          backColor = 'red'
                          break
                        default:
                          backColor = 'shawller-grey'
                      }
                      return <dd key={'s' + j} className='line'>
                        <span className='cell cell01'>
                          <p>{d.deviceNo}</p>
                          <p>{d.par ? <span className='weidabiao'>{d.par}</span> : null}</p>
                          <p>{d.statusText ? <span className={backColor}>{d.statusText}</span> : null} <span
                            style={{color: '#909090'}}>{d.lastOfflineTime}</span></p>
                          <p>{d.recycleTime ? <span className='grey'>回收</span> : null} <span
                            style={{color: '#909090'}}>{d.recycleTime}</span></p>
                          <p>{!(batteryInDevice(d.battery)) && (d.status === 0 || d.status === 1) ?
                            <span className='green'>交流电</span> : null}</p>
                          {d.reason && d.reason.length ? <p className='battery-use'>离线原因：{d.reason.map((o, i) => <span
                            key={i}>{o}</span>)}</p> : null}
                        </span>
                        <span className='cell cell02'>{d.successOrder}</span>
                        <span className='cell cell03'>{d.refundOrder}</span>
                        <span className='cell cell04'>{d.battery ? `${d.battery}%` : '0%'}</span>
                        <div className="remark">
                          {this.state.isActive[i][j].isFocus
                            ? <span className='remark-edit focus'>
                              { this.state.isActive[i][j].isActive
                                ? <textarea placeholder="备注：15个字符、可填写包间号、桌号等"
                                            onChange={(e) => this._onChange(i, j, e.target.value)}
                                            onClick={() => this.changeCommentFocus(i, j)} defaultValue={d.comment}
                                            className='text-remark'/>
                                : <textarea placeholder="备注：15个字符、可填写包间号、桌号等"
                                            onChange={(e) => this._onChange(i, j, e.target.value)}
                                            onClick={() => this.changeCommentFocus(i, j)} defaultValue={d.comment}
                                            className='text-remark'/>
                              }
                              { this.state.isActive[i][j].isActive || !d.comment ? <button className="btn-save-remark"
                                                                                           onClick={() => this.changeComment(i, j, d.deviceNo, 'd')}>
                                保存</button> : ''}
                            </span>
                            : <span className='remark-edit blur'>
                              {this.state.isActive[i][j].isActive
                                ? <textarea placeholder="备注：15个字符、可填写包间号、桌号等"
                                            onChange={(e) => this._onChange(i, j, e.target.value)}
                                            onClick={() => this.changeCommentFocus(i, j)} defaultValue={d.comment}
                                            className='text-remark'/>
                                : <textarea placeholder="备注：15个字符、可填写包间号、桌号等"
                                            onChange={(e) => this._onChange(i, j, e.target.value)}
                                            onClick={() => this.changeCommentFocus(i, j)} defaultValue={d.comment}
                                            className='text-remark'/>
                              }

                              {this.state.isActive[i][j].isActive || !d.comment ? <button className="btn-save-remark"
                                                                                          onClick={() => this.changeComment(i, j, d.deviceNo, 'd')}>
                                保存</button> : ''}
                            </span>
                          }
                        </div>
                      </dd>
                    })
                    : null
                  }
                </dl>
              </section>
            </article> : null}
            {/*盒子*/}
            {(parseInt(this.props.dataType) === 2 && o.boxVOs && o.boxVOs.length) ? <article>
              <header className='shop-head'>
                <ul className='list'>
                  <li className='item' onClick={() => o.shopStatus === 4 ? window.location.href=link : null}>
                    {o.shopStatus === 4 ? <i className='dianfont icon-xuanze'/> :
                      <span className='wait-install'>待安装</span>}
                    <span className='shop-name'>{o.shopName}</span>
                    <br />
                    <span className='shop-device-name'>设备管理员：{o.deviceKeeper}</span>
                  </li>
                  <li className='item clearfix'>
                    <span className='shop-service-name'>BD小二：{o.bdNick}</span>
                    <a className='shop-device-phone' href={`tel:${o.bdMobile}`}>{o.bdMobile}</a>
                  </li>
                </ul>
              </header>
              <section className='shop-body'>
                <dl className='device-info'>
                  <dt className='title'>
                    <lable className='title-txt cell01'>设备编号</lable>
                    <lable className='title-txt cell02'>成功<br />借出</lable>
                    <lable className='title-txt cell03'>当前<br />可借</lable>
                    <lable className='title-txt cell04'>当前<br />可还</lable>
                  </dt>
                  {o.boxVOs.length
                    ? o.boxVOs.map((d, j) => {
                      let backColor
                      switch (parseInt(d.status)) {
                        case -1:
                          backColor = 'grey'
                          break
                        case 0:
                        case 1:
                          backColor = 'green'
                          break
                        case 2:
                        case 3:
                          backColor = 'red'
                          break
                        default:
                          backColor = 'shawller-grey'
                      }
                      return <dd key={'s' + j} className='line'>
                        <span className='cell cell01'>
                          <p>{d.boxNo}</p>
                          <p>{d.statusText ? <span className={backColor}>{d.statusText}</span> : null} <span
                            style={{color: '#909090'}}>{d.lastOfflineTime}</span></p>
                          <p>{d.recycleTime ? <span className='grey'>回收</span> : null} <span
                            style={{color: '#909090'}}>{d.recycleTime}</span></p>
                          <p>{batteryInDevice(d.battery) ? <span
                            className='green'>{`电量：${d.battery}%`}</span> : null}</p>
                          {d.reason && d.reason.length ? <p className='battery-use'>离线原因：{d.reason.map((o, i) => <span
                            key={i}>{o}</span>)}</p> : null}
                        </span>
                        <span className='cell cell02'>{d.hasBorrowNum}</span>
                        <span className='cell cell03'>{d.canBorrowNum}</span>
                        <span className='cell cell04'>{d.canRepayNum}</span>
                        <div className="remark">
                          {this.state.isActive[i][j].isFocus
                            ? <span className='remark-edit focus'>
                              { this.state.isActive[i][j].isActive
                                ? <textarea placeholder="备注：15个字符、可填写包间号、桌号等"
                                            onChange={(e) => this._onChange(i, j, e.target.value)}
                                            onClick={() => this.changeCommentFocus(i, j)} defaultValue={d.comment}
                                            className='text-remark'/>
                                : <textarea placeholder="备注：15个字符、可填写包间号、桌号等"
                                            onChange={(e) => this._onChange(i, j, e.target.value)}
                                            onClick={() => this.changeCommentFocus(i, j)} defaultValue={d.comment}
                                            className='text-remark'/>
                              }
                              { this.state.isActive[i][j].isActive || !d.comment ? <button className="btn-save-remark"
                                                                                           onClick={() => this.changeComment(i, j, d.boxNo, 'b')}>
                                保存</button> : ''}
                            </span>
                            : <span className='remark-edit blur'>
                              {this.state.isActive[i][j].isActive
                                ? <textarea placeholder="备注：15个字符、可填写包间号、桌号等"
                                            onChange={(e) => this._onChange(i, j, e.target.value)}
                                            onClick={() => this.changeCommentFocus(i, j)} defaultValue={d.comment}
                                            className='text-remark'/>
                                : <textarea placeholder="备注：15个字符、可填写包间号、桌号等"
                                            onChange={(e) => this._onChange(i, j, e.target.value)}
                                            onClick={() => this.changeCommentFocus(i, j)} defaultValue={d.comment}
                                            className='text-remark'/>
                              }

                              {this.state.isActive[i][j].isActive || !d.comment ? <button className="btn-save-remark"
                                                                                          onClick={() => this.changeComment(i, j, d.boxNo, 'b')}>
                                保存</button> : ''}
                            </span>
                          }
                        </div>
                      </dd>
                    })
                    : null
                  }
                </dl>
              </section>
            </article> : null}
            {parseInt(this.props.dataType) === 1 && !this.state.isHaveZC ?
              <div className="device-empty-tips">暂无座充设备的门店</div> : null}
            {parseInt(this.props.dataType) === 2 && !this.state.isHaveBox ?
              <div className="device-empty-tips">暂无盒子设备的门店</div> : null}
          </div>
        })
      }
    </div>
  }

  componentWillUnmount () {
    Style.unuse()
  }

  changeComment (pindex, index, deviceNo, type) {
    let newActiveStatus = this.state.isActive
    newActiveStatus[pindex][index].isActive = false
    newActiveStatus[pindex][index].isFocus = false
    this.setState({
      isActive: newActiveStatus,
      nowActive: {pindex, index}
    })
    let comment = this.state.isActive[pindex][index].comment
    if (!comment) {
      Toast.show('请输入备注')
      return false
    }
    if (!varify.limitWordLength(comment, 30)) {
      return Toast.show('最多只能输入15个字')
    }
    this.props.actions.editComment({deviceNo, comment, type})
  }

  _onChange (pindex, index, value) {
    let newActiveStatus = this.state.isActive
    newActiveStatus[pindex][index].comment = value
    this.setState({
      isActive: newActiveStatus
    })
  }

  changeCommentFocus (pindex, index) {
    let newActiveStatus = this.state.isActive
    for (let i = 0; i < newActiveStatus[pindex].length; i++) {
      if (i === index) {
        newActiveStatus[pindex][i].isActive = true
        newActiveStatus[pindex][i].isFocus = true
      } else {
        newActiveStatus[pindex][i].isActive = false
        newActiveStatus[pindex][i].isFocus = false
      }
    }
    this.setState({
      isActive: newActiveStatus
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data) {
      let data = nextProps.data
      let newIsActive = []
      let boxShopNo = 0
      let zcShopNo = 0
      if (data.shopVOs || data.shopVOs.length) {
        data.shopVOs.map((o, i) => {
          let arr = []
          //座充
          if (parseInt(nextProps.dataType) === 1) {
            if (o.deviceVOs && o.deviceVOs.length > 0) {
              zcShopNo++
              o.deviceVOs.map((d, j) => {
                arr.push({isActive: false, isFocus: false, comment: d.comment})
              })
              newIsActive.push(arr)
            }
          }
          //充电宝
          if (parseInt(nextProps.dataType) === 2) {
            if (o.boxVOs && o.boxVOs.length > 0) {
              boxShopNo++
              o.boxVOs.map((box, z) => {
                arr.push({isActive: false, isFocus: false, comment: box.comment})
              })
              newIsActive.push(arr)
            }
          }
        })
      }
      this.setState({
        isHaveBox: boxShopNo > 0 ? true : false,
        isHaveZC: zcShopNo > 0 ? true : false,
        isActive: newIsActive,
      })
    }

    if (this.props.bShopEditCommentResult === 'request' && nextProps.bShopEditCommentResult === 'success') {
      Toast.show('编辑成功')
    }
    if(this.props.bShopEditCommentResult === 'request' && nextProps.bShopEditCommentResult === 'failure'){
      Toast.show('编辑失败，请重试')
    }
  }
}
