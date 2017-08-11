import React, { Component } from 'react'
import { connect } from 'react-redux'
import assign from 'lodash/assign'
import * as actions from 'actions/bd/device'
import { bindActionCreators } from 'redux'
import { clean } from 'actions/errorMessage'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'

import Style from './commitSpareLost.less'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Button from 'components/common/button'
import NProgress from 'utils/nprogress'
import CountInput from 'components/bd/device/countInputList'
import Confirm from 'components/common/confirm'

class DeviceList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submitData: {},
      showList: [],
      showModal: false
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('我的设备')
    Style.use()
  }
  componentDidMount () {
    if (!this.props.userProducts) return router.replace('/bd/device/list?type=0')
    let submitData = {}
    let showList = []
    this.props.userProducts.map((val, i) => {
      submitData[val.productId] = 0
      showList.push({productId: val.productId, normalNum: val.normalNum, productName: val.productName})
    })
    this.setState({
      submitData,
      showList
    })
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
      this.setState({showModal: true})
    }
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  render () {
    if (this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div className='mydevice'>
        {this.state.showList && this.state.showList.map((item, i) => {
          { /* {this.props.userProducts && this.props.userProducts.map((item, i) => { */ }
          return <CountInput key={i}
            item={item}
            value={this.state.submitData[item.productId] || 0}
            _add={this._add.bind(this, item.productId)}
            _change={(id, val) => this._changeNum(id, val)}
            _minus={this._minus.bind(this, item.productId)}
          />
        })}
        <p className='title'>遗失原因</p>
        <textarea className='reason' onChange={(e) => this._submitReason(e)} />
        <Button fixed fixedSpace={0} onClick={() => this._submit()}>提交</Button>
        {this.state.showModal
          ? <Confirm
            type='alert'
            title='提交成功'
            content='请在已遗失列表中查看审核进度'
            onConfirm={() => router.replace('/bd/device/list?type=0')}
        /> : null}
      </div>
    )
  }
  _submitReason (e) {
    this.setState({lostReason: e.target.value})
  }
  _submit () {
    NProgress.start()
    this.props.actions.fetchDeviceLost({counts: this.state.submitData, lostReason: this.state.lostReason, lostType: 2})
  }
  _add (id) {
    let temp = assign({}, this.state.submitData)
    if (temp[id] < this.state.showList.filter(val => val.productId === id)[0].normalNum) {
      temp[id] ++
    }
    this.setState({submitData: temp})
  }

  _minus (id) {
    let temp = assign({}, this.state.submitData)
    temp[id] --
    temp[id] = temp[id] < 0 ? 0 : temp[id]
    this.setState({submitData: temp})
  }

  _changeNum (id, val) {
    let temp = assign({}, this.state.submitData)
    temp[id] = parseInt(val)
    if (val > this.state.showList.filter(val => val.productId === id)[0].normalNum) {
      return Toast.show('已超过备件数量')
    }
    temp[id] = temp[id] < 0 ? 0 : temp[id]
    this.setState({submitData: temp})
  }

}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    fetch: state.bdDeviceLosePage && state.bdDeviceLosePage.fetch,
    userProducts: state.bdDeviceListPage && state.bdDeviceListPage.userProducts

  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList)

