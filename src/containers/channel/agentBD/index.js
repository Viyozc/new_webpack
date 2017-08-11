import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Bridge from 'utils/bridge'
import Style from './index.less'
import { Link } from 'components/link'
import Loading from 'components/common/loading'
import Error from 'components/common/error'
import Notfound from 'components/common/notfound'
import Pagination from 'components/common/pagination'
import SelectCity from 'components/common/selectCity'
import Cell from 'components/channel/agentBD/cell'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/channel/agentBD'
import * as commonActions from 'actions/common'
import { Tab } from 'components/common/tabs'
import assign from 'lodash/assign'
import { router } from 'utils'
import Search from 'components/common/search'
import { TabConfig } from 'constants/channel'
import * as sessionStorage from 'utils/sessionStorage'
const PAGE_SIZE = 10
class IndexContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showCity: false
    }
  }

  componentWillMount () {
    Style.use()
  }

  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
    sessionStorage.setItem(`${this.props.location.pathname}_search`, this.props.location.search)
  }

  componentDidMount () {
    Bridge.setNavTitle('BD代理管理')
    !this.props.provincesAndCities && this.props.actions.fetchCity()

    if (sessionStorage.getItem(`${this.props.location.pathname}_search`) !== this.props.location.search) {
      this.props.provincesAndCities && router.replace({
        pathname: this.props.location.pathname,
        query: assign({}, this.props.location.query, {
          provinceCode: this.props.provincesAndCities.provinces[0].cityCode,
          provinceName: this.props.provincesAndCities.provinces[0].cityName,
          cityCode: '0',
          cityName: ''
        })
      })
    }
    if (!this.props.list && this.props.location.query.cityCode && this.props.location.query.provinceCode) {
      this.props.actions.fetchList({
        offset: 0,
        pageSize: PAGE_SIZE,
        cityCode: this.props.location.query.cityCode,
        provinceCode: this.props.location.query.provinceCode
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.provincesAndCities !== nextProps.provincesAndCities) {
      router.replace({
        pathname: nextProps.location.pathname,
        query: assign({}, nextProps.location.query, {
          provinceCode: nextProps.provincesAndCities.provinces[0].cityCode,
          provinceName: nextProps.provincesAndCities.provinces[0].cityName,
          cityCode: '0',
          cityName: ''
        })
      })
      this.props.actions.fetchList({
        offset: 0,
        pageSize: PAGE_SIZE,
        provinceCode: nextProps.provincesAndCities.provinces[0].cityCode,
        cityCode: '0'
      })
    }

    if ((this.props.location.query.provinceCode !== '' && this.props.location.query.cityCode !== '') &&
      this.props.location.query.provinceCode !== nextProps.location.query.provinceCode ||
      this.props.location.query.cityCode !== nextProps.location.query.cityCode) {
      this.props.actions.fetchList({
        offset: 0,
        pageSize: PAGE_SIZE,
        provinceCode: nextProps.location.query.provinceCode,
        cityCode: nextProps.location.query.cityCode
      })
    }

    if (nextProps.list && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }

  render () {
    return (
      <div className='agent-container'>
        <Search onClick={this._search.bind(this)} placeholder={'搜索BD代理'} />
        {this.props.provincesAndCities
          ? <div className='multi-chose clearfix'>
            <div className='float'>
              <button className='select-date' onClick={this._bindChoseCity.bind(this)}>
                {`${this.props.location.query.provinceName || '城市'}${this.props.location.query.cityName || ''}`}
                {this.state.showCity ? <i className='dianfont icon-jiantou' />
                : <i className='dianfont icon-jiantou0101' />}
              </button>
            </div>
          </div>
          : null}
        {this._renderList()}
        {this.state.showCity ? <SelectCity
          options={this.props.provincesAndCities}
          onChose={this._choseCity.bind(this)}
          province={{
            cityCode: parseInt(this.props.location.query.provinceCode),
            cityName: this.props.location.query.provinceName
          }}
          city={{cityCode: parseInt(this.props.location.query.cityCode), cityName: this.props.location.query.cityName}}
          onClose={this._closeCity.bind(this)} /> : null}
        <Link className='button' to='/channel/agentBD/create'>新增BD代理</Link>
      </div>
    )
  }

  _bindChoseCity () {
    this.setState({
      showCity: true
    })
  }

  _choseCity (province, city) {
    this._closeCity()
    router.replace({
      pathname: this.props.location.pathname,
      query: assign({}, this.props.location.query, {
        cityCode: city && city.cityCode,
        cityName: city && city.cityName,
        provinceCode: province && province.cityCode,
        provinceName: province && province.cityName
      })
    })
  }

  _closeCity () {
    this.setState({
      showCity: false
    })
  }

  _renderList () {
    if (!this.props.list && !this.props.error) {
      return <Loading />
    }
    if (!this.props.list && this.props.error) {
      return <Error>{this.props.error.message || '未知错误'}</Error>
    }
    if (this.props.list && this.props.list.length === 0) {
      return <Notfound>暂无代理商</Notfound>
    }
    return (
      <Pagination location={this.props.location} onPaging={() => { this._paging(this.props.list) }}
        data={this.props.list} size={PAGE_SIZE}>
        {
          this.props.list && this.props.list.map((item, i) => {
            return <Cell key={i} {...item} />
          })
        }
      </Pagination>
    )
  }

  _paging (list) {
    this.props.actions.fetchList({
      offset: this.props.list.length,
      pageSize: PAGE_SIZE,
      cityCode: this.props.location.query.cityCode,
      provinceCode: this.props.location.query.provinceCode
    })
  }

  _search (value) {
    router.push('/channel/agentBD/search?keyword=' + value)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    provincesAndCities: state.common && state.common.provincesAndCities,
    list: state.channelAgentBDIndexPage && state.channelAgentBDIndexPage.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, commonActions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
