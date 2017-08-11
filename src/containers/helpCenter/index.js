import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'components/link'
import { bindActionCreators } from 'redux'
import assign from 'lodash/assign'
import * as Bridge from 'utils/bridge'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/bd/'
import * as commonActions from 'actions/common'
import Style from './index.less'
import Tabs, {Tab} from 'components/common/tabs'
import Cell, { Cells, CellBody, CellFooter } from 'components/common/cell'
import { ARTICLES, TABS, QUESTIONS } from 'constants/helpCenter'
import { router } from 'utils'

let lists = [
  {id: 1, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
  {id: 2, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
  {id: 3, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
  {id: 4, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
  {id: 5, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'}
]
let data = {
  hot: {
    title: '热门问题',
    questions: [
      {id: 1, title: '2设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 2, title: '2设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 3, title: '2设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 4, title: '2设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 5, title: '2设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'}
    ]
  },
  set: {
    title: '安装流程',
    questions: [
      {id: 1, title: '3设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 2, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 3, title: '3设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 4, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 5, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'}
    ]
  },
  sign: {
    title: '签约流程',
    questions: [
      {id: 1, title: '4设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 2, title: '4设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 3, title: '4设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 4, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 5, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'}
    ]
  },
  other: {
    title: '其他问题',
    questions: [
      {id: 1, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 2, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 3, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 4, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'},
      {id: 5, title: '设备扫码后提示该设备无法使用怎么办？', content: '设备扫码后提示该设备无法使用怎么办？设备扫码后提示该设备无法使用怎么办？'}
    ]
  }
}

class IndexContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
      activeId: null,
      activeTab: TABS[0].id
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentWillUnmount () {
    Style.unuse()
    this.props.actions.cleanErrorMessage()
  }
  componentDidMount () {
    Bridge.setNavTitle('帮助中心')
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.homeData && nextProps.monthData && nextProps.error) {
      Toast.show(nextProps.error.message || '未知错误')
      this.props.actions.cleanErrorMessage()
    }
  }
  render () {
    return (
      <div className='help-center'>
        <p className='title'>使用手册</p>
        <div className='pages'>
          {ARTICLES.map((item, i) => {
            return <div key={i} onClick={() => router.push('/helpcenter/article?type=' + item.id)} className='page'>{item.title}</div>
          })}
        </div>
        <div className='questions'>
          <p className='title'>常见问题</p>
          <Tabs className={TABS.length > 4 ? 'tabs-scroll' : ''}>
            {TABS.map((item, i) => {
              return (<Tab
                key={i}
                highlight={item.id === this.state.activeTab}
                others={{onClick: () => { this._bindChangeTab(item.id) }}}>
                {item.title}
              </Tab>)
            })}
          </Tabs>
          <Cells>
            {this._renderQuestions()}
          </Cells>
        </div>
      </div>
    )
  }
  _bindChangeTab (val) {
    this.setState({
      activeTab: val
    })
  }
  _toggleList (val) {
    if (this.state.activeId === val) {
      return this.setState({activeId: null})
    }
    return this.setState({activeId: val})
  }
  _renderQuestions () {
    return (
      QUESTIONS[this.state.activeTab].map((item, i) => {
        return (<div key={i} onClick={() => this._toggleList(item.id)}>
          <Cell>
            <CellBody>{item.content.split('\n').map((v, i) => {
              return <p key={i}>{v}</p>
            })}</CellBody>
            <CellFooter className={this.state.activeId === item.id ? 'down' : null}>
              <i className='dianfont icon-xuanze iconStyle' />
            </CellFooter>
          </Cell>
          {this.state.activeId === item.id
            ? <div className='content'>{item.answer.split('\n').map((v, i) => {
              return <p key={i}>{v}</p>
            })}</div>
            : null}
        </div>)
      })
      )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.errorMessage
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
