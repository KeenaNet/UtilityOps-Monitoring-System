import { useState } from 'react'
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TimePicker } from '@/components/ui/time-picker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Save, Calendar as CalendarIcon, History, AlertCircle } from 'lucide-react'
import { cn } from "@/lib/utils"
import { formatWithUnit } from '@/lib/format'

const recentInputs = [
  { id: '1', time: '10:00', meter: 'ELEC-A-01', value: '12450', unit: 'kWh', user: 'Operator 1', status: 'Valid' },
  { id: '2', time: '09:00', meter: 'WAT-A-01', value: '450', unit: 'm³', user: 'Operator 1', status: 'Valid' },
  { id: '3', time: '08:00', meter: 'ELEC-B-01', value: '8900', unit: 'kWh', user: 'Operator 2', status: 'Abnormal' },
]

const missingInputs = [
  { id: '1', meter: 'COMP-01', area: 'Utility Building', shift: 'Shift 1', expectedTime: '08:00' },
  { id: '2', meter: 'WAT-B-01', area: 'Production Line B', shift: 'Shift 1', expectedTime: '08:00' },
]

export default function ManualInput() {
  const [date, setDate] = useState<Date>(new Date())
  const [reading, setReading] = useState('')
  const [readingError, setReadingError] = useState(false)

  const validateReading = (value: string) => {
    setReadingError(value.trim() === '')
  }

  return (
    <div className="flex-1 overflow-auto bg-background/50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Manual Utility Input</h1>
      </div>

      <Tabs defaultValue="input" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-input p-1 rounded-lg h-auto gap-1">
          <TabsTrigger value="input" className="min-h-[40px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Input Form</TabsTrigger>
          <TabsTrigger value="history" className="min-h-[40px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">History</TabsTrigger>
          <TabsTrigger value="missing" className="min-h-[40px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Missing <Badge variant="destructive" className="ml-2 px-1.5 py-0">2</Badge></TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="mt-6">
          <Card className="glass-card max-w-3xl">
            <CardHeader>
              <CardTitle>Input Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-input border-input hover:bg-accent hover:text-foreground min-h-[44px]",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 glass-card" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      initialFocus
                      locale={id}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <TimePicker value="08:00" />
              </div>
              <div className="space-y-2">
                <Label>Shift</Label>
                <Select defaultValue="shift1">
                  <SelectTrigger className="bg-input min-h-[44px]">
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shift1" className="min-h-[44px]">Shift 1 (07:00 - 15:00)</SelectItem>
                    <SelectItem value="shift2" className="min-h-[44px]">Shift 2 (15:00 - 23:00)</SelectItem>
                    <SelectItem value="shift3" className="min-h-[44px]">Shift 3 (23:00 - 07:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Area</Label>
                <Select defaultValue="area1">
                  <SelectTrigger className="bg-input min-h-[44px]">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="area1" className="min-h-[44px]">Production Line A</SelectItem>
                    <SelectItem value="area2" className="min-h-[44px]">Production Line B</SelectItem>
                    <SelectItem value="area3" className="min-h-[44px]">Utility Building</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Utility Type</Label>
                <Select defaultValue="elec">
                  <SelectTrigger className="bg-input min-h-[44px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elec" className="min-h-[44px]">Electricity (kWh)</SelectItem>
                    <SelectItem value="water" className="min-h-[44px]">Water (m³)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meter-code">Meter Code</Label>
                <Input type="text" id="meter-code" placeholder="e.g. ELEC-A-01" className="bg-input min-h-[44px]" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="reading">
                  Reading Value <span className="text-destructive" aria-hidden>*</span>
                </Label>
                <Input
                  type="number"
                  id="reading"
                  placeholder="Enter current reading"
                  className={cn(
                    "text-xl h-12 bg-input min-h-[44px]",
                    readingError && "border-destructive focus-visible:ring-destructive"
                  )}
                  value={reading}
                  onChange={(e) => {
                    setReading(e.target.value)
                    if (readingError) validateReading(e.target.value)
                  }}
                  onBlur={(e) => validateReading(e.target.value)}
                  required
                  aria-required="true"
                  aria-invalid={readingError}
                  aria-describedby={readingError ? "reading-error" : undefined}
                />
                {readingError ? (
                  <p id="reading-error" className="text-xs text-destructive" role="alert">
                    Reading value is required.
                  </p>
                ) : null}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes / Observations</Label>
                <Textarea id="notes" placeholder="Any abnormal conditions or visual notes?" className="min-h-[44px]" />
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-border">
              <Button type="submit" className="gap-2 shadow-[0_0_15px_hsl(var(--primary)/0.3)] min-h-[44px] min-w-[44px]">
                <Save className="w-4 h-4" />
                Submit Reading
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </TabsContent>

      <TabsContent value="history" className="mt-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><History className="w-5 h-5" /> Recent Inputs (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Meter</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInputs.map((input) => (
                  <TableRow key={input.id}>
                    <TableCell>{input.time}</TableCell>
                    <TableCell className="font-medium">{input.meter}</TableCell>
                    <TableCell>{formatWithUnit(Number(input.value), input.unit)}</TableCell>
                    <TableCell>{input.user}</TableCell>
                    <TableCell>
                      <Badge variant={input.status === 'Valid' ? 'success' : 'destructive'}>
                        {input.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="missing" className="mt-6">
        <Card className="glass-card border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive"><AlertCircle className="w-5 h-5" /> Missing Inputs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expected Time</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Meter</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {missingInputs.map((missing) => (
                  <TableRow key={missing.id}>
                    <TableCell className="text-destructive">{missing.expectedTime}</TableCell>
                    <TableCell>{missing.shift}</TableCell>
                    <TableCell className="font-medium">{missing.meter}</TableCell>
                    <TableCell>{missing.area}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="bg-muted hover:bg-muted min-h-[44px]">
                        Input Now
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      </Tabs>
    </div>
  )
}
