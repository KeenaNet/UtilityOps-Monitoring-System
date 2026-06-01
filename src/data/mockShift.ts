export const shiftComparison = [
  { metric: 'Electricity', shift1: 4200, shift2: 5100, shift3: 3150 },
  { metric: 'Compressor kWh', shift1: 2100, shift2: 2450, shift3: 1680 },
  { metric: 'Water', shift1: 180, shift2: 220, shift3: 150 },
]

export const shiftAnomalies = [
  { shift: 'Shift 1', count: 2, topIssue: 'Minor water usage' },
  { shift: 'Shift 2', count: 5, topIssue: 'High power usage' },
  { shift: 'Shift 3', count: 1, topIssue: 'Pressure drop' },
]

export const shiftTrend = [
  { day: 'Mon', s1: 4100, s2: 5000, s3: 3000 },
  { day: 'Tue', s1: 4300, s2: 5200, s3: 3100 },
  { day: 'Wed', s1: 4000, s2: 4900, s3: 3050 },
  { day: 'Thu', s1: 4500, s2: 5400, s3: 3200 },
  { day: 'Fri', s1: 4200, s2: 5100, s3: 3150 },
]
