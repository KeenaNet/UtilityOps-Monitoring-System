import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User, BellRing, Monitor } from 'lucide-react'

export default function Settings() {
  return (
    <div className="flex-1 overflow-auto bg-background/50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile */}
        <Card className="glass-card md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Profile</CardTitle>
            <CardDescription>Manage your personal account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-primary text-3xl font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                UO
              </div>
            </div>
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue="Utility Operator" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input defaultValue="operator@utilityops.local" disabled className="opacity-50" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input defaultValue="Utility Operator" disabled className="opacity-50" />
            </div>
            <Button className="w-full mt-4">Save Profile</Button>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <div className="md:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Monitor className="w-5 h-5 text-primary" /> Preferences</CardTitle>
              <CardDescription>Customize your UI and system preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select defaultValue="dark">
                    <SelectTrigger className="bg-black/50">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Sleek Dark Mode</SelectItem>
                      <SelectItem value="light">High Contrast Light</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Default View</Label>
                  <Select defaultValue="dash">
                    <SelectTrigger className="bg-black/50">
                      <SelectValue placeholder="Select view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dash">Dashboard</SelectItem>
                      <SelectItem value="alarm">Alarm Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BellRing className="w-5 h-5 text-primary" /> Notifications</CardTitle>
              <CardDescription>Configure how you receive alerts and reports.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div>
                  <h4 className="font-medium text-sm text-white">Critical Alarms</h4>
                  <p className="text-xs text-muted-foreground">Receive browser notifications for High severity alarms.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div>
                  <h4 className="font-medium text-sm text-white">Daily Reports</h4>
                  <p className="text-xs text-muted-foreground">Send daily utility summary to email.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
