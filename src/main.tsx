import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import App from './App'
import './index.css'

if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: false,
      httpBodies: [],
      urlQueryParams: false,
      stackFrameVariables: false,
    },
    sampleRate: 1,
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Sentry.ErrorBoundary
    fallback={
      <main className="monitoring-fallback" role="alert">
        <h1>Something went wrong.</h1>
        <p>Refresh the page to try again, or contact VINTEQ if the problem continues.</p>
        <button type="button" onClick={() => window.location.reload()}>
          Refresh page
        </button>
      </main>
    }
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Sentry.ErrorBoundary>,
)
