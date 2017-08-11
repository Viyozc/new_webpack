import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Style from './device.less'
import * as Bridge from 'utils/bridge'
import { router, params } from 'utils'
import assign from 'lodash/assign'
import * as actions from 'actions/reclaim/'
import { clean } from 'actions/errorMessage'

class DeviceContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: null,
      reason: ''
    }
  }
  componentDidMount () {
    Bridge.setNavTitle('选择回收原因')
    this.props.actions.fetchGetReclaimBdReasons()
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    clearTimeout(this._timer)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    return <div className='install-next-form'>
      <ul>
        {
          this.props.reasons && this.props.reasons.map((o, i) => {
            return <li onClick={this._bindSelectOption.bind(this, o.key)} key={i}>{o.value}<span className={`radio ${this.state.selectedIndex === o.key ? 'selected' : ''}`} /></li>
          })
        }
      </ul>
      <textarea rows='4' placeholder='请填写原因' value={this.state.otherValue} onChange={this._bindChangeTextarea.bind(this)} />
      <a className='button' href='javascript: void(0)' onClick={() => { this._triggerSubmit() }} >提交</a>
    </div>
  }
  _bindSelectOption (id) {
    if (this.state.selectedIndex === id) {
      this.setState({
        selectedIndex: null
      })
    } else {
      this.setState({
        selectedIndex: id
      })
    }
  }
  _bindChangeTextarea (e) {
    this.setState({
      reason: e.target.value
    })
  }
  _triggerSubmit () {
    if (this.state.selectedIndex === null) return Toast.show('请选择拒绝原因')
    router.push(`/reclaim/${this.props.params.id}/device?${params({option: this.state.selectedIndex,
      optionDes: this.state.reason})}`)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    reasons: state.reclaimBdDevice && state.reclaimBdDevice.reasons
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
