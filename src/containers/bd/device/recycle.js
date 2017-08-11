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
import * as localStorage from 'utils/localStorage'

import Chose from 'components/bd/device/chose'

import * as actions from 'actions/bd/device'
import { clean } from 'actions/errorMessage'

class ApplyContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount () {
    Bridge.setNavTitle('选择设备退回')
  }
  componentDidMount () {
    // getIconsList 接口入参不返回仓库库存数量
    let viewStock = {
      viewStock: false,
      viewPackage: false
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
      <Chose majorProducts={this.props.majorProducts} accessories={this.props.accessories}
        changeNum={this._changeNum.bind(this)} />
      <div className='bottom'>
        <a style={{width: 86, textAlign: 'center'}}onClick={this._next.bind(this)}>下一步</a>
      </div>
    </div>
  }
  _changeNum (uploadParams) {
    this.props.actions.fetchChangeValue(uploadParams)
  }
  _next () {
    let postList = [].concat(this.props.majorProducts)
    let allList = postList.concat(this.props.accessories)
    if (allList.some(function (value, index) {
      return value.normalNum > 0
    })) {
      let jsonListRecycle = []
      allList.map((item, i) => {
        jsonListRecycle.push({productId: item.productId, normalNum: item.normalNum, productType: item.productType})
      })
      localStorage.setItem('recycleList', JSON.stringify(jsonListRecycle))
      router.push('/bd/device/recycle/reason')
    } else {
      return Toast.show('请添加正确的退回设备数量')
    }
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'success') {
      if (nextProps.fetchType === ActionTypes.BD_DEVICE_GET_UPLOAD_RECYCLE) {
        NProgress.done()
        router.push('/bd/device/recycle/reason')
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
