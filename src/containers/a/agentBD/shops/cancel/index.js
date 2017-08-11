import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import { router } from 'utils'
import Style from './index.less'
import * as Bridge from 'utils/bridge'
import * as actions from 'actions/a/agentBD/shops/cancel'
import * as optionActions from 'actions/option'
import { clean } from 'actions/errorMessage'

class CancelSignContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: -1,
      option: -1,
      reasonTxt: ''
    }
  }

  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('无法签约原因')
    this.props.actions.getOptions(11)
  }

  componentDidMount () {
  }

  render () {
    if (!this.props.options && !this.props.error) {
      return <Loading />
    }
    if (!this.props.options && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div className='cancel-sign'>
        <ul className='chose-reason'>
          {this.props.options.length > 0 && this.props.options.map((item, i) => {
            return <li key={i} className={this.state.activeIndex === i ? 'line active' : 'line normal'}
              onClick={(e) => this._choseReason(e, i, item.key)}>
              <label className='txt'>{item.value}</label>
              <span className='point'><i className='circle-out'><i className='circle-inside' /></i></span>
            </li>
          })}

          <li className='line'>
            <textarea placeholder='请填写原因' value={this.state.reasonTxt || ''} onChange={(e) => this._onReasonTxt(e)}
              className='write-reason' />
          </li>
        </ul>
        <div className='btns'>
          <button onClick={(e) => this._confirm(e)} className='btn-save'>保存</button>
        </div>
      </div>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.submitStatus === 'request' && nextProps.submitStatus === 'success') {
      Toast.show('提交成功')
      setTimeout(() => {
        router.goBack()
      }, 2000)
    }
    if (nextProps.error) {
      return Toast.show(nextProps.error.message)
    }
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }

  _choseReason (e, i, key) {
    this.setState({
      activeIndex: i,
      option: key
    })
  }

  _onReasonTxt (e) {
    this.setState({
      reasonTxt: e.target.value
    })
  }

  _confirm (e) {
    if (this.state.option === -1) {
      return Toast.show('请选择无法签约原因')
    }
    if (parseInt(this.state.option) === 0 && this.state.reasonTxt === '') {
      return Toast.show('请输入无法签约原因')
    }
    this.props.actions.cancelSign({
      id: this.props.params.id,
      option: this.state.option,
      optionDes: this.state.reasonTxt
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    options: state.resultOptions && state.resultOptions.opts,
    submitStatus: state.agentBDCancelSign && state.agentBDCancelSign.submitStatus
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, optionActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelSignContainer)
