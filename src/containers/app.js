import React, { Component } from 'react'
import ChooseIdentity from './chooseIdentity.js'
import * as Bridge from 'utils/bridge'

export default class App extends Component {
  componentDidMount () {
    Bridge.setLogout()
  }
  render () {
    return this.props.children || <ChooseIdentity />
  }
}
