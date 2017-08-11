import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import NProgress from 'utils/nprogress'
import { router } from 'utils'
import ActionTypes from 'constants/actionTypes/shop/boxapply'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import * as actions from 'actions/shop/boxapply'
import { clean } from 'actions/errorMessage'
import Style from './boxapply.less'

class ApplyContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      boxnum: 0
    }
  }
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('申领数量')
  }
  componentDidMount () {
    this.props.actions.fetchBaseInfo()
    this.props.actions.fetchMaxApplyBox({shopId: this.props.location.query.shopId})
    this.props.actions.fetchShopGetById({shopId: this.props.location.query.shopId})
  }
  render () {
    if ((!this.props.loginInfo || !(this.props.maxnumber + '') || !this.props.applyInfo) && !this.props.error) {
      return <Loading />
    }
    if (this.props.loginInfo && this.props.maxnumber && this.props.applyInfo && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return <div>
      <div className='device-form' key={1}>
        <p className='title'>请选择设备数量<span className='limit'>本次限领盒子{this.props.maxnumber}台</span></p>
        <div className='cell device'>
          <img className='pic-border'src='//lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/12/856w_856h_E0CCA1499850132.png' />
          <div className='price'>
            <p style={{width: 157}}>请输入设备数量</p>
          </div>
          <div className='input'>
            <button className='add' onClick={this._addNum.bind(this)}>+</button>
            <input type='number'
              value={this.state.boxnum}
              pattern='[0-9]*' />
            <button onClick={this._minusNum.bind(this)}>-</button>
          </div>
        </div>
      </div>
      <div className='applyInfo' key={2}>
        <div className='cell' key={1}>
          <div className='cell-body'>申请人: </div>
          <div className='cell-footer'>{this.props.loginInfo.nickName}</div>
        </div>
        <div className='cell' key={2}>
          <div className='cell-body'>申请人电话: </div>
          <div className='cell-footer tel-phone' href={`tel:${this.props.loginInfo.mobile}`}>{this.props.loginInfo.mobile}</div>
        </div>
        <div className='cell' key={3}>
          <div className='cell-body'>安装地址: </div>
          <div className='cell-footer'>{this.props.applyInfo.address}</div>
        </div>
      </div>
      <div className='box-btn' onClick={this._applyInstall.bind(this)}>申请安装</div>
    </div>
  }
  _applyInstall () {
    let params = {}
    if (this.state.boxnum !== 0) {
      params.deviceNum = this.state.boxnum
      params.shopId = this.props.location.query.shopId
      this.props.actions.fetchSubmitBox(params)
    } else {
      return Toast.show('请选择盒子数量')
    }
  }
  _addNum (type, index) {
    if (this.state.boxnum >= this.props.maxnumber) {
      return Toast.show('申请盒子数量不能大于最大申领数量')
    } else {
      let newValue = this.state.boxnum + 1
      this.setState({
        boxnum: newValue
      })
    }
  }
  _minusNum (type, index) {
    if (this.state.boxnum <= 0) {
      return Toast.show('申请盒子数量不能小于0')
    } else {
      let newValue = this.state.boxnum - 1
      this.setState({
        boxnum: newValue
      })
    }
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'success') {
      if (nextProps.fetchType === ActionTypes.BD_DEVICE_GET_UPLOAD_APPLY) {
        NProgress.done()
        router.push('/bd/device/list?type=0')
      }
      if (nextProps.fetchType === ActionTypes.SHOP_BOXAPPLY_INDEX_GET_SUBMITBOX) {
        router.push(`/shops/${this.props.location.query.shopId}`)
      }
    }
    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'failure') {
      NProgress.done()
    }
    if (typeof this.props.maxCount === 'number' && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    loginInfo: state.bdShopBoxapplyIndexPage && state.bdShopBoxapplyIndexPage.loginInfo,
    maxnumber: state.bdShopBoxapplyIndexPage && state.bdShopBoxapplyIndexPage.maxnumber,
    applyInfo: state.bdShopBoxapplyIndexPage && state.bdShopBoxapplyIndexPage.applyInfo,
    fetchRequest: state.bdShopBoxapplyIndexPage && state.bdShopBoxapplyIndexPage.fetchRequest,
    fetchType: state.bdShopBoxapplyIndexPage && state.bdShopBoxapplyIndexPage.fetchType
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyContainer)
