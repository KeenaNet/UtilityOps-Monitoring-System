# PRD — UtilityOps Monitoring System

## 1. Judul Project

**UtilityOps Monitoring System**  
**Web-Based Electricity, Compressor & Water Monitoring Platform with Automation**

---

## 2. Background

Saat ini pabrik sudah memiliki **datalogger eksisting** untuk monitoring konsumsi listrik dan compressor secara realtime yang berjalan di lingkungan **localhost**. Datalogger tersebut menyimpan data listrik dan compressor ke database lokal, dengan asumsi sementara menggunakan **MySQL**.

Selain sumber data otomatis dari datalogger, team utility juga melakukan pengecekan manual di setiap panel berdasarkan form. Data manual tersebut mencakup pembacaan **kWh panel listrik** dan **meteran air**, lalu saat ini diinput ke **Excel** sebagai proses berjalan.

Kondisi ini menyebabkan data utility tersebar dalam beberapa sumber:

1. Datalogger electricity realtime dan history.
2. Datalogger compressor realtime dan history.
3. Form pengecekan manual utility.
4. File Excel hasil input manual.

Sistem baru dirancang untuk menggabungkan sumber data tersebut ke dalam satu platform web yang mampu melakukan:

- Monitoring
- Alerting
- Reporting
- Analyzer
- Automation
- Deteksi abnormal usage
- Analisis konsumsi per shift, hari, minggu, bulan, semester, dan tahun

Sistem baru **tidak menggantikan datalogger eksisting**, tetapi berdampingan sebagai integration, analytics, dashboard, dan automation layer.

---

## 3. Problem Statement

Belum tersedia sistem terpusat yang mampu mengintegrasikan data utility dari datalogger otomatis dan input manual team utility ke dalam satu database dan dashboard yang dapat digunakan untuk monitoring, analisis konsumsi, deteksi anomali, alerting, dan reporting otomatis.

Akibatnya:

- Data realtime dan data manual masih terpisah.
- Data manual masih bergantung pada Excel.
- Analisis konsumsi per shift, hari, minggu, bulan, semester, dan tahun belum optimal.
- Abnormal usage sulit dideteksi secara cepat.
- Potensi pemborosan energi, air, dan compressed air terlambat diketahui.
- Laporan utility membutuhkan rekap manual.
- Alarm dan follow-up abnormal usage belum terotomasi.
- Management belum mendapatkan visibility yang ringkas, aktual, dan actionable.

---

## 4. Objective

Tujuan utama project ini adalah membangun sistem web yang mampu mengintegrasikan data utility otomatis dan manual ke dalam satu platform monitoring dan analisis.

### Objective Utama

1. Mengambil data electricity dan compressor dari datalogger eksisting secara aman.
2. Menyediakan form input web untuk pengecekan manual team utility.
3. Menghilangkan ketergantungan utama pada Excel sebagai media input manual.
4. Menyimpan seluruh data utility ke database sistem baru.
5. Menampilkan dashboard konsumsi listrik, compressor, dan air.
6. Menganalisis konsumsi berdasarkan shift, hari, minggu, bulan, semester, dan tahun.
7. Mendeteksi abnormal usage secara otomatis.
8. Memberikan alert jika terjadi kondisi abnormal.
9. Menghasilkan reporting otomatis.
10. Menggunakan n8n untuk automation, notification, reporting, dan escalation.

---

## 5. Target User

### 5.1 Primary User

- Team Utility
- Engineering
- Maintenance
- Supervisor Utility
- Supervisor Produksi
- Energy Management Team

### 5.2 Secondary User

- Manager Engineering
- Manager Produksi
- Plant Manager
- Cost Control
- Continuous Improvement / Kaizen Team
- HSE / Sustainability Team

### 5.3 Technical User

- Admin System
- IT / OT Support
- Automation Engineer
- Data Analyst
- Network Engineer

---

## 6. Scope

### 6.1 In Scope

Sistem mencakup:

1. Integrasi data dari datalogger electricity.
2. Integrasi data dari datalogger compressor.
3. Input manual web untuk pengecekan panel listrik dan meteran air.
4. Penyimpanan data ke database sistem baru.
5. Dashboard monitoring utility.
6. Grafik konsumsi by shift, hari, minggu, bulan, semester, dan tahun.
7. Alarm abnormal usage.
8. Deteksi anomali konsumsi.
9. Reporting otomatis.
10. n8n automation untuk alert, report, dan escalation.
11. User role dan akses dasar.
12. Export data/report ke Excel/PDF.
13. Audit trail input manual dan alarm follow-up.

### 6.2 Out of Scope untuk MVP

Untuk tahap awal, fitur berikut tidak masuk MVP:

1. Mengganti sistem datalogger eksisting.
2. Mengubah konfigurasi core datalogger tanpa approval IT/OT.
3. Mobile app native Android/iOS.
4. Machine learning advanced seperti LSTM atau deep learning.
5. Integrasi langsung ke semua mesin produksi.
6. Digital twin utility system.
7. Integrasi ERP/SAP.
8. Predictive maintenance compressor tingkat lanjut.
9. Auto-control mesin atau compressor.
10. Write-back command ke PLC/panel.

Catatan penting: sistem ini bersifat **monitoring dan decision support**, bukan control system.

---

## 7. Key Assumptions

**(Asumsi – dapat diubah oleh user)**

1. Datalogger electricity dan compressor menggunakan database MySQL.
2. Database datalogger hanya dapat diakses dari localhost.
3. Datalogger memiliki tabel realtime dan tabel history.
4. Data historis tersedia sekitar 2 tahun ke belakang.
5. Datalogger tidak langsung dibaca oleh dashboard, tetapi melalui local collector agent.
6. Data manual utility saat ini tersedia dalam bentuk form fisik atau form internal yang kemudian diinput ke Excel.
7. Sistem baru akan mengganti proses input Excel menjadi input web.
8. Excel masih dapat dipertahankan sebagai export/report, bukan media input utama.
9. Interval update datalogger masih perlu diverifikasi.
10. API datalogger belum pasti tersedia.
11. CSV export dari datalogger mungkin tersedia sebagai fallback.
12. Timestamp menggunakan timezone lokal.

---

## 8. Data Source

### 8.1 Source 1 — Datalogger Electricity

Sumber data otomatis dari datalogger listrik.

Parameter yang tersedia:

- kWh
- kW
- Ampere
- Voltage
- Power factor
- Timestamp lokal
- Tabel realtime
- Tabel history

Potensi analisis:

- Konsumsi listrik per shift
- Peak kW
- Abnormal high usage
- Low power factor
- Voltage abnormal
- Current imbalance jika data phase tersedia
- Energy trend
- Cost estimation

---

### 8.2 Source 2 — Datalogger Compressor

Sumber data otomatis dari datalogger compressor.

Parameter yang tersedia:

- Pressure / bar
- Running status
- kWh
- Flow
- Load status
- Unload status
- Timestamp lokal
- Tabel realtime
- Tabel history

Potensi analisis:

- Low pressure
- High pressure
- Pressure drop
- Compressor running but no flow
- High kWh with low flow
- Excessive unload
- Suspect air leak
- Compressor efficiency trend

---

### 8.3 Source 3 — Manual Utility Check Form

Sumber data manual dari team utility saat melakukan pengecekan ke panel dan meteran air.

Data manual yang diinput ke web:

- Tanggal pengecekan
- Jam pengecekan
- Shift
- Nama petugas
- Area
- Panel / meter name
- Meter code
- Jenis utility: electricity / water
- Reading kWh panel
- Reading meter air
- Unit: kWh / m³
- Kondisi visual panel/meter
- Catatan abnormal
- Foto bukti opsional
- Status validasi

Tujuan input manual:

- Menggantikan input Excel manual.
- Menyediakan data air yang belum tersedia dari datalogger.
- Menyediakan pembanding/verifikasi terhadap data datalogger.
- Membangun histori pengecekan utility yang terdokumentasi.
- Membuat audit trail petugas, waktu input, dan nilai meter.

---

## 9. Proposed Solution

Sistem baru akan dibangun sebagai platform web dengan database mandiri yang menerima data dari dua jalur utama:

1. **Automatic Data Ingestion** dari datalogger electricity dan compressor.
2. **Manual Web Input** dari pengecekan team utility untuk kWh panel dan meteran air.

Kedua data tersebut akan disimpan ke database sistem baru, kemudian digunakan oleh dashboard, analyzer, alarm engine, report engine, dan n8n automation.

### Arsitektur Konseptual

```text
Existing Datalogger Machine
├── MySQL localhost
│   ├── Realtime Electricity
│   ├── History Electricity
│   ├── Realtime Compressor
│   └── History Compressor
│
└── Local Python Collector Agent
        ↓ HTTP POST / Batch Upload

Monitoring Backend Server
├── FastAPI Ingestion API
├── PostgreSQL / TimescaleDB
├── Analyzer Engine
├── Report Engine
├── Dashboard API
│
├── Web Dashboard
│   ├── Monitoring
│   ├── Manual Input Form
│   ├── Alarm Center
│   ├── Analyzer
│   └── Reporting
│
└── n8n Automation
    ├── Alert Notification
    ├── Daily Report
    ├── Weekly Report
    ├── Monthly Report
    └── Escalation Workflow
```

---

## 10. User Flow

### 10.1 User Flow — Datalogger Automatic Data

```text
Datalogger records realtime data
↓
Local Python Collector reads MySQL localhost
↓
Collector normalizes data
↓
Collector sends data to backend ingestion API
↓
Backend stores data into system database
↓
Analyzer checks abnormal usage
↓
Dashboard updates latest data
↓
If abnormal, backend creates anomaly event
↓
n8n sends alert to PIC
```

---

### 10.2 User Flow — Manual Utility Input

```text
Team utility checks panel / water meter
↓
User opens web form
↓
User selects area, meter, shift, and utility type
↓
User inputs meter reading
↓
System validates input
↓
System stores reading into database
↓
System calculates usage delta from previous reading
↓
System checks abnormal usage
↓
Dashboard and report updated
↓
If abnormal, system creates alarm and triggers n8n
```

---

### 10.3 User Flow — Dashboard Monitoring

```text
User opens dashboard
↓
User selects utility type / area / period / shift
↓
System loads aggregated data
↓
Dashboard displays KPI, chart, trend, and alarm
↓
User reviews abnormal events
↓
User opens anomaly detail
↓
User assigns follow-up or closes issue
```

---

### 10.4 User Flow — Reporting

```text
User selects report type
↓
User selects period and area
↓
System generates report
↓
User downloads Excel/PDF
↓
Optional: n8n sends scheduled report automatically
```

---

## 11. Functional Requirements

### FR-001 — User Authentication & Role Access

Sistem harus menyediakan login dan pembagian role.

Role awal:

- Admin
- Utility Operator
- Supervisor
- Manager
- Viewer

Acceptance criteria:

- User dapat login.
- Role menentukan akses menu.
- Operator dapat input manual.
- Supervisor dapat validasi dan close alarm.
- Manager dapat melihat dashboard dan report.
- Admin dapat mengelola master data.

---

### FR-002 — Master Data Management

Sistem harus menyediakan master data untuk:

- Area
- Line
- Panel listrik
- Meter air
- Compressor
- Datalogger meter
- Shift
- User/PIC
- Threshold alarm
- Utility type

Acceptance criteria:

- Admin dapat membuat, mengubah, menonaktifkan master meter.
- Setiap meter memiliki kode unik.
- Meter dapat dikaitkan dengan area dan utility type.
- Shift dapat dikonfigurasi.
- Threshold dapat dikonfigurasi per meter atau area.

---

### FR-003 — Datalogger Collector Integration

Sistem harus menerima data dari local collector yang berjalan di mesin datalogger.

Acceptance criteria:

- Collector dapat membaca data dari MySQL localhost.
- Collector tidak membutuhkan expose MySQL ke jaringan luar.
- Collector mengirim data ke backend via API.
- Backend menerima payload electricity dan compressor.
- Sistem melakukan deduplication berdasarkan meter, parameter, dan timestamp.
- Sistem mencatat log error jika data gagal dikirim.

---

### FR-004 — Historical Backfill

Sistem harus mampu menarik data history datalogger secara bertahap.

Acceptance criteria:

- Data history dapat diambil berdasarkan range timestamp.
- Backfill berjalan batch, bukan sekaligus.
- Sistem dapat melanjutkan dari timestamp terakhir.
- Sistem tidak membuat duplikasi data.
- Sistem mencatat progress backfill.

---

### FR-005 — Manual Utility Input Web Form

Sistem harus menyediakan form input manual untuk team utility.

Field minimal:

- Date
- Time
- Shift
- Petugas
- Area
- Meter code
- Meter name
- Utility type
- Reading value
- Unit
- Notes
- Photo evidence optional

Acceptance criteria:

- User dapat input reading kWh panel.
- User dapat input reading meter air.
- Sistem otomatis membaca shift berdasarkan timestamp atau pilihan user.
- Sistem menolak input kosong.
- Sistem menolak nilai negatif.
- Sistem memberi warning jika reading lebih kecil dari reading sebelumnya.
- Sistem menyimpan audit trail input.
- Sistem menghitung usage delta dari reading sebelumnya.

---

### FR-006 — Manual Input Validation

Sistem harus memvalidasi data manual sebelum disimpan.

Validation rules:

- Reading value wajib numeric.
- Reading value tidak boleh negatif.
- Timestamp tidak boleh jauh di masa depan.
- Meter code wajib valid.
- Reading baru idealnya >= reading sebelumnya untuk meter akumulatif.
- Jika reading turun, user wajib memberi alasan.
- Jika usage delta terlalu besar, sistem memberi abnormal warning.

Acceptance criteria:

- Input invalid tidak dapat disimpan tanpa alasan.
- Input abnormal dapat disimpan dengan flag abnormal.
- Supervisor dapat melihat data yang perlu validasi.

---

### FR-007 — Dashboard Overview

Sistem harus menyediakan dashboard utama.

Komponen dashboard:

- Total kWh listrik hari ini
- Total kWh compressor hari ini
- Total pemakaian air hari ini
- Average pressure compressor
- Active alarm
- Top abnormal meter
- Trend konsumsi 24 jam
- Konsumsi by shift
- Status data update
- Manual input completion status

Acceptance criteria:

- Dashboard dapat difilter by area, utility type, dan period.
- Dashboard menampilkan data otomatis dan manual.
- Dashboard menampilkan status normal/warning/critical.
- Dashboard memperlihatkan last update dari datalogger dan input manual.

---

### FR-008 — Consumption Analytics

Sistem harus menyediakan analisis konsumsi.

Analisis minimal:

- By shift
- By day
- By week
- By month
- By semester
- By year
- By area
- By meter
- Actual vs baseline
- Actual vs target

Acceptance criteria:

- User dapat memilih periode analisis.
- User dapat membandingkan antar shift.
- User dapat melihat trend historis.
- User dapat export hasil analisis.

---

### FR-009 — Anomaly Detection

Sistem harus mendeteksi abnormal usage berdasarkan rule awal.

Rule electricity:

- High kW usage
- High kWh per shift
- Low power factor
- Voltage abnormal
- No data from datalogger

Rule compressor:

- Low pressure
- High pressure
- Pressure drop
- Running but no flow
- High kWh with low flow
- Excessive unload

Rule manual input:

- Reading turun dari pembacaan sebelumnya
- Usage delta terlalu tinggi
- Missing manual check
- Input terlambat
- Water usage abnormal

Acceptance criteria:

- Sistem membuat anomaly event saat rule terpenuhi.
- Setiap anomaly memiliki severity.
- Setiap anomaly memiliki status: open, acknowledged, in progress, closed.
- Anomaly dapat dikaitkan dengan PIC.

---

### FR-010 — Alarm Center

Sistem harus menyediakan halaman alarm center.

Fitur:

- Daftar alarm aktif
- Filter by severity
- Filter by utility type
- Filter by area
- Detail alarm
- Assign PIC
- Acknowledge alarm
- Close alarm
- Catatan tindakan
- Root cause
- Corrective action

Acceptance criteria:

- User dapat melihat alarm aktif.
- Supervisor dapat acknowledge dan close alarm.
- Semua perubahan status tercatat.
- Alarm critical dapat memicu escalation n8n.

---

### FR-011 — Reporting

Sistem harus menyediakan report otomatis dan manual.

Jenis report:

- Daily utility report
- Weekly utility report
- Monthly utility report
- Shift consumption report
- Abnormal usage report
- Manual input report
- Compressor performance report
- Water usage report

Acceptance criteria:

- User dapat generate report by period.
- Report dapat diexport ke Excel/PDF.
- Report dapat dikirim otomatis via n8n.
- Report menampilkan summary, chart, abnormal event, dan catatan follow-up.

---

### FR-012 — n8n Automation

Sistem harus terhubung dengan n8n untuk workflow otomatis.

Workflow awal:

1. Abnormal usage alert.
2. No data alert.
3. Missing manual input reminder.
4. Daily utility report.
5. Weekly summary report.
6. Escalation jika alarm tidak direspons.

Acceptance criteria:

- Backend dapat trigger webhook n8n.
- n8n dapat mengirim notifikasi.
- n8n dapat memanggil API sistem untuk update status.
- Workflow error tercatat.

---

## 12. Non-Functional Requirements

### 12.1 Performance

- Dashboard utama harus terbuka dalam waktu wajar untuk data harian dan mingguan.
- Query historical besar harus menggunakan agregasi.
- Data ingestion tidak boleh mengganggu performa datalogger.
- Historical backfill harus berjalan batch.

### 12.2 Reliability

- Collector harus memiliki retry mechanism.
- Sistem harus mencatat failed ingestion.
- Jika koneksi ke backend gagal, collector menyimpan queue lokal sementara.
- Sistem harus mendeteksi no data condition.

### 12.3 Security

- Database datalogger tidak diexpose langsung ke dashboard.
- Collector menggunakan credential read-only ke MySQL lokal.
- API ingestion harus menggunakan token/API key internal.
- Role-based access wajib tersedia.
- Audit trail wajib untuk input manual dan alarm action.

### 12.4 Maintainability

- Sistem harus modular.
- Data source harus dipisahkan dari dashboard logic.
- Rule anomaly harus configurable.
- Master data harus dapat diubah oleh admin.

### 12.5 Scalability

- Sistem harus bisa ditambah meter baru.
- Sistem harus bisa ditambah sumber data baru.
- Sistem harus mendukung growth data time-series.
- PostgreSQL cukup untuk MVP; TimescaleDB disiapkan jika data makin besar.

---

## 13. Data Requirements

### 13.1 Core Tables

#### `utility_meters`

```sql
meter_code
meter_name
utility_type
area
line
location
source_type
source_system
unit
active
```

#### `raw_utility_readings`

```sql
source_system
source_type
meter_code
parameter_name
value
unit
timestamp_source
timestamp_received
quality_status
raw_payload
```

#### `manual_meter_readings`

```sql
reading_id
meter_code
utility_type
reading_value
unit
reading_date
reading_time
shift_name
operator_id
area
notes
photo_url
validation_status
created_at
updated_at
```

#### `calculated_usage`

```sql
meter_code
utility_type
period_start
period_end
shift_name
start_reading
end_reading
usage_value
unit
source_type
calculation_status
```

#### `anomaly_events`

```sql
detected_at
meter_code
utility_type
anomaly_type
severity
actual_value
baseline_value
deviation_percent
message
status
assigned_to
acknowledged_at
closed_at
root_cause
corrective_action
```

#### `shift_schedules`

```sql
shift_name
start_time
end_time
active
```

#### `report_logs`

```sql
report_type
period_start
period_end
generated_by
file_url
sent_status
created_at
```

---

## 14. Integration Requirements

### 14.1 Datalogger MySQL Integration

Requirement:

- Local collector berjalan di mesin datalogger.
- Collector membaca MySQL localhost.
- Collector hanya menggunakan SELECT.
- Collector mengambil realtime dan history.
- Collector mengirim data ke backend sistem baru.

Data flow:

```text
MySQL localhost
↓
Python Collector
↓
FastAPI Ingestion API
↓
PostgreSQL / TimescaleDB
```

---

### 14.2 Manual Input Integration

Requirement:

- Form manual berada di web dashboard.
- Data langsung masuk ke database sistem baru.
- Excel tidak lagi menjadi input utama.
- Export Excel tetap tersedia untuk kebutuhan report.

Data flow:

```text
Utility Operator
↓
Web Manual Input Form
↓
Backend API
↓
Database Sistem Baru
↓
Analyzer + Report
```

---

### 14.3 n8n Integration

Requirement:

- Backend menyediakan webhook/event untuk n8n.
- n8n menerima anomaly payload.
- n8n mengirim alert ke channel komunikasi.
- n8n mengirim report berkala.
- n8n dapat update status jika diperlukan.

Data flow:

```text
Analyzer detects anomaly
↓
Backend creates anomaly event
↓
Backend calls n8n webhook
↓
n8n sends notification
↓
PIC acknowledges/follows up
↓
System updates alarm status
```

---

## 15. AI / Automation Requirements

### 15.1 Automation Requirements

n8n digunakan untuk:

1. Mengirim alert abnormal usage.
2. Mengirim no data alert.
3. Mengirim reminder input manual.
4. Mengirim daily report.
5. Mengirim weekly/monthly summary.
6. Melakukan escalation jika alarm tidak direspons.
7. Mencatat status pengiriman report.

### 15.2 AI Requirements — Optional Phase

AI tidak menjadi fitur MVP utama. AI dapat digunakan pada fase lanjut untuk:

- Membuat executive summary report.
- Menjelaskan kemungkinan penyebab anomali.
- Memberikan rekomendasi investigasi.
- Membuat narasi trend konsumsi.
- Membantu analisis saving opportunity.

Guardrail:

- AI tidak boleh menjadi sumber keputusan final.
- AI hanya memberi rekomendasi berbasis data.
- Output AI harus ditandai sebagai suggestion.
- Data sensitif tidak boleh dikirim ke cloud AI tanpa approval perusahaan.

---

## 16. Dashboard Requirements

### 16.1 Executive Dashboard

Target: Manager / Management

Konten:

- Total konsumsi listrik bulan berjalan
- Total konsumsi compressor bulan berjalan
- Total konsumsi air bulan berjalan
- Estimasi biaya
- Actual vs target
- Abnormal event summary
- Top area konsumsi tertinggi
- Trend bulanan
- Saving opportunity

---

### 16.2 Operational Dashboard

Target: Utility / Engineering

Konten:

- Latest reading datalogger
- Latest manual input
- Status meter
- Status collector
- Active alarm
- Trend 24 jam
- Pressure compressor
- kW/kWh realtime
- Manual input completion status

---

### 16.3 Shift Dashboard

Target: Supervisor

Konten:

- Konsumsi by shift
- Listrik per shift
- Compressor kWh per shift
- Air usage per shift
- Abnormal event per shift
- Shift comparison

---

### 16.4 Anomaly Dashboard

Target: Utility / Supervisor

Konten:

- Active anomaly
- Severity
- Area
- Meter
- Actual vs baseline
- Duration
- PIC
- Status follow-up
- Root cause
- Corrective action

---

### 16.5 Manual Input Dashboard

Target: Utility Operator / Supervisor

Konten:

- Form input reading
- List input hari ini
- Missing input
- Input abnormal
- Input pending validation
- History reading
- Export manual reading

---

## 17. Anomaly Detection Requirements

### 17.1 Rule-Based MVP

MVP menggunakan rule-based detection terlebih dahulu.

#### Electricity Rules

```text
IF current_kw > average_kw_same_shift_last_14_days × threshold
THEN HIGH_POWER_USAGE
```

```text
IF power_factor < configured_min_pf FOR configured_duration
THEN LOW_POWER_FACTOR
```

```text
IF no_data_duration > configured_limit
THEN NO_DATA_ELECTRICITY
```

#### Compressor Rules

```text
IF pressure_bar < min_pressure FOR configured_duration
THEN LOW_PRESSURE
```

```text
IF pressure_drop > configured_bar_drop WITHIN configured_minutes
THEN PRESSURE_DROP
```

```text
IF running_status = ON AND flow = 0 FOR configured_duration
THEN RUNNING_NO_FLOW
```

#### Manual Input Rules

```text
IF current_reading < previous_reading
THEN READING_DECREASED
```

```text
IF usage_delta > average_usage_same_meter × threshold
THEN ABNORMAL_MANUAL_USAGE
```

```text
IF scheduled_manual_check_not_submitted
THEN MISSING_MANUAL_CHECK
```

---

## 18. Reporting Requirements

### 18.1 Daily Report

Isi:

- Total kWh electricity
- Total kWh compressor
- Total air usage
- Average compressor pressure
- Abnormal event
- Missing manual input
- Top usage area
- Notes/follow-up

### 18.2 Weekly Report

Isi:

- Weekly trend
- Week-over-week comparison
- Top abnormal event
- Shift comparison
- Area ranking
- Follow-up status

### 18.3 Monthly Report

Isi:

- Monthly consumption
- Actual vs target
- Cost estimation
- Utility efficiency trend
- Abnormal event summary
- Recommendation for improvement

### 18.4 Manual Input Report

Isi:

- Input completion rate
- Late input
- Missing check
- Reading abnormal
- User/petugas input summary

---

## 19. Acceptance Criteria

Project MVP dianggap berhasil jika:

1. Sistem dapat menerima data electricity dari datalogger.
2. Sistem dapat menerima data compressor dari datalogger.
3. Sistem dapat menyimpan data datalogger ke database baru.
4. User dapat input manual kWh panel melalui web.
5. User dapat input manual meter air melalui web.
6. Sistem dapat menghitung usage delta dari manual reading.
7. Dashboard dapat menampilkan data electricity, compressor, dan water.
8. Dashboard dapat menampilkan konsumsi by shift, hari, minggu, dan bulan.
9. Sistem dapat mendeteksi minimal 5 jenis anomaly awal.
10. Sistem dapat membuat alarm event.
11. n8n dapat menerima webhook abnormal event.
12. n8n dapat mengirim notifikasi alert.
13. Sistem dapat generate daily report.
14. Sistem dapat export data/report ke Excel.
15. Sistem memiliki audit trail untuk input manual.

---

## 20. Success Metrics

### 20.1 Operational Metrics

- Manual input completion rate ≥ 95%.
- Missing input berkurang ≥ 80% dibanding proses Excel.
- Waktu rekap laporan harian berkurang ≥ 70%.
- Abnormal usage dapat terdeteksi di hari yang sama.
- Alarm critical memiliki response time yang tercatat.

### 20.2 Data Metrics

- Data ingestion success rate ≥ 98%.
- Duplicate data rate < 1%.
- Collector downtime terdeteksi otomatis.
- Data manual memiliki audit trail 100%.

### 20.3 Business Metrics

- Potensi pemborosan listrik/air/compressor lebih cepat teridentifikasi.
- Management mendapatkan report utility berkala tanpa rekap manual.
- Team utility memiliki single source of truth untuk monitoring utility.

---

## 21. Risks & Mitigation

| Risk | Impact | Mitigation |
|---|---:|---|
| MySQL datalogger hanya localhost | Integrasi dari server luar tidak bisa langsung | Gunakan local Python collector |
| Struktur tabel datalogger belum diketahui | Mapping data belum final | Lakukan schema discovery |
| Interval update belum jelas | Polling bisa terlalu cepat/lambat | Audit timestamp dan update interval |
| Query history terlalu berat | Mengganggu datalogger | Batch backfill dan limit query |
| Manual input tetap terlambat | Data air/kWh manual tidak lengkap | Reminder n8n dan completion dashboard |
| False alarm terlalu banyak | User mengabaikan alarm | Tuning threshold bertahap |
| Data manual salah input | Analisis keliru | Validasi input dan approval supervisor |
| n8n workflow gagal | Alert/report tidak terkirim | Error logging dan retry workflow |
| User kembali memakai Excel | Adoption gagal | Buat form web lebih cepat dari Excel dan tetap sediakan export |

---

## 22. MVP Plan

### Phase 1 — Discovery & Data Mapping

Output:

- Schema datalogger diketahui.
- Nama database dan tabel teridentifikasi.
- Mapping field electricity dan compressor selesai.
- Form manual existing dipetakan.
- Master meter awal dibuat.
- Shift schedule ditentukan.

Aktivitas:

- Audit MySQL datalogger.
- Cek tabel realtime dan history.
- Ambil sample data.
- Cek interval update.
- Mapping form manual Excel ke form web.

---

### Phase 2 — Core Database & Manual Input MVP

Output:

- Database sistem baru.
- Master data meter.
- Web form manual utility.
- Manual reading tersimpan ke database.
- Usage delta dihitung.

Aktivitas:

- Setup PostgreSQL.
- Buat table manual readings.
- Buat form input web.
- Buat validasi input.
- Buat halaman history manual input.

---

### Phase 3 — Datalogger Collector MVP

Output:

- Local collector berjalan.
- Data electricity dan compressor masuk ke database baru.
- Deduplication aktif.
- Collector log tersedia.

Aktivitas:

- Build Python collector.
- Read MySQL localhost.
- Kirim data ke FastAPI ingestion.
- Simpan raw readings.
- Test realtime data.

---

### Phase 4 — Dashboard & Basic Analyzer

Output:

- Dashboard monitoring utility.
- Chart konsumsi by shift/hari/minggu/bulan.
- Alarm basic.
- Anomaly event table.

Aktivitas:

- Build dashboard overview.
- Build operational dashboard.
- Build shift analysis.
- Build anomaly rule awal.
- Test abnormal event.

---

### Phase 5 — n8n Automation & Reporting

Output:

- Alert abnormal usage.
- Missing manual input reminder.
- Daily report otomatis.
- Export Excel/PDF.

Aktivitas:

- Buat webhook n8n.
- Buat workflow alert.
- Buat workflow daily report.
- Buat escalation logic.
- Test end-to-end alert.

---

## 23. Recommended Tech Stack

**(Asumsi – dapat diubah oleh user)**

Tech stack berikut dirancang untuk sistem monitoring utility berbasis web yang menggabungkan data dari datalogger electricity, datalogger compressor, manual input utility, dashboard analytics, anomaly detection, reporting, dan automation menggunakan n8n.

---

### 23.1 Core Framework & Language

| Area | Tech Stack | Fungsi | Rekomendasi |
|---|---|---|---|
| Frontend Web App | **Next.js + React + TypeScript + Tailwind CSS + shadcn/ui** | Membangun dashboard, form manual input, alarm center, reporting UI, dan halaman analytics | **Primary choice** |
| Backend API | **FastAPI + Python** | API ingestion, dashboard API, manual input API, anomaly endpoint, reporting endpoint | **Primary choice** |
| Collector Agent | **Python** | Local collector di mesin datalogger untuk membaca MySQL localhost dan mengirim data ke backend | **Wajib untuk integrasi datalogger** |
| Automation Layer | **n8n** | Alert, report, escalation, reminder manual input, webhook automation | **Primary automation tool** |
| Database | **PostgreSQL** | Database utama sistem baru untuk master data, manual input, alarm, report, dan data utility | **Primary DB untuk MVP** |
| Time-Series Extension | **TimescaleDB** | Optimasi data historis time-series jika volume data besar | **Optional / phase lanjut** |
| Datalogger Source DB | **MySQL** | Database eksisting datalogger electricity dan compressor | **Existing system, read-only** |
| Data Analysis | **Python Pandas / Polars** | Analisis historis, baseline, aggregation, anomaly calculation | **Phase analytics** |
| API Validation | **Pydantic** | Validasi request/response schema di FastAPI | **Recommended** |
| ORM / DB Access | **SQLAlchemy** | Query database backend secara terstruktur | **Recommended** |
| Migration Tool | **Alembic** | Versioning dan migration database schema | **Recommended** |

#### Keputusan Teknis

- Frontend menggunakan **Next.js + React + TypeScript + Tailwind CSS + shadcn/ui** agar dashboard modular, scalable, type-safe, dan UI konsisten.
- Backend menggunakan **FastAPI + Python** karena cocok untuk API, data processing, integration, dan anomaly logic.
- Collector menggunakan **Python** karena paling praktis untuk membaca MySQL lokal, CSV fallback, scheduling, retry, dan data normalization.
- n8n digunakan sebagai **workflow automation layer**, bukan sebagai raw data ingestion engine utama.
- PostgreSQL digunakan sebagai database utama MVP; TimescaleDB dipertimbangkan jika data time-series semakin besar.

---

### 23.2 Build Tool & Bundler

| Area | Tool | Fungsi | Catatan |
|---|---|---|---|
| Frontend Build | **Next.js built-in compiler/bundler** | Build dan optimize aplikasi frontend | Gunakan default Next.js build system |
| Package Manager | **pnpm** | Manajemen dependency frontend | Lebih efisien untuk project modern |
| JavaScript Runtime | **Node.js LTS** | Runtime build dan server Next.js | Gunakan versi LTS untuk stabilitas |
| Type Checking | **TypeScript** | Type safety frontend | Wajib untuk dashboard kompleks |
| Linting | **ESLint** | Menjaga kualitas kode frontend | Ikuti konfigurasi Next.js |
| Formatting | **Prettier** | Konsistensi format kode | Recommended |
| Backend Runtime | **Python 3.11+ / 3.12+** | Runtime backend FastAPI dan collector | Pilih versi stabil yang kompatibel library |
| Backend Server | **Uvicorn / Gunicorn + Uvicorn workers** | Menjalankan FastAPI di production | Gunakan reverse proxy di depan service |
| Backend Dependency | **uv** | Manajemen dependency Python | **Primary**; alternatif: pip-tools atau Poetry |
| Migration | **Alembic** | Database migration | Wajib untuk schema evolution |

#### Keputusan Teknis

- Untuk frontend, gunakan build system bawaan Next.js; tidak perlu menambah Vite kecuali project dipisah menjadi pure React SPA.
- Untuk backend, gunakan FastAPI dengan Uvicorn; production dapat memakai Gunicorn + Uvicorn worker.
- Gunakan TypeScript dari awal karena dashboard akan memiliki banyak entity: meter, area, shift, alarm, report, user, dan threshold.

---

### 23.3 Styling & UI Design

| Area | Tech Stack | Fungsi | Rekomendasi |
|---|---|---|---|
| Styling Base | **Tailwind CSS** | Utility-first styling untuk layout dashboard | **Primary styling** |
| UI Component | **shadcn/ui** | Komponen UI reusable seperti Button, Card, Table, Dialog, Form, Tabs, Dropdown | **Primary UI kit** |
| Component Primitive | **Radix UI** | Accessible UI primitive yang menjadi fondasi banyak komponen shadcn/ui | Digunakan melalui shadcn/ui |
| Icon | **Tabler Icons** (`@tabler/icons-react`) | Icon dashboard, alarm, report, action, utility | **Recommended** |
| Chart Utama | **Apache ECharts** | Grafik konsumsi, trend, shift comparison, anomaly chart | **Primary chart library** |
| Chart Sederhana (Optional) | **Recharts** | KPI card chart, sparkline, chart ringan di card | **Optional** |
| Table/Data Grid | **TanStack Table** | Tabel alarm, manual input, report, master meter | Recommended untuk filter/sort/pagination |
| Form Handling | **React Hook Form** | Form manual input, threshold config, master data | Recommended |
| Schema Validation Frontend | **Zod** | Validasi form frontend | Cocok dengan React Hook Form |
| Date/Time | **date-fns** | Format tanggal, shift calculation, periode report | **Primary**; alternatif ringan: Day.js |
| Locale Angka & Mata Uang | **`src/lib/format.ts`** (`Intl` locale `id-ID`) | Format angka, persen, satuan, dan Rupiah di seluruh UI | **Wajib** — jangan format manual di komponen |
| Theme | **Dark/Light Mode** | Dashboard utility untuk ruang monitoring | Recommended |

#### Format Angka, Satuan, dan Mata Uang (Konsistensi UI)

Semua nilai numerik yang ditampilkan ke user **wajib** diformat melalui utilitas frontend [`src/lib/format.ts`](../src/lib/format.ts), dengan locale **`id-ID`** (standar Indonesia).

**Aturan pemisah:**

| Jenis | Pemisah ribuan | Pemisah desimal | Contoh |
|---|---|---|---|
| Angka umum | `.` (titik) | `,` (koma) | `12.450` |
| Angka desimal | `.` (titik) | `,` (koma) | `6,8` |
| Persentase | `.` (titik) | `,` (koma) | `85,4%` |
| Mata uang (IDR) | `.` (titik) | tidak dipakai untuk nilai bulat | `Rp.12.450.000` |

**Fungsi yang harus dipakai (jangan duplikasi logika di halaman):**

| Fungsi | Penggunaan | Contoh output |
|---|---|---|
| `formatNumber(value)` | KPI, sumbu grafik, tooltip angka bulat | `12.450` |
| `formatDecimal(value, digits)` | Tekanan, nilai dengan desimal | `6,8` |
| `formatPercent(value, digits?)` | Perubahan %, efisiensi | `4,2%` |
| `formatWithUnit(value, unit, digits?)` | Konsumsi + satuan | `12.450 kWh`, `450 m³` |
| `formatIdr(amount)` | Biaya dalam Rupiah penuh | `Rp.12.450.000` |
| `formatIdrJuta(juta)` | Ringkasan biaya per juta (grafik) | `Rp.480 jt` |
| `jutaToIdr(juta)` | Tooltip grafik biaya → Rupiah penuh | `Rp.480.000.000` |

**Larangan:**

- Jangan memakai format Anglo-Saxon (`12,450.00` atau `$12,450`) di UI production.
- Jangan memanggil `toLocaleString('en-US')` atau menggabungkan string angka manual untuk tampilan user.
- Input form boleh menerima angka dari keyboard user; **tampilan** tabel/KPI/grafik tetap lewat `format.ts`.

**Grafik (Recharts / ECharts):**

- Sumbu Y dan tooltip memakai `formatNumber`, `formatWithUnit`, atau `formatIdr` / `jutaToIdr` sesuai konteks.
- Label legenda dan judul kartu memakai satuan SI yang sudah disepakati (`kWh`, `m³`, `Bar`, `Rp.`, `jt`).

**Tanggal & waktu** tetap memakai **date-fns** dengan locale `id` (terpisah dari format angka).

#### UI Design Direction

- Gunakan desain **Industrial Dashboard** yang dikombinasikan dengan efek **Glassmorphism**.
- **Keputusan Desain:** Sesuai preferensi user, efek Glassmorphism (seperti `backdrop-blur` dan `bg-white/5` pada card) tetap dipertahankan untuk memberikan kesan modern, namun tetap mengutamakan *readability* dan *high-contrast* yang menjadi ciri khas *industrial tools*.
- Komponen utama menggunakan **shadcn/ui** agar UI konsisten, modern, dan cepat dikembangkan.
- Dashboard harus memprioritaskan readability: KPI card, chart, status badge, alarm severity, dan filter periode.
- Hindari dashboard terlalu ramai. Fokus pada actionable information.

#### Komponen UI Prioritas

- KPI Cards
- Consumption Line Chart
- Shift Comparison Bar Chart
- Area Ranking Table
- Alarm Center Table
- Manual Input Form
- Meter Health Status
- Date Range Filter
- Utility Type Filter
- Severity Badge
- Dialog Detail Alarm
- Report Export Button
- Admin Configuration Form

---

### 23.4 Animasi & Interaksi

| Area | Tool | Fungsi | Catatan |
|---|---|---|---|
| UI Animation | **Motion** (formerly Framer Motion) | Animasi transisi card, modal, tab, alert, dan page transition | Gunakan secukupnya |
| Micro Interaction | **Tailwind CSS transition utilities** | Hover, active, focus, status change | Cukup untuk mayoritas interaksi |
| Chart Interaction | **Apache ECharts interaction** (Recharts optional) | Tooltip, zoom, legend toggle, data highlight | Penting untuk analisis konsumsi |
| Notification UI | **Sonner** | Toast sukses/gagal input, alert UI | **Recommended** (kompatibel shadcn/ui) |
| Realtime Refresh | **Polling / Server-Sent Events / WebSocket** | Update dashboard latest reading | MVP cukup polling; WebSocket/SSE untuk phase lanjut |
| Loading State | **Skeleton UI shadcn/ui** | Loading table, chart, dashboard card | Wajib untuk UX baik |
| Empty/Error State | **Custom State Component** | Jika data kosong, no data, atau collector down | Wajib untuk operasional |

#### Keputusan Teknis

- Untuk MVP, dashboard realtime cukup memakai **polling interval** 30–60 detik.
- WebSocket/SSE belum wajib kecuali data harus terasa realtime di bawah 5 detik.
- Animasi tidak boleh mengganggu readability dashboard operasional.
- Alarm critical harus lebih menonjol daripada animasi dekoratif.

---

### 23.5 Deployment

| Area | Tech Stack | Fungsi | Rekomendasi |
|---|---|---|---|
| Containerization | **Docker** | Membungkus frontend, backend, database, n8n | Recommended |
| Local Orchestration | **Docker Compose** | Deploy multi-service di server internal | **Primary deployment MVP** |
| Reverse Proxy | **Nginx** | Routing domain/subdomain, TLS internal, reverse proxy | **Default**; alternatif: Caddy atau Traefik |
| Frontend Runtime | **Next.js Node Server** | Menjalankan dashboard | Bisa dalam container |
| Backend Runtime | **FastAPI + Uvicorn/Gunicorn** | API service | Dalam container |
| Database | **PostgreSQL container / managed internal DB** | Database utama | Volume persistent wajib |
| Time-Series DB | **TimescaleDB container** | Optional untuk data besar | Phase lanjut |
| Automation | **n8n self-hosted** | Workflow automation internal | Dalam container, gunakan persistent volume |
| Collector Deployment | **Python service di mesin datalogger** | Membaca MySQL localhost dan mengirim ke backend | Dijalankan sebagai service/scheduled worker |
| Process Manager Collector | **systemd / NSSM / Windows Task Scheduler** | Menjaga collector tetap berjalan | Tergantung OS datalogger |
| Monitoring Logs | **Docker logs + file logs + optional Grafana/Prometheus** | Observability dasar | MVP minimal log file & health endpoint |
| Backup | **PostgreSQL dump + volume backup** | Backup database sistem baru | Jadwalkan otomatis |

#### Deployment Topology MVP

```text
Datalogger Machine
├── Existing MySQL localhost
└── Python Collector Service
        ↓ Internal HTTP/API

Monitoring Server
├── Docker Compose
│   ├── Next.js Dashboard
│   ├── FastAPI Backend
│   ├── PostgreSQL / TimescaleDB
│   ├── n8n
│   └── Reverse Proxy
│
└── Backup Job
```

#### Environment Recommendation

- Gunakan **self-hosted / internal server** karena data utility pabrik bersifat sensitif.
- Hindari cloud publik untuk MVP kecuali sudah mendapat approval keamanan data perusahaan.
- Datalogger MySQL tetap **localhost only**.
- Collector mengirim data keluar ke backend; backend tidak menarik langsung ke MySQL datalogger.
- Semua credential disimpan di `.env` atau secret manager internal.
- API ingestion wajib memakai token/API key.

#### Minimum Server MVP

| Komponen | Minimum |
|---|---|
| CPU | 4 core |
| RAM | 8–16 GB |
| Storage | SSD 250 GB+ |
| OS | Ubuntu Server LTS |
| Network | LAN internal stabil |
| Backup | External/NAS/internal backup path |

#### Production Consideration

- Pisahkan database dari app server jika data sudah besar.
- Gunakan TimescaleDB jika ingestion time-series tinggi.
- Gunakan retention policy untuk raw data.
- Buat aggregated table untuk dashboard agar query cepat.
- Buat health check untuk collector, backend, database, dan n8n.
- Gunakan internal DNS/subdomain seperti `utilityops.local`.

---

## 24. Open Questions

Hal yang masih perlu diverifikasi:

1. Nama database MySQL datalogger.
2. Nama tabel realtime electricity.
3. Nama tabel history electricity.
4. Nama tabel realtime compressor.
5. Nama tabel history compressor.
6. Struktur kolom tiap tabel.
7. Interval update datalogger aktual.
8. Apakah datalogger menyediakan API.
9. Apakah CSV export tersedia dan otomatis.
10. Format form manual utility saat ini.
11. Jumlah panel listrik yang dicek manual.
12. Jumlah meter air yang dicek manual.
13. Jadwal pengecekan manual per shift/hari.
14. PIC penerima alarm.
15. Channel notifikasi yang disetujui perusahaan.
16. Apakah data boleh dikirim ke AI cloud atau harus lokal/self-hosted.

---

## 25. Product Principle

Sistem ini harus mengikuti prinsip berikut:

1. **Do not disturb existing datalogger.**
2. **Web input must be easier than Excel.**
3. **Dashboard must lead to action, not just visualization.**
4. **Alarm must have owner and follow-up.**
5. **Analyzer starts with explainable rules before AI/ML.**
6. **Data quality is more important than feature quantity.**
7. **Automation should reduce manual reporting, not create new manual work.**

---

## 26. Final MVP Definition

MVP final untuk tahap awal:

> Sistem web yang mampu menerima data otomatis dari datalogger electricity dan compressor melalui local collector, menerima input manual kWh panel dan meter air dari team utility melalui form web, menyimpan seluruh data ke database sistem baru, menampilkan dashboard konsumsi utility, mendeteksi abnormal usage dasar, mengirim alert melalui n8n, dan menghasilkan daily report otomatis.

---

## 27. Summary

Project ini layak dibangun karena sudah memiliki fondasi data dari datalogger eksisting dan proses manual yang jelas. Nilai utama sistem bukan hanya dashboard, tetapi integrasi data otomatis dan manual menjadi satu sumber data yang dapat dianalisis, diberi alarm, dilaporkan, dan ditindaklanjuti.

Strategi terbaik adalah membangun sistem secara bertahap:

1. Rapikan data source.
2. Bangun input manual web.
3. Integrasikan datalogger via local collector.
4. Bangun dashboard dan analyzer.
5. Tambahkan n8n automation.
6. Baru lanjut ke AI insight jika data sudah stabil.

Kesimpulan desain:

```text
Datalogger Electricity + Compressor
        ↓
Local Python Collector
        ↓
Database Sistem Baru
        ↑
Manual Input Web Form
        ↓
Dashboard + Analyzer + Alarm
        ↓
n8n Automation + Reporting + Escalation
```

