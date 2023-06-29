import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './i18n.js'
import { App } from './App'
import { DataProvider } from './hooks/use-data'
import { SearchProvider } from './hooks/use-search'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <DataProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </DataProvider>
  </React.StrictMode>
)

reportWebVitals()
