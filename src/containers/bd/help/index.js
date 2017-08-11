import React, { Component } from 'react'
import Style from './index.less'
import * as Bridge from 'utils/bridge'

class Container extends Component {

  constructor (props){
    super(props)
    this.state={

    }
  }

  componentWillMount () {
    Style.use()
  }

  componentDidMount () {
    Bridge.setNavTitle('帮助中心')
  }

  render () {
    return (
      <div className='data-help'>
        <div className="contract">
          <a href="tel:18667042686" className="contract-phone">18667042686</a>
        </div>
        <div className="question">
          <h1 className="question-title">常见问题</h1>
          {/* 座充 */}
          <div className="question-part">
            <div className="question-part-left">
              <span className="u-txt"><i className="dianfont icon-saomachongdian1" /><br/>座充</span>
            </div>
            <div className="question-part-right">
              <ul className="list">
                <li className="item" onClick={() => {this.state.isShowLine1 ? this.setState({isShowLine1: false}) : this.setState({isShowLine1: true}) }}>
                  <div className="title">
                    <span className="u-txt">今日数据</span>
                    <span className="arrow">
                      {this.state.isShowLine1
                        ? <i className="dianfont icon-shouqi" />
                        : <i className="dianfont icon-zhankai" />
                      }
                    </span>
                  </div>
                  <div className={this.state.isShowLine1 ? "content show" : 'content hide'}>
                    <p className="content-desc">● 当日新安装门店：当前统计日内，新安装的座充设备数，不包含维修设备，不包含今日安装今日回收设备</p>
                    <p className="content-desc">● 当日回收设备数：当前统计日内，所有的产生回收操作的设备数</p>
                    <p className="content-desc">● 当日新安装门店数：当前统计日内，新增门店数，不包含该维修设备的门店，不包含今天安装今日回收门店</p>
                    <p className="content-desc">● 当日回收门店数：当前统计日内，所有的全店设备回收掉的门店数</p>
                  </div>
                </li>
                <li className="item" onClick={() => {this.state.isShowLine2 ? this.setState({isShowLine2: false}) : this.setState({isShowLine2: true}) }}>
                  <div className="title">
                    <span className="u-txt">累计数据</span>
                    <span className="arrow">
                      {this.state.isShowLine2
                        ? <i className="dianfont icon-shouqi" />
                        : <i className="dianfont icon-zhankai" />
                      }
                    </span>
                  </div>
                  <div className={this.state.isShowLine2 ? "content show" : 'content hide'}>
                    <p className="content-desc">● 当日离线设备数：统计当日内，处于安装状态下的设备中离线时长超过18小时的设备总数</p>
                    <p className="content-desc">● 当日在线设备数：统计当日内，处于安装状态下的设备中18小时内有过在线状态的设备总数</p>
                    <p className="content-desc">● 累计安装门店数：截止目前，仍然有安装设备的门店，不包括全店回收的门店</p>
                    <p className="content-desc">● 累计成功订单数：截止目前，所有的成功支付的订单总和（包括回收设备）</p>
                    <p className="content-desc">● 设备日均订单数：统计周期内，平均每天每台设备所产生的订单数。计算方式：P=E(门店的当日成功订单/(门店当日处于安装状态的总设备数+当日回收设备))/自然日天数N</p>
                    <p className="content-desc">● 在线设备日均订单数：计算公式：P=E(当日在线设备/当日处于安装状态的总设备数)/自然日天数N</p>
                    <p className="content-desc">● 回收设备成功订单数：统计周期内，所有的回收设备所产生的成功充电的订单的订单数</p>
                  </div>
                </li>
                <li className="item" onClick={() => {this.state.isShowLine3 ? this.setState({isShowLine3: false}) : this.setState({isShowLine3: true}) }}>
                  <div className="title">
                    <span className="u-txt">绩效指标</span>
                    <span className="arrow">
                      {this.state.isShowLine3
                        ? <i className="dianfont icon-shouqi" />
                        : <i className="dianfont icon-zhankai" />
                      }
                    </span>
                  </div>
                  <div className={this.state.isShowLine3 ? "content show" : 'content hide'}>
                    <p className="content-desc">绩效统计周期：从上个月的26号开始至当前月份的25号结束</p>
                    <p className="content-desc">● 设备日均在线率：E(当日在线设备/当日总设备数)/自然日天数N</p>
                    <p className="content-desc">● 绩效成功订单数：绩效统计周期内，所有的安装设备产生的成功订单，回收设备产生的成功订单，遗失设备产生的回收订单之和</p>
                    <p className="content-desc">● 绩效成功订单数金额：  所有的绩效成功订单所产生的金额</p>
                    <p className="content-desc">● 绩效设备数：绩效统计周期内，所有的回收设备数，已安装设备数，遗失设备数之和</p>
                    <p className="content-desc">● 绩效设备日均订单数：  E(当日绩效成功订单数/当日绩效设备数)/绩效统计周期历经自然天数</p>
                    <p className="content-desc">● 绩效设备日均在线率  绩效统计周期内，E(当日绩效在线设备数/当日绩效总设备数)/绩效统计周期历经自然天数</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* 盒子 */}
          <div className="question-part">
            <div className="question-part-left">
              <span className="u-txt"><i className="dianfont icon-zujiechongdianbao" /><br/>盒子</span>
            </div>
            <div className="question-part-right">
              <ul className="list">
                <li className="item" onClick={() => {this.state.isShowLine4 ? this.setState({isShowLine4: false}) : this.setState({isShowLine4: true}) }}>
                  <div className="title">
                    <span className="u-txt">今日数据</span>
                    <span className="arrow">
                      {this.state.isShowLine4
                        ? <i className="dianfont icon-shouqi" />
                        : <i className="dianfont icon-zhankai" />
                      }
                    </span>
                  </div>
                  <div className={this.state.isShowLine4 ? "content show" : 'content hide'}>
                    <p className="content-desc">
                      ● 当日新安装门店：当前统计日内，新安装的盒子设备数，不包含维修设备，不包含今日安装今日回收设备<br/>
                      ● 当日回收设备数：当前统计日内，所有的产生回收操作的盒子设备数<br/>
                      ● 当日新安装门店数：当前统计日内，新增门店数，不包含该维修盒子设备的门店，不包含今天安装今日回收门店<br/>
                      ● 当日回收门店数：当前统计日内，所有的全店盒子设备回收掉的门店数</p>
                  </div>
                </li>
                <li className="item" onClick={() => {this.state.isShowLine5 ? this.setState({isShowLine5: false}) : this.setState({isShowLine5: true}) }}>
                  <div className="title">
                    <span className="u-txt">累计数据</span>
                    <span className="arrow">
                      {this.state.isShowLine5
                        ? <i className="dianfont icon-shouqi" />
                        : <i className="dianfont icon-zhankai" />
                      }
                    </span>
                  </div>
                  <div className={this.state.isShowLine5 ? "content show" : 'content hide'}>
                    <p className="content-desc">
                      ● 充电宝借出数：	统计范围内，所有充电宝被借出的总次数<br />
                      ● 借出充电宝数：	统计范围内，所有的充电宝被借出的个数<br />
                      ● 充电宝归还数：	统计范围内，所有充电宝被成功归还至盒子的总次数<br />
                      ● 归还充电宝数：	统计范围内，所有的充电宝被成功归还至盒子的总个数<br />
                      ● 设备日均借出次数：	统计周期内，单个盒子设备平均每天充电宝被触发借出事件的频次（包括成功借出和借出失败）<br />
                      ● 设备日均成功借出次数：	统计周期内，单个盒子设备平均每天充电宝被成功借出的频次<br />
                      ● 设备日均借出失败次数：	统计周期内，单个盒子设备平均每天充电宝借出失败的频次<br />
                      ● 设备日均归还次数：	统计周期内，单个盒子设备平均每天充电宝坑位被触发归还事件的频次（包括成功归还和归还失败）<br />
                      ● 设备日均成功归还次数：	统计周期内，单个盒子设备平均每天充电宝被成功归还的频次<br />
                      ● 设备日均借出个数：	统计周期内，单个盒子设备平均每天被触发借出事件的充电宝数量（包括成功借出和借出失败）<br />
                      ● 设备日均成功借出个数：	统计周期内，单个盒子设备平均每天被成功借出的充电宝个数<br />
                      ● 设备日均借出失败个数：	统计周期内，单个盒子设备平均每天被借出失败的充电宝个数<br />
                      ● 设备日均归还个数：	统计周期内，单个盒子设备平均每天触发归还事件的充电宝数量<br />
                      ● 设备日均成功归还个数：	统计周期内，单个盒子设备平均每天被成功归还的充电宝个数<br />
                      ● 设备日均归还失败个数：	统计周期内，单个盒子设备平均每天归还失败的充电宝个数<br />
                      ● 同店归还率：	借出充电宝和归还充电宝在同一门店的订单数/成功借还充电宝的订单总数<br />
                      ● 断网离线设备：	由于wifi或者2g原因而导致的跟服务端断开连接的设备</p>
                  </div>
                </li>
                <li className="item" onClick={() => {this.state.isShowLine6 ? this.setState({isShowLine6: false}) : this.setState({isShowLine6: true}) }}>
                  <div className="title">
                    <span className="u-txt">绩效指标</span>
                    <span className="arrow">
                      {this.state.isShowLine6
                        ? <i className="dianfont icon-shouqi" />
                        : <i className="dianfont icon-zhankai" />
                      }
                    </span>
                  </div>
                  <div className={this.state.isShowLine6 ? "content show" : 'content hide'}>
                    <p className="content-desc" style={{'text-align': 'center'}}>敬请期待</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Container
