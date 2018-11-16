import React, { Component } from 'react'
import PropTypes from 'prop-types'

class StockViewerDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quoteData: null
    }

    this.handleCloseClick = this.handleCloseClick.bind(this)
  }

  componentDidMount() {
    // Load individual stock data for this component. Most of the data
    // was present in the initial list of 10 but the idea would be to
    // extend this component to show more detailed stock data like a chart
    const { symbol } = this.props

    fetch(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            this.setState({
              quoteData: data
            })
          })
        }
      })
  }

  handleCloseClick(ev) {
    ev.preventDefault()

    const { handleStockSelected, symbol } = this.props
    handleStockSelected(symbol, false)
  }

  render() {
    const { symbol, companyName } = this.props
    const { quoteData } = this.state

    return (
      <div className="card stock-card stock-card__details mb-3 shadow-sm float-left mr-3">
        <div className="card-header text-left">
          <span className="font-weight-bold">
            {companyName.length > 45
              ? companyName.substring(0, 44) : companyName }
          </span>
          <button type="button" onClick={this.handleCloseClick} className="close close-button" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-body">
          { quoteData
            && (
              <div className="container">
                <div className="row less-gutter">
                  <div className="col-6 display-4">
                    {symbol}
                  </div>
                  <div className="col-6 display-4">
                    {quoteData.latestPrice}
                  </div>
                </div>
                <div className="row less-gutter">
                  <div className="col-2 text-left font-weight-bold">
                    Open
                  </div>
                  <div className="col-3 text-right">
                    {quoteData.open}
                  </div>
                  <div className="col-1" />
                  <div className="col-3 text-left font-weight-bold">
                    Vol
                  </div>
                  <div className="col-3 text-right">
                    {`${(Math.floor(quoteData.latestVolume / 1000000)).toLocaleString()} M`}
                  </div>
                </div>
                <div className="row less-gutter">
                  <div className="col-2 text-left font-weight-bold">
                    High
                  </div>
                  <div className="col-3 text-right">
                    {quoteData.high}
                  </div>
                  <div className="col-1" />
                  <div className="col-3 text-left font-weight-bold">
                    P/E
                  </div>
                  <div className="col-3 text-right">
                    {quoteData.peRatio}
                  </div>
                </div>
                <div className="row less-gutter">
                  <div className="col-2 text-left font-weight-bold">
                    Low
                  </div>
                  <div className="col-3 text-right">
                    {quoteData.low}
                  </div>
                  <div className="col-1" />
                  <div className="col-3 text-left font-weight-bold">
                    Mkt Cap
                  </div>
                  <div className="col-3 text-right">
                    {`${(Math.floor(quoteData.marketCap / 1000000000)).toLocaleString()} B`}
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

StockViewerDetails.propTypes = {
  handleStockSelected: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired
}

export default StockViewerDetails
