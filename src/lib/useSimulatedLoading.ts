import { useEffect, useState } from 'react'

/** Simulates API fetch delay; replace with real loading state when wired to API. */
export function useSimulatedLoading(deps: unknown[] = [], delayMs = 600) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = window.setTimeout(() => setLoading(false), delayMs)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return loading
}
