import './ErrorBoundary.css'

function ErrorBoundary({ error, resetError }) {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>⚠️ Oops! Something went wrong</h1>
        <p className="error-message">{error || 'An unexpected error occurred'}</p>
        <button onClick={resetError} className="error-btn">
          Try Again
        </button>
      </div>
    </div>
  )
}

export default ErrorBoundary
