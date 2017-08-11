import React, { Component } from 'react'
import { connect } from 'react-redux'
import assign from 'lodash/assign'
import * as actions from 'actions/bd/device'
import { bindActionCreators } from 'redux'
import { clean } from 'actions/errorMessage'
import * as Bridge from 'utils/bridge'
import { router } from 'utils'

import Style from './findSpare.less'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Button from 'components/common/button'
import NProgress from 'utils/nprogress'
import CountInput from 'components/bd/device/countInputList'
import Confirm from 'components/common/confirm'

let userProducts = [
  {
    'productId': 10,
    'productName': '座充设备（交流电版）',
    'productMode': 'XDZ1-001',
    'productType': 1,
    'picUrl': '//img.shenghuozhe.net/shz/2017/03/21/273w_261h_5A7571490086595.png',
    'normalNum': 3,
    'isDevice': 1
  },
  {
    'productId': 11,
    'productName': '座充设备（电池版）',
    'productMode': 'XDZ1-002',
    'productType': 7,
    'picUrl': '//img.shenghuozhe.net/shz/2017/03/21/273w_261h_5D7841490086543.png',
    'normalNum': 3,
    'isDevice': 1
  },
  {
    'productId': 12,
    'productName': '座充2G套装(电池版)',
    'productMode': 'Z2-CMCC/B',
    'productType': 7,
    'picUrl': '//lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/06/16/887w_887h_337261497598702.png',
    'normalNum': 5,
    'isDevice': 1
  },
  {
    'productId': 81,
    'productName': '盒子底座',
    'productMode': 'HZ-002',
    'productType': 8,
    'picUrl': 'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/13/500w_500h_03C421499918808.jpg',
    'normalNum': 2,
    'isDevice': 1
  },
  {
    'productId': 90,
    'productName': '充电宝',
    'productMode': 'PW-BANK-001',
    'productType': 9,
    'picUrl': 'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/13/500w_500h_D8C141499918917.jpg',
    'normalNum': 6,
    'isDevice': 1
  }
]

class DeviceList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceInfo: {},
      confirm: true
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('选择已找回设备')
    Style.use()
  }
  componentDidMount () {
    // if (!this.props.userProducts) return router.replace('/bd/device/list?type=4')
    this.setState({

    })
  }
  componentWillReceiveProps (nextProps) {

  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  render () {
    // if (!this.props.userProducts && !this.props.error) {
    //   return <Loading />
    // }
    // if (!this.props.userProducts && this.props.error) {
    //   return <Error>{this.props.error.message || '未知错误'}</Error>
    // }
    return (
      <div className='mydevice'>
        <p>请选择已找回的设备类型和数量 (可多选)</p>
        {userProducts.map((item, i) => {
          { /* {this.props.userProducts && this.props.userProducts.map((item, i) => { */ }
          return <CountInput key={i}
            item={item}
            _add={() => this.props._add(item.productId)}
            _minus={() => this.props._minus(item.productId)}
            _change={() => this.props._change(item.productId)}
          />
        })}
        <p className='title'>遗失原因</p>
        <textarea className='reason' />
        <Button fixed fixedSpace={0} onClick={() => this._submit()}>确认</Button>
      </div>
    )
  }
  _handleAgree () {
    NProgress.start()
  }
  _add (id) {
    console.log(this.state.deviceInfo)
  }

  _minus (id) {
    console.log(this.state.deviceInfo)
  }

  _changeNum (id, val) {
    console.log(this.state.deviceInfo)
  }

}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    fetch: state.bdDeviceLostApplyPage && state.bdDeviceLostApplyPage.fetch,
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

