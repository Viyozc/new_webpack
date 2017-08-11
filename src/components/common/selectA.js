import React, { Component } from 'react'
import Style from './selectA.less'
import _ from 'lodash'
export default class SelectAComponent extends Component {
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
    let selectedValue = this.props.selectedValue
    selectedValue = this.props.multiple ? selectedValue : [selectedValue]
    let liNode
    switch (parseInt(this.props.model)) {
      case 1:
        liNode = this.props.options && this.props.options.map((option, i) => {
          return <li key={i} onClick={this.props.onChose.bind(this, option.value)}>
            {_.includes(selectedValue, option.value) ? <div className='model1-check active'><i className='dianfont icon-gou' /></div> : <div className='model1-check' />}
            <p className='model1-value'>{option.key}</p>
            <p className='model1-sub-value'>{option.subKey}</p>
          </li>
        })
        break
      case 2:
        liNode = this.props.options && this.props.options.map((option, i) => {
          return <li key={i} onClick={this.props.onChose.bind(this, option.value)}>
            <div className={_.includes(selectedValue, option.value) ? 'model2-check active' : 'model2-check'}>
              <p>{option.key}</p>
              {this.props.color
                ? <p style={{color: this.props.color}}>{parseInt(option.subKey) === 1 ? '需主管审核' : null}</p>
                : <p>{option.subKey}</p>
              }
            </div>
          </li>
        })
    }
    return (
      <ul className='select'>
        {liNode}
      </ul>
    )
  }
}
