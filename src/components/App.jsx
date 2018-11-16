import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Nav from './Nav'
import StockViewer from './StockViewer'
import PricePerEarning from './PricePerEarning'
import News from './News'
import '../styles/app.scss'

const App = () => (
  <div className="app">
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
      <h5 className="my-0 mr-md-auto font-weight-normal">React Sampler</h5>
      <Nav />
    </div>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={StockViewer} />
        <Route path="/ppe" component={PricePerEarning} />
        <Route path="/news" component={News} />
      </div>
    </BrowserRouter>
  </div>
)

export default App
