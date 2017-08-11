import React, { Component, PropTypes } from 'react'
import Style from './table.less'

export default class Table extends Component {
  static propTypes = {
    data: PropTypes.array,
    labels: PropTypes.array
  }
  componentWillMount () {
    Style.use()
  }
  render () {
    if (!this.props.data || !this.props.data.length) return null
    return (
      <table className='dian-table'>
        <thead>
          <tr>
            { this.props.labels.map((label, i) => <th key={i}>{label}</th>) }
          </tr>
        </thead>
        <tbody>
          { this.props.data.map(this._renderTR.bind(this)) }
        </tbody>
      </table>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
  _renderTR (data, key) {
    let tds = []
    for (let i = 0; i < this.props.labels.length; i++) {
      tds.push(<td key={i}>{data[i]}</td>)
    }
    return <tr key={key} onClick={this._handleClickTR.bind(this, data, key)}>{tds}</tr>
  }
  _handleClickTR (item, i) {
    this.props.onClickTR && this.props.onClickTR(item, i)
  }
}
