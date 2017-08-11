import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import { router } from 'utils'

import Root from 'components/common/root'
import SectionComponent from 'components/shop/installView/section'
import InstallSectionComponent from 'components/shop/installView/installSection'
import AttachSectionComponent from 'components/shop/installView/attachSection'
import Style from 'components/shop/detail.less'
import Button from 'components/common/button'

import * as Bridge from 'utils/bridge'
import * as actions from 'actions/install/shop'
import { clean } from 'actions/errorMessage'

class ShopDetailContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      previewImage: false
    }
  }
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('门店详情')
  }
  componentDidMount () {
    this.props.actions.fetchShopGet({installNo: this.props.params.id})
  }
  render () {
    return (
      <Root loading={!this.props.shopInfo && !this.props.error} errorMessage={!this.props.shopInfo && this.props.error && this.props.error.message}>
        {
          this.props.shopInfo
          ? <div className={`${this.props.shopInfo.status === 0 ? 'installing' : ''} install-detail`}>
            <SectionComponent status={this.props.shopInfo.status} {...this.props.shopInfo} />
            <InstallSectionComponent status={this.props.shopInfo.status} {...this.props.shopInfo} />
            {this.renderBtn(this.props.shopInfo.status)}
            {
                this.props.shopInfo.receipt
                ? <AttachSectionComponent receipt={this.props.shopInfo.receipt} /> : null
              }
          </div> : null
        }
      </Root>
    )
  }
  _bindInstallImage () {
    this.setState({
      previewImage: true
    })
  }
  renderBtn (status) {
    if (status === 0) {
      return [<Button key='1' className='primary' onClick={this._goToConfirmPoi.bind(this)} fixed>安装</Button>,
        <Button key='2' className='white' onClick={this._goToBreak.bind(this)} fixed>中断安装</Button>]
    } else if (status === 1) {
      return <Button onClick={() => { router.push(`/shops/${this.props.params.id}/receipt`) }} fixed>上传签收单</Button>
    } else {
      return null
    }
  }
  _apply () {
    this.props.actions.apply(this.props.params.id)
  }
  _allocation () {
    this.props.actions.allocate(this.props.params.id)
  }
  _goToConfirmPoi () {
    router.push(`/shops/${this.props.params.id}/install/confirmPoi?shopId=${this.props.shopInfo.shopId}`)
  }
  _goToBreak () {
    router.push(`/shops/${this.props.params.id}/install/break?shopId=${this.props.shopInfo.shopId}`)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.shopInfo) {
      Bridge.setNavTitle(nextProps.shopInfo.shopName)
    }
    if (nextProps.shopInfo && (nextProps.shopInfo.allocated || nextProps.shopInfo.applied)) {
      router.goBack()
    }
    if (this.props.shopInfo && !this.props.error && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.resetShopInfo()
    this.props.actions.cleanErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    shopInfo: state.shopDetail && state.shopDetail.shopInfo
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetailContainer)
