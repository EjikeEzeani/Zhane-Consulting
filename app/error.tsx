'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-400 mb-4">Error</h1>
        <h2 className="text-2xl font-serif font-bold text-white mb-4">Something went wrong!</h2>
        <p className="text-slate-400 mb-8">
          An error occurred while loading this page. Please try again.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
          <a
            href="/"
            className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-block"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  )
}
