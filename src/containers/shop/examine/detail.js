import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'components/link'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import Status from 'components/common/status'
import NProgress from 'utils/nprogress'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import SectionComponent from 'components/shop/examine/section'
import Cell, { CellBody, CellFooter } from 'components/common/cell'
import Section, { SectionBody } from 'components/common/section'
import Style from './detail.less'
import * as actions from 'actions/shop'
import * as Bridge from 'utils/bridge'
import { clean } from 'actions/errorMessage'

class ExamineDetailContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSuccess: false
    }
  }
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('审批详情')
  }
  componentDidMount () {
    this.props.actions.fetchShopExamineGetById({id: this.props.params.id})
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.shopInfo) {
      Bridge.setNavTitle(nextProps.shopInfo.shopName)
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
      this.setState({showSuccess: true})
      this._timer = setTimeout(() => {
        this.setState({showSuccess: false})
        location.reload()
      }, 1000)
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }
    if (nextProps.shopInfo && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    if (!this.props.shopInfo && !this.props.error) {
      return <Loading />
    }
    if (!this.props.shopInfo && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div>
        <div className='shop-detail examine-detail'>
          {this.props.shopInfo ? <SectionComponent index={0} {...this.props.shopInfo} /> : null}
          <SectionComponent index={1} {...this.props.shopInfo} />
          {this.props.shopInfo.status === 1
            ? <div className='reject-reason'>
              <div className='reject-title'>拒绝原因</div>
              <div className='reject-content'>{this.props.shopInfo.reasonDes}</div>
            </div>
            : null
          }
          <Section>
            <SectionBody>
              <Cell>
                <CellBody><p className='bd-title'>BD小二：</p><p className='bd-name'>{this.props.shopInfo.bdName}</p></CellBody>
                <CellFooter><a className='tel-phone' href={`tel:${this.props.shopInfo.bdMobile}`}>{this.props.shopInfo.bdMobile}</a></CellFooter>
              </Cell>
            </SectionBody>
          </Section>
          {this.props.shopInfo.status === 0
            ? <div>
              <a className='button prev-button' href='javascript: void(0)' onClick={this._bindApprovalSuccess.bind(this)} >同意</a>
              <Link className='button' to={'/shop/examine/' + this.props.shopInfo.id + '/reason'} >拒绝</Link>
            </div>
            : null
          }
        </div>
        {this.state.showSuccess ? <Status status='success' content='提交成功' /> : null}
      </div>
    )
  }
  _bindApprovalSuccess () {
    NProgress.start()
    this.props.actions.fetchShopExamineApprovalSuccess({id: this.props.shopInfo.id})
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanShopExamineDetail()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    shopInfo: state.shopExamineDetail && state.shopExamineDetail.shopInfo,
    fetch: state.shopExamineDetail && state.shopExamineDetail.fetch
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamineDetailContainer)
