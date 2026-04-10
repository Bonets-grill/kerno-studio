import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  settingsForm, alertRow, bigResult,
  type KpiData, type TableColumn,
  type SettingsField, type BarChartItem,
} from '../shared/components'

export const bookingTemplate: TemplateDefinition = {
  meta: {
    id: 'booking',
    name: 'Reservas / Alojamiento',
    industries: ['booking', 'reservas', 'hotel', 'hostal', 'apartamento', 'vacation', 'alojamiento', 'accommodation', 'turismo', 'tourism', 'tours'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'rooms', 'reservations', 'calendar', 'guests', 'analytics', 'settings'],
    description: 'Plantilla premium para hoteles, hostales y alojamientos turísticos. Dashboard con ocupación, reservas, habitaciones, calendario, huéspedes y analytics de revenue.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as BookingMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'rooms', label: 'Habitaciones' },
      { id: 'reservations', label: 'Reservas' },
      { id: 'calendar', label: 'Calendario' },
      { id: 'guests', label: 'Huéspedes' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || 'Tu estancia perfecta',
      md?.heroSubtitle || 'Sistema de gestión de reservas inteligente con disponibilidad en tiempo real, check-in digital y experiencia premium para tus huéspedes.',
      [
        { value: md?.totalBookings || 1847, label: 'Reservas' },
        { value: md?.occupancyRate || '82%', label: 'Ocupación' },
        { value: md?.avgRating || '4.8', label: 'Rating' },
        { value: md?.monthlyRevenue || 68400, label: 'Ingresos/mes', prefix: '€' },
      ],
      `Demo Interactivo — ${c.businessType || 'Alojamiento'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '📅', label: 'Reservas Activas', value: md?.activeBookings || 34, trend: { value: '+6', direction: 'up' } },
      { icon: '🏨', label: 'Ocupación', value: md?.occupancy || 82, suffix: '%', trend: { value: '+4%', direction: 'up' } },
      { icon: '💰', label: 'Revenue/Noche', value: md?.revenuePerNight || 142, prefix: '€', trend: { value: '+€12', direction: 'up' } },
      { icon: '⭐', label: 'Valoración Media', value: md?.avgRatingNum || 4.8, decimals: 1, trend: { value: '+0.1', direction: 'up' } },
    ]

    const revenueByChannel: BarChartItem[] = md?.revenueByChannel || [
      { label: 'Reserva Directa', value: 28400, color: 'var(--primary-light)' },
      { label: 'Booking.com', value: 18200, color: 'var(--accent)' },
      { label: 'Airbnb', value: 12600, color: 'var(--primary-light)' },
      { label: 'Expedia', value: 5800, color: 'var(--accent)' },
      { label: 'Otros OTAs', value: 3400, color: 'var(--primary-light)' },
    ]

    const dashAlerts = [
      alertRow('🛬', md?.alert1 || '3 check-ins programados para hoy', 'Hoy', 'badge-blue'),
      alertRow('🛫', md?.alert2 || '2 check-outs pendientes de limpieza', 'Limpieza', 'badge-yellow'),
      alertRow('⭐', md?.alert3 || 'Nueva reseña 5 estrellas en Booking.com', '5★', 'badge-green'),
      alertRow('📊', md?.alert4 || 'Ocupación del fin de semana al 95%', 'Lleno', 'badge-accent'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Revenue por Canal</h3><span class="badge badge-accent">Este mes</span></div>
          ${horizontalBarChart(revenueByChannel)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', 'ALOJAMIENTO', 'Panel de Control',
      'Métricas clave de ocupación, reservas y revenue en tiempo real.',
      dashContent)

    // ── Rooms
    const rooms = md?.rooms || [
      { name: 'Suite Presidencial', type: 'Suite', capacity: 4, price: 320, status: 'occupied', floor: '5º', amenities: 'Jacuzzi, Terraza, Minibar', rating: 4.9 },
      { name: 'Suite Junior', type: 'Suite', capacity: 2, price: 195, status: 'occupied', floor: '4º', amenities: 'Vista al mar, Minibar', rating: 4.8 },
      { name: 'Deluxe Doble', type: 'Deluxe', capacity: 2, price: 145, status: 'available', floor: '3º', amenities: 'Balcón, Smart TV', rating: 4.7 },
      { name: 'Deluxe Individual', type: 'Deluxe', capacity: 1, price: 110, status: 'available', floor: '3º', amenities: 'Smart TV, Escritorio', rating: 4.6 },
      { name: 'Standard Doble', type: 'Standard', capacity: 2, price: 85, status: 'maintenance', floor: '2º', amenities: 'TV, A/C', rating: 4.4 },
      { name: 'Standard Individual', type: 'Standard', capacity: 1, price: 65, status: 'available', floor: '2º', amenities: 'TV, A/C', rating: 4.3 },
    ]

    const statusBadge = (status: string) => {
      switch (status) {
        case 'occupied': return '<span class="badge badge-blue">Ocupada</span>'
        case 'available': return '<span class="badge badge-green">Disponible</span>'
        case 'maintenance': return '<span class="badge badge-yellow">Mantenimiento</span>'
        case 'cleaning': return '<span class="badge badge-purple">Limpieza</span>'
        default: return '<span class="badge badge-primary">' + status + '</span>'
      }
    }

    const roomCards = rooms.map((r: RoomItem) => `
      <div class="card" style="padding:1.2rem;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;right:0;height:4px;background:${r.status === 'occupied' ? 'var(--info)' : r.status === 'available' ? 'var(--success)' : 'var(--warning)'}"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;margin-top:0.3rem">
          ${statusBadge(r.status)}
          <span style="font-size:0.68rem;color:var(--text-dim)">Planta ${r.floor}</span>
        </div>
        <h4 style="font-size:0.92rem;font-weight:700;margin-bottom:0.25rem">${r.name}</h4>
        <p style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.5rem">${r.type} · ${r.capacity} personas</p>
        <div style="font-size:0.7rem;color:var(--text-dim);margin-bottom:0.7rem">🏷️ ${r.amenities}</div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <span style="font-size:1.3rem;font-weight:800;color:var(--primary-light)">€${r.price}</span>
            <span style="font-size:0.68rem;color:var(--text-dim)">/noche</span>
          </div>
          <span style="font-size:0.72rem;color:var(--accent)">⭐ ${r.rating}</span>
        </div>
      </div>`).join('')

    const roomKpis: KpiData[] = [
      { icon: '🏨', label: 'Total Habitaciones', value: md?.totalRooms || 42 },
      { icon: '🟢', label: 'Disponibles', value: md?.availableRooms || 8 },
      { icon: '🔵', label: 'Ocupadas', value: md?.occupiedRooms || 31 },
      { icon: '🔧', label: 'Mantenimiento', value: md?.maintenanceRooms || 3 },
    ]

    const roomsContent = `
      ${kpiGrid(roomKpis)}
      <div class="grid-3" style="margin-top:1rem">${roomCards}</div>`

    const roomsSection = section('rooms', 'HABITACIONES', 'Gestión de Habitaciones',
      'Estado, disponibilidad y precios de todas las habitaciones.',
      roomsContent)

    // ── Reservations
    const resCols: TableColumn[] = [
      { label: 'Huésped', key: 'guest' },
      { label: 'Habitación', key: 'room' },
      { label: 'Check-in', key: 'checkin' },
      { label: 'Check-out', key: 'checkout' },
      { label: 'Noches', key: 'nights', align: 'center' },
      { label: 'Total', key: 'total', align: 'right' },
      { label: 'Estado', key: 'status' },
      { label: 'Canal', key: 'channel' },
    ]
    const resRows = md?.reservations || [
      { guest: 'Hans Müller', room: 'Suite Presidencial', checkin: '08 Abr', checkout: '12 Abr', nights: '4', total: '€1,280', status: '<span class="badge badge-green">Confirmada</span>', channel: '<span class="badge badge-blue">Directa</span>' },
      { guest: 'Marie Dubois', room: 'Suite Junior', checkin: '09 Abr', checkout: '14 Abr', nights: '5', total: '€975', status: '<span class="badge badge-green">Confirmada</span>', channel: '<span class="badge badge-accent">Booking</span>' },
      { guest: 'James Smith', room: 'Deluxe Doble', checkin: '10 Abr', checkout: '13 Abr', nights: '3', total: '€435', status: '<span class="badge badge-yellow">Pendiente</span>', channel: '<span class="badge badge-purple">Airbnb</span>' },
      { guest: 'Ana López', room: 'Standard Doble', checkin: '11 Abr', checkout: '15 Abr', nights: '4', total: '€340', status: '<span class="badge badge-green">Confirmada</span>', channel: '<span class="badge badge-blue">Directa</span>' },
      { guest: 'Marco Rossi', room: 'Deluxe Individual', checkin: '12 Abr', checkout: '16 Abr', nights: '4', total: '€440', status: '<span class="badge badge-green">Confirmada</span>', channel: '<span class="badge badge-accent">Booking</span>' },
      { guest: 'Sofia Petersen', room: 'Standard Individual', checkin: '14 Abr', checkout: '17 Abr', nights: '3', total: '€195', status: '<span class="badge badge-yellow">Pendiente</span>', channel: '<span class="badge badge-blue">Directa</span>' },
    ]

    const resContent = `<div class="card">${dataTable(resCols, resRows)}</div>`
    const resSection = section('reservations', 'RESERVAS', 'Gestión de Reservas',
      'Todas las reservas con fechas de entrada/salida, canal y estado.',
      resContent)

    // ── Calendar
    const calendarDays: CalendarDay[] = md?.calendarDays || generateCalendarDays()

    const dayGrid = calendarDays.map((d: CalendarDay) => {
      const bg = d.occupancy >= 90 ? 'rgba(239,68,68,0.2)' : d.occupancy >= 70 ? 'rgba(245,158,11,0.2)' : d.occupancy >= 40 ? 'rgba(59,130,246,0.15)' : 'rgba(34,197,94,0.1)'
      const border = d.occupancy >= 90 ? 'var(--danger)' : d.occupancy >= 70 ? 'var(--warning)' : d.occupancy >= 40 ? 'var(--info)' : 'var(--success)'
      return `<div style="background:${bg};border:1px solid ${border};border-radius:10px;padding:8px;text-align:center;min-height:60px">
        <div style="font-size:0.72rem;font-weight:700;margin-bottom:2px">${d.day}</div>
        <div style="font-size:1.1rem;font-weight:800;color:${border}">${d.occupancy}%</div>
        <div style="font-size:0.58rem;color:var(--text-dim)">${d.bookings} res.</div>
      </div>`
    }).join('')

    const calContent = `
      <div class="card">
        <div class="card-header">
          <h3>Abril 2026</h3>
          <div style="display:flex;gap:12px;align-items:center">
            <span style="display:flex;align-items:center;gap:4px;font-size:0.62rem;color:var(--text-dim)"><span style="width:8px;height:8px;border-radius:2px;background:rgba(34,197,94,0.5)"></span> &lt;40%</span>
            <span style="display:flex;align-items:center;gap:4px;font-size:0.62rem;color:var(--text-dim)"><span style="width:8px;height:8px;border-radius:2px;background:rgba(59,130,246,0.5)"></span> 40-70%</span>
            <span style="display:flex;align-items:center;gap:4px;font-size:0.62rem;color:var(--text-dim)"><span style="width:8px;height:8px;border-radius:2px;background:rgba(245,158,11,0.5)"></span> 70-90%</span>
            <span style="display:flex;align-items:center;gap:4px;font-size:0.62rem;color:var(--text-dim)"><span style="width:8px;height:8px;border-radius:2px;background:rgba(239,68,68,0.5)"></span> &gt;90%</span>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:8px">
          ${['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d => `<div style="text-align:center;font-size:0.62rem;font-weight:600;color:var(--text-dim);padding:4px 0">${d}</div>`).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px">
          ${dayGrid}
        </div>
      </div>`

    const calSection = section('calendar', 'CALENDARIO', 'Calendario de Ocupación',
      'Vista mensual de la ocupación con indicadores de disponibilidad.',
      calContent)

    // ── Guests
    const guestCols: TableColumn[] = [
      { label: 'Huésped', key: 'name' },
      { label: 'País', key: 'country' },
      { label: 'Visitas', key: 'visits', align: 'center' },
      { label: 'Noches Total', key: 'totalNights', align: 'center' },
      { label: 'Gasto Total', key: 'totalSpent', align: 'right' },
      { label: 'Última Estancia', key: 'lastStay' },
      { label: 'Rating', key: 'rating' },
    ]
    const guestRows = md?.guests || [
      { name: '👤 Hans Müller', country: '🇩🇪 Alemania', visits: '5', totalNights: '22', totalSpent: '€6,240', lastStay: 'Abr 2026', rating: '<span class="badge badge-green">⭐ 5.0</span>' },
      { name: '👤 Marie Dubois', country: '🇫🇷 Francia', visits: '3', totalNights: '14', totalSpent: '€3,120', lastStay: 'Abr 2026', rating: '<span class="badge badge-green">⭐ 4.8</span>' },
      { name: '👤 James Smith', country: '🇬🇧 Reino Unido', visits: '2', totalNights: '8', totalSpent: '€1,680', lastStay: 'Mar 2026', rating: '<span class="badge badge-green">⭐ 4.7</span>' },
      { name: '👤 Ana López', country: '🇪🇸 España', visits: '4', totalNights: '12', totalSpent: '€1,920', lastStay: 'Abr 2026', rating: '<span class="badge badge-green">⭐ 4.9</span>' },
      { name: '👤 Marco Rossi', country: '🇮🇹 Italia', visits: '1', totalNights: '4', totalSpent: '€780', lastStay: 'Abr 2026', rating: '<span class="badge badge-blue">⭐ 4.5</span>' },
      { name: '👤 Sofia Petersen', country: '🇸🇪 Suecia', visits: '2', totalNights: '10', totalSpent: '€2,100', lastStay: 'Feb 2026', rating: '<span class="badge badge-green">⭐ 4.8</span>' },
    ]

    const guestKpis: KpiData[] = [
      { icon: '👥', label: 'Total Huéspedes', value: md?.totalGuests || 2840 },
      { icon: '🔁', label: 'Recurrentes', value: md?.recurringGuests || 34, suffix: '%' },
      { icon: '🌍', label: 'Nacionalidades', value: md?.nationalities || 28 },
      { icon: '💶', label: 'Gasto Medio', value: md?.avgSpend || 420, prefix: '€' },
    ]

    const guestsContent = `
      ${kpiGrid(guestKpis)}
      <div class="card" style="margin-top:1rem">${dataTable(guestCols, guestRows)}</div>`

    const guestsSection = section('guests', 'HUÉSPEDES', 'Gestión de Huéspedes',
      'Historial de huéspedes, visitas recurrentes y gasto acumulado.',
      guestsContent)

    // ── Analytics
    const seasonalOccupancy: BarChartItem[] = md?.seasonalOccupancy || [
      { label: 'Enero', value: 45, color: 'var(--info)' },
      { label: 'Febrero', value: 52, color: 'var(--info)' },
      { label: 'Marzo', value: 68, color: 'var(--primary-light)' },
      { label: 'Abril', value: 82, color: 'var(--accent)' },
      { label: 'Mayo', value: 78, color: 'var(--primary-light)' },
      { label: 'Junio', value: 92, color: 'var(--accent)' },
    ]

    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Ocupación por Mes (%)</h3></div>
          ${horizontalBarChart(seasonalOccupancy, 100)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas de Revenue</h3></div>
          ${progressBar('ADR (Avg Daily Rate)', md?.adrPct || 74, 'primary')}
          ${progressBar('RevPAR', md?.revparPct || 62, 'accent')}
          ${progressBar('Direct Booking %', md?.directPct || 48, 'ok')}
          ${progressBar('Repeat Guest Rate', md?.repeatPct || 34, 'primary')}
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${bigResult(
          md?.annualRevenueStr || '€820,800',
          md?.annualRevenueLabel || 'Revenue Anual Proyectado',
          [
            { title: md?.adr || '€142', subtitle: 'ADR' },
            { title: md?.revpar || '€116', subtitle: 'RevPAR' },
            { title: md?.avgStay || '3.4 noches', subtitle: 'Estancia media' },
          ]
        )}
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'Métricas de Revenue',
      'Ocupación estacional, ADR, RevPAR y métricas hoteleras clave.',
      analyticsContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre del alojamiento', value: c.businessName, type: 'text' },
      { label: 'URL de reservas', value: md?.bookingUrl || `reservas.${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'text' },
      { label: 'Email de recepción', value: md?.receptionEmail || `recepcion@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Check-in digital', value: '', type: 'toggle', enabled: true },
      { label: 'Notificaciones de reserva', value: '', type: 'toggle', enabled: true },
      { label: 'Sincronización OTAs', value: '', type: 'toggle', enabled: true },
      { label: 'Modo temporada baja', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes del Alojamiento',
      'Check-in digital, sincronización con OTAs y configuración general.',
      settContent)

    // ── Footer
    const footer = `<div class="footer">© 2026 ${c.businessName} — Prototipo generado por <strong style="color:var(--accent)">Kerno Studio</strong></div>`

    // ── Assemble
    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.businessName} — Demo Interactivo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'neon')}

/* ═══════════ BOOKING OVERRIDES — Quicksand font, ocean-blue dark ═══════════ */
body {
  font-family: 'Quicksand', sans-serif !important;
  background: #0a0d12 !important;
}
.nav { background: rgba(10,13,18,0.92) !important; border-bottom: 1px solid rgba(56,189,248,0.1) !important; }
.card { border-radius: 16px !important; background: rgba(15,20,30,0.8) !important; border: 1px solid rgba(56,189,248,0.08) !important; }
.kpi { border-radius: 16px !important; background: linear-gradient(135deg, rgba(15,20,30,0.9), rgba(20,30,45,0.7)) !important; border: 1px solid rgba(56,189,248,0.08) !important; }
.hero-h1 { font-family: 'Quicksand', sans-serif !important; }
.badge { border-radius: 100px !important; }

/* Room cards with top status bar */
.grid-3 > .card { transition: transform 0.3s, box-shadow 0.3s; }
.grid-3 > .card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(56,189,248,0.1); }
</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${roomsSection}
${resSection}
${calSection}
${guestsSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

function generateCalendarDays(): CalendarDay[] {
  // April 2026 starts on Wednesday (index 2), generate 2 placeholder + 30 days
  const occupancies = [
    72, 68, 85, 92, 95, // 1-5 (Wed-Sun)
    55, 48, 62, 70, 78, 88, 94, // 6-12
    52, 45, 58, 65, 75, 90, 96, // 13-19
    50, 42, 55, 68, 80, 92, 98, // 20-26
    48, 40, 52, 65, // 27-30
  ]
  const days: CalendarDay[] = []
  // Padding for Wed start (Mon, Tue are empty)
  days.push({ day: '', occupancy: 0, bookings: 0 })
  days.push({ day: '', occupancy: 0, bookings: 0 })
  for (let i = 0; i < 30; i++) {
    const occ = occupancies[i] || 50
    days.push({ day: String(i + 1), occupancy: occ, bookings: Math.round(occ * 42 / 100) })
  }
  return days
}

interface CalendarDay {
  day: string
  occupancy: number
  bookings: number
}

interface RoomItem {
  name: string
  type: string
  capacity: number
  price: number
  status: string
  floor: string
  amenities: string
  rating: number
}

interface BookingMockData {
  heroTagline?: string
  heroSubtitle?: string
  totalBookings?: number
  occupancyRate?: string
  avgRating?: string
  monthlyRevenue?: number
  activeBookings?: number
  occupancy?: number
  revenuePerNight?: number
  avgRatingNum?: number
  revenueByChannel?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  rooms?: RoomItem[]
  totalRooms?: number
  availableRooms?: number
  occupiedRooms?: number
  maintenanceRooms?: number
  reservations?: Record<string, string>[]
  calendarDays?: CalendarDay[]
  guests?: Record<string, string>[]
  totalGuests?: number
  recurringGuests?: number
  nationalities?: number
  avgSpend?: number
  seasonalOccupancy?: BarChartItem[]
  adrPct?: number
  revparPct?: number
  directPct?: number
  repeatPct?: number
  annualRevenueStr?: string
  annualRevenueLabel?: string
  adr?: string
  revpar?: string
  avgStay?: string
  bookingUrl?: string
  receptionEmail?: string
}
