import React, { Component } from 'react'
import Style from './confirm.less'

export default class Confirm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: true
    }
  }
  componentDidMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    let {cancelDo, okDo} = this.props
    return (
      <div className='confirm-modal'>
        <div className='info-panel'>
          <p>{this.props.title || '是否确认'}</p>
          <div>
            <span onClick={() => { cancelDo && cancelDo() }}>{this.props.cancelButton || '取消'}</span>
            <span onClick={() => { okDo && okDo() }}>{this.props.okButton || '确认'}</span>
          </div>
        </div>
      </div>
    )
  }
  _cancel () {

  }
}
