import React, { Component } from 'react'

export default class CheckList extends Component {
  render () {
    const repairDetail = this.props.repairDetail
    return <div className='check-outer' onClick={this.props.hideCheckList}>
      <div className='check-inner'>
        {
            repairDetail
            ? <div>
              <p>配货</p>
              <table>
                <thead>
                  <tr>
                    {repairDetail.products[1] ? <th>设备数量(不带电池版)</th> : null}
                    {repairDetail.products[7] ? <th>设备数量(带电池版)</th> : null}
                    {repairDetail.products[2] ? <th>电源数量</th> : null}
                    {repairDetail.products[3] ? <th>线缆数量</th> : null}
                    {repairDetail.products[4] ? <th>螺丝数量</th> : null}
                    {repairDetail.products[5] ? <th>适配器数量</th> : null}
                    {repairDetail.products[6] ? <th>餐牌数量</th> : null}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {repairDetail.products[1] ? <td>{repairDetail.products[1]}</td> : null}
                    {repairDetail.products[7] ? <td>{repairDetail.products[7]}</td> : null}
                    {repairDetail.products[2] ? <td>{repairDetail.products[2]}</td> : null}
                    {repairDetail.products[3] ? <td>{repairDetail.products[3]}</td> : null}
                    {repairDetail.products[4] ? <td>{repairDetail.products[4]}</td> : null}
                    {repairDetail.products[5] ? <td>{repairDetail.products[5]}</td> : null}
                    {repairDetail.products[6] ? <td>{repairDetail.products[6]}</td> : null}
                  </tr>
                </tbody>
              </table>
              <p>库存</p>
              <table>
                <thead>
                  <tr>
                    {repairDetail.products[1] ? <th>设备数量(不带电池版)</th> : null}
                    {repairDetail.products[7] ? <th>设备数量(带电池版)</th> : null}
                    {repairDetail.products[2] ? <th>电源数量</th> : null}
                    {repairDetail.products[3] ? <th>线缆数量</th> : null}
                    {repairDetail.products[4] ? <th>螺丝数量</th> : null}
                    {repairDetail.products[5] ? <th>适配器数量</th> : null}
                    {repairDetail.products[6] ? <th>餐牌数量</th> : null}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {repairDetail.products[1] ? <td>{repairDetail.stockCounts[1]}</td> : null}
                    {repairDetail.products[7] ? <td>{repairDetail.stockCounts[7]}</td> : null}
                    {repairDetail.products[2] ? <td>{repairDetail.stockCounts[2]}</td> : null}
                    {repairDetail.products[3] ? <td>{repairDetail.stockCounts[3]}</td> : null}
                    {repairDetail.products[4] ? <td>{repairDetail.stockCounts[4]}</td> : null}
                    {repairDetail.products[5] ? <td>{repairDetail.stockCounts[5]}</td> : null}
                    {repairDetail.products[6] ? <td>{repairDetail.stockCounts[6]}</td> : null}
                  </tr>
                </tbody>
              </table>
              <button onClick={this.props.onCheck}>确认配货</button>
            </div>
            : <p>获取库存中...</p>
          }
      </div>
    </div>
  }
}
