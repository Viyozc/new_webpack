import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import { router } from 'utils'
import * as Bridge from 'utils/bridge'
import { Link } from 'components/link'

import Loading from 'components/common/loading'
import Error from 'components/common/error'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/a/count'

import Style from './index.less'

class CountContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
  }

  componentWillMount () {
    Style.use()
    this.props.actions.getCount()
  }

  componentDidMount () {
    Bridge.setNavTitle('我的账户')
  }

  render () {
    if (!this.props.data && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (!this.props.data) {
      return <Loading />
    }

    let homeData = this.props.data
    return (
      <div className='agent-count'>
        <article className='info'>
          <span className='left'>
            <span className='title'>余额账户（元）</span>
            <span className='money'>{parseFloat(homeData.balanceAccount).toFixed(2)}</span>
            <Link to={'/a/count/record?activeTab=-1'} className='btn-see-detail'>查看收支明细<i
              className='dianfont icon-xuanze' /></Link>
          </span>
          <span className='right'>
            <Link className='cash' to='/a/count/cash?activeTab=1'>提现</Link>
          </span>
        </article>
        <ul className='action'>
          <li className='line clearfix'
            onClick={() => { router.push('/a/count/cash/record') }}>
            <i className='dianfont icon-CombinedShape1' />
            <label className='title'>提现记录</label>
            <i className='dianfont icon-xuanze' />
          </li>
          <li className='line clearfix' onClick={() => { router.push('/a/count/cash/manage') }}>
            <i className='dianfont icon-qian' />
            <label className='title'>代理费管理</label>
            <i className='dianfont icon-xuanze' />
          </li>
          <li className='line clearfix' onClick={() => { router.push('/a/count/help') }}>
            <i className='dianfont icon-bangzhu1' />
            <label className='title'>帮助中心</label>
            <i className='dianfont icon-xuanze' />
          </li>
          <li className='line clearfix'>
            <i className='dianfont icon-Fill' />
            <label className='title'>联系渠道经理</label>
            <span className='source-manager'>{homeData.sourceManager}<a className='phone'
              href={`tel:${homeData.managerMobile}`}>{homeData.managerMobile}</a></span>
          </li>
        </ul>
      </div>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }

  componentWillUnmount () {
    this.props.actions.cleanErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    data: state.agentCount.myCount
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountContainer)
