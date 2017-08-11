import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'components/link'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import SectionComponent from 'components/shop/bdView/exception/section'
import Section, { SectionBody } from 'components/common/section'
import Style from './detail.less'
import Icon from 'components/common/icon'
import * as actions from 'actions/shop'
import * as Bridge from 'utils/bridge'
import { clean } from 'actions/errorMessage'

class ExceptionDetailContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('异常详情')
  }
  componentDidMount () {
    this.props.actions.fetchShopExceptionGetById({id: this.props.params.id})
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.shopInfo) {
      Bridge.setNavTitle(nextProps.shopInfo.shopName)
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
        <div className='shop-detail exception-detail'>
          {this.props.shopInfo ? <SectionComponent {...this.props.shopInfo} /> : null}
          <Section>
            <SectionBody>
              <p className='device-title'>设备状态</p>
              <ul className='device-status'>
                {this.props.shopInfo.objectVO.deviceStatusVOs && this.props.shopInfo.objectVO.deviceStatusVOs.map((item, i) => {
                  return <li key={i}><p>{item.lastUpdateTime}</p><p>{item.statusLabel}</p></li>
                })}
              </ul>
            </SectionBody>
          </Section>
          <Section>
            <SectionBody>
              <div className='address'>
                <p>安装地址</p>
                <p>{this.props.shopInfo.objectVO.address}</p>
              </div>
              <Icon name='location' />
            </SectionBody>
          </Section>
          {this.props.shopInfo.status === 0 ? <Link className='button' to={'/exception/' + this.props.shopInfo.id + '/reason'} >填写处理结果</Link> : null}
        </div>
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanShopExceptionDetail()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    shopInfo: state.shopExceptionDetail && state.shopExceptionDetail.shopInfo
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExceptionDetailContainer)
