import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Style from './notice.less'
import { clean } from 'actions/errorMessage'
import * as actions from 'actions/chooseIdentity'
import assign from 'lodash/assign'
import NoticeCell from 'components/home/noticeCell'

class NoticeContainer extends Component {
  constructor (props) { // eslint-disable-line
    super(props)
    this.state = {
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
  }
  componentWillReceiveProps (nextProps) {
  }
  render () {
    return (
      <div className='list'>
        <NoticeCell />
        <NoticeCell />
        <NoticeCell />
      </div>
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
    actions: bindActionCreators(assign(actions, {
      cleanErrorMessage: clean
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeContainer)
