import React, { Component } from 'react'
import FuncCell from 'components/home/funcCell'

export default class Menu extends Component {
  componentWillMount () {
  }
  render () {
    if (!this.props.data) return null
    let options = this._options(this.props.user, this.props.data, this.props.icons)
    return (
      <div className={`cbody clearfix ${this.props.className}`}>
        {options}
      </div>
    )
  }
  _options (user, data, icons) {
    let options = icons || []
    return options.map((o, i) => {
      if (o.href === '/user/team') {
        o.href = o.href + '?selectedDate=' + new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
      }
      return <FuncCell columns={this.props.columns} back={this.props.data.homeIcon} key={i} title={o.title} img={o.img} badge={o.badge || null} onClick={o.href ? () => this.props.onLocationTo(o.href) : null} />
    })
  }
  componentWillUnmount () {
  }
}
