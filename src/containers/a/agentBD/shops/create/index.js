import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NProgress from 'utils/nprogress'
import { router } from 'utils'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Input from 'components/common/input'
import Icon from 'components/common/icon'
import Cell, { Cells, CellBody, CellFooter, Line } from 'components/common/cell'
import Style from './index.less'

import * as actions from 'actions/a/agentBD/shops/create'
import { clean } from 'actions/errorMessage'

const HOLDER_CONTACT_NAME = '请输入联系人姓名'
const HOLDER_CONTACT_MOBILE = '请输入联系电话'
const HOLDER_SELECT_COMPANY = '请选择公司名'
const HOLDER_SHOP_MOBILE = '请输入门店电话'
const HOLDER_SHOP_SEATNUM = '请输入座位数'
const HOLDER_SHOP_OPENINGHOURS = '请添加营业时间'
const HOLDER_SHOP_CHARGE_FREQUENCY = '请输入数字'
const HOLDER_UPLOAD_IMAGE01 = '店面图片'
const HOLDER_UPLOAD_IMAGE02 = '合同图片'

class ShopCreateContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hidePlus: false,
      longitude: 0,
      latitude: 0
    }
  }

  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('签约门店')
  }

  componentDidMount () {
    this._getLocation()
    this.props.actions.agentBDBindLocationToChoseType(false)
    if (!this.props.form.lastPageIsChoseType) {
      this.props.actions.agentBDClearCreateForm()
      if (this.props.params.id) {
        this.props.actions.agentBDFetchShopInitEdit({id: this.props.params.id})
      }
    }
  }

  render () {
    if (this.props.location.query.shopId && this.props.form && !this.props.form.id && !this.props.error) {
      return <Loading />
    }
    if (this.props.location.query.shopId && this.props.form && !this.props.form.id && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div className='shop-create'>
        <Cells>
          <Cell icon='lianxiren cell-icon-color'>
            <CellBody>
              <Input
                type='text'
                ref='contactName'
                className='input'
                placeholder={HOLDER_CONTACT_NAME}
                value={this.props.form.contactName || ''}
                onChange={this._handleChangeContactName.bind(this)} />
            </CellBody>
          </Cell>
          <Line />
          <Cell icon='lianxidianhua cell-icon-color'>
            <CellBody>
              <Input
                type='number'
                ref='contactMobile'
                className='input'
                pattern='[0-9]*'
                placeholder={HOLDER_CONTACT_MOBILE}
                value={this.props.form.contactMobile}
                onChange={this._handleChangeContactMobile.bind(this)} />
            </CellBody>
          </Cell>
        </Cells>
        <Cells>
          <Cell icon='gongsi cell-icon-color' others={{onClick: (e) => { this._handleSelectMerchantName(e) }}}>
            <CellBody style={{width: '50%', marginRight: '30px'}}>
              <div className='radio-cell'>{this.props.form.merchantName || HOLDER_SELECT_COMPANY}</div>
            </CellBody>
            <CellFooter>
              <Icon name='xuanze iconStyle' />
            </CellFooter>
          </Cell>
          <Line />
          <Cell icon='mendian cell-icon-color'>
            <CellBody style={{width: '50%', marginRight: '30px'}}>
              <div className='radio-cell'>{this.props.form.name || ''}</div>
            </CellBody>
          </Cell>
          <Line />
          <Cell icon='mendiandianhua cell-icon-color'>
            <CellBody>
              <Input
                type='text'
                ref='mobile'
                className='input'
                pattern='[0-9]*'
                placeholder={HOLDER_SHOP_MOBILE}
                value={this.props.form.mobile || ''}
                onChange={this._handleChangeMobile.bind(this)} />
            </CellBody>
          </Cell>
        </Cells>
        <Cells>
          <Cell icon='fenlei cell-icon-color'>
            <CellBody style={{width: '50%', marginRight: '30px'}}>
              <div
                className='radio-cell'>{(this.props.form.parentTypeName || '') + '-' + (this.props.form.typeName || '')}</div>
            </CellBody>
          </Cell>
          <Line />
          <Cell icon='zuowei cell-icon-color'>
            <CellBody>
              <Input
                type='number'
                ref='seatNum'
                className='input'
                pattern='[0-9]*'
                placeholder={HOLDER_SHOP_SEATNUM}
                value={this.props.form.seatNum || ''}
                onChange={this._handleChangeSeatNum.bind(this)} />
            </CellBody>
          </Cell>
          <Line />
          <div className='openinghours '>
            <div className='openinghours-title'>
              <i className='dianfont icon-shijian cell-icon-color' />
              <span>营业时间</span>
            </div>
            <div className='openinghours-panel'>
              <ul className='openinghours-content'>
                {this.props.form.openingHours && this.props.form.openingHours.map((item, i) => {
                  return <li key={i}>
                    <p className='start' onClick={this._choseStartTime.bind(this, i)}>{item.start || '选择开始时间'}</p>
                    <p className='to'>至</p>
                    <p className='end' onClick={this._choseEndTime.bind(this, i)}>{item.end || '选择结束时间'}</p>
                    <div className='minus' onClick={this._minusTime.bind(this, i)}><i
                      className='dianfont icon-jianhao1' /></div>
                  </li>
                })}
              </ul>
              {!this.state.hidePlus ?
                <div className='plus' onClick={this._plusTime.bind(this)}><i className='dianfont icon-xinjian' /> 添加
                </div> : null}
            </div>
          </div>
        </Cells>
        <Cells>
          <div className='borrow clearfix'>
            <div>客户每天借电次数</div>
            <div>
              <Input
                type='number'
                ref='chargeFrequency'
                className='input'
                pattern='[0-9]*'
                placeholder={HOLDER_SHOP_CHARGE_FREQUENCY}
                value={this.props.form.chargeFrequency || ''}
                onChange={this._handleChargeFrequency.bind(this)} />
            </div>
          </div>
        </Cells>
        <Cell className='uploader-wrapper'>
          {this.props.form.shopPicUrl ? this._renderImage01() : this._renderUploader01()}
          {this.props.form.contractPicUrl ? this._renderImage02() : this._renderUploader02()}
        </Cell>
        <a className='button save' href='javascript: void(0)' onClick={() => { this._handleClickSave(0) }}>签约</a>
      </div>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
      this.props.actions.agentBDClearCreateForm()
      Toast.show('签约成功')
      setTimeout(() => {
        history.back()
      }, 2000)
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }

    if (nextProps.error) {
      NProgress.done()
      Toast.show(nextProps.error.message)
      nextProps.actions.cleanErrorMessage()
    }
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.agentBDCleanCompanyList()
  }

  _renderUploader01 () {
    return (
      <div className='uploader' onClick={(e) => this._handleClickUploader('shopPicUrl', e)}>
        <Icon name='xinjian' />
        <p>{HOLDER_UPLOAD_IMAGE01}</p>
      </div>
    )
  }

  _renderUploader02 () {
    return (
      <div className='uploader' onClick={(e) => this._handleClickUploader('contractPicUrl', e)}>
        <Icon name='xinjian' />
        <p>{HOLDER_UPLOAD_IMAGE02}</p>
      </div>
    )
  }

  _handleChangeSecondaryContactName (event) {
    this.props.actions.agentBDChangeSecondaryContactName(event.target.value)
  }

  _handleChangeSecondaryContactMobile (event) {
    this.props.actions.agentBDChangeSecondaryContactMobile(event.target.value)
  }

  _handleChangeContactName (event) {
    this.props.actions.agentBDChangeContactName(event.target.value)
  }

  _handleChangeContactMobile (event) {
    this.props.actions.agentBDChangeContactMobile(event.target.value)
  }

  _handleChangeMobile (event) {
    this.props.actions.agentBDChangeMobile(event.target.value)
  }

  _handleChangeSeatNum (event) {
    if (event.target.value && parseInt(event.target.value) > 10000) return Toast.show('座位数不能超过10000哦')
    this.props.actions.agentBDChangeSeatNum(event.target.value)
  }

  _handleChargeFrequency (event) {
    this.props.actions.agentBDChangeChargeFrequency(event.target.value)
  }

  _handleClickUploader (name) {
    Bridge.uploadImages((response) => {
      if (response.error) return Toast.show(response.error)
      this.props.actions.agentBDUploadImage(name, response.data[0])
    })
  }

  _renderImage01 () {
    return <img className='image' onClick={(e) => this._handleClickUploader('shopPicUrl', e)}
      src={this.props.form.shopPicUrl} />
  }

  _renderImage02 () {
    return <img className='image' onClick={(e) => this._handleClickUploader('contractPicUrl', e)}
      src={this.props.form.contractPicUrl} />
  }

  _handleSelectMerchantName () {
    this.props.actions.agentBDBindLocationToChoseType(true)
    router.push('/shop/companyList')
  }

  _handleClickSave (locationWhereIndex) {
    if (!this.props.form.contactName) return Toast.show(HOLDER_CONTACT_NAME)
    if (!this.props.form.contactMobile) return Toast.show(HOLDER_CONTACT_MOBILE)
    // if (
    //   !(this.props.form.address &&
    //     this.props.form.name &&
    //     (this.state.longitude || this.state.longitude === 0) &&
    //     (this.state.latitude || this.state.latitude === 0)
    //   )
    // ) return Toast.show(HOLDER_SELECT_ADDRESS)
    if (!this.props.form.mobile) return Toast.show(HOLDER_SHOP_MOBILE)
    if (!this.props.form.merchantName) return Toast.show(HOLDER_SELECT_COMPANY)
    if (!this.props.form.seatNum) return Toast.show(HOLDER_SHOP_SEATNUM)
    if (!this.props.form.openingHours ||
      !this.props.form.openingHours[this.props.form.openingHours.length - 1].start ||
      !this.props.form.openingHours[this.props.form.openingHours.length - 1].end
    ) return Toast.show(HOLDER_SHOP_OPENINGHOURS)

    if (!this.props.form.shopPicUrl) return Toast.show('请上传' + HOLDER_UPLOAD_IMAGE01)
    if (!this.props.form.contractPicUrl) return Toast.show('请上传' + HOLDER_UPLOAD_IMAGE02)

    NProgress.start()
    this.props.actions.agentBDCreate(assign({}, this.props.form, {
      chargeFrequency: this.props.form.chargeFrequency || 0,
      type: this.props.form.typeId,
      id: this.props.params.id,
      longitude: this.props.form.poiLongitude,
      latitude: this.props.form.poiLatitude
    }))
  }

  _choseStartTime (index) {
    Bridge.selectTime(false, true, this.props.form.openingHours[index].start, (response) => {
      if (response.error) return Toast.show(response.error)
      // if (this.props.form.openingHours[index].end && !(compareTime(this.props.form.openingHours[index].end, response.data) === 'gt')) return Toast.show('开始时间不得晚于结束时间')
      this.props.actions.agentBDOperateOpeningHours({type: 'start', time: response.data, index: index})
    })
  }

  _choseEndTime (index) {
    Bridge.selectTime(false, true, this.props.form.openingHours[index].end, (response) => {
      if (response.error) return Toast.show(response.error)
      // if (this.props.form.openingHours[index].start && !(compareTime(this.props.form.openingHours[index].start, response.data) === 'lt')) return Toast.show('结束时间不得早于开始时间')
      this.props.actions.agentBDOperateOpeningHours({type: 'end', time: response.data, index: index})
    })
  }

  _plusTime () {
    let lastTime = this.props.form.openingHours[this.props.form.openingHours.length - 1]
    if (!(lastTime.start && lastTime.end)) return Toast.show('请选填完时间再继续添加')
    if (this.props.form.agentBDOpeningHours.length === 2) {
      this.setState({
        hidePlus: true
      })
    }
    this.props.actions.agentBDOperateOpeningHours({type: 'plus'})
  }

  _minusTime (index) {
    if (this.props.form.openingHours.length <= 1) return Toast.show('至少填写一条营业时间哦')
    if (this.props.form.openingHours.length === 3) {
      this.setState({
        hidePlus: false
      })
    }
    this.props.actions.agentBDOperateOpeningHours({type: 'minus', index: index})
  }

  // 获取经纬度
  _getLocation () {
    Bridge.getLocation((res) => {
      if (!res.success) {
        this.setState({locatedError: true})
      } else if (res.data && res.data.split(',') && res.data.split(',').length) {
        this.setState({
          longitude: res.data.split(',')[1],
          latitude: res.data.split(',')[0]
        })
      }
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    form: state.agentBDCreateShop,
    fetch: state.agentBDCreateShop && state.agentBDCreateShop.fetch
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCreateContainer)
