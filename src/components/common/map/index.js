import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Style from './index.less'
import { QQ_MAP_KEY } from 'constants'
const InitZoom = 15

export default class MapComponent extends Component {
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
  }
  componentDidMount () {
    this._checkMap(
      this.props.latitude,
      this.props.longitude,
      this.props.curLatitude,
      this.props.curLongitude,
      this.props.markers,
      function () {
        this.markers = []
      }
    )
  }
  componentWillReceiveProps (nextProps) {
    let _this = this
    if (nextProps.curLatitude !== this.props.curLatitude || nextProps.curLongitude !== this.props.curLongitude) {
      this.map.zoomTo(InitZoom)
      this._checkMap(
        nextProps.latitude,
        nextProps.longitude,
        nextProps.curLatitude,
        nextProps.curLongitude,
        nextProps.markers,
        function () {
          let position = new window.qq.maps.LatLng(
            nextProps.curLatitude,
            nextProps.curLongitude
          )
          _this._initLocatedMarker(position)
        }
      )
    }

    if (nextProps.latitude !== this.props.latitude || nextProps.longitude !== this.props.longitude) {
      this.map.zoomTo(InitZoom)
      this._checkMap(
        nextProps.latitude,
        nextProps.longitude,
        nextProps.curLatitude,
        nextProps.curLongitude,
        nextProps.markers,
        function () {
          _this.map && _this.map.setCenter(new window.qq.maps.LatLng(
            nextProps.latitude,
            nextProps.longitude
          ))
        }
      )
    }

    if (this.props.markers !== nextProps.markers) {
      this._checkMap(
        nextProps.latitude,
        nextProps.longitude,
        nextProps.curLatitude,
        nextProps.curLongitude,
        nextProps.markers,
        function () {
          _this._initMarker(nextProps.markers)
        }
      )
    }
  }
  render () {
    return (
      <div className='map' />
    )
  }
  _checkMap (latitude, longitude, curLatitude, curLongitude, markers, callback) {
    if (!window.qq || !window.qq.maps || !window.qq.maps.Map) {
      this._loadSDK(latitude, longitude, curLatitude, curLongitude, markers)
    } else if (!this.map) {
      this._initMap(latitude, longitude)
      markers && this._initMarker(markers)
      let position = new window.qq.maps.LatLng(
        curLatitude,
        curLongitude,
      )
      this._initLocatedMarker(position)
    } else {
      callback(latitude, longitude, curLatitude, curLongitude, markers)
    }
  }
  _loadSDK (latitude, longitude, curLatitude, curLongitude, markers) {
    let loadScriptTime = (new Date()).getTime()
    window.qq = window.qq || {}
    window.qq.maps = window.qq.maps || {}
    window.soso || (window.soso = window.qq)
    window.soso.maps || (window.soso.maps = window.qq.maps)
    window.qq.maps.__load = function (apiLoad) {
      delete window.qq.maps.__load
      apiLoad([
      ['2.4.27', QQ_MAP_KEY, 0],
      ['//open.map.qq.com/', 'apifiles/2/4/27/mods/', '//open.map.qq.com/apifiles/2/4/27/theme/', true],
      [1, 18, 34.519469, 104.461761, 4],
      [1476190850105, '//pr.map.qq.com/pingd', '//pr.map.qq.com/pingd'],
        ['//apis.map.qq.com/jsapi',
          '//apikey.map.qq.com/mkey/index.php/mkey/check',
          '//sv.map.qq.com/xf',
          '//sv.map.qq.com/boundinfo',
          '//sv.map.qq.com/rarp',
          '//search.map.qq.com/',
          '//routes.map.qq.com/'],
        [[null, [
          '//rt0.map.gtimg.com/tile',
          '//rt1.map.gtimg.com/tile',
          '//rt2.map.gtimg.com/tile',
          '//rt3.map.gtimg.com/tile'],
          'png', [256, 256], 1, 19, '112', true, false],
          [null, [
            '//m0.map.gtimg.com/hwap',
            '//m1.map.gtimg.com/hwap',
            '//m2.map.gtimg.com/hwap',
            '//m3.map.gtimg.com/hwap'],
            'png', [128, 128], 4, 18, '109', false, false], [null, [
              '//p0.map.gtimg.com/sateTiles',
              '//p1.map.gtimg.com/sateTiles',
              '//p2.map.gtimg.com/sateTiles',
              '//p3.map.gtimg.com/sateTiles'],
              'jpg', [256, 256], 1, 19, '', false, false], [null, [
                '//p0.map.gtimg.com/sateTranTilesv3',
                '//p1.map.gtimg.com/sateTranTilesv3',
                '//p2.map.gtimg.com/sateTranTilesv3',
                '//p3.map.gtimg.com/sateTranTilesv3'],
                'png', [256, 256], 1, 19, '', false, false], [null, [
                  '//sv0.map.qq.com/road/',
                  '//sv1.map.qq.com/road/',
                  '//sv2.map.qq.com/road/',
                  '//sv3.map.qq.com/road/'], 'png', [256, 256], 1, 19, '', false, false],
          [null, [
            '//rtt2a.map.qq.com/live/',
            '//rtt2b.map.qq.com/live/',
            '//rtt2c.map.qq.com/live/'],
            'png', [256, 256], 1, 19, '', false, false], null, [[
              '//rt0.map.gtimg.com/vector/',
              '//rt1.map.gtimg.com/vector/',
              '//rt2.map.gtimg.com/vector/',
              '//rt3.map.gtimg.com/vector/'],
              [256, 256], 4, 18, '112', [
                '//rt0.map.gtimg.com/icons/',
                '//rt1.map.gtimg.com/icons/',
                '//rt2.map.gtimg.com/icons/',
                '//rt3.map.gtimg.com/icons/']], null],
                ['//s.map.qq.com/TPano/v1.1.1/TPano.js', '//map.qq.com/', '']], loadScriptTime)
    }

    let script = document.createElement('script')
    script.src = '//open.map.qq.com/apifiles/2/4/27/main.js'
    script.onload = () => {
      this._initMap(latitude, longitude)
      markers && this._initMarker(markers)
      let position = new window.qq.maps.LatLng(
        curLatitude,
        curLongitude,
      )
      this._initLocatedMarker(position)
    }
    document.body.appendChild(script)
  }
  _onMapChange () {
    // 获取当前缩放范围内最大距离跨度
    this.props.onPoiChange(this.map.getCenter().lat, this.map.getCenter().lng)
  }
  _initMap (latitude, longitude) {
    // reset map before init
    ReactDOM.findDOMNode(this).innerHTML = ''
    this.map = new window.qq.maps.Map(ReactDOM.findDOMNode(this), {
      center: new window.qq.maps.LatLng(
        latitude,
        longitude,
      ),
      zoom: InitZoom
    })
    // 拖动时清除信息框
    window.qq.maps.event.addListener(this.map, 'dragstart', this.props.onDragMap)
    // 拖动地图后重新计算中心位置
    window.qq.maps.event.addListener(this.map, 'dragend', this._onMapChange.bind(this))
    // 缩放地图后重新计算中心位置
    window.qq.maps.event.addListener(this.map, 'zoom_changed', this._onMapChange.bind(this))
  }
  _initMarker (markers) {
    this._cleanMarkers()
    if (markers && markers.length) {
      markers.forEach((marker) => {
        this._insertMarker(marker)
      })
    }
  }
  _initLocatedMarker (position) {
    function CustomOverlay (position) {
      this.position = position
    }
    CustomOverlay.prototype = new window.qq.maps.Overlay()
    // 定义construct,实现这个接口来初始化自定义的Dom元素
    CustomOverlay.prototype.construct = function () {
      this.div = document.createElement('div')
      this.div.className = 'located-point'
      this.div.innerHTML = '<div></div>'
      // 将dom添加到覆盖物层
      let panes = this.getPanes()
      // 设置panes的层级，overlayMouseTarget可接收点击事件
      panes.overlayMouseTarget.appendChild(this.div)
    }
    // 实现draw接口来绘制和更新自定义的dom元素
    CustomOverlay.prototype.draw = function () {
      let overlayProjection = this.getProjection()
        // 返回覆盖物容器的相对像素坐标
      let pixel = overlayProjection.fromLatLngToDivPixel(this.position)
      if (this.div) {
        let divStyle = this.div.style
        divStyle.left = pixel.x - 15 + 'px'
        divStyle.top = pixel.y - 15 + 'px'
      }
    }
    // 实现destroy接口来删除自定义的Dom元素，此方法会在setMap(null)后被调用
    CustomOverlay.prototype.destroy = function () {
      if (this.div) {
        this.div.parentNode.removeChild(this.div)
        this.div = null
      }
    }
    setTimeout(() => {
      if (this.locatedOverlay) {
        this.locatedOverlay.destroy()
      }
      let overlay = new CustomOverlay(position)
      overlay.setMap(this.map)
      this.locatedOverlay = overlay
    }, 3000)
  }
  _openMarker (options) {
    this.map && this.map.setCenter(new window.qq.maps.LatLng(
      options.poiLatitude,
      options.poiLongitude
    ))
    this.props.openMarker(options)
  }
  _insertMarker (options) {
    let position = new window.qq.maps.LatLng(options.poiLatitude, options.poiLongitude)
    let anchor = new window.qq.maps.Point(16, 18)
    let size = new window.qq.maps.Size(36, 36)
    let origin = new window.qq.maps.Point(0, 0)
    let scaleSize = new window.qq.maps.Size(36, 36)
    let icon = new window.qq.maps.MarkerImage('//img.shenghuozhe.net/shz/2017/01/12/111w_120h_E57191484209605.png', size, origin, anchor, scaleSize)

    let marker = new window.qq.maps.Marker({
      icon: icon,
      map: this.map,
      position: position
    })

    window.qq.maps.event.addListener(marker, 'click', this._openMarker.bind(this, options))

    // 缓存marker队列
    this.markers.push(marker)
  }
  _cleanMarkers () {
    this.markers && this.markers.forEach((marker) => {
      marker.setMap && marker.setMap(null)
    })
    this.markers = []
  }
}

MapComponent.defaultProps = {
  latitude: 39.91474,
  longitude: 116.37333,
  curLatitude: 39.91474,
  curLongitude: 116.37333
}
