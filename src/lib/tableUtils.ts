import { useMemo, useState } from 'react'

export type SortDir = 'asc' | 'desc'

export function useSortablePaginatedTable<T>(
  rows: T[],
  pageSize = 10,
  defaultSortKey?: keyof T
) {
  const [sortKey, setSortKey] = useState<keyof T | undefined>(defaultSortKey)
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [page, setPage] = useState(0)

  const sorted = useMemo(() => {
    if (!sortKey) return [...rows]
    return [...rows].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (av === bv) return 0
      if (av == null) return 1
      if (bv == null) return -1
      const cmp = av < bv ? -1 : 1
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [rows, sortKey, sortDir])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(page, pageCount - 1)

  const paginated = useMemo(() => {
    const start = safePage * pageSize
    return sorted.slice(start, start + pageSize)
  }, [sorted, safePage, pageSize])

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(0)
  }

  return {
    rows: paginated,
    total: sorted.length,
    page: safePage,
    pageCount,
    setPage,
    sortKey,
    sortDir,
    toggleSort,
  }
}
