import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { router } from 'utils'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'

import Index from 'components/a/agentBD/shops/list/index'

import * as agentBDActions from 'actions/a/agentBD/shops/list'
import * as agentBDTeamActions from 'actions/a/agentBD/teamList/'
import * as commonActions from 'actions/common'
import { clean } from 'actions/errorMessage'

import Style from './index.less'

class AgentShopListContainer extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('我的门店')
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
        {this._renderHome()}
      </div>
    )
  }

  _renderHome () {
    return <Index {...this.props} />
  }

  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanShopList()
  }
}

function mapStateToProps (state, ownProps) {
  let typeAndSubType = state.common && state.common.typeAndSubType
  if (typeAndSubType && typeAndSubType.type[0].id !== 0) {
    typeAndSubType.type.unshift({id: 0, name: '类目'})
  }
  return {
    error: state.errorMessage,
    bdList: state.agentBDSHOPList && state.agentBDSHOPList.bdList,
    role: state.agentBDSHOPList && state.agentBDSHOPList.info && state.agentBDSHOPList.info.role,
    shopNum: state.agentBDSHOPList && state.agentBDSHOPList.info && state.agentBDSHOPList.info.shopNum,
    deviceNum: state.agentBDSHOPList && state.agentBDSHOPList.info && state.agentBDSHOPList.info.deviceNum,
    data: state.agentBDSHOPList,
    agentBDTeamList: state.agentBDTeamList && state.agentBDTeamList.list,
    // shopTypeList: state.agentBDShopType.level01List,
    // shopTypeListDeep: state.agentBDShopType.level02List,
    shopTypeList: typeAndSubType,
    areaList: state.common && state.common.areaList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(agentBDActions, agentBDTeamActions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentShopListContainer)
