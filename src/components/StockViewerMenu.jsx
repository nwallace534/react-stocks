import React, { Component } from 'react'
import PropTypes from 'prop-types'

class StockViewerMenu extends Component {
  constructor(props) {
    super(props)

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(ev) {
    ev.preventDefault()

    const { handleStockSelected } = this.props
    handleStockSelected(ev.target.id, true)
  }

  render() {
    const { stockSelection, selectedStock } = this.props

    return (
      <div className="card stock-card stock-card__menu mb-2 shadow-sm mr-3 float-left">
        <div className="card-header">
          <span className="font-weight-normal">Gainers</span>
        </div>
        <div className="card-body">
          {
            // Map over each available stock item that wasn't present in the selected
            // stock list and display a button. With more time, re-visit the logic to
            // refactor with a reducer or move entirely to Redux
            stockSelection.filter(stockItem => (
              selectedStock.filter(
                selectedStockItem => (selectedStockItem.symbol === stockItem.symbol)
              ).length === 0)).map(stockMenuItem => (
                <button
                  key={stockMenuItem.symbol}
                  type="button"
                  className="btn btn-block btn-primary"
                  id={stockMenuItem.symbol}
                  onClick={this.handleButtonClick}
                >
                  {stockMenuItem.companyName.length > 45
                    ? stockMenuItem.companyName.substring(0, 44) : stockMenuItem.companyName }
                </button>
            ))
          }
        </div>
      </div>

    )
  }
}

StockViewerMenu.propTypes = {
  stockSelection: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedStock: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleStockSelected: PropTypes.func.isRequired
}

export default StockViewerMenu
