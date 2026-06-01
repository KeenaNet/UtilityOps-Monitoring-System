import { useState } from 'react'
import { PageShell } from '@/components/common/PageShell'
import { ResponsiveTable } from '@/components/common/ResponsiveTable'
import type { DateRange } from 'react-day-picker'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Download, FileText, Calendar as CalendarIcon, Filter, FileSpreadsheet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDateRangeLabel } from '@/lib/reportUtils'
import { exportToExcel, exportToPdf } from '@/lib/export'
import {
  abnormalEventColumns,
  buildPeriodLabel,
  buildReportId,
  buildReportSummary,
  mockAbnormalEventsForReport,
  reportTypeLabels,
  summaryColumns,
  summaryToRows,
  type ReportRecord,
  type ReportType,
} from '@/data/mockReports'
import { id as localeId } from 'date-fns/locale'

const initialReports: ReportRecord[] = [
  { id: 'REP-001', name: 'Daily Utility Summary', period: '2026-05-31', generatedAt: '2026-06-01 00:05', status: 'Generated', type: 'daily', area: 'all' },
  { id: 'REP-002', name: 'Weekly Consumption', period: 'Week 22, 2026', generatedAt: '2026-06-01 00:10', status: 'Generated', type: 'weekly', area: 'all' },
  { id: 'REP-003', name: 'Monthly Overview', period: 'May 2026', generatedAt: '2026-06-01 01:00', status: 'Generated', type: 'monthly', area: 'all' },
  { id: 'REP-004', name: 'Abnormal Usage Log', period: 'May 2026', generatedAt: '2026-06-01 01:05', status: 'Failed', type: 'abnormal', area: 'all' },
]

function areaLabel(area: string) {
  const map: Record<string, string> = {
    all: 'All Areas',
    area1: 'Production Line A',
    area2: 'Production Line B',
    area3: 'Utility Building',
  }
  return map[area] ?? area
}

function buildExportPayload(report: Pick<ReportRecord, 'name' | 'period' | 'type'>) {
  const summary = buildReportSummary(report.type)
  const summaryRows = summaryToRows(summary as Record<string, string | number>)

  return {
    title: report.name,
    period: report.period,
    sheets: [
      { name: 'Summary', columns: summaryColumns, rows: summaryRows },
      { name: 'Abnormal Events', columns: abnormalEventColumns, rows: mockAbnormalEventsForReport },
    ],
    pdfSections: [
      { heading: 'Report Summary', columns: summaryColumns, rows: summaryRows },
      { heading: 'Abnormal Events', columns: abnormalEventColumns, rows: mockAbnormalEventsForReport },
    ],
  }
}

export default function Reporting() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [reportType, setReportType] = useState<ReportType>('daily')
  const [area, setArea] = useState('all')
  const [reports, setReports] = useState<ReportRecord[]>(initialReports)

  const periodLabel = buildPeriodLabel(dateRange, reportType)
  const reportName = reportTypeLabels[reportType]

  const addReport = (status: 'Generated' | 'Failed' = 'Generated') => {
    const record: ReportRecord = {
      id: buildReportId(),
      name: reportName,
      period: periodLabel,
      generatedAt: new Date().toLocaleString('id-ID'),
      status,
      type: reportType,
      area,
    }
    setReports((prev) => [record, ...prev])
    return record
  }

  const handleGenerateExcel = () => {
    const record = addReport()
    const payload = buildExportPayload(record)
    const safeName = record.name.replace(/\s+/g, '-').toLowerCase()
    exportToExcel(`${safeName}-${record.id}`, payload.sheets)
  }

  const handleGeneratePdf = () => {
    const record = addReport()
    const payload = buildExportPayload(record)
    const safeName = record.name.replace(/\s+/g, '-').toLowerCase()
    exportToPdf(`${safeName}-${record.id}`, { title: payload.title, period: payload.period }, payload.pdfSections)
  }

  const handleDownload = (report: ReportRecord, format: 'excel' | 'pdf') => {
    if (report.status !== 'Generated') return
    const payload = buildExportPayload(report)
    const safeName = report.name.replace(/\s+/g, '-').toLowerCase()
    if (format === 'excel') {
      exportToExcel(`${safeName}-${report.id}`, payload.sheets)
    } else {
      exportToPdf(`${safeName}-${report.id}`, { title: payload.title, period: report.period }, payload.pdfSections)
    }
  }

  return (
    <PageShell loadingDeps={[reportType, area]}>
    <div className="flex-1 overflow-auto p-4 lg:p-6 space-y-6">
      <p className="text-sm text-muted-foreground -mt-2">FR-011 — generate and export utility reports.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" /> Generate Report
            </CardTitle>
            <CardDescription>Create and export a new utility report.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Report Type</label>
              <Select value={reportType} onValueChange={(v) => setReportType(v as ReportType)}>
                <SelectTrigger className="bg-input min-h-[44px]">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(reportTypeLabels) as ReportType[]).map((key) => (
                    <SelectItem key={key} value={key} className="min-h-[44px]">
                      {reportTypeLabels[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Period</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal bg-input border-input hover:bg-accent hover:text-foreground min-h-[44px]',
                      !dateRange?.from && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                    <span className="truncate">{formatDateRangeLabel(dateRange)}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 glass-card" align="start">
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    locale={localeId}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Area (Optional)</label>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger className="bg-input min-h-[44px]">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="min-h-[44px]">All Areas</SelectItem>
                  <SelectItem value="area1" className="min-h-[44px]">Production Line A</SelectItem>
                  <SelectItem value="area2" className="min-h-[44px]">Production Line B</SelectItem>
                  <SelectItem value="area3" className="min-h-[44px]">Utility Building</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <Button className="w-full gap-2 min-h-[44px]" onClick={handleGenerateExcel}>
                <FileSpreadsheet className="w-4 h-4" /> Generate Excel
              </Button>
              <Button variant="outline" className="w-full gap-2 min-h-[44px] bg-muted" onClick={handleGeneratePdf}>
                <FileText className="w-4 h-4" /> Generate PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Download previously generated reports as Excel or PDF.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveTable>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Generated At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>{areaLabel(report.area)}</TableCell>
                    <TableCell>{report.generatedAt}</TableCell>
                    <TableCell>
                      <Badge variant={report.status === 'Generated' ? 'success' : 'destructive'}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={report.status !== 'Generated'}
                          className="h-9 w-9 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 min-h-[44px] min-w-[44px]"
                          title="Download Excel"
                          onClick={() => handleDownload(report, 'excel')}
                        >
                          <FileSpreadsheet className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={report.status !== 'Generated'}
                          className="h-9 w-9 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 min-h-[44px] min-w-[44px]"
                          title="Download PDF"
                          onClick={() => handleDownload(report, 'pdf')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </ResponsiveTable>
          </CardContent>
        </Card>
      </div>
    </div>
    </PageShell>
  )
}
