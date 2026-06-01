import type { AppPage } from '@/context/AppState'
import type { AppLanguage } from '@/lib/settingsStorage'

export type TranslationKey =
  | 'app.name'
  | 'nav.executive'
  | 'nav.dashboard'
  | 'nav.shift'
  | 'nav.analytics'
  | 'nav.anomaly'
  | 'nav.manualInput'
  | 'nav.alarmCenter'
  | 'nav.reporting'
  | 'nav.masterData'
  | 'nav.settings'
  | 'nav.logout'
  | 'page.executive'
  | 'page.dashboard'
  | 'page.shift'
  | 'page.analytics'
  | 'page.anomaly'
  | 'page.manualInput'
  | 'page.alarmCenter'
  | 'page.reporting'
  | 'page.masterData'
  | 'page.settings'
  | 'topbar.systemOnline'
  | 'topbar.lastUpdate'
  | 'topbar.openMenu'
  | 'topbar.closeMenu'
  | 'sidebar.closeMenu'
  | 'sidebar.closeOverlay'
  | 'filter.ariaLabel'
  | 'filter.dateRange'
  | 'filter.period'
  | 'filter.utility'
  | 'filter.area'
  | 'filter.severity'
  | 'filter.status'
  | 'filter.pic'
  | 'filter.reset'
  | 'filter.period.today'
  | 'filter.period.yesterday'
  | 'filter.period.week'
  | 'filter.period.month'
  | 'filter.period.semester'
  | 'filter.period.year'
  | 'filter.utility.all'
  | 'filter.utility.electricity'
  | 'filter.utility.water'
  | 'filter.utility.compressor'
  | 'filter.severity.all'
  | 'filter.severity.critical'
  | 'filter.severity.high'
  | 'filter.severity.medium'
  | 'filter.severity.low'
  | 'filter.status.all'
  | 'filter.status.active'
  | 'filter.status.open'
  | 'filter.status.acknowledged'
  | 'filter.status.inProgress'
  | 'filter.status.closed'
  | 'filter.pic.all'
  | 'filter.pic.unassigned'
  | 'filter.pic.eng1'
  | 'filter.pic.util1'
  | 'settings.title'
  | 'settings.profile'
  | 'settings.profileDesc'
  | 'settings.fullName'
  | 'settings.email'
  | 'settings.role'
  | 'settings.saveProfile'
  | 'settings.preferences'
  | 'settings.preferencesDesc'
  | 'settings.theme'
  | 'settings.theme.dark'
  | 'settings.theme.light'
  | 'settings.language'
  | 'settings.language.id'
  | 'settings.language.en'
  | 'settings.defaultView'
  | 'settings.notifications'
  | 'settings.notificationsDesc'
  | 'settings.criticalAlarms'
  | 'settings.criticalAlarmsDesc'
  | 'settings.dailyReports'
  | 'settings.dailyReportsDesc'
  | 'login.title'
  | 'login.subtitle'
  | 'login.email'
  | 'login.password'
  | 'login.signIn'
  | 'common.save'
  | 'common.reset'

const id: Record<TranslationKey, string> = {
  'app.name': 'UtilityOps',
  'nav.executive': 'Ringkasan Eksekutif',
  'nav.dashboard': 'Dashboard Operasional',
  'nav.shift': 'Dashboard Shift',
  'nav.analytics': 'Analitik',
  'nav.anomaly': 'Dashboard Anomali',
  'nav.manualInput': 'Input Manual',
  'nav.alarmCenter': 'Pusat Alarm',
  'nav.reporting': 'Pelaporan',
  'nav.masterData': 'Master Data',
  'nav.settings': 'Pengaturan',
  'nav.logout': 'Keluar',
  'page.executive': 'Ringkasan Eksekutif',
  'page.dashboard': 'Dashboard Operasional',
  'page.shift': 'Dashboard Shift',
  'page.analytics': 'Analitik Konsumsi',
  'page.anomaly': 'Dashboard Anomali',
  'page.manualInput': 'Input Manual',
  'page.alarmCenter': 'Pusat Alarm',
  'page.reporting': 'Pelaporan',
  'page.masterData': 'Master Data',
  'page.settings': 'Pengaturan',
  'topbar.systemOnline': 'Sistem Online',
  'topbar.lastUpdate': 'Pembaruan terakhir: Baru saja',
  'topbar.openMenu': 'Buka menu navigasi',
  'topbar.closeMenu': 'Tutup menu navigasi',
  'sidebar.closeMenu': 'Tutup menu',
  'sidebar.closeOverlay': 'Tutup overlay menu',
  'filter.ariaLabel': 'Filter data dashboard',
  'filter.dateRange': 'Rentang tanggal',
  'filter.period': 'Periode',
  'filter.utility': 'Jenis utility',
  'filter.area': 'Area / plant',
  'filter.severity': 'Tingkat severity',
  'filter.status': 'Status',
  'filter.pic': 'PIC',
  'filter.reset': 'Reset',
  'filter.period.today': 'Hari ini',
  'filter.period.yesterday': 'Kemarin',
  'filter.period.week': 'Minggu ini',
  'filter.period.month': 'Bulan ini',
  'filter.period.semester': 'Semester ini',
  'filter.period.year': 'Tahun ini',
  'filter.utility.all': 'Semua Utility',
  'filter.utility.electricity': 'Listrik',
  'filter.utility.water': 'Air',
  'filter.utility.compressor': 'Kompresor',
  'filter.severity.all': 'Semua Severity',
  'filter.severity.critical': 'Kritis',
  'filter.severity.high': 'Tinggi',
  'filter.severity.medium': 'Sedang',
  'filter.severity.low': 'Rendah',
  'filter.status.all': 'Semua Status',
  'filter.status.active': 'Aktif / Terbuka',
  'filter.status.open': 'Terbuka',
  'filter.status.acknowledged': 'Diakui',
  'filter.status.inProgress': 'Dalam Proses',
  'filter.status.closed': 'Ditutup',
  'filter.pic.all': 'Semua PIC',
  'filter.pic.unassigned': 'Belum ditugaskan',
  'filter.pic.eng1': 'Tim Engineering 1',
  'filter.pic.util1': 'Operator Utility 1',
  'settings.title': 'Pengaturan',
  'settings.profile': 'Profil',
  'settings.profileDesc': 'Kelola detail akun pribadi Anda.',
  'settings.fullName': 'Nama Lengkap',
  'settings.email': 'Alamat Email',
  'settings.role': 'Peran',
  'settings.saveProfile': 'Simpan Profil',
  'settings.preferences': 'Preferensi',
  'settings.preferencesDesc': 'Sesuaikan tampilan UI dan preferensi sistem.',
  'settings.theme': 'Tema',
  'settings.theme.dark': 'Sleek Dark Mode',
  'settings.theme.light': 'High Contrast Light',
  'settings.language': 'Bahasa',
  'settings.language.id': 'Bahasa Indonesia',
  'settings.language.en': 'English',
  'settings.defaultView': 'Tampilan Default',
  'settings.notifications': 'Notifikasi',
  'settings.notificationsDesc': 'Atur cara Anda menerima alarm dan laporan.',
  'settings.criticalAlarms': 'Alarm Kritis',
  'settings.criticalAlarmsDesc': 'Terima notifikasi browser untuk alarm severity tinggi.',
  'settings.dailyReports': 'Laporan Harian',
  'settings.dailyReportsDesc': 'Kirim ringkasan utility harian ke email.',
  'login.title': 'Portal UtilityOps',
  'login.subtitle': 'Masuk ke akun Anda',
  'login.email': 'Email',
  'login.password': 'Kata Sandi',
  'login.signIn': 'Masuk',
  'common.save': 'Simpan',
  'common.reset': 'Reset',
}

const en: Record<TranslationKey, string> = {
  'app.name': 'UtilityOps',
  'nav.executive': 'Executive Summary',
  'nav.dashboard': 'Operational Dash',
  'nav.shift': 'Shift Dashboard',
  'nav.analytics': 'Analytics',
  'nav.anomaly': 'Anomaly Dashboard',
  'nav.manualInput': 'Manual Input',
  'nav.alarmCenter': 'Alarm Center',
  'nav.reporting': 'Reporting',
  'nav.masterData': 'Master Data',
  'nav.settings': 'Settings',
  'nav.logout': 'Logout',
  'page.executive': 'Executive Summary',
  'page.dashboard': 'Operational Dashboard',
  'page.shift': 'Shift Dashboard',
  'page.analytics': 'Consumption Analytics',
  'page.anomaly': 'Anomaly Dashboard',
  'page.manualInput': 'Manual Input',
  'page.alarmCenter': 'Alarm Center',
  'page.reporting': 'Reporting',
  'page.masterData': 'Master Data',
  'page.settings': 'Settings',
  'topbar.systemOnline': 'System Online',
  'topbar.lastUpdate': 'Last update: Just now',
  'topbar.openMenu': 'Open navigation menu',
  'topbar.closeMenu': 'Close navigation menu',
  'sidebar.closeMenu': 'Close menu',
  'sidebar.closeOverlay': 'Close menu overlay',
  'filter.ariaLabel': 'Dashboard data filters',
  'filter.dateRange': 'Date range',
  'filter.period': 'Period',
  'filter.utility': 'Utility type',
  'filter.area': 'Area / plant',
  'filter.severity': 'Severity',
  'filter.status': 'Status',
  'filter.pic': 'PIC',
  'filter.reset': 'Reset',
  'filter.period.today': 'Today',
  'filter.period.yesterday': 'Yesterday',
  'filter.period.week': 'This Week',
  'filter.period.month': 'This Month',
  'filter.period.semester': 'This Semester',
  'filter.period.year': 'This Year',
  'filter.utility.all': 'All Utilities',
  'filter.utility.electricity': 'Electricity',
  'filter.utility.water': 'Water',
  'filter.utility.compressor': 'Compressor',
  'filter.severity.all': 'All Severities',
  'filter.severity.critical': 'Critical',
  'filter.severity.high': 'High',
  'filter.severity.medium': 'Medium',
  'filter.severity.low': 'Low',
  'filter.status.all': 'All Statuses',
  'filter.status.active': 'Active / Open',
  'filter.status.open': 'Open',
  'filter.status.acknowledged': 'Acknowledged',
  'filter.status.inProgress': 'In Progress',
  'filter.status.closed': 'Closed',
  'filter.pic.all': 'All PIC',
  'filter.pic.unassigned': 'Unassigned',
  'filter.pic.eng1': 'Engineering Team 1',
  'filter.pic.util1': 'Utility Operator 1',
  'settings.title': 'Settings',
  'settings.profile': 'Profile',
  'settings.profileDesc': 'Manage your personal account details.',
  'settings.fullName': 'Full Name',
  'settings.email': 'Email Address',
  'settings.role': 'Role',
  'settings.saveProfile': 'Save Profile',
  'settings.preferences': 'Preferences',
  'settings.preferencesDesc': 'Customize your UI and system preferences.',
  'settings.theme': 'Theme',
  'settings.theme.dark': 'Sleek Dark Mode',
  'settings.theme.light': 'High Contrast Light',
  'settings.language': 'Language',
  'settings.language.id': 'Bahasa Indonesia',
  'settings.language.en': 'English',
  'settings.defaultView': 'Default View',
  'settings.notifications': 'Notifications',
  'settings.notificationsDesc': 'Configure how you receive alerts and reports.',
  'settings.criticalAlarms': 'Critical Alarms',
  'settings.criticalAlarmsDesc': 'Receive browser notifications for High severity alarms.',
  'settings.dailyReports': 'Daily Reports',
  'settings.dailyReportsDesc': 'Send daily utility summary to email.',
  'login.title': 'UtilityOps Portal',
  'login.subtitle': 'Log in to your account',
  'login.email': 'Email',
  'login.password': 'Password',
  'login.signIn': 'Sign In',
  'common.save': 'Save',
  'common.reset': 'Reset',
}

const dictionaries: Record<AppLanguage, Record<TranslationKey, string>> = { id, en }

export function translate(key: TranslationKey, language: AppLanguage): string {
  return dictionaries[language][key] ?? key
}

export const navKeyByPage: Record<AppPage, TranslationKey> = {
  executive: 'nav.executive',
  dashboard: 'nav.dashboard',
  shift: 'nav.shift',
  analytics: 'nav.analytics',
  anomaly: 'nav.anomaly',
  'manual-input': 'nav.manualInput',
  'alarm-center': 'nav.alarmCenter',
  reporting: 'nav.reporting',
  'master-data': 'nav.masterData',
  settings: 'nav.settings',
}

export const pageTitleKeyByPage: Record<AppPage, TranslationKey> = {
  executive: 'page.executive',
  dashboard: 'page.dashboard',
  shift: 'page.shift',
  analytics: 'page.analytics',
  anomaly: 'page.anomaly',
  'manual-input': 'page.manualInput',
  'alarm-center': 'page.alarmCenter',
  reporting: 'page.reporting',
  'master-data': 'page.masterData',
  settings: 'page.settings',
}

/** Pages available as default landing view (excludes settings) */
export const defaultViewPages: AppPage[] = [
  'executive',
  'dashboard',
  'shift',
  'analytics',
  'anomaly',
  'manual-input',
  'alarm-center',
  'reporting',
  'master-data',
]
