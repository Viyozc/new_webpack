/**
 * Created by fanli on 2017/4/14.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'

import Error from 'components/common/error'
import Loading from 'components/common/loading'

// import ShopShowImage from 'components/b/deviceManage/shopShowImage'
import Style from './deviceManage.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/b/deviceManage'
import { router } from 'utils'
import * as varify from 'utils/varify'

class DeviceManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showListNum: 0,
      list: []
    }
  }
  componentWillMount () {
    Style.use()
    this.props.actions.getDeviceManager({shopId: this.props.params.shopId})
  }
  componentDidMount () {

  }
  render () {
    if (!this.props.list && !this.props.error) {
      return <Loading />
    }
    if (!this.props.list && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div className='shop-device-manage'>
        <div className='manager'>
          <dl className='manager-dl'>
            <dt className='title'>
              <span className='title-txt'>门店设备管理员</span>
              <span className='title-tips'>修改后需要让管理员关注“小电商家”微信公众号</span>
            </dt>
            <dd className='line'>
              <ul className="list">
                {this.props.list ? ['', '', ''].map((item, i) => {
                  item = this.state.list[i] || {}
                  if (i > this.state.showListNum) {
                    return false
                  }
                    return <li className="item" key={i}>
                      <div className="item-line">
                        <label className="label">姓名：</label>
                        <input className="input input-name" onChange={(e) => this._changeText(e, 'contactName', i)} defaultValue={item.contactName || ''} value={item.contactName || ''} placeholder="请输入名称" type="text" />
                      </div>
                      <div className="item-line">
                        <label className="label">手机：</label>
                        <input className="input input-phone" onChange={(e) => this._changeText(e, 'contactMobile', i)} defaultValue={item.contactMobile || ''} value={item.contactMobile || ''} placeholder="请输入手机号码" type="number" />
                      </div>
                      <div className="item-btns">
                        <button className="btn-del" onClick={() => this._deleteDeviceKeeper(item.id || -1, i)}>删除</button>
                        <button className="btn-save" onClick={() => this._saveDeviceKeeper(item.id || -1, i)}>保存</button>
                      </div>
                    </li>
                  }) : null}
              </ul>
              {this.state.showListNum < 2
                ? <button className="btn-add" onClick={() => this._addDeviceManager()}>添加门店管理员</button>
                : null}
            </dd>
          </dl>
        </div>
        <div className='service'>
          <dl className='service-dl'>
            {/*<dd className='line clearfix'>*/}
              {/*<label className='name'>BD小二：{data.bdNick}</label>*/}
              {/*<a className='phone' href={`tel:${data.bdMobile}`}>{data.bdMobile}</a>*/}
            {/*</dd>*/}
            <dd className='line'>
              <a className='detail clearfix' onClick={() => router.push(`/b/shops/${this.props.params.shopId}`)}>
                <label className='title'>门店详情</label>
                <i className='dianfont icon-xuanze' />
              </a>
            </dd>
          </dl>
        </div>
        {/*<div className='submit'>*/}
          {/*<button onClick={() => this._onSubmit()} className='btn-submit'>保存修改</button>*/}
        {/*</div>*/}
        {/* <ShopShowImage  shopImage={data.shopImage}/> */}
      </div>
    )
  }

  // 删除设备管理员
  _deleteDeviceKeeper (deviceKeeperId, index) {
    this.setState({
      delIndex: index
    })
    if (deviceKeeperId === -1) {
      let list = this.state.list
      list.splice(index, 1)
      this.setState({
        list,
        showListNum: this.state.showListNum -1
      })
    }
    if (deviceKeeperId !== -1) {
      this.props.actions.deleteDeviceManager({
        id: deviceKeeperId,
        shopId: this.props.params.shopId
      })
    }
  }

  // 保存设备管理员
  _saveDeviceKeeper (deviceKeeperId, index) {
    let deviceKeeper = (this.state.list[index] && this.state.list[index].contactName) || '',
        keeperMobile = (this.state.list[index] && this.state.list[index].contactMobile) || ''
    if (deviceKeeper === '') {
      Toast.show('请输入名字')
      return false
    }
    if (keeperMobile === '') {
      Toast.show('请输入手机号码')
      return false
    }
    if (!varify.isPhone(keeperMobile)) {
      return Toast.show('请输入正确的手机号码')
    }
    if(deviceKeeperId !== -1){
      this.props.actions.setDeviceManager({
        deviceKeeper: deviceKeeper,
        keeperMobile: keeperMobile,
        shopId: this.props.params.shopId,
        id: deviceKeeperId
      })
    } else {
      this.props.actions.setDeviceManager({
        deviceKeeper: deviceKeeper,
        newkeeperMobile: keeperMobile,
        shopId: this.props.params.shopId
      })
    }
  }

  // 增加一行设备管理员
  _addDeviceManager () {
    let showListNum = this.state.showListNum +1
    this.setState({
      showListNum: showListNum
    })
  }
  _changeText (e, key, i) {
    let list = this.state.list
    let obj = {contactMobile: (list[i] && list[i].contactMobile) || '', contactName: (list[i] && list[i].contactName) || ''}
    obj[key] = e.target.value
    list[i] = obj
    this.setState({
      list
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (nextProps.list && !nextProps.error) {
      this.setState({
        showListNum: nextProps.list.length !== 0 ? nextProps.list.length - 1 : 0,
        list: nextProps.list
      })
    }
    if (nextProps.isDelete) {
      Toast.show('删除成功')
      let list = this.state.list
      list.splice(this.state.delIndex, 1)
      this.setState({
        list,
        showListNum: this.state.showListNum -1
      })
    }
    if (nextProps.isSave) {
      Toast.show('保存成功')
      setTimeout(function () {
        window.location.reload()
      }, 2000)
    }
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
    this.props.actions.resetDevice()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.getDeviceManager && state.getDeviceManager.list,
    isSave: state.setDeviceManager && state.setDeviceManager && state.setDeviceManager.isSave,
    isDelete: state.deleteDeviceManager && state.deleteDeviceManager && state.deleteDeviceManager.isDelete
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceManage)
