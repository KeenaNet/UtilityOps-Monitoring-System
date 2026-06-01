import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Activity } from 'lucide-react'
import { useSettings } from '@/context/SettingsContext'

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { t } = useSettings()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      onLogin()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      <Card className="w-full max-w-md glass-card z-10">
        <CardHeader className="space-y-3 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-2 shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">{t('login.title')}</CardTitle>
          <p className="text-sm text-muted-foreground">{t('login.subtitle')}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="operator@utilityops.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input focus-visible:ring-primary/50"
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-4 shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all"
            >
              {t('login.signIn')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
