import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { router } from 'utils'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'

import InstallView from 'components/shop/installView'
import BdView from 'components/shop/bdView'

import * as bdActions from 'actions/shop'
import * as channelAuditingActions from 'actions/channel/auditing'
import * as optionActions from 'actions/option'
import * as installActions from 'actions/install/shop'
import * as commonActions from 'actions/common'
import { clean } from 'actions/errorMessage'

import Style from './list.less'

class ShopListContainer extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('我的门店')
    if (!this.props.location.query.roleIndex) {
      router.replace('/identity/choose')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.bdList && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }

  render () {
    return (
      <div>
        { this._renderHome(parseInt(this.props.location.query.roleIndex))}
      </div>
    )
  }

  _renderHome (roleIndex) {
    switch (roleIndex) {
      case 0:
        return <BdView {...this.props} role={this.props.role}/>
      case 1:
        return <InstallView {...this.props} />
      default:
        return null
    }
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  let reasonOptions = state.resultOptions && state.resultOptions.opts.map((item, i) => {
      return {value: parseInt(item.key), key: item.value}
    })
  return {
    error: state.errorMessage,
    bdMembersInCity: state.common && state.common.bdMembersInCity,
    bdList: state.shopList && state.shopList.bdList,
    role: state.shopList && state.shopList.role,
    bdTabsCount: state.shopList && state.shopList.bdTabsCount,
    data: state.shopList,
    fetchRequest: state.shopDeviceList && state.shopDeviceList.fetchRequest,
    fetchType: state.shopDeviceList && state.shopDeviceList.fetchType,
    reasonOptions: reasonOptions,
    submitStatus: state.channelShopAuditing && state.channelShopAuditing.submitStatus
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(channelAuditingActions, bdActions, installActions, commonActions, optionActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopListContainer)
