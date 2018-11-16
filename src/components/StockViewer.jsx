import React, { Component } from 'react'
import StockViewerMenu from './StockViewerMenu'
import StockViewerDetails from './StockViewerDetails'
import '../styles/cards.scss'

class StockViewer extends Component {
  constructor() {
    super()
    this.state = {
      stockSuite: null,
      selectedStock: []
    }

    this.handleStockSelected = this.handleStockSelected.bind(this)
  }

  componentDidMount() {
    // Load a list of 10 stock items. 'Most Active' stock items turned out
    // to be empty sometimes when markets were closed so gainers used to
    // ensure data was always available

    fetch('https://api.iextrading.com/1.0/stock/market/list/gainers')
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            this.setState({
              stockSuite: data
            })
          })
        }
      })
  }

  handleStockSelected(symbol, selected) {
    // Update the selectedStock array based on whether an item was selected
    // or deselected.

    this.setState((prevState) => {
      const updatedStockOptions = Object.assign(prevState.selectedStock)

      if (selected) {
        // Find the selected stock item in the suite of stocks to pull the company name.
        // This is so that components displaying selected stock have a title available
        // immediately while the detailed stock info loads
        const stockItemIndex = prevState.stockSuite.findIndex(
          stockItem => stockItem.symbol === symbol
        )

        const selectedStockItem = {
          symbol,
          companyName: prevState.stockSuite[stockItemIndex].companyName
        }

        updatedStockOptions.push(selectedStockItem)
      } else {
        // Find the stock item in the selected array and remove
        const existingStockItemIndex = updatedStockOptions.findIndex(
          stockItem => stockItem.symbol === symbol
        )

        updatedStockOptions.splice(existingStockItemIndex, 1)
      }
      return ({ selectedMenuOptions: updatedStockOptions })
    })
  }

  render() {
    const { stockSuite, selectedStock } = this.state

    return (
      <div className="stock-viewer px-3 py-3 pb-md-4 mx-auto text-center">
        { stockSuite && stockSuite.length > 0
          && (
            <StockViewerMenu
              stockSelection={stockSuite}
              selectedStock={selectedStock}
              handleStockSelected={this.handleStockSelected}
            />
          )
        }
        {
          // Display the details of each stock item selected by the user in the menu
          selectedStock.map(stockItem => (
            <StockViewerDetails
              handleStockSelected={this.handleStockSelected}
              key={stockItem.symbol}
              {...stockItem}
            />
          ))
        }
      </div>
    )
  }
}

export default StockViewer
