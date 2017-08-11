import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import MapComponent from 'components/common/map/'
import InfoWindowComponent from 'components/common/map/infoWindow'
import Select from 'components/common/select'
import { resetErrorMessage } from 'actions/errorMessage'
import * as actions from 'actions/shop/position'
import { QQ_MAP_KEY } from 'constants'
import Styles from './position.less'

class PositionContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedMark: null,
      showSelectCity: false,
      currentCity: null
    }
  }
  componentWillMount () {
    Styles.use()
  }
  componentDidMount () {
    this.props.actions.fetchCities()
  }
  render () {
    return (
      <div className='map-container'>
        {this.props.cities ? <button className='select-city' onClick={this._bindChoseCity.bind(this)}>
          {this.state.currentCity && this.state.currentCity.key}
          {this.state.showSelectCity ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
        </button> : null}
        <MapComponent
          ref='map'
          latitude={this.props.poi && this.props.poi.latitude}
          longitude={this.props.poi && this.props.poi.longitude}
          curLatitude={this.props.currentPoi && this.props.currentPoi.latitude}
          curLongitude={this.props.currentPoi && this.props.currentPoi.longitude}
          zoomInit={this.props.poi && this.props.poi.zoomInit}
          markers={this.props.markers}
          openMarker={this._openMarker.bind(this)}
          onDragMap={this._onDrag.bind(this)}
          onPoiChange={this._handleChangeLocation.bind(this)} />
        {this.state.selectedMark ? <InfoWindowComponent onNavigation={this._handleClickNavigation.bind(this)} options={this.state.selectedMark} /> : null}
        {this.state.showSelectCity
          ? <Select
            options={this.props.cities}
            onChose={this._choseCity.bind(this)}
            selectedValue={this.state.currentCity.value}
            onClose={this._closeCity.bind(this)} />
          : null
        }
      </div>
    )
  }
  _bindChoseCity () {
    this.setState({
      showSelectCity: true
    })
  }
  _choseCity (value) {
    this._closeCity()
    for (let index in this.props.cities) {
      if (this.props.cities[index].value === value) {
        this.setState({
          currentCity: this.props.cities[index]
        })
        this.props.actions.fetchWaitInstallShops(this.props.cities[index].value)
      }
    }
  }
  _closeCity () {
    this.setState({
      showSelectCity: false,
      selectedMark: null
    })
  }
  _onDrag () {
    this.setState({selectedMark: null})
  }
  _openMarker (shop) {
    this.setState({selectedMark: shop})
  }
  _handleClickNavigation (option) {
    if (!window.WebViewJavascriptBridge && !window.WVJBCallbacks) {
      location.href = `//apis.map.qq.com/tools/routeplan/eword=${option.shopName}&epointx=${option.poiLongitude}&epointy=${option.poiLatitude}?referer=dian&key=${QQ_MAP_KEY}`
    } else {
      // Bridge.map({})
    }
  }
  _handleChangeLocation (latitude, longitude) {
    this.setState({selectedMark: null})
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.cities && nextProps.cities) {
      this.setState({
        currentCity: nextProps.cities[0]
      })
      this.props.actions.fetchWaitInstallShops(nextProps.cities[0].value)
      this.props.actions.getPoi()
    }
    if (this.props.markers !== nextProps.markers) {
      this.props.actions.changePoi(nextProps.markers[0].poiLatitude, nextProps.markers[0].poiLongitude)
    }
    // 定位后请求附近
    if (
      (!this.props.currentPoi && nextProps.currentPoi) ||
      (this.props.currentPoi && nextProps.currentPoi &&
        (nextProps.currentPoi.longitude !== this.props.currentPoi.longitude ||
        nextProps.currentPoi.latitude !== this.props.currentPoi.latitude)
      )
    ) {
      for (let index in nextProps.cities) {
        if (nextProps.cities[index].value.indexOf((nextProps.currentPoi.adcode + '').substr(0, 4)) > -1) {
          this.setState({
            currentCity: nextProps.cities[index]
          })
          this.props.actions.fetchWaitInstallShops(nextProps.cities[index].value)
          break
        }
      }
      this.setState({selectedMark: null})
    }
    // 改变地图中心点后请求附近
    if (
      (!this.props.poi && nextProps.poi) ||
      (this.props.poi && nextProps.poi &&
        (nextProps.poi.longitude !== this.props.poi.longitude ||
        nextProps.poi.latitude !== this.props.poi.latitude)
      )
    ) {
      this.setState({selectedMark: null})
    }
    if (this.props.error) {
      Toast.show(this.props.error.message || '未知错误')
      this.props.actions.resetErrorMessage()
    }
  }
  componentWillUnmount () {
    Styles.unuse()
    this.props.actions.resetErrorMessage()
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage,
    currentPoi: state.shopPosition && state.shopPosition.currentPoi,
    poi: state.shopPosition && state.shopPosition.poi,
    markers: state.shopPosition && state.shopPosition.markers,
    cities: state.shopPosition && state.shopPosition.cities
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: resetErrorMessage
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionContainer)
