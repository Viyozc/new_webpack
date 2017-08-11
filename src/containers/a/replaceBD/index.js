import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Style from './index.less'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/a/replaceBD'
import * as commonActions from 'actions/common'

import assign from 'lodash/assign'
import { router, limitFontSize } from 'utils'
import {allotTypeTabConfig} from 'constants/bd'

import Search from 'components/common/search'
import InsideAllot from './InsideAllot'
import ChannelAllot from './ChannelAllot'

class TodayNewInstallDeviceContainer extends Component {
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
    Bridge.setNavTitle('更换店铺员工')
    const {district, sellerStatus} = this.props.location.query
    this.props.actions.getChangeShopList({
      memberId: sellerStatus,
      cityCode: district
    })
    this.props.actions.getConditionByAgent()
  }
  _search (value) {
    router.push('/shop/search?keyword=' + value)
  }
  render () {
    return (
      <div>
        <Search onClick={this._search.bind(this)} placeholder={'搜索门店'} />
        {
          this.props.location.query.tabStatus === `${allotTypeTabConfig[0].status}` 
          ? 
          <ChannelAllot {...this.props} /> : <InsideAllot {...this.props} />
        }
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const {districtMapList, sellerMapList, content} = state.replaceBD
  if(districtMapList && sellerMapList && content){
    const {list, totalCount} = content
    const typeAndSubType = state.common && state.common.typeAndSubType
    
    if (typeAndSubType && typeAndSubType.type[0].id !== 0) {
      typeAndSubType.type.unshift({id: 0, name: '类目'})
      // typeAndSubType.subType = assign({0: [{id: 0, name: '类目'}]}, typeAndSubType.subType)
    }
    
    return {
      typeAndSubType, list, totalCount, districtMapList, sellerMapList,
      error: state.errorMessage,
    }  
  }
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign({}, actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayNewInstallDeviceContainer)