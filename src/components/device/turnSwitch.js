import React, { Component, PropTypes } from 'react'
import Style from './turnSwitch.less'

export default class BindSuccessComponent extends Component {
  static propTypes = {
    value: PropTypes.bool
  }
  componentWillMount () {
    Style.use()
  }
  render () {
    // const text = this.props.value
    //   ? '已打开充电装置'
    //   : '确认设备是否可以正常使用'

    return (
      <div className='turn-switch' {...this.props}>
        <div className='img' style={{backgroundImage: `url(${this.props.value ? '//lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/05/18/200w_200h_BF0291495114455.png' : '//lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/05/18/200w_200h_9BD9F1495114473.png'})`}} />
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
