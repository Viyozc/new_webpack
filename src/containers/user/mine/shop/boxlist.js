import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import { router } from 'utils'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/user/mine/shop'
import Style from './boxlist.less'

class DeviceContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      tabStatus: parseInt(this.props.location.query.activeTab)
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentDidMount () {
    Bridge.setNavTitle('充电宝列表')
    this.props.actions.fetchGetPwobankList({boxId: this.props.params.boxId})
  }
  render () {
    if (!this.props.powerbankList && !this.props.error) {
      return <Loading />
    }
    return (
      <div className='container-box'>
        <div className='title clearfix'>
          <div>设备编号</div>
          <div>累计使用时间</div>
          <div>累积使用次数</div>
          <div>平均使用时长</div>
          <div>累积使用金额</div>
        </div>
        <table>
          <tbody>
            {
              this.props.powerbankList && this.props.powerbankList.map((item, i) => {
                return <tr key={i}>
                  <td>
                    <div key={-1}>{item.powerBankNo}</div>
                    {
                      Number(item.battery) >= 4100 ? <div key={i}><span className='green'>可用</span></div> : <div key={i}><span className='red'>充电中</span></div>
                    }
                  </td>
                  <td>{item.useTime}</td>
                  <td>{item.useCount}</td>
                  <td>{item.avgUseTime}</td>
                  <td>{item.payAmount}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}
function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    powerbankList: state.userMineShopDevice && state.userMineShopDevice.powerbankList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceContainer)
