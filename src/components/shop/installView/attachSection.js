import React, { Component } from 'react'
import TimeUtil from 'utils/time'

import Style from './attachSection.less'
import Cell, { CellBody, CellFooter } from 'components/common/cell'
import Icon from 'components/common/icon'
import PreviewImage from 'components/common/previewImage'
import Section, { SectionBody } from 'components/common/section'

export default class ShopSectionComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      previewImage: false
    }
  }
  componentWillMount () {
    Style.use()
  }
  render () {
    let receipt = this.props.receipt
    return (
      <Section className='attach-section'>
        <SectionBody>
          <Cell others={{onClick: this._preview.bind(this)}}>
            <CellBody>纸质签收单</CellBody>
            <CellFooter>{TimeUtil.format(this.props.receiptTime, 'YYYY/MM/DD HH:mm')}</CellFooter>
            <Icon name='xuanze' />
          </Cell>
        </SectionBody>
        {
          this.state.previewImage && receipt
          ? <PreviewImage images={[receipt]} onClose={() => { this.setState({previewImage: false}) }} />
          : null
        }
      </Section>
    )
  }
  _preview () {
    this.setState({previewImage: true})
  }
  componentWillUnmount () {
    Style.unuse()
  }
}
