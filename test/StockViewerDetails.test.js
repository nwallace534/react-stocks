import React from 'react'
import { shallow } from 'enzyme'
import StockViewerDetails from '../src/components/StockViewerDetails'
import SampleQuoteData from './sampleQuote'

const testProps = {
  symbol: 'APPL',
  companyName: 'Apple Inc.'
}

describe('Stock Viewer Details', () => {
  it('should call handleCloseClick on the close button click', () => {
    // Any data can be put here for the fetch
    fetch.mockResponseOnce(JSON.stringify(SampleQuoteData), { status: 200 })

    const wrapper = shallow(<StockViewerDetails {...testProps} handleStockSelected={jest.fn()} />)

    wrapper.instance().handleCloseClick = jest.fn()
    wrapper.instance().forceUpdate()
    wrapper.update()

    wrapper.find('.close-button').simulate('click')
    expect(wrapper.instance().handleCloseClick).toHaveBeenCalled()

  })
})
