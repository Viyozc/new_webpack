import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/shop/allocate'
import NProgress from 'utils/nprogress'
import assign from 'lodash/assign'
import Style from './chose.less'
import { router } from 'utils'

class ChoseContainer extends Component {
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
    this.props.actions.fetchChoseList()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'success') {
      NProgress.done()
      router.goBack()
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
      <div className='chose-container'>
        <ul>
          {this.props.list.map((item, i) => <li key={i} onClick={() => this.setState({selectedId: item.id})}>
            <p>{item.nickName}</p>
            {this.state.selectedId === item.id ? <div className='active'><div /></div> : <div className='inactive' />}
          </li>)}
        </ul>
        <a className='button' href='javascript: void(0)' onClick={() => { this._handleClickSave() }} >确认选择</a>
      </div>
    )
  }
  _handleClickSave () {
    if (!this.state.selectedId) return Toast.show('请选择小二')
    NProgress.start()
    this.props.actions.fetchChoseSaveBd({sellerId: this.state.selectedId, shopIds: this.props.location.query.shopIds})
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.shopAllocateChosePage && state.shopAllocateChosePage.list,
    fetchRequest: state.shopAllocateChosePage && state.shopAllocateChosePage.fetchRequest

  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoseContainer)
