export type AlarmRecord = {
  id: string
  time: string
  area: string
  type: string
  issue: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Active' | 'Acknowledged' | 'Closed'
  pic: string
}

export const mockAlarms: AlarmRecord[] = [
  {
    id: 'AL-1042',
    time: '2026-06-01 10:23',
    area: 'Utility Building',
    type: 'Compressor',
    issue: 'Pressure Drop Line A',
    severity: 'High',
    status: 'Active',
    pic: 'Unassigned',
  },
  {
    id: 'AL-1041',
    time: '2026-06-01 09:15',
    area: 'Production Line B',
    type: 'Electricity',
    issue: 'Low Power Factor Panel 3',
    severity: 'Medium',
    status: 'Active',
    pic: 'Engineering Team 1',
  },
  {
    id: 'AL-1040',
    time: '2026-06-01 08:45',
    area: 'Production Line A',
    type: 'Water',
    issue: 'Abnormal Usage Area B',
    severity: 'Low',
    status: 'Acknowledged',
    pic: 'Utility Operator 1',
  },
  {
    id: 'AL-1039',
    time: '2026-05-31 23:10',
    area: 'Main Distribution',
    type: 'Electricity',
    issue: 'No Data from Datalogger',
    severity: 'Critical',
    status: 'Closed',
    pic: 'Engineering Team 1',
  },
  {
    id: 'AL-1038',
    time: '2026-05-31 18:00',
    area: 'Production Line A',
    type: 'Electricity',
    issue: 'High kWh Shift 2',
    severity: 'High',
    status: 'Active',
    pic: 'Unassigned',
  },
]
