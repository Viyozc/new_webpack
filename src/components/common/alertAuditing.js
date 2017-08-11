import React, { PureComponent } from 'react'
import Style from './alertAuditing.less'

export default class AlertAuditing extends PureComponent {
  componentWillMount () {
    Style.use()
  }

  componentWillUnmount () {
    Style.unuse()
  }

  render () {
    let isShowClass = this.props.isShowOpc ? 'common-alert-opc-auditing show' : 'common-alert-opc-auditing hide'
    return (
      <div className={isShowClass} onClick={() => this.props.cancel()}>
        <article className='white-wap'>
          <p className="description">
            {this.props.type === 2 ? '要求BD继续安装' : null}
            {this.props.type === 1 ? '确认虚假BD无法安装' : null}
          </p>
          <div className="btns-wap">
            <button className="btn btn-cancel">取消</button>
            {this.props.type === 2 ?
              <button onClick={(e) => this.props.refuse(e)} className="btn-action btn green">确认</button> : null}
            {this.props.type === 1 ?
              <button onClick={(e) => this.props.pass(e)} className="btn-action btn green">确认</button> : null}
          </div>
        </article>
      </div>
    )
  }
}
