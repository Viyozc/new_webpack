import React, { Component } from 'react'
import { DC_STATUS, DEVICE_STATUS } from 'constants/dc'
import { router, limitFontSize } from 'utils'
import assign from 'lodash/assign'
import Style from './tab.less'
import Select from './select'
const formatDcStatus = DC_STATUS.map((item, i) => {
  return { key: item.name, value: item.type }
})
const formatDeviceStatus = DEVICE_STATUS.map((item, i) => {
  return { key: item.name, value: item.value }
})
formatDeviceStatus.unshift({key: '全部商家', value: NaN})

export default class TabContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      showDate: false,
      showCity: false,
      showKa: false
    }
  }
  componentWillMount () {
    Style.use()
  }
  render () {
    let currentDateKey = ''
    let currentCityKey = ''
    let currentKaKey = ''
    let cityCode = this.props.location.query.cityCode
    cityCode = cityCode && cityCode.split(',')
    cityCode = cityCode && cityCode.map((item, i) => {
      return parseInt(item)
    })
    let isKa = this.props.location.query.isKa
    isKa = isKa && isKa.split(',')
    isKa = isKa && isKa.map((item, i) => {
      return parseInt(item)
    })
    for (let i = 0; i < formatDcStatus.length; i++) {
      let obj = formatDcStatus[i]
      if (obj.value === parseInt(this.props.location.query.dateType || DC_STATUS[0].type)) {
        currentDateKey = obj.key
        break
      }
    }
    if (isKa) {
      for (let i = 0; i < formatDeviceStatus.length; i++) {
        let obj = formatDeviceStatus[i]
        for (let j = 0; j < isKa.length; j++) {
          let city = isKa[j]
          if (obj.value === city) {
            currentKaKey += obj.key
          }
        }
      }
    }
    if (cityCode) {
      for (let i = 0; i < this.props.city.length; i++) {
        let obj = this.props.city[i]
        for (let j = 0; j < cityCode.length; j++) {
          let city = cityCode[j]
          if (obj.value === city) {
            currentCityKey += obj.key
          }
        }
      }
    }
    return (
      <div className='tabs'>
        <div className='dropdown' onClick={this._bindChoseDate.bind(this)}>
          <span>{limitFontSize(currentDateKey || '日', 4, true)} </span>
          {this.state.showDate ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
        </div>
        <div className='dropdown' onClick={this._bindChoseCity.bind(this)}>
          <span>{limitFontSize(currentCityKey || '全部城市', 4, true)} </span>
          {this.state.showCity ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
        </div>
        <div className='dropdown' onClick={this._bindChoseKa.bind(this)}>
          <span>{limitFontSize(currentKaKey || '全部商家', 4, true)} </span>
          {this.state.showKa ? <i className='dianfont icon-jiantou' /> : <i className='dianfont icon-jiantou0101' />}
        </div>
        {this.state.showDate
          ? <Select
            options={formatDcStatus}
            onChose={this._choseDate.bind(this)}
            selectedValue={parseInt(this.props.location.query.dateType || DC_STATUS[0].type)}
            onClose={this._closeDate.bind(this)} />
          : null
        }
        {this.state.showCity
          ? <Select
            multiple
            options={this.props.city}
            onChose={this._choseCity.bind(this)}
            selectedValue={cityCode || [NaN]}
            onClose={this._closeCity.bind(this)} />
          : null
        }
        {this.state.showKa
          ? <Select
            multiple
            options={formatDeviceStatus}
            onChose={this._choseKa.bind(this)}
            selectedValue={isKa || [NaN]}
            onClose={this._closeKa.bind(this)} />
          : null
        }
      </div>
    )
  }
  componentWillUnmount () {
    Style.unuse()
  }
  _choseDate (value) {
    this._closeDate()
    router.replace({pathname: '/data/center/list', query: assign({}, this.props.location.query, {dateType: value})})
  }
  _choseCity (value) {
    this._closeCity()
    let query = this.props.location.query
    if (isNaN(value[0])) {
      delete query.cityCode
    } else {
      query = assign({}, this.props.location.query, {cityCode: value.join(',')})
    }
    router.replace({pathname: '/data/center/list', query: query})
  }
  _choseKa (value) {
    this._closeKa()
    let query = this.props.location.query
    if (isNaN(value[0])) {
      delete query.isKa
    } else {
      query = assign({}, this.props.location.query, {isKa: value.join(',')})
    }
    router.replace({pathname: '/data/center/list', query: query})
  }
  _closeDate () {
    this.setState({
      showDate: false
    })
  }
  _closeCity () {
    this.setState({
      showCity: false
    })
  }
  _closeKa () {
    this.setState({
      showKa: false
    })
  }
  _bindChoseDate () {
    this.setState({
      showDate: true
    })
  }
  _bindChoseCity () {
    this.setState({
      showCity: true
    })
  }
  _bindChoseKa () {
    this.setState({
      showKa: true
    })
  }
}
