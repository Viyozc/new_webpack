import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'components/link'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Icon from 'components/common/icon'
import Button from 'components/common/button'
import SectionComponent from 'components/shop/bdView/section'
import Cell, { Cells, CellBody, CellFooter } from 'components/common/cell'
import Section, { SectionBody } from 'components/common/section'
import Style from 'components/shop/detail.less'
import PreviewImage from 'components/common/previewImage'
import * as actions from 'actions/shop'
import * as Bridge from 'utils/bridge'
import { clean } from 'actions/errorMessage'

class ShopDetailContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      previewImage: false
    }
  }
  componentWillMount () {
    Style.use()
    Bridge.setNavTitle('门店详情')
  }
  componentDidMount () {
    this.props.actions.fetchShopGetByContractId({id: this.props.params.id})
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
        <div className='shop-detail'>
          {this.props.shopInfo ? <SectionComponent sectionType={'installDetail'} index={0} {...this.props.shopInfo} isManager={this.props.shopInfo.role === 'agentSellerManager'} /> : null}
          <Section>
            <SectionBody>
              <Cell>
                <CellBody><p className='bd-title'>BD小二：</p><p className='bd-name'>{this.props.shopInfo.sellerNick}</p></CellBody>
                <CellFooter><a className='tel-phone' href={`tel:${this.props.shopInfo.sellerMobile}`}>{this.props.shopInfo.sellerMobile}</a></CellFooter>
              </Cell>
              {this.props.shopInfo.customServiceName ? <Cell>
                <CellBody><p className='bd-title'>审批客服：</p><p className='bd-name'>{this.props.shopInfo.customServiceName}</p></CellBody>
                <CellFooter><a className='tel-phone' href={`tel:${this.props.shopInfo.customServiceMobile}`}>{this.props.shopInfo.customServiceMobile}</a></CellFooter>
              </Cell> : null}
              {this.props.shopInfo.warehouse ? <Cell>
                <CellBody><p className='bd-title'>仓库：</p><p className='bd-name'>{this.props.shopInfo.warehouse}</p></CellBody>
                <CellFooter><a className='tel-phone' href={`tel:${this.props.shopInfo.warehouseKeeperMobile}`}>{this.props.shopInfo.warehouseKeeperMobile}</a></CellFooter>
              </Cell> : null}
              {this.props.shopInfo.deliverName ? <Cell>
                <CellBody><p className='bd-title'>配送员：</p><p className='bd-name'>{this.props.shopInfo.deliverName}</p></CellBody>
                <CellFooter><a className='tel-phone' href={`tel:${this.props.shopInfo.deliverMobile}`}>{this.props.shopInfo.deliverMobile}</a></CellFooter>
              </Cell> : null}
            </SectionBody>
          </Section>
          <SectionComponent sectionType={'installDetail'} index={1} {...this.props.shopInfo} isManager={this.props.shopInfo.role === 'agentSellerManager'} />
          {this.props.shopInfo.subStatus === 1
            ? <div className='reject-reason'>
              <div className='reject-title'>拒绝原因</div>
              <div className='reject-content'>{this.props.shopInfo.reasonDes}</div>
            </div>
            : null
          }
          {this.props.shopInfo.subStatus === 1 && this.props.shopInfo.auditStatus === 2 && this.props.shopInfo.role === 'agentSeller'
            ? <div>
              <Link className='button' to={'/shops/' + this.props.shopInfo.shopId + '/sign?redo=2&contractId=' + this.props.shopInfo.contractId}>重新申请安装</Link>
            </div>
            : null
          }
          {this.props.shopInfo.subStatus === 0 && this.props.shopInfo.auditStatus === 0 && this.props.shopInfo.role === 'agentSeller'
            ? <div>
              <Link className='button' to={'/shops/' + this.props.shopInfo.shopId + '/sign?redo=1&contractId=' + this.props.shopInfo.contractId}>修改申请安装</Link>
            </div>
            : null
          }
          {(this.props.shopInfo && this.props.shopInfo.subStatus === 3 && this.props.shopInfo.role === 'agentSeller')
          ? <Button to={'/reclaim/bd/' + this.props.shopInfo.shopId + '/device'}>申请收回</Button>
          : null}
          {this.props.shopInfo && this.props.shopInfo.installFinishVoucherPic
            ? <Cells className='shop-cells'>
              <Cell others={{onClick: () => { this._bindInstallImage() }}}>
                <CellBody>
                  <p>纸质签收单</p>
                  <p />
                </CellBody>
                <CellFooter>
                  <Icon name='xuanze iconStyle' />
                </CellFooter>
              </Cell>
            </Cells>
            : null
          }
        </div>
        {
          this.state.previewImage &&
          this.props.shopInfo &&
          this.props.shopInfo.installFinishVoucherPic
          ? <PreviewImage images={[this.props.shopInfo.installFinishVoucherPic]} onClose={() => { this.setState({previewImage: false}) }} />
          : null
        }
      </div>
    )
  }
  _bindInstallImage () {
    this.setState({
      previewImage: true
    })
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanShopBdInstallDetail()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    shopInfo: state.shopBdInstallDetail && state.shopBdInstallDetail.shopInfo
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
