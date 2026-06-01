import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export type ExportColumn = { key: string; header: string }

export type ExportSheet = {
  name: string
  columns: ExportColumn[]
  rows: Record<string, string | number>[]
}

export type PdfSection = {
  heading: string
  columns: ExportColumn[]
  rows: Record<string, string | number>[]
}

export type PdfExportOptions = {
  title: string
  period?: string
  subtitle?: string
}

function rowsToAoA(columns: ExportColumn[], rows: Record<string, string | number>[]) {
  const headers = columns.map((c) => c.header)
  const body = rows.map((row) => columns.map((c) => row[c.key] ?? ''))
  return [headers, ...body]
}

export function exportToExcel(filename: string, sheets: ExportSheet[]) {
  const workbook = XLSX.utils.book_new()

  for (const sheet of sheets) {
    const aoa = rowsToAoA(sheet.columns, sheet.rows)
    const worksheet = XLSX.utils.aoa_to_sheet(aoa)
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name.slice(0, 31))
  }

  XLSX.writeFile(workbook, filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`)
}

export function exportToPdf(filename: string, options: PdfExportOptions, sections: PdfSection[]) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const generatedAt = new Date().toLocaleString('id-ID')

  doc.setFontSize(16)
  doc.text(options.title, 14, 18)

  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text(`Generated: ${generatedAt}`, 14, 26)
  if (options.period) doc.text(`Period: ${options.period}`, 14, 32)
  if (options.subtitle) doc.text(options.subtitle, 14, options.period ? 38 : 32)

  let startY = options.period && options.subtitle ? 44 : options.period || options.subtitle ? 38 : 32

  sections.forEach((section, index) => {
    if (index > 0) startY += 8
    doc.setFontSize(12)
    doc.setTextColor(0)
    doc.text(section.heading, 14, startY)

    autoTable(doc, {
      startY: startY + 4,
      head: [section.columns.map((c) => c.header)],
      body: section.rows.map((row) => section.columns.map((c) => String(row[c.key] ?? ''))),
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [30, 64, 175] },
      margin: { left: 14, right: 14 },
    })

    const lastTable = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable
    startY = lastTable?.finalY ?? startY + 40
  })

  doc.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`)
}
