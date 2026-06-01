export type AnomalyStatus = 'open' | 'acknowledged' | 'in progress' | 'closed'

export type AnomalyRecord = {
  id: string
  detectedAt: string
  area: string
  meter: string
  utilityType: 'Electricity' | 'Compressor' | 'Water'
  anomalyType: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  status: AnomalyStatus
  actual: number
  baseline: number
  durationHours: number
  pic: string
  rootCause?: string
  correctiveAction?: string
}

export const mockAnomalies: AnomalyRecord[] = [
  {
    id: 'AN-2042',
    detectedAt: '2026-06-01 10:23',
    area: 'Utility Building',
    meter: 'CMP-01',
    utilityType: 'Compressor',
    anomalyType: 'PRESSURE_DROP',
    severity: 'High',
    status: 'open',
    actual: 5.2,
    baseline: 7.8,
    durationHours: 4.5,
    pic: 'Unassigned',
  },
  {
    id: 'AN-2041',
    detectedAt: '2026-06-01 09:15',
    area: 'Production Line B',
    meter: 'ELC-P3',
    utilityType: 'Electricity',
    anomalyType: 'LOW_POWER_FACTOR',
    severity: 'Medium',
    status: 'acknowledged',
    actual: 0.72,
    baseline: 0.92,
    durationHours: 6.2,
    pic: 'Engineering Team 1',
  },
  {
    id: 'AN-2040',
    detectedAt: '2026-06-01 08:45',
    area: 'Production Line A',
    meter: 'WTR-A2',
    utilityType: 'Water',
    anomalyType: 'ABNORMAL_MANUAL_USAGE',
    severity: 'Low',
    status: 'in progress',
    actual: 420,
    baseline: 280,
    durationHours: 8.0,
    pic: 'Utility Operator 1',
    rootCause: 'Valve partially open overnight',
  },
  {
    id: 'AN-2039',
    detectedAt: '2026-05-31 23:10',
    area: 'Main Distribution',
    meter: 'ELC-MD-01',
    utilityType: 'Electricity',
    anomalyType: 'NO_DATA_ELECTRICITY',
    severity: 'Critical',
    status: 'open',
    actual: 0,
    baseline: 120,
    durationHours: 12.5,
    pic: 'Unassigned',
  },
  {
    id: 'AN-2038',
    detectedAt: '2026-05-31 18:30',
    area: 'Production Line A',
    meter: 'ELC-A1',
    utilityType: 'Electricity',
    anomalyType: 'HIGH_POWER_USAGE',
    severity: 'High',
    status: 'closed',
    actual: 1850,
    baseline: 1420,
    durationHours: 2.0,
    pic: 'Engineering Team 1',
    rootCause: 'Extra shift overtime',
    correctiveAction: 'Adjusted shift schedule',
  },
  {
    id: 'AN-2037',
    detectedAt: '2026-05-31 14:00',
    area: 'Utility Building',
    meter: 'CMP-02',
    utilityType: 'Compressor',
    anomalyType: 'RUNNING_NO_FLOW',
    severity: 'Medium',
    status: 'closed',
    actual: 0,
    baseline: 45,
    durationHours: 1.5,
    pic: 'Utility Operator 1',
    rootCause: 'Sensor calibration drift',
    correctiveAction: 'Recalibrated flow meter',
  },
]

export function deltaPercent(actual: number, baseline: number): number {
  if (baseline === 0) return 0
  return ((actual - baseline) / baseline) * 100
}
