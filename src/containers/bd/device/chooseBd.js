import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'

import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/device'
import NProgress from 'utils/nprogress'
import assign from 'lodash/assign'
import Style from './chooseBd.less'
import { router } from 'utils'
let PAGE_SIZE = 20

class ChooseBd extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      selectedId: null
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  componentDidMount () {
    Bridge.setNavTitle('选择小二')
    this.props.actions.fetchGetBds({offset: 0, pageSize: PAGE_SIZE})
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'success') {
      NProgress.done()
      // router.goBack()
    }
    if (nextProps.list && nextProps.error) {
      NProgress.done()
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    if (!this.props.list && !this.props.error) {
      return <Loading />
    }
    if (!this.props.list && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.list && this.props.list.length === 0) {
      return <Notfound>无小二</Notfound>
    }
    return (
      <div>
        <div className='chose-container'>
          <ul>
            <Pagination onPaging={() => { this._paging(this.props.list) }} data={this.props.list} size={PAGE_SIZE}>
              {this.props.list.map((item, i) => <li key={i} onClick={() => this.setState({selectedId: item.id})}>
                <p>{item.nickName}</p>
                {this.state.selectedId === item.id ? <div className='active'><div /></div> : <div className='inactive' />}
              </li>)}
            </Pagination>
          </ul>
        </div>
        <a className='button' href='javascript: void(0)' onClick={() => { this._handleClick() }} >确认选择</a>
      </div>
    )
  }
  _handleClick () {
    if (!this.state.selectedId) return Toast.show('请选择小二')
    router.push('/bd/device/bdApply?bdId=' + this.state.selectedId)
  }
  _paging (list) {
    this.props.actions.fetchGetBds({offset: this.props.list.length, pageSize: PAGE_SIZE})
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.bdExchangePage && state.bdExchangePage.bdList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseBd)
