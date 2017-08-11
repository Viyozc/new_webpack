import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { router } from 'utils'
import * as Bridge from 'utils/bridge'
import { clean } from 'actions/errorMessage'
import Cell, { CellBody } from 'components/common/cell'
import Error from 'components/common/error'
import Loading from 'components/common/loading'
import Style from 'components/shop/bdView/type.less'
import assign from 'lodash/assign'

import * as actions from 'actions/shop'

class ShopTypeContainer extends Component {
  componentWillMount () {
    Bridge.setNavTitle('选择门店')
    Style.use()
  }
  render () {
    if (!this.props.error && !this.props.data) {
      return <Loading />
    }
    if (this.props.error && !this.props.data) {
      return <Error>{this.props.error.message}</Error>
    }
    return (
      <div className='shop-type'>
        <div>
          {this.props.data && this._renderType()}
        </div>
        <div>
          {this.props.data && this._renderSubType()}
        </div>
      </div>
    )
  }
  componentDidMount () {
    // 参数是用户reducer判断是否是编辑状态进来的，不是用于服务端
    this.props.data || this.props.actions.getTypes({typeId: this.props.location.query.typeId})
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  _renderType () {
    return this.props.data.map((item, key) => {
      return (
        <Cell
          key={key}
          others={{onClick: () => { this._handleClickTopCell(item) }}}
          className={item.id === this.props.selectTopType.id ? 'highlight' : ''}>
          <CellBody>
            {item.name}
          </CellBody>
        </Cell>
      )
    })
  }
  _renderSubType () {
    return this.props.selectTopType.sub.map((item, key) => {
      let className = this.props.selectSubType && item.id === this.props.selectSubType.id ? 'highlight' : ''
      return (
        <Cell
          key={key}
          others={{onClick: () => { this._handleClickSubCell(item) }}}
          className={className}>
          <CellBody>
            {item.name}
          </CellBody>
        </Cell>
      )
    })
  }
  _handleClickTopCell (item) {
    this.props.actions.selectTopType(item)
  }
  _handleClickSubCell (item) {
    this.props.actions.selectSubType(item)
    router.goBack()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.shopType.list,
    selectTopType: state.shopType.selectTopType,
    selectSubType: state.shopType.selectSubType
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopTypeContainer)
