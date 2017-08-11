import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'
import Style from './confirmBook.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/a/purchase/confirmBook'
import assign from 'lodash/assign'
import Icon from 'components/common/icon'
import NProgress from 'utils/nprogress'

class ConfirmBookContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  componentDidMount () {
    Bridge.setNavTitle('上传采购确认书')
    let total = 0
    this.props.products && this.props.products.map((item, i) => {
      total += item.count * item.price
    })
    total = parseFloat(total.toFixed(2))
    if (total < 90000) return router.goBack()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'success') {
      NProgress.done()
      router.push('/a/purchase')
    }
    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'failure') {
      NProgress.done()
    }
    if (nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    return (
      <div className='uploader-wrapper'>
        {this.state.picUrl ? this._renderImage() : this._renderUploader()}
        <p>采购确认书需要盖贵公司公章，否者无效。</p>
        <a className='button' href='javascript: void(0)' onClick={this._fetchApply.bind(this)} >提交申请</a>
      </div>
    )
  }
  _renderUploader () {
    return (
      <div className='uploader' onClick={(e) => this._handleClickUploader(e)}>
        <Icon name='xinjian' />
        <p>添加采购确认书照片</p>
      </div>
    )
  }
  _renderImage () {
    return <div className='image'>
      <img src={this.state.picUrl} />
      <div className='close' onClick={() => this.setState({picUrl: null})}><i className='dianfont icon-guanbi' /></div>
    </div>
  }
  _handleClickUploader () {
    Bridge.uploadImages((response) => {
      if (response.error) return Toast.show(response.error)
      this.setState({
        picUrl: response.data[0]
      })
    })
  }
  _fetchApply () {
    if (!this.state.picUrl) return Toast.show('请添加采购确认书照片')
    NProgress.start()
    this.props.actions.fetchApply({purchaseApplyPic: this.state.picUrl, items: this.props.products})
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    products: state.aPurchaseApplyPage && state.aPurchaseApplyPage.products,
    fetchRequest: state.aPurchaseConfirmBookPage && state.aPurchaseConfirmBookPage.fetch
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmBookContainer)
