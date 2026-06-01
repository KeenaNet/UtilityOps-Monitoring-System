import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Activity } from 'lucide-react'

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login logic
    if (email && password) {
      onLogin()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <Card className="w-full max-w-md glass-card border-white/10 z-10">
        <CardHeader className="space-y-3 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">UtilityOps Portal</CardTitle>
          <p className="text-sm text-muted-foreground">Log in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="operator@utilityops.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/50 border-white/10 focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/50 border-white/10 focus-visible:ring-primary/50"
              />
            </div>
            <Button type="submit" className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
