import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { router } from 'utils'
import assign from 'lodash/assign'
import NProgress from 'utils/nprogress'

import Root from 'components/common/root'
import Icon from 'components/common/icon'
import ReceiptSectionComponent from 'components/shop/installView/receiptSection'
import Style from 'components/shop/installView/receipt.less'
import Button from 'components/common/button'

import * as Bridge from 'utils/bridge'
import * as actions from 'actions/install/shop'
import {
  uploadImage
} from 'actions/shop'
import { clean } from 'actions/errorMessage'

class ShopDetailContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      previewImage: false,
      added: false
    }
  }
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('签收单')
  }
  componentDidMount () {
    if (!this.props.shopInfo) {
      this.props.actions.fetchShopGet({installNo: this.props.params.id})
    }
  }
  render () {
    return (
      <Root loading={!this.props.shopInfo && !this.props.error} errorMessage={!this.props.shopInfo && this.props.error && this.props.error.message}>
        <div className='shop-detail'>
          {this.props.shopInfo ? <ReceiptSectionComponent status={this.props.shopInfo.status} {...this.props.shopInfo} /> : null}
          <div className='uploader'>
            <h4>纸质收据</h4>
            {
              this.props.shopInfo ? <div className='uploader-wrapper' onClick={this._handleClickUploader.bind(this)}>
                {this.props.shopInfo.picUrl ? this._renderImage() : this._renderUploader()}
              </div> : null
            }
          </div>
          {this.props.shopInfo ? <Button onClick={this._submit.bind(this)} disabled={!this.props.shopInfo.picUrl ? 'disabled' : ''} fixed>提交</Button> : null}
          {
            this.state.added
            ? <div className='added'>
              <Icon name='tianjiachenggong' />
              <p>添加成功</p>
            </div>
            : null
          }
        </div>
      </Root>
    )
  }
  _bindInstallImage () {
    this.setState({
      previewImage: true
    })
  }
  _handleClickUploader () {
    Bridge.uploadImages((response) => {
      if (response.error) return Toast.show(response.error)
      this.props.actions.uploadImage(response.data)
    })
  }
  _renderImage () {
    return <img className='image' src={this.props.shopInfo.picUrl} />
  }
  _renderUploader () {
    return (
      <div className='uploader'>
        <Icon name='xinjian' />
        <p>添加照片</p>
      </div>
    )
  }
  _submit () {
    NProgress.start()
    this.props.actions.addReceipt(this.props.params.id, this.props.shopInfo.picUrl)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.shopInfo && nextProps.shopInfo.receiptAdded) {
      NProgress.done()
      this.setState({added: true})
      setTimeout(() => {
        router.goBack()
      }, 1000)
    }
    if (nextProps.error && this.props.shopInfo) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
      NProgress.done()
    }
  }
  componentWillUnmount () {
    Style.unuse()
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
      cleanErrorMessage: clean,
      uploadImage: uploadImage
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetailContainer)
