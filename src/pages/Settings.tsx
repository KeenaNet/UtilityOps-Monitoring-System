import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User, BellRing, Monitor, Languages } from 'lucide-react'
import { useSettings } from '@/context/SettingsContext'
import { defaultViewPages, pageTitleKeyByPage } from '@/lib/i18n'
import type { AppLanguage, ThemeMode } from '@/lib/settingsStorage'

export default function Settings() {
  const { theme, language, defaultView, setTheme, setLanguage, setDefaultView, t } = useSettings()

  return (
    <div className="flex-1 overflow-auto bg-background/50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('settings.title')}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> {t('settings.profile')}
            </CardTitle>
            <CardDescription>{t('settings.profileDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-primary text-3xl font-bold shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                UO
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('settings.fullName')}</Label>
              <Input defaultValue="Utility Operator" className="bg-input" />
            </div>
            <div className="space-y-2">
              <Label>{t('settings.email')}</Label>
              <Input defaultValue="operator@utilityops.local" disabled className="opacity-50 bg-input" />
            </div>
            <div className="space-y-2">
              <Label>{t('settings.role')}</Label>
              <Input defaultValue="Utility Operator" disabled className="opacity-50 bg-input" />
            </div>
            <Button className="w-full mt-4">{t('settings.saveProfile')}</Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" /> {t('settings.preferences')}
              </CardTitle>
              <CardDescription>{t('settings.preferencesDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('settings.theme')}</Label>
                  <Select value={theme} onValueChange={(v) => setTheme(v as ThemeMode)}>
                    <SelectTrigger className="bg-input">
                      <SelectValue placeholder={t('settings.theme')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">{t('settings.theme.dark')}</SelectItem>
                      <SelectItem value="light">{t('settings.theme.light')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5">
                    <Languages className="h-4 w-4" aria-hidden />
                    {t('settings.language')}
                  </Label>
                  <Select value={language} onValueChange={(v) => setLanguage(v as AppLanguage)}>
                    <SelectTrigger className="bg-input">
                      <SelectValue placeholder={t('settings.language')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">{t('settings.language.id')}</SelectItem>
                      <SelectItem value="en">{t('settings.language.en')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>{t('settings.defaultView')}</Label>
                  <Select value={defaultView} onValueChange={(v) => setDefaultView(v as typeof defaultView)}>
                    <SelectTrigger className="bg-input">
                      <SelectValue placeholder={t('settings.defaultView')} />
                    </SelectTrigger>
                    <SelectContent>
                      {defaultViewPages.map((page) => (
                        <SelectItem key={page} value={page}>
                          {t(pageTitleKeyByPage[page])}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellRing className="w-5 h-5 text-primary" /> {t('settings.notifications')}
              </CardTitle>
              <CardDescription>{t('settings.notificationsDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 surface-muted rounded-lg">
                <div>
                  <h4 className="font-medium text-sm text-foreground">{t('settings.criticalAlarms')}</h4>
                  <p className="text-xs text-muted-foreground">{t('settings.criticalAlarmsDesc')}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
              </div>
              <div className="flex items-center justify-between p-3 surface-muted rounded-lg">
                <div>
                  <h4 className="font-medium text-sm text-foreground">{t('settings.dailyReports')}</h4>
                  <p className="text-xs text-muted-foreground">{t('settings.dailyReportsDesc')}</p>
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
