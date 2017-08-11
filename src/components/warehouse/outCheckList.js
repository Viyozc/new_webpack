import React, { Component } from 'react'

export default class CheckList extends Component {
  render () {
    const detail = this.props.detail
    return <div className='check-outer' onClick={this.props.hideCheckList}>
      <div className='check-inner'>
        {
            detail
            ? <div>
              <p>配货</p>
              <table>
                <thead>
                  <tr>
                    {detail.detail.map((o, i) => {
                      return <th key={i}>{o.name}</th>
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {detail.detail.map((o, i) => {
                      return <td key={i}>{o.count}</td>
                    })}
                  </tr>
                </tbody>
              </table>
              <button onClick={this.props.onCheck}>确认配货</button>
            </div>
            : <p>获取详情中...</p>
          }
      </div>
    </div>
  }
}
