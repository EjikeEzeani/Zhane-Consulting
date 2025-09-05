'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-red-400 mb-4">Global Error</h1>
            <h2 className="text-2xl font-serif font-bold text-white mb-4">Critical Error Occurred</h2>
            <p className="text-slate-400 mb-8">
              A critical error has occurred. Please refresh the page or contact support.
            </p>
            <button
              onClick={reset}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
