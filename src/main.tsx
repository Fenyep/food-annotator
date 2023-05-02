import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './i18n/i18n'
import Loader from './components/loader/Loader'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
