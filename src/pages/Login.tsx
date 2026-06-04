import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ThemeLanguageToggles } from '@/components/layout/ThemeLanguageToggles'
import { useSettings } from '@/context/SettingsContext'
import { Bolt, Gauge, Droplet, TriangleAlert } from 'lucide-react'
import logoImg from '@/assets/utilityops_logo.png'

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useSettings()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !email.includes('@') || !password) {
      setError(t('login.internalError'))
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      onLogin()
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6 sm:p-8 lg:p-12 relative overflow-hidden text-foreground">
      {/* Background decorations (simplified) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]" />

      <ThemeLanguageToggles className="absolute top-4 right-4 z-20" />

      <div className="w-full max-w-md lg:max-w-lg relative z-10 flex flex-col gap-8 mt-8 sm:mt-0">
        
        {/* Branding & Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative shrink-0 mb-2">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <img 
              src={logoImg} 
              alt="UtilityOps Logo" 
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-xl bg-card object-cover ring-1 ring-border backdrop-blur-md" 
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/70 leading-tight">
              UtilityOps Monitoring System
            </h1>
            <p className="text-muted-foreground font-medium max-w-sm mx-auto">{t('login.valueProp')}</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">{t('login.title')}</h2>
            <p className="text-sm text-muted-foreground">{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg text-center font-medium">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="operator@utilityops.local"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-input"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('login.password')}</Label>
                  <a href="#" className="text-sm font-medium text-primary opacity-50 cursor-not-allowed" title={t('login.featureNotActive')} onClick={(e) => e.preventDefault()}>
                    {t('login.forgotPassword')}
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-input"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 opacity-50" title={t('login.featureNotActive')}>
              <Checkbox id="remember" disabled />
              <Label htmlFor="remember" className="text-sm font-normal cursor-not-allowed leading-none">
                {t('login.rememberMe')}
              </Label>
            </div>

            <Button type="submit" className="w-full h-11 text-base shadow-lg shadow-primary/25 transition-all" disabled={isLoading}>
              {isLoading ? t('login.signingIn') : t('login.signIn')}
            </Button>
          </form>
        </div>

        {/* Decorative KPI Preview */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-border" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('login.demoPreview')}</span>
            <div className="h-px w-12 bg-border" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 opacity-70 hover:opacity-100 transition-opacity">
            <div className="surface-muted rounded-xl p-3 flex flex-col gap-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Bolt size={14} className="text-chart-amber" />
                <span className="text-[11px] font-medium truncate">{t('login.kpi.electricity')}</span>
              </div>
              <span className="text-sm font-bold text-foreground">14,250 kWh</span>
            </div>
            <div className="surface-muted rounded-xl p-3 flex flex-col gap-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Gauge size={14} className="text-primary" />
                <span className="text-[11px] font-medium truncate">{t('login.kpi.compressor')}</span>
              </div>
              <span className="text-sm font-bold text-foreground">7.5 bar</span>
            </div>
            <div className="surface-muted rounded-xl p-3 flex flex-col gap-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Droplet size={14} className="text-chart-cyan" />
                <span className="text-[11px] font-medium truncate">{t('login.kpi.water')}</span>
              </div>
              <span className="text-sm font-bold text-foreground">1,420 m³</span>
            </div>
            <div className="surface-muted rounded-xl p-3 flex flex-col gap-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <TriangleAlert size={14} className="text-destructive" />
                <span className="text-[11px] font-medium truncate">{t('login.kpi.alerts')}</span>
              </div>
              <span className="text-sm font-bold text-destructive">3</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-1 mt-6">
          <p className="text-xs text-muted-foreground">{t('login.footerAuth')}</p>
          <p className="text-xs font-medium text-muted-foreground">{t('login.footerVersion')}</p>
        </div>

      </div>
    </div>
  )
}
