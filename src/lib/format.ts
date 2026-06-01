/** Locale Indonesia — pemisah ribuan ".", desimal "," */
const LOCALE_ID = 'id-ID'

type NumberFormatOptions = {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

function formatNumberCore(value: number, options?: NumberFormatOptions): string {
  return new Intl.NumberFormat(LOCALE_ID, {
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
  }).format(value)
}

/** Angka umum, contoh: 12.450 */
export function formatNumber(value: number): string {
  return formatNumberCore(value)
}

/** Angka desimal, contoh: 6,8 */
export function formatDecimal(value: number, fractionDigits = 1): string {
  return formatNumberCore(value, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
}

/** Persentase, contoh: 85,4% */
export function formatPercent(value: number, fractionDigits = 0): string {
  return `${formatNumberCore(value, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}%`
}

/** Angka + satuan, contoh: 12.450 kWh */
export function formatWithUnit(value: number, unit: string, fractionDigits?: number): string {
  const formatted =
    fractionDigits !== undefined ? formatDecimal(value, fractionDigits) : formatNumber(value)
  return `${formatted} ${unit}`
}

/** Format nilai penuh dalam Rupiah, contoh: Rp.12.450.000 */
export function formatIdr(amount: number): string {
  return `Rp.${formatNumber(amount)}`
}

/** Format nilai dalam juta rupiah (untuk grafik/KPI ringkas), contoh: Rp.480 jt */
export function formatIdrJuta(juta: number): string {
  return `Rp.${formatNumber(juta)} jt`
}

/** Format nilai juta menjadi Rupiah penuh (untuk tooltip grafik) */
export function jutaToIdr(juta: number): string {
  return formatIdr(juta * 1_000_000)
}

/** Formatter sumbu/tooltip Recharts */
export function chartNumberFormatter(value: number): string {
  return formatNumber(value)
}
