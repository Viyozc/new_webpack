import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { router } from 'utils'
import * as Bridge from 'utils/bridge'
import assign from 'lodash/assign'
import { clean } from 'actions/errorMessage'
import Notfound from 'components/common/notfound'
import Style from 'components/shop/bdView/companyList.less'
import * as actions from 'actions/shop'

class CompanyContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchValue: ''
    }
  }
  componentWillMount () {
    Bridge.setNavTitle('选择公司名')
    Style.use()
  }
  render () {
    return (
      <div>
        <div className='search-head'>
          <div className='search-input'>
            <div className='search-icon'>
              <i className='dianfont icon-sousuo' />
            </div>
            <input ref='inputKeyword' type='tel' placeholder='请输入手机号' value={this.state.searchValue} onChange={e => this.setState({searchValue: e.target.value})} />
          </div>
          <div className='search-button' onClick={this._search.bind(this)}><span>搜索</span></div>
        </div>
        <div className='search-result'>
          {this._renderList()}
        </div>
      </div>
    )
  }
  _renderList () {
    if (this.props.list && this.props.list.length === 0) {
      return <Notfound>无相关数据</Notfound>
    }
    return this.props.list && this.props.list.map((item, i) => {
      return <div className='li' key={i} onClick={this._choseCompany.bind(this, item)}>
        <p>{item.merchantName}</p>
        <p>{item.mobile}</p>
      </div>
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  _search () {
    if (!this.state.searchValue || this.state.searchValue.length <= 8) return Toast.show('手机号位数太少，要大于8位哦！')
    this.props.actions.fetchFindCompanyList({mobile: this.state.searchValue})
  }
  _choseCompany (company) {
    this.props.actions.saveCompany(company)
    router.goBack()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    list: state.shopCompanyList && state.shopCompanyList.companyList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyContainer)
