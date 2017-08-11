import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NProgress from 'utils/nprogress'
import { router } from 'utils'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import Input from 'components/common/input'
import Cell, { Cells, CellBody, Line } from 'components/common/cell'
import Style from './createExpress.less'

import * as actions from 'actions/channel/purchase'
import { clean } from 'actions/errorMessage'

const HOLDER_EXPRESS_COMPANY = '请输入快递公司'
const HOLDER_EXPRESS_NO = '请输入快递单号'

class CreateExpressContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expressCompany: '',
      expressNo: ''
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentDidMount () {
    Bridge.setNavTitle('填写物流信息')
  }
  render () {
    return (
      <div className='shop-create'>
        <Cells>
          <Cell icon='wuliu cell-icon-color'>
            <CellBody>
              <Input
                type='text'
                ref='expressCompany'
                className='input'
                placeholder={HOLDER_EXPRESS_COMPANY}
                value={this.state.expressCompany}
                onChange={this._handleChangeValue.bind(this, 'expressCompany')} />
            </CellBody>
          </Cell>
          <Line />
          <Cell icon='kuaidigongsi cell-icon-color'>
            <CellBody>
              <Input
                type='text'
                ref='expressNo'
                className='input'
                pattern='[0-9]*'
                placeholder={HOLDER_EXPRESS_NO}
                value={this.state.expressNo}
                onChange={this._handleChangeValue.bind(this, 'expressNo')} />
            </CellBody>
          </Cell>
        </Cells>
        <a className='button' href='javascript: void(0)' onClick={() => { this._handleClickSave() }} >提交</a>
      </div>
    )
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
      router.push('/channel/purchase/approval?status=2')
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }

    if (nextProps.error) {
      Toast.show(nextProps.error.message)
      nextProps.actions.cleanErrorMessage()
    }
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  _handleChangeValue (key, e) {
    let state = {}
    state[key] = e.target.value
    this.setState(state)
  }
  _handleClickSave () {
    if (!this.state.expressCompany) return Toast.show(HOLDER_EXPRESS_COMPANY)
    if (!this.state.expressNo) return Toast.show(HOLDER_EXPRESS_NO)
    NProgress.start()
    this.props.actions.fetchSaveExpress({
      id: this.props.params.id,
      expressCompany: this.state.expressCompany,
      expressNo: this.state.expressNo
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    fetch: state.channelPurchaseCreateExpressPage && state.channelPurchaseCreateExpressPage.fetch
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateExpressContainer)
