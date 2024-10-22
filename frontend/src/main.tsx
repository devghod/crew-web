import React from 'react'
import ReactDOM from 'react-dom/client'
import Routers from './_Router.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>,
)
