import React, { PureComponent } from 'react'
import Style from './bdList.less'
import assign from 'lodash/assign'

export default class BDListModal extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      BDM: props.selectedBDM,
      BD: props.selectedBD
    }
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
          <div className='head'>
            <button className='cancel-button' onClick={this.onClose.bind(this)}>取消</button>
            <button className='ok-button' onClick={this._bindSubmit.bind(this)}>确定</button>
          </div>
          <div className='content clearfix'>
            <ul className='left'>
              <li style={{color: '#26C541'}}>所有BDM</li>
              {this.props.options && this.props.options.map((item, i) => {
                return <li key={i} className={this.state.BDM === item.id ? 'active' : null} onClick={this.onChoseBDM.bind(this, item.id)}>{item.name}</li>
              })}
            </ul>
            <ul className='right'>
              <li style={{color: '#26C541'}}>所有BD</li>
              {this.props.options.some(item => item.id === this.state.BDM) && this.props.options.filter(item => item.id === this.state.BDM)[0].bds.map((item, i) => {
                return <li key={i} className={this.state.BD && this.state.BD === item.id ? 'active' : null} onClick={this.onChoseBD.bind(this, item.id)}>{item.name}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  onChoseBDM (val) {
    this.setState({BDM: val})
  }
  onChoseBD (val) {
    this.setState({BD: val})
  }
  _bindSubmit () {
    this.props.onChose(this.state.BDM, this.state.BD)
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
BDListModal.defaultProps = {
  shopSubType: {},
  shopType: {}
}
