import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Style from './description.less'
import { clean } from 'actions/errorMessage'

class DescriptionContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {}
  }

  componentWillMount () {
    Style.use()
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }

  componentDidMount () {
    Bridge.setNavTitle('使用说明')
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    return (
      <div className='description'>
        <p>设备考核周期：设备安装成功后30天；</p>
        <p>达标的定义：30天内订单数大于等于10笔；</p>
        <div className='panel'>
          <p>本月达标设备数</p>
          <p className='child'>1、本数值主要为本月可拿到提成的有效设备数；</p>
          <p className='child'>2、提成计算是按照考核周期最后一天所在月份；</p>
          <p className='child'>PS：例如1月1日安装的设备，考核周期最后一天为1月31日，即在1月份计算提成；1月2日安装的设备，考核周期最后一天为2月1日，即在2月份计算提成；</p>
          <p className='child'>3、设备在考核周期内订单大于等于10笔的设备数；</p>
        </div>
        <div className='panel'>
          <p>本月未达标设备数</p>
          <p className='child'>1、在考核周期内订单未达到10笔的设备数；</p>
          <p className='child'>2、此设备数无提成；</p>
        </div>
        <div className='panel'>
          <p>本月订单数</p>
          <p className='child'>1、在考核周期内已产生的订单总数；</p>
        </div>
        <div className='panel'>
          <p>下月达标设备数</p>
          <p className='child'>1、本数值主要为下月可拿到提成的有效设备数；</p>
          <p className='child'>2、已成功安装设备，虽未过考核周期，但订单已达标；</p>
        </div>
        <div className='panel'>
          <p>下月未达标设备数</p>
          <p className='child'>1、本数值为重点关注运营指标；</p>
          <p className='child'>2、还在考核周期内，但订单笔数还未到达10笔；</p>
          <p className='child'>3、需要重点跟进；</p>
        </div>
        <div className='panel'>
          <p>下月订单数</p>
          <p className='child'>1、未过考核周期已产生的订单总数；</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      cleanErrorMessage: clean
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionContainer)
