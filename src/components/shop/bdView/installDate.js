import React, { Component } from 'react'
import Style from './installDate.less'

export default class InstallDateComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  render () {
    return (
      <div className='modal-background' onClick={this.onClose.bind(this)}>
        <div className='container' onClick={this.onStopPropagation.bind(this)}>
          <div className='content clearfix'>
            {this.props.list && this.props.list.map((item, i) => {
              return <div
                key={i}
                onClick={item.idle ? this._submit.bind(this, item.date) : null}
                className={item.idle ? (this.props.selected === item.date ? 'li active' : 'li') : 'li disabled'}>
                {item.date}
              </div>
            })}
          </div>
        </div>
      </div>
    )
  }
  _submit (installDate) {
    this.props.onSelectInstallDate(installDate)
  }
  onClose (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onClose()
  }
  onStopPropagation (e) {
    e.stopPropagation()
    e.preventDefault()
  }
}
