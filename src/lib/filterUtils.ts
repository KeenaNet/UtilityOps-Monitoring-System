import type { AppFilters, AreaFilter, UtilityFilter } from '@/context/AppState'

export const areaLabels: Record<string, string> = {
  all: 'All Areas',
  'line-a': 'Production Line A',
  'line-b': 'Production Line B',
  utility: 'Utility Building',
  'main-dist': 'Main Distribution',
}

/** Map display area names to filter keys */
export function areaNameToFilter(area: string): AreaFilter {
  const map: Record<string, AreaFilter> = {
    'Production Line A': 'line-a',
    'Production Line B': 'line-b',
    'Utility Building': 'utility',
    'Main Distribution': 'main-dist',
  }
  return map[area] ?? 'all'
}

export function utilityNameToFilter(type: string): UtilityFilter {
  const t = type.toLowerCase()
  if (t.includes('electric')) return 'electricity'
  if (t.includes('water')) return 'water'
  if (t.includes('compress')) return 'compressor'
  return 'all'
}

export function matchesAreaFilter(areaName: string, filter: AppFilters['area']): boolean {
  if (filter === 'all') return true
  return areaNameToFilter(areaName) === filter
}

export function matchesUtilityFilter(utility: string, filter: AppFilters['utilityType']): boolean {
  if (filter === 'all') return true
  return utilityNameToFilter(utility) === filter
}

export function matchesSeverityFilter(severity: string, filter: AppFilters['severity']): boolean {
  if (filter === 'all') return true
  return severity.toLowerCase() === filter
}

export function matchesStatusFilter(
  status: string,
  filter: AppFilters['status']
): boolean {
  if (filter === 'all') return true
  const normalized = status.toLowerCase().replace(/\s+/g, ' ')
  if (filter === 'active') return normalized === 'active' || normalized === 'open'
  return normalized === filter
}

export function matchesPicFilter(pic: string, filter: AppFilters['pic']): boolean {
  if (filter === 'all') return true
  if (filter === 'unassigned') return pic === 'Unassigned'
  if (filter === 'eng1') return pic.includes('Engineering')
  if (filter === 'util1') return pic.includes('Utility Operator')
  return true
}
