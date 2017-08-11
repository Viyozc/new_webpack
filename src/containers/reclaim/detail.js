/* 回收工单详情 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import { router } from 'utils'

import Button from 'components/common/button'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Shop from 'components/reclaim/detailShop'

import * as actions from 'actions/install/reclaim'
import * as Bridge from 'utils/bridge'
import { clean } from 'actions/errorMessage'

import Style from 'components/reclaim/detail.less'

class DetailContainer extends Component {
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
    this.props.actions.get({id: this.props.params.id})
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.workOrder) {
      Bridge.setNavTitle(nextProps.workOrder.shopName)
    }
    if (nextProps.workOrder && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    if (!this.props.workOrder && !this.props.error) {
      return <Loading />
    }
    if (!this.props.workOrder && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div className='reclaim-detail'>
        <Shop {...this.props.workOrder} />
        {
          this.props.workOrder.status === 0 ? <footer className='foot'>
            <Button onClick={this._goToDevice.bind(this)}>回收</Button>
            <Button onClick={this._refuse.bind(this)} className='white'>商户拒绝回收</Button>
          </footer> : null
        }
      </div>
    )
  }
  _goToDevice () {
    router.push(`/reclaim/${this.props.params.id}/device`)
  }
  _refuse () {
    router.replace(`/reclaim/${this.props.params.id}/refuseReason`)
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.reset()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    workOrder: state.workOrder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer)
