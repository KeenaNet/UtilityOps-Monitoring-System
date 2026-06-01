import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Edit2, Trash2 } from 'lucide-react'

const initialMeters = [
  { id: 'ELEC-A-01', name: 'Main Panel Line A', type: 'Electricity', area: 'Production Line A', status: 'Active' },
  { id: 'ELEC-B-01', name: 'Main Panel Line B', type: 'Electricity', area: 'Production Line B', status: 'Active' },
  { id: 'WAT-A-01', name: 'Water Meter Main', type: 'Water', area: 'Utility Building', status: 'Active' },
  { id: 'COMP-01', name: 'Compressor 1', type: 'Compressor', area: 'Utility Building', status: 'Maintenance' },
]

export default function MasterData() {
  const [meters] = useState(initialMeters)

  return (
    <div className="flex-1 overflow-auto bg-background/50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Master Data</h1>
        <Button className="gap-2 min-h-[44px]">
          <Plus className="w-4 h-4" /> Add New Record
        </Button>
      </div>

      <Tabs defaultValue="meters" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-input p-1 rounded-lg">
          <TabsTrigger value="meters" className="min-h-[40px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Meters</TabsTrigger>
          <TabsTrigger value="areas" className="min-h-[40px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Areas & Lines</TabsTrigger>
          <TabsTrigger value="thresholds" className="min-h-[40px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Thresholds</TabsTrigger>
          <TabsTrigger value="users" className="min-h-[40px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Users & Roles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="meters" className="mt-6">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Utility Meters</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search meters..." className="pl-8 bg-input min-h-[44px]" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Meter Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meters.map((meter) => (
                    <TableRow key={meter.id}>
                      <TableCell className="font-medium">{meter.id}</TableCell>
                      <TableCell>{meter.name}</TableCell>
                      <TableCell>{meter.type}</TableCell>
                      <TableCell>{meter.area}</TableCell>
                      <TableCell>
                        <Badge variant={meter.status === 'Active' ? 'success' : 'warning'}>
                          {meter.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="areas" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Areas & Production Lines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Area management configuration will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thresholds" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Alarm Thresholds</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Threshold configuration for anomaly detection will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Users & Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">User management and role assignment will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
