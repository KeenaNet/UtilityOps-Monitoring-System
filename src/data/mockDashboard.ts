export const trendData24h = [
  { time: '00:00', kwh: 120, water: 45, pressure: 7.2, compressorKwh: 80 },
  { time: '04:00', kwh: 110, water: 40, pressure: 7.1, compressorKwh: 75 },
  { time: '08:00', kwh: 250, water: 80, pressure: 6.8, compressorKwh: 160 },
  { time: '12:00', kwh: 280, water: 95, pressure: 6.5, compressorKwh: 185 },
  { time: '16:00', kwh: 260, water: 85, pressure: 6.7, compressorKwh: 170 },
  { time: '20:00', kwh: 180, water: 60, pressure: 7.0, compressorKwh: 120 },
]

export const shiftConsumption = [
  { shift: 'Shift 1', electricity: 4200, water: 180, compressor: 2100 },
  { shift: 'Shift 2', electricity: 5100, water: 220, compressor: 2450 },
  { shift: 'Shift 3', electricity: 3150, water: 150, compressor: 1680 },
]

export const topAbnormalMeters = [
  { meter: 'ELC-A1', area: 'Production Line A', events: 5, utility: 'Electricity', severity: 'High' },
  { meter: 'CMP-01', area: 'Utility Building', events: 4, utility: 'Compressor', severity: 'High' },
  { meter: 'WTR-A2', area: 'Production Line A', events: 3, utility: 'Water', severity: 'Medium' },
  { meter: 'ELC-MD-01', area: 'Main Distribution', events: 2, utility: 'Electricity', severity: 'Critical' },
]

export const meterStatusRows = [
  { meter: 'ELC-A1', area: 'Production Line A', source: 'Datalogger', status: 'Online', lastUpdate: '10:25' },
  { meter: 'CMP-01', area: 'Utility Building', source: 'Datalogger', status: 'Warning', lastUpdate: '10:23' },
  { meter: 'WTR-A2', area: 'Production Line A', source: 'Manual', status: 'Online', lastUpdate: '08:45' },
  { meter: 'ELC-MD-01', area: 'Main Distribution', source: 'Datalogger', status: 'Offline', lastUpdate: '23:10' },
]

export const manualInputCompletion = {
  total: 12,
  completed: 9,
  missing: 3,
  percent: 75,
}

export const systemStatus = {
  collectorOnline: true,
  dataloggerLastUpdate: '2026-06-01 10:25',
  manualLastUpdate: '2026-06-01 08:45',
}
