import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import { router } from 'utils'
import { Line } from 'components/common/cell'
import Style from './apply.less'
import * as actions from 'actions/a/purchase/apply'
import { clean } from 'actions/errorMessage'

class ApplyContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('申请采购')
  }
  componentDidMount () {
    this.props.actions.fetchProducts()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.products && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    if (!this.props.products && !this.props.error) {
      return <Loading />
    }
    if (!this.props.products && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    let nodes = []
    let total = 0
    this.props.products && this.props.products.map((item, i) => {
      total += item.count * item.price
      nodes.push(
        <div key={i}>
          <div className='numbers'>
            <img src={item.pic} />
            <div className='price'>
              <p>{item.name}</p>
              <p className='notice-red'>{item.price}元／{item.unit}</p>
            </div>
            <div className='input'>
              <input type='number' value={item.count} pattern='[0-9]*' onChange={(e) => this.props.actions.updateCount(e.target.value, i)} />
            </div>
          </div>
          <Line className='device-line' />
        </div>
      )
    })
    total = parseFloat(total.toFixed(2))

    return <div className='add-container'>
      <div className='h6'>请选择产品数量</div>
      <div className='install-form'>
        {nodes}
        <div className='footer'>
          <p>设备配件包含：适配器、数据线、卡牌</p>
          <div className='total'>总金额：<span>{total}元</span></div>
        </div>
      </div>
      <p className='notice'>单笔采购订单金额必须大于等于¥90,000。</p>
      <a className='button' href='javascript: void(0)' onClick={this._locationTo.bind(this)} >下单</a>
    </div>
  }
  _locationTo () {
    let total = 0
    this.props.products && this.props.products.map((item, i) => {
      total += item.count * item.price
    })
    total = parseFloat(total.toFixed(2))
    if (total < 90000) return Toast.show('单笔采购订单金额必须大于等于¥90,000')
    router.push('/a/purchase/confirm')
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    products: state.aPurchaseApplyPage && state.aPurchaseApplyPage.products
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyContainer)
