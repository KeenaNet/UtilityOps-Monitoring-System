import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useSettings } from '@/context/SettingsContext'
import { IconBolt, IconGauge, IconDroplet, IconAlertTriangle, IconDeviceDesktopAnalytics, IconClipboardData, IconReportAnalytics, IconLanguage, IconSun, IconMoon } from '@tabler/icons-react'
import logoImg from '@/assets/utilityops_logo.png'

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { t, language, setLanguage, theme, setTheme } = useSettings()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      onLogin()
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left Panel - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 relative flex-col justify-between p-12 overflow-hidden border-r border-border/50">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <img 
                src={logoImg} 
                alt="UtilityOps Logo" 
                className="relative w-20 h-20 rounded-2xl shadow-2xl bg-white/80 dark:bg-slate-900/80 object-cover ring-1 ring-black/10 dark:ring-white/20 backdrop-blur-md" 
              />
            </div>
            <span className="text-3xl lg:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-white dark:to-white/70 leading-tight">
              UtilityOps Monitoring System
            </span>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold leading-tight">{t('login.valueProp')}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {t('login.heroDesc')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-2 shadow-xl">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <IconBolt size={18} className="text-yellow-600 dark:text-yellow-500" />
                <span className="text-sm font-medium">{t('login.kpi.electricity')}</span>
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">14,250 kWh</span>
            </div>
            <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-2 shadow-xl">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <IconGauge size={18} className="text-sky-600 dark:text-sky-500" />
                <span className="text-sm font-medium">{t('login.kpi.compressor')}</span>
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">7.5 bar</span>
            </div>
            <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-2 shadow-xl">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <IconDroplet size={18} className="text-blue-600 dark:text-blue-500" />
                <span className="text-sm font-medium">{t('login.kpi.water')}</span>
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">1,420 m³</span>
            </div>
            <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-2 shadow-xl">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <IconAlertTriangle size={18} className="text-red-600 dark:text-red-500" />
                <span className="text-sm font-medium">{t('login.kpi.alerts')}</span>
              </div>
              <span className="text-2xl font-bold text-red-600 dark:text-red-500">3</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-lg mt-12 text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-primary/10 dark:bg-primary/20 text-primary mt-1 shrink-0">
              <IconDeviceDesktopAnalytics size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('login.feat.monitoring')}</div>
              <div className="text-xs opacity-80 mt-1">{t('login.feat.monitoringDesc')}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-primary/10 dark:bg-primary/20 text-primary mt-1 shrink-0">
              <IconClipboardData size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('login.feat.manual')}</div>
              <div className="text-xs opacity-80 mt-1">{t('login.feat.manualDesc')}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-primary/10 dark:bg-primary/20 text-primary mt-1 shrink-0">
              <IconAlertTriangle size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('login.feat.anomaly')}</div>
              <div className="text-xs opacity-80 mt-1">{t('login.feat.anomalyDesc')}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-primary/10 dark:bg-primary/20 text-primary mt-1 shrink-0">
              <IconReportAnalytics size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('login.feat.reporting')}</div>
              <div className="text-xs opacity-80 mt-1">{t('login.feat.reportingDesc')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative">
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground">
            {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2 text-muted-foreground hover:text-foreground">
            <IconLanguage size={18} />
            {language === 'en' ? 'ID' : 'EN'}
          </Button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12">
          <div className="w-full max-w-[400px] space-y-8">
            <div className="text-center lg:text-left space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{t('login.title')}</h1>
              <p className="text-muted-foreground">{t('login.subtitle')}</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('login.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="operator@utilityops.local"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t('login.password')}</Label>
                    <a href="#" className="text-sm font-medium text-primary hover:underline underline-offset-4">
                      {t('login.forgotPassword')}
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('login.rememberMe')}
                </Label>
              </div>

              <Button type="submit" className="w-full h-11 text-base shadow-lg shadow-primary/25 transition-all">
                {t('login.signIn')}
              </Button>
            </form>
          </div>
        </div>

        <div className="p-8 text-center lg:text-left text-xs text-muted-foreground mt-auto border-t border-border/50 lg:border-none">
          <div className="flex flex-col sm:flex-row justify-between items-center max-w-[400px] mx-auto lg:max-w-none lg:mx-0">
            <span>{t('login.footerAuth')}</span>
            <span className="mt-2 sm:mt-0 font-medium">{t('login.footerVersion')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
