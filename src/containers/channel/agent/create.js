import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NProgress from 'utils/nprogress'
import { router } from 'utils'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import Input from 'components/common/input'
import Icon from 'components/common/icon'
import Select from 'components/common/select'
import SelectCity from 'components/common/selectCity'
import Cell, { Cells, CellBody, Line, CellFooter } from 'components/common/cell'
import Style from './create.less'
import Loading from 'components/common/loading'
import Error from 'components/common/error'

import * as actions from 'actions/channel/agent'
import * as commonActions from 'actions/common'
import { clean } from 'actions/errorMessage'

const HOLDER_AGENT_NAME = '输入代理商名称'
const HOLDER_ACCOUNT_NAME = '输入结算账号名称'
const HOLDER_ACCOUNT_BY_BANK_CARD = '输入银行卡账号'
const HOLDER_ACCOUNT_BANK = '输入开户行'
const HOLDER_ACCOUNT_BY_ALIPAY = '输入支付宝账号'
const HOLDER_CONTACT_NAME = '输入联系人姓名'
const HOLDER_CONTACT_MOBILE = '输入联系人电话'
const HOLDER_AGENT_ADDRESS = '输入公司地址'
const HOLDER_CITY_CODE = '请选择城市'
const HOLDER_AGENT_LEVEL = '请选择代理级别'

class CreateContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    Style.use()
  }

  componentDidMount () {
    if (this.props.location.query.id) {
      Bridge.setNavTitle('编辑代理商')
    } else {
      Bridge.setNavTitle('添加代理商')
    }
    !this.props.agentLevels && this.props.actions.fetchAgentLevel()
    !this.props.provincesAndCities && this.props.actions.fetchCity()
    if (this.props.location.query.id) this.props.actions.fetchAgentInfo({id: this.props.location.query.id})
  }

  render () {
    if (this.props.location.query.id && (this.props.editInfo && !this.props.editInfo.id) && !this.props.error) {
      return <Loading />
    }
    if (this.props.location.query.id && (this.props.editInfo && !this.props.editInfo.id) && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (!(this.props.provincesAndCities && this.props.agentLevels) && !this.props.error) {
      return <Loading />
    }
    if (!(this.props.provincesAndCities && this.props.agentLevels) && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    return (
      <div className='shop-create'>
        <Cells>
          <Cell icon='dailipingtai cell-icon-color'>
            <CellBody>
              <Input
                type='text'
                ref='agentName'
                className='input'
                placeholder={HOLDER_AGENT_NAME}
                defaultValue={this.props.editInfo.agentName || ''}
                onChange={(e) => this.props.actions.updateAgentInfo(e.target.value, 'agentName')}/>
            </CellBody>
          </Cell>
          <Line />
          <Cell icon='Shape cell-icon-color'>
            <CellBody>
              <Input
                type='text'
                ref='contactName'
                className='input'
                placeholder={HOLDER_CONTACT_NAME}
                defaultValue={this.props.editInfo.contactName || ''}
                onChange={(e) => this.props.actions.updateAgentInfo(e.target.value, 'contactName')}/>
            </CellBody>
          </Cell>
          <Line />
          <Cell icon='Fill cell-icon-color'>
            <CellBody>
              <Input
                type='number'
                ref='contactMobile'
                pattern='[0-9]*'
                className='input'
                placeholder={HOLDER_CONTACT_MOBILE}
                defaultValue={this.props.editInfo.contactMobile || ''}
                onChange={(e) => this.props.actions.updateAgentInfo(e.target.value, 'contactMobile')}/>
            </CellBody>
          </Cell>
          <Line />
          <Cell icon='gongsi cell-icon-color'>
            <CellBody>
              <Input
                type='text'
                ref='agentAddress'
                className='input'
                placeholder={HOLDER_AGENT_ADDRESS}
                defaultValue={this.props.editInfo.agentAddress || ''}
                onChange={(e) => this.props.actions.updateAgentInfo(e.target.value, 'agentAddress')}/>
            </CellBody>
          </Cell>
        </Cells>
        <Cells>
          <Cell icon='iconfont-cardidcopy cell-icon-color'>
            <CellBody>
              <Input
                type='text'
                ref='accountName'
                className={'input'}
                disabled={this.props.location.query.id ? true : false}
                placeholder={HOLDER_ACCOUNT_NAME}
                defaultValue={this.props.editInfo.accountName || ''}
                onChange={(e) => this.props.actions.updateAgentInfo(e.target.value, 'accountName')}/>
            </CellBody>
          </Cell>
          <Line />
          <Cell icon='yinhangqia cell-icon-color'>
            <CellBody>
              <Input
                type='number'
                ref='accountByBankCard'
                className={'input'}
                disabled={this.props.location.query.id ? true : false}
                pattern='[0-9]*'
                placeholder={HOLDER_ACCOUNT_BY_BANK_CARD}
                defaultValue={this.props.editInfo.accountByBankCard || ''}
                onChange={(e) => this.props.actions.updateAgentInfo(e.target.value, 'accountByBankCard')}/>
            </CellBody>
          </Cell>
          <Line />
          <Cell icon='kaihuhang cell-icon-color'>
            <CellBody>
              <Input
                type='text'
                ref='accountBank'
                className={'input'}
                disabled={this.props.location.query.id ? true : false}
                placeholder={HOLDER_ACCOUNT_BANK}
                defaultValue={this.props.editInfo.accountBank || ''}
                onChange={(e) => this.props.actions.updateAgentInfo(e.target.value, 'accountBank')}/>
            </CellBody>
          </Cell>
          <Line />
          <Cell icon='zhifubao cell-icon-color'>
            <CellBody>
              <Input
                type='text'
                ref='accountByAlipay'
                className={'input'}
                disabled={this.props.location.query.id ? true : false}
                placeholder={HOLDER_ACCOUNT_BY_ALIPAY}
                defaultValue={this.props.editInfo.accountByAlipay || ''}
                onChange={(e) => this.props.actions.updateAgentInfo(e.target.value, 'accountByAlipay')}/>
            </CellBody>
          </Cell>
        </Cells>
        <p className='notice'>转账账号至少填写一个，银行卡账号和支付宝账号的结算账号名称必须保持一致。</p>
        <Cells>
          <Cell icon='chengshi cell-icon-color' others={{onClick: (e) => { this._bindChoseCity() }}}>
            <CellBody style={{width: '50%', marginRight: '30px'}}>
              <div
                className='radio-cell'>{this.props.editInfo.city && this.props.editInfo.city.cityName || HOLDER_CITY_CODE}</div>
            </CellBody>
            <CellFooter>
              <Icon name='xuanze iconStyle'/>
            </CellFooter>
          </Cell>
          <Line />
          <Cell icon='mendian cell-icon-color' others={{onClick: (e) => { this._bindChoseAgentLevel(e) }}}>
            <CellBody style={{width: '50%', marginRight: '30px'}}>
              <div
                className='radio-cell'>{this.props.editInfo.agent && this.props.editInfo.agent.key || HOLDER_AGENT_LEVEL}</div>
            </CellBody>
            <CellFooter>
              <Icon name='xuanze iconStyle'/>
            </CellFooter>
          </Cell>
        </Cells>
        <Cells>
          <div className='openinghours '>
            <div className='openinghours-title'>
              <i className='dianfont icon-CombinedShape cell-icon-color'/>
              <span>合作时间</span>
            </div>
            <div className='openinghours-panel'>
              <ul className='openinghours-content'>
                <li>
                  <p className='start'
                     onClick={this._choseStartTime.bind(this)}>{this.props.editInfo.agentStartTime || '选择开始时间'}</p>
                  <p className='to'>至</p>
                  <p className='end'
                     onClick={this._choseEndTime.bind(this)}>{this.props.editInfo.agentEndTime || '选择结束时间'}</p>
                </li>
              </ul>
            </div>
          </div>
        </Cells>
        <a className='button' href='javascript: void(0)' onClick={() => { this._handleClickSave() }}>提交</a>
        {this.state.showCity ? <SelectCity
          needCity
          options={this.props.provincesAndCities}
          onChose={this._choseCity.bind(this)}
          province={this.props.editInfo.province}
          city={this.props.editInfo.city}
          onClose={this._closeCity.bind(this)}/> : null}
        {this.state.showAgentLevel ? <Select
          options={this.props.agentLevels}
          onChose={this._choseAgentLevel.bind(this)}
          selectedValue={this.props.editInfo.agent && this.props.editInfo.agent.value}
          onClose={this._closeAgentLevel.bind(this)}/> : null}
      </div>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.fetch === 'request' && nextProps.fetch === 'success') {
      NProgress.done()
      Toast.show('保存成功')
      setTimeout(() => {
        history.back()
      }, 2000)
    }
    if (this.props.fetch === 'request' && nextProps.fetch === 'failure') {
      NProgress.done()
    }

    if (nextProps.error) {
      Toast.show(nextProps.error.message)
      nextProps.actions.cleanErrorMessage()
    }
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    this.props.actions.cleanEditInfo()
  }

  _handleChangeValue (key, e) {
    let state = {}
    state[key] = e.target.value
    this.setState(state)
  }

  _handleClickSave () {
    let info = this.props.editInfo
    if (!info.agentName) return Toast.show(HOLDER_AGENT_NAME)
    if (!info.accountName) return Toast.show(HOLDER_ACCOUNT_NAME)
    if (!(info.accountByAlipay || (info.accountByBankCard && info.accountBank))) return Toast.show('转账账号至少填写一个')
    if (info.accountByBankCard || info.accountBank) {
      if (!info.accountByBankCard) return Toast.show(HOLDER_ACCOUNT_BY_BANK_CARD)
      if (!info.accountBank) return Toast.show(HOLDER_ACCOUNT_BANK)
    }
    if (!info.contactName) return Toast.show(HOLDER_CONTACT_NAME)
    if (!info.agentName) return Toast.show(HOLDER_AGENT_NAME)
    if (!info.contactMobile) return Toast.show(HOLDER_CONTACT_MOBILE)
    if (!info.agentAddress) return Toast.show(HOLDER_AGENT_ADDRESS)
    if (!info.city || (info.city && info.city.type === 'province')) return Toast.show(HOLDER_CITY_CODE)
    if (!info.agent) return Toast.show(HOLDER_AGENT_LEVEL)
    if (!info.agentStartTime) return Toast.show('请选择开始时间')
    if (!info.agentEndTime) return Toast.show('请选择结束时间')
    if (new Date(info.agentStartTime.split('-').join('/')) > new Date(info.agentEndTime.split('-').join('/'))) return Toast.show('合作时间选择有误')
    NProgress.start()
    info.cityCode = info.city.cityCode
    info.level = info.agent.value
    info.provinceCode = info.province.cityCode
    if (this.props.location.query.id) {
      this.props.actions.fetchUpdateAgent(info)
    } else {
      this.props.actions.fetchSaveAgent(info)
    }
  }

  _bindChoseCity () {
    this.setState({
      showCity: true
    })
  }

  _choseCity (province, city) {
    this._closeCity()
    this.props.actions.updateAgentInfo(province, 'province')
    this.props.actions.updateAgentInfo(city, 'city')
  }

  _closeCity () {
    this.setState({
      showCity: false
    })
  }

  _bindChoseAgentLevel () {
    this.setState({
      showAgentLevel: true
    })
  }

  _choseAgentLevel (value, item) {
    this._closeAgentLevel()
    this.props.actions.updateAgentInfo(item, 'agent')
  }

  _closeAgentLevel () {
    this.setState({
      showAgentLevel: false
    })
  }

  _choseStartTime (index) {
    Bridge.selectTime(true, false, this.props.editInfo.agentStartTime, (response) => {
      if (response.error) return Toast.show(response.error)
      this.props.actions.updateAgentInfo(response.data, 'agentStartTime')
    })
  }

  _choseEndTime (index) {
    Bridge.selectTime(true, false, this.props.editInfo.agentEndTime, (response) => {
      if (response.error) return Toast.show(response.error)
      this.props.actions.updateAgentInfo(response.data, 'agentEndTime')
    })
  }
}

function mapStateToProps (state, ownProps) {
  let provincesAndCities
  let agentLevels
  if (state.common && state.common.provincesAndCities) {
    provincesAndCities = {}
    let cities = assign({}, state.common.provincesAndCities.cities)
    delete cities[0]
    provincesAndCities.cities = cities
    let provinces = [].concat(state.common.provincesAndCities.provinces)
    provinces.shift()
    provincesAndCities.provinces = provinces
  }
  if (state.common && state.common.agentLevels) {
    agentLevels = state.common.agentLevels.filter((item) => (item.value !== 0))
  }
  return {
    error: state.errorMessage,
    provincesAndCities: provincesAndCities,
    agentLevels: agentLevels,
    editInfo: state.channelAgentCreatePage && state.channelAgentCreatePage.editInfo,
    fetch: state.channelAgentCreatePage && state.channelAgentCreatePage.fetch
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
