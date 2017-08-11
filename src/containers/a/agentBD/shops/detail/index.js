import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Section, { SectionBody } from 'components/common/section'
import Cell, { CellBody, CellFooter } from 'components/common/cell'
import SectionComponent from 'components/a/agentBD/shops/detail/section'
import Style from 'components/a/agentBD/shops/detail/detail.less'
import * as actions from 'actions/a/agentBD/shops/detail'
import * as Bridge from 'utils/bridge'
import { clean } from 'actions/errorMessage'
// import { router } from 'utils'

class ShopDetailContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowOpc: false,
      isShowRepairOpc: false
    }
  }

  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('安装详情')
  }

  componentDidMount () {
    this.props.actions.fetchShopGetById({id: this.props.params.id})
  }

  componentWillReceiveProps (nextProps) {
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
        <div className='shop-detail'>
          {this.props.shopInfo
            ? <SectionComponent sectionType={'shopDetail'} index={0} {...this.props.shopInfo} />
            : null
          }
          <Section>
            <SectionBody>
              <Cell>
                <CellBody><p className='bd-title'>代理BD：{this.props.shopInfo.bdAgentName}</p></CellBody>
                <CellFooter><a className='tel-phone' href={`tel:${this.props.shopInfo.bdAgentMobile}`}>{this.props.shopInfo.bdAgentMobile}</a></CellFooter>
              </Cell>
            </SectionBody>
          </Section>
          <div className='install-address'>
            <label className='title'>安装地址：</label>
            <br />
            <p className='desc' onClick={() => this._openLocation()}>
              {this.props.shopInfo && this.props.shopInfo.address}<i className='dianfont icon-location' />
            </p>
          </div>
          {parseInt(this.props.shopInfo.status) === 3 ? <div className='install-address'>
            <label className='title'>无法安装原因：</label>
            <br />
            <p className='desc'>
              {this.props.shopInfo && this.props.shopInfo.unableInstallReason}
            </p>
          </div> : null}
          {parseInt((this.props.shopInfo.status) === 4 || parseInt(this.props.shopInfo.status) === 5) ? <div className='install-address'>
            <label className='title'>回收原因：</label>
            <br />
            <p className='desc'>
              {this.props.shopInfo && this.props.shopInfo.unableInstallReason}
            </p>
          </div> : null}
        </div>
      </div>
    )
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanShopDetail()
  }

  _goInstall () {
    this.setState({
      isShowOpc: true
    })
  }

  _testDevice () {
    this.setState({
      isShowRepairOpc: true
    })
  }

  _openLocation () {
    this.props.shopInfo && Bridge.map({
      longitude: this.props.shopInfo.poiLongitude,
      latitude: this.props.shopInfo.poiLatitude,
      name: this.props.shopInfo.shopName,
      address: this.props.shopInfo.address
    })
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    shopInfo: state.agentBDShopDetail && state.agentBDShopDetail.shopInfo
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetailContainer)
