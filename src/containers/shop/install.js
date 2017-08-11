import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import NProgress from 'utils/nprogress'
import * as Bridge from 'utils/bridge'
import * as actions from 'actions/shop'
import assign from 'lodash/assign'
import { clean } from 'actions/errorMessage'
import Style from './install.less'
import { router } from 'utils'

import InstallFormComponent from 'components/shop/bdView/install'

class ShopInstallContainer extends Component {
  componentWillMount () {
    Bridge.setNavTitle('申请安装')
    Style.use()
  }
  componentDidMount () {
    this.props.actions.fetchCheckMerchant({id: this.props.params.id})
  }
  componentWillReceiveProps (nextProps) {
    if (!this.props.canSign && nextProps.canSign) {
      this.props.actions.fetchGetStandard()
      if (this.props.location.query.redo) {
        this.props.actions.fetchGetSignInfo({id: this.props.location.query.contractId})
      }
    }
    if (!this.props.canSign && nextProps.error) {
      this._replaceTimer = setTimeout(() => {
        router.replace('/shop/create?shopId=' + this.props.params.id)
      }, 2500)
    }
    if (this.props.canSign && nextProps.error) {
      NProgress.done()
      Toast.show(nextProps.error.message)
      nextProps.actions.cleanErrorMessage()
    }
  }
  render () {
    if (!this.props.canSign && !this.props.error) {
      return <Loading />
    }
    if (!this.props.canSign && this.props.error) {
      return <Error>{'您还未提交公司名信息，即将为您跳转到门店编辑页'}</Error>
    }
    return (
      <div className='shop-install'>
        <InstallFormComponent {...this.props} />
      </div>
    )
  }
  componentWillUnmount () {
    clearTimeout(this._replaceTimer)
    this.props.actions.cleanErrorMessage()
    this.props.actions.clearSignForm()
    Style.unuse()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    form: state.shopSign,
    fetch: state.shopSign && state.shopSign.fetch,
    canSign: state.shopSign && state.shopSign.canSign
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopInstallContainer)
