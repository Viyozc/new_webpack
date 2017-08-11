import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'

import Error from 'components/common/error'
import Loading from 'components/common/loading'
// import Button from 'components/common/button'
import Section from 'components/common/section'
import ShopSection from 'components/b/shop/shopSection'
import DeviceSection from 'components/b/shop/deviceSection'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/b'

class ShopDetailContainer extends Component {
  componentWillMount () {
  }
  componentDidMount () {
    Bridge.setNavTitle('门店')
    this.props.actions.fetchMerchantShop({shopId: this.props.params.id})
  }
  render () {
    if (!this.props.shopDetail && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (!this.props.shopDetail && !this.props.error) {
      return <Loading />
    }
    return (
      <div className='shop-detail'>
        <ShopSection shop={this.props.shopDetail} />
        <DeviceSection shop={this.props.shopDetail} />
        <Section className='bd'>
          <p>BD小二</p>
          <p>{this.props.shopDetail.bdNick}<a href={`tel:${this.props.shopDetail.bdMobile}`}>{this.props.shopDetail.bdMobile}</a></p>
        </Section>
      </div>
    )
  }
  _close () {}
  componentWillReceiveProps (nextProps) {
    if (nextProps.shopDetail && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
    if (!this.props.shopDetail && nextProps.shopDetail) {
      Bridge.setNavTitle(nextProps.shopDetail.shopName)
    }
  }
  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
    this.props.actions.resetShop()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    shopDetail: state.bShop
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
