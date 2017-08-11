import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'components/link'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import Button from 'components/common/button'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Section, { SectionBody } from 'components/common/section'
import Cell, { CellBody, CellFooter } from 'components/common/cell'
import SectionComponent from 'components/shop/bdView/section'
import Style from 'components/shop/detail.less'
import detailStyle from './detail.less'
import Icon from 'components/common/icon'
import * as actions from 'actions/shop'
import * as Bridge from 'utils/bridge'
import { clean } from 'actions/errorMessage'
import { router } from 'utils'
import AlertRepair from 'components/common/alertRepair'
import AlertAuditing from 'components/common/alertAuditing'
import * as channelAuditingActions from 'actions/channel/auditing'
import * as deviceAction from 'actions/repair/workOrder'
class ShopDetailContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowOpc: false,
      isShowRepairOpc: false,
      showComfire: false,
      mailNo: ''
    }
  }

  componentWillMount () {
    Style.use()
    detailStyle.use()
  }

  componentDidMount () {
    this.props.actions.fetchShopGetById({shopId: this.props.routeParams.id})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.shopInfo && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (this.props.shopInfo !== nextProps.shopInfo && nextProps.shopInfo) {
      if (parseInt(nextProps.shopInfo.status) === 2) {
        Bridge.setNavTitle('签约详情')
      } else {
        Bridge.setNavTitle('安装详情')
      }
    }
    //  渠道经理 审核
    if (this.props.submitStatus === 'request' && nextProps.submitStatus === 'success') {
      Toast.show('提交成功')
      this.setState({
        isShowAuditingOpc: false
      })
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      if (this.props.type === 'FETCH_SHOP_FINISHINSTALL') {
        Toast.show('确认完成')
        this.props.actions.fetchShopGetById({shopId: this.props.params.id})
      }
    }
    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'success') {
      if (nextProps.type === 'WORKORDER_SCANCODE') {
        // type => deviceType
        let type = parseInt(nextProps.scanInfo && nextProps.scanInfo.deviceType)
        if (type === 4 || type === 5 || type === 6 || type === 7 || type === 9 || type === 10) {
          return router.push(`/workOrder/repair/test?deviceNo=${this.state.deviceNo}&shopId=${this.props.shopInfo.shopId || ''}&installNo=${this.props.shopInfo.installNo || 0}`)
        }
        if (type === 8 || type === 13) {
          return router.push(`/workOrder/repair/boxTest?deviceNo=${this.state.deviceNo}&shopId=${this.props.shopInfo.shopId || ''}&installNo=${this.props.shopInfo.installNo || 0}&type=box`)
        }
        // return router.push(`/workOrder/repair/test?deviceNo=${this.props.location.query.deviceNo}&shopId=${this.props.shopInfo.shopId || ''}&installNo=${this.props.shopInfo.installNo || 0}`)
      }
    }
  }

  render () {
    if (!this.props.shopInfo && !this.props.error) {
      return <Loading />
    }
    if (!this.props.shopInfo && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    // console.log(this.props.shopInfo)
    const {shopName, shopId, role} = this.props.shopInfo
    return (
      <div>
        <div className='shop-detail'>
          {this.props.shopInfo
            ? <SectionComponent sectionType={'shopDetail'} index={0} {...this.props.shopInfo} isManager={this.props.shopInfo.role === 'agentSellerManager'} />
            : null
          }
          {
            role == 'agencyBoss'
            ?
            <Section>
              <SectionBody>
                <Cell>
                  <CellBody>
                    <p className='bd-title'>
                      BD小二：{this.props.shopInfo.sellerNick}&nbsp;&nbsp;
                      <a className='tel-phone' href={`tel:${this.props.shopInfo.sellerMobile}`}>{this.props.shopInfo.sellerMobile}</a>
                    </p>
                  </CellBody>
                  <Link className='replaceBD'
                    to={`/shops/detail/chooseBD?shopIds=${shopId}&shopName=${shopName}&count=${1}`}>更换BD</Link>
                </Cell>
              </SectionBody>
            </Section>
            :
            null
          }
            
          <div className='install-address'>
            <label className='title'>安装地址：</label>
            <br />
            <p className='address' onClick={() => this._openLocation()}>
              {this.props.shopInfo && this.props.shopInfo.address}<i className='dianfont icon-location' />
            </p>
          </div>
          {this.props.shopInfo.status === 4 ? <Section>
            <SectionBody>
              <Cell
                others={{onClick: (e) => { router.push('/user/mine/shops/' + this.props.params.id + '/device?activeTab=0') }}}>
                <CellBody style={{width: '50%', marginRight: '30px'}}>
                  <div className='radio-cell'>查看门店设备</div>
                </CellBody>
                <CellFooter>
                  <Icon name='xuanze' />
                </CellFooter>
              </Cell>
            </SectionBody>
          </Section> : null}
          {
            this.props.shopInfo && this.props.shopInfo.status === 4 && this.props.shopInfo.role === 'agentSeller' && this.props.shopInfo.ZJSBoxList.length > 0 ? <Section>
              <SectionBody>
                <Cell>
                  <CellBody><p className='bd-title' style={{color: '#000', fontSize: '18px'}}>安装进展</p></CellBody>
                </Cell>
                {this.props.shopInfo.ZJSBoxList.map((item, i) => {
                  return <div className='warp-apply' key={i}>
                    <Cell>
                      <CellBody><p className='bd-title'>安装时间:</p></CellBody>
                      <CellFooter>{item.applyTime}</CellFooter>
                    </Cell>
                    <Cell>
                      <CellBody><p className='bd-title'>安装数量:</p></CellBody>
                      <CellFooter>{item.deviceNum}</CellFooter>
                    </Cell>
                    <Cell>
                      <CellBody><p className='bd-title'>安装状态:</p></CellBody>
                      <CellFooter>{item.statusText}</CellFooter>
                    </Cell>
                    <div className='clearfix'>
                      <div className='finish-install' onClick={() => this._openComfirm({mailNo: item.mailNo})}>安装完成</div>
                    </div>
                  </div>
                })}
                <Cell>
                  <CellBody><p className='bd-title'>出库仓库:</p></CellBody>
                  <CellFooter>{this.props.shopInfo.zjsWarehouseName}</CellFooter>
                </Cell>
                <Cell>
                  <CellBody><p className='bd-title'>安装地址:</p></CellBody>
                  <CellFooter>{this.props.shopInfo.address}</CellFooter>
                </Cell>
              </SectionBody>
            </Section> : null
          }
          {this.props.shopInfo.status === 2 && this.props.shopInfo.role === 'channelManager' ? <div className='btns-wap'>
            <button className='btn btn-refuse' onClick={() => this._auditing(2, this.props.shopInfo.shopId)}>拒绝</button>
            <button className='btn btn-pass' onClick={() => this._auditing(1, this.props.shopInfo.shopId)}>同意</button>
          </div> : null}

          {(this.props.shopInfo && (this.props.shopInfo.status !== 0 && (this.props.shopInfo.role === 'agencyBD' || this.props.shopInfo.role === 'agencyBoss')))
            ? <div className='bottom-button'>
              <Link className='link link-recovery-device'
                to={'/reclaim/bd/' + this.props.params.id + '/device'}>回收</Link>
              <Button className='link link-repair-device' onClick={() => this._testDevice()}>设备维修</Button>
              <a className='link link-add-device' onClick={() => this._goMap()}>增加设备</a>
            </div>
            : null}
          {(this.props.shopInfo && this.props.shopInfo.status === 4 && this.props.shopInfo.role === 'agentSeller')
            ? <div className='bottom-button'>
              <Link className='link link-recovery-device'
                to={'/reclaim/bd/' + this.props.params.id + '/device'}>回收</Link>
              <Button className='link link-repair-device' onClick={() => this._testDevice()}>设备维修</Button>
              <a className='link link-add-device' onClick={() => this._goMap()}>增加设备</a>
              <Link className='link link-lost-device'
                to={'/bd/device/lose?shopId=' + this.props.shopInfo.shopId}>设备有遗失？</Link>
              <Link className='link link-recovery-device'
                to={`/shop/boxapply?shopId=${this.props.params.id}`}>快递安装盒子</Link>
            </div>
            : null}
          {this.props.shopInfo.role === 'agentSellerManager' ? <div className='bottom-button'>
            <Link className='link link-change-bd'
              to={'/shop/allocate/chose?shopIds=' + this.props.params.id}>更换BD</Link>
          </div> : null}
          {(this.props.shopInfo && ((this.props.shopInfo.status === 0 && this.props.shopInfo.role === 'agentSeller') || (this.props.shopInfo.status === 0 && (this.props.shopInfo.role === 'agencyBD' || this.props.shopInfo.role === 'agencyBoss'))))
            ? <Button onClick={() => this._goMap()}>安装</Button>
            : null
          }
        </div>
        <AlertAuditing isShowOpc={this.state.isShowAuditingOpc} type={this.state.auditingType}
          refuse={this._refuse.bind(this)}
          pass={this._pass.bind(this)} cancel={this._cancel.bind(this)} />
        <AlertRepair Bridge={Bridge} closeOpc={() => this.setState({isShowRepairOpc: false})}
          scanBack={this._checkScan.bind(this)}
          action={this.props.action}
          isShowOpc={this.state.isShowRepairOpc} router={router} shopId={this.props.shopInfo.shopId} />
        <AlertAuditing isShowOpc={this.state.isShowOpc} type={this.state.auditingType} refuse={this._refuse.bind(this)} pass={this._pass.bind(this)} cancel={this._cancel.bind(this)} />
        {
          this.state.showComfire ? <div className='comfire-warp'>
            <div className='white-warp'>
              <p className='title-warp'>确认配送已完成</p>
              <div className='btn-warp clearfix'>
                <div onClick={() => this.cancelInstall()}>取消</div>
                <div onClick={() => this.comfirmInstall()}>确认</div>
              </div>
            </div>
          </div> : null
        }
        {/* {this.state.showModal && this.props.scanInfo
          ? <div className='confirm-box'>
            <div className='content'>
              <p>设备类型为</p>
              <p>{this.props.scanInfo && this.props.scanInfo.typeText}</p>
              <div onClick={() => this._codeConfirm()}>确认</div>
            </div>
          </div>
          : null
        } */}
      </div>
    )
  }
  _confirmScan () {
    let type = parseInt(this.props.scanInfo.type)
    if (type === 4 || type === 5 || type === 6 || type === 7) {
      return router.push(`/workOrder/repair/test?deviceNo=${this.props.location.query.deviceNo}&shopId=${this.props.shopInfo.shopId || ''}&installNo=${this.props.shopInfo.installNo || 0}`)
    }
    if (type === 8 || type === 13) {
      return router.push(`/workOrder/repair/boxTest?deviceNo=${this.props.location.query.deviceNo}&shopId=${this.props.shopInfo.shopId || ''}&installNo=${this.props.shopInfo.installNo || 0}`)
    }
    return router.push(`/workOrder/repair/test?deviceNo=${this.props.location.query.deviceNo}&shopId=${this.props.shopInfo.shopId || ''}&installNo=${this.props.shopInfo.installNo || 0}`)
  }
  _checkScan (data) {
    let deviceNo = data.split('/').pop()
    this.setState({deviceNo})
    this.props.actions.scanCode(data, this.state.shopId)
  }
  _openComfirm (params) {
    this.setState({
      mailNo: params.mailNo,
      showComfire: true
    })
  }
  cancelInstall () {
    this.setState({
      showComfire: false,
      mailNo: ''
    })
  }
  comfirmInstall () {
    this._finishInstall({mailNo: this.state.mailNo})
    this.cancelInstall()
  }
  componentWillUnmount () {
    Style.unuse()
    detailStyle.use()
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanShopDetail()
    this.props.actions.cleanScanInfo()
  }
  _finishInstall (params) {
    this.props.actions.fetchFinishInstall(params)
  }
  _goMap () {
    router.push(`/shops/0/install/confirmPoi?shopId=${this.props.shopInfo.shopId}`)
  }

  // 审核拒绝
  _refuse (e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.actions.channelShopAuditing({
      shopId: this.state.shopId,
      checkStatus: this.state.auditingType
    })
  }

  // 取消
  _cancel (e) {
    this.setState({
      isShowAuditingOpc: false
    })
  }

  // 确认通过
  _pass (e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.actions.channelShopAuditing({
      shopId: this.state.shopId,
      checkStatus: this.state.auditingType
    })
  }

  // 点击按钮
  _auditing (type, shopId) {
    this.setState({
      isShowAuditingOpc: true,
      auditingType: type,
      shopId
    })
  }

  _testDevice () {
    this.setState({
      isShowRepairOpc: true
    })
  }

  _openLocation () {
    this.props.shopInfo && Bridge.map({
      longitude: this.props.shopInfo.poiLongitude,
      latitude: this.props.shopInfo.poiLatitude,
      name: this.props.shopInfo.shopName,
      address: this.props.shopInfo.address
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    shopInfo: state.shopDetail && state.shopDetail.shopInfo,
    submitStatus: state.channelShopAuditing && state.channelShopAuditing.submitStatus,
    fetch: state.shopCreate && state.shopCreate.fetch,
    fetchRequest: state.shopCreate && state.shopCreate.fetchRequest,
    type: state.shopCreate && state.shopCreate.type,
    scanInfo: state.shopCreate && state.shopCreate.scanInfo
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(channelAuditingActions, deviceAction, actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetailContainer)
