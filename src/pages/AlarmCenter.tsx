import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { KpiCard } from '@/components/common/KpiCard'
import { PageShell } from '@/components/common/PageShell'
import { EmptyState } from '@/components/common/EmptyState'
import { ResponsiveTable } from '@/components/common/ResponsiveTable'
import { TablePagination } from '@/components/common/TablePagination'
import { useAppState } from '@/context/AppState'
import {
  matchesAreaFilter,
  matchesPicFilter,
  matchesSeverityFilter,
  matchesStatusFilter,
  matchesUtilityFilter,
} from '@/lib/filterUtils'
import { useSortablePaginatedTable } from '@/lib/tableUtils'
import { formatNumber } from '@/lib/format'
import { mockAlarms } from '@/data/mockAlarms'
import { Check, X, Eye, AlertTriangle } from 'lucide-react'

export default function AlarmCenter() {
  const { filters } = useAppState()

  const filtered = useMemo(() => {
    return mockAlarms.filter((alarm) => {
      if (!matchesSeverityFilter(alarm.severity, filters.severity)) return false
      if (!matchesUtilityFilter(alarm.type, filters.utilityType)) return false
      if (!matchesAreaFilter(alarm.area, filters.area)) return false
      if (!matchesStatusFilter(alarm.status, filters.status)) return false
      if (!matchesPicFilter(alarm.pic, filters.pic)) return false
      return true
    })
  }, [filters])

  const table = useSortablePaginatedTable(filtered, 8, 'time')
  const activeCount = filtered.filter((a) => a.status === 'Active').length

  return (
    <PageShell loadingDeps={[filters]}>
      <div className="flex-1 overflow-auto p-4 lg:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <KpiCard
            title="Active Alarms"
            value={formatNumber(activeCount)}
            icon={AlertTriangle}
            iconClassName="text-red-400"
          />
          <KpiCard title="Total (filtered)" value={formatNumber(filtered.length)} />
          <KpiCard
            title="Critical / High"
            value={formatNumber(
              filtered.filter((a) => a.severity === 'Critical' || a.severity === 'High').length
            )}
            icon={AlertTriangle}
            iconClassName="text-amber-400"
          />
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Active & Recent Events</CardTitle>
            <CardDescription>Filter via bar atas · sort & pagination di bawah</CardDescription>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <EmptyState
                title="Tidak ada alarm"
                message="Tidak ada alarm yang cocok dengan filter saat ini. Coba reset filter."
              />
            ) : (
              <>
                <ResponsiveTable>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Alarm ID</TableHead>
                        <TableHead>Detected At</TableHead>
                        <TableHead>Area</TableHead>
                        <TableHead>Utility Type</TableHead>
                        <TableHead>Issue / Rule</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>PIC</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table.rows.map((alarm) => (
                        <TableRow key={alarm.id}>
                          <TableCell className="font-medium">{alarm.id}</TableCell>
                          <TableCell>{alarm.time}</TableCell>
                          <TableCell>{alarm.area}</TableCell>
                          <TableCell>{alarm.type}</TableCell>
                          <TableCell>{alarm.issue}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                alarm.severity === 'High' || alarm.severity === 'Critical'
                                  ? 'destructive'
                                  : alarm.severity === 'Medium'
                                    ? 'warning'
                                    : 'secondary'
                              }
                            >
                              <span className="sr-only">Severity: </span>
                              {alarm.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                alarm.status === 'Active'
                                  ? 'default'
                                  : alarm.status === 'Closed'
                                    ? 'success'
                                    : 'outline'
                              }
                            >
                              {alarm.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{alarm.pic}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2 flex-wrap">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 bg-black/20 hover:bg-black/40 min-h-[44px] min-w-[44px]"
                                  >
                                    <Eye className="w-4 h-4" />
                                    <span className="hidden sm:inline">Details</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px] glass-card border-white/10">
                                  <DialogHeader>
                                    <DialogTitle>Alarm Details — {alarm.id}</DialogTitle>
                                    <DialogDescription>
                                      Review and input root cause before closing.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label className="text-right text-muted-foreground">Area</Label>
                                      <div className="col-span-3 font-medium">{alarm.area}</div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label className="text-right text-muted-foreground">Issue</Label>
                                      <div className="col-span-3 font-medium text-red-400">
                                        {alarm.issue}
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor={`pic-${alarm.id}`} className="text-right text-muted-foreground">
                                        Assign PIC
                                      </Label>
                                      <Select defaultValue="unassigned">
                                        <SelectTrigger
                                          id={`pic-${alarm.id}`}
                                          className="col-span-3 bg-black/50 min-h-[44px]"
                                        >
                                          <SelectValue placeholder="Select PIC" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="unassigned" className="min-h-[44px]">
                                            Unassigned
                                          </SelectItem>
                                          <SelectItem value="eng1" className="min-h-[44px]">
                                            Engineering Team 1
                                          </SelectItem>
                                          <SelectItem value="util1" className="min-h-[44px]">
                                            Utility Operator 1
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-start gap-4">
                                      <Label
                                        htmlFor={`root-${alarm.id}`}
                                        className="text-right text-muted-foreground mt-2"
                                      >
                                        Root Cause
                                      </Label>
                                      <Textarea
                                        id={`root-${alarm.id}`}
                                        placeholder="Identify the root cause..."
                                        className="col-span-3 bg-black/50 min-h-[44px]"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-start gap-4">
                                      <Label
                                        htmlFor={`action-${alarm.id}`}
                                        className="text-right text-muted-foreground mt-2"
                                      >
                                        Action Taken
                                      </Label>
                                      <Textarea
                                        id={`action-${alarm.id}`}
                                        placeholder="Describe corrective action..."
                                        className="col-span-3 bg-black/50 min-h-[44px]"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      className="bg-black/20 hover:bg-black/40 min-h-[44px]"
                                    >
                                      Save Draft
                                    </Button>
                                    <Button
                                      type="submit"
                                      className="bg-red-500 hover:bg-red-600 text-white min-h-[44px]"
                                    >
                                      Close Alarm
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              {alarm.status === 'Active' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1 bg-black/20 hover:bg-black/40 text-blue-400 border-blue-400/30 min-h-[44px] min-w-[44px]"
                                >
                                  <Check className="w-4 h-4" />
                                  <span className="hidden sm:inline">Ack</span>
                                </Button>
                              )}
                              {alarm.status !== 'Closed' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1 bg-black/20 hover:bg-black/40 text-red-400 border-red-400/30 min-h-[44px] min-w-[44px]"
                                >
                                  <X className="w-4 h-4" />
                                  <span className="hidden sm:inline">Close</span>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ResponsiveTable>
                <TablePagination
                  page={table.page}
                  pageCount={table.pageCount}
                  total={table.total}
                  onPageChange={table.setPage}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
