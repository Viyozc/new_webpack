import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import NProgress from 'utils/nprogress'
import { router } from 'utils'
import ActionTypes from 'constants/actionTypes/bd/device'
import Loading from 'components/common/loading'
import Error from 'components/common/error'

import Chose from 'components/bd/device/chose'

import * as actions from 'actions/bd/device'
import { clean } from 'actions/errorMessage'

class ApplyContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceNoBatteryNum: 0,
      deviceWithBatteryNum: 0,
      adapterNum: 0,
      brandNum: 0
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('申领设备')
  }
  componentDidMount () {
    // getIconsList 接口入参不返回仓库库存数量
    let viewStock = {
      viewStock: false,
      viewPackage: true
    }
    this.props.actions.fetchMaxCount()
    this.props.actions.fetchProductIcons(viewStock)
  }
  render () {
    if (!this.props.maxCount && typeof this.props.maxCount !== 'number' && !this.props.error) {
      return <Loading />
    }
    if (!this.props.accessories && !this.props.majorProducts) {
      return <Loading />
    }
    if (!this.props.maxCount && typeof this.props.maxCount !== 'number' && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return <div className='add-container'>
      <Chose deviceMaxCount={this.props.maxCount} majorProducts={this.props.majorProducts} accessories={this.props.accessories} maxBoxNum={this.props.maxBoxNum}
        changeNum={this._changeNum.bind(this)} />
      <div className='bottom'>
        <a style={{width: 86, textAlign: 'center'}}onClick={this._next.bind(this, this.props.maxCount, this.props.maxBoxNum)}>提交</a>
      </div>
    </div>
  }
  _changeNum (uploadParams) {
    this.props.actions.fetchChangeValue(uploadParams)
  }
  _next (maxCount, maxBoxNum) {
    let postList = [].concat(this.props.majorProducts)
    let majorProductsNum = 0
    let majorBoxNum = 0
    postList.map((item, i) => {
      if (item.productId === 80) {
        majorBoxNum = item.normalNum
      } else {
        majorProductsNum += item.normalNum
      }
    })
    if ((majorProductsNum > maxCount && maxCount >= 0) || (majorBoxNum > maxBoxNum && maxBoxNum >= 0)) {
      return Toast.show('申领设备数量应小于限领数量')
    }
    if ((maxCount < 0 && majorProductsNum > 0) || (maxBoxNum < 0 && majorBoxNum > 0)) {
      return Toast.show('申领设备数量应小于限领数量')
    }
    let allList = postList.concat(this.props.accessories)
    if (allList.some(function (value, index) {
      return value.normalNum > 0
    })) {
      let params = {
        products: allList
      }
      NProgress.start()
      this.props.actions.fetchUploadApply(params)
    } else {
      return Toast.show('请添加正确的申领设备数量')
    }
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'success') {
      if (nextProps.fetchType === ActionTypes.BD_DEVICE_GET_UPLOAD_APPLY) {
        NProgress.done()
        router.push('/bd/device/list?type=0')
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
    fetch: state.bdDeviceApplyPage && state.bdDeviceApplyPage.fetch,
    maxCount: state.bdDeviceApplyPage && state.bdDeviceApplyPage.maxCount,
    maxBoxNum: state.bdDeviceApplyPage && state.bdDeviceApplyPage.maxBoxNum,
    accessories: state.bdDeviceApplyPage && state.bdDeviceApplyPage.accessories,
    majorProducts: state.bdDeviceApplyPage && state.bdDeviceApplyPage.majorProducts,
    fetchRequest: state.bdDeviceApplyPage && state.bdDeviceApplyPage.fetchRequest,
    fetchType: state.bdDeviceApplyPage && state.bdDeviceApplyPage.fetchType
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
