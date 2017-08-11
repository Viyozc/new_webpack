import React, { Component } from 'react'
import Loading from './loading'
import Error from './error'

export default class Root extends Component {
  render () {
    if (this.props.loading) {
      return <Loading />
    }
    if (this.props.errorMessage) {
      return <Error>{this.props.errorMessage}</Error>
    }

    return <div className={this.props['className']}>{this.props.children}</div>
  }
}
