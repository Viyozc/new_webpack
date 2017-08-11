import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Dialog from 'components/common/dialog'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/shop/chooseBD'
import NProgress from 'utils/nprogress'
import assign from 'lodash/assign'
import Style from './chooseBD.less'
import { router } from 'utils'

class ChoseContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      selectedId: null,
      showDialog: false,
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
    this.props.actions.getSellerList({shopIds: this.props.location.query.shopIds})
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.fetchRequest === 'request' && nextProps.fetchRequest === 'success') {
      this.setState({showDialog: false});
      Toast.show('更换成功')
      setTimeout(function(){
        NProgress.done()
        router.goBack()
      }, 1000)
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
    const {shopIds, shopName} = this.props.location.query
    const count = shopIds.split(',').length;
    return (
      <div className='chose-container'>
        <ul>
          {this.props.list.map((item, i) => <li key={i} onClick={() => this.setState({selectedId: item.id, nickName: item.nickName})}>
            <p>{item.nickName}</p>
            {this.state.selectedId === item.id ? <div className='active'><div /></div> : <div className='inactive' />}
          </li>)}
        </ul>
        <a className='button' href='javascript: void(0)' onClick={() => { this._handleClickSave() }} >确认选择</a>
        {
          this.state.showDialog 
          ? 
          <Dialog onCancel={this._cancel.bind(this)} onConfirm={this._Confirm.bind(this)} >
            <p>是否要将{shopName}等{count}个门店的员工</p>
            <p>更换为{this.state.nickName}</p>
          </Dialog>
          :null
        }
        
      </div>
    )
  }
  _handleClickSave () {
    if (!this.state.selectedId) return Toast.show('请选择小二')
    this.setState({showDialog: true});  
  }
  _cancel () {
    this.setState({showDialog: false});
  }
  _Confirm () {
    NProgress.start()
    this.props.actions.setShopAllocate({sellerId: this.state.selectedId, shopIds: this.props.location.query.shopIds})
  }
}
function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.shopChooseBD.list,
    fetchRequest: state.shopChooseBD.success,
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
