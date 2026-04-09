import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  stepProcess, settingsForm, alertRow, bigResult,
  whatsappChat, emailPreview,
  type KpiData, type TableColumn, type WAChatMessage,
  type StepData, type SettingsField, type BarChartItem, type EmailData,
} from '../shared/components'

export const restaurantTemplate: TemplateDefinition = {
  meta: {
    id: 'restaurant',
    name: 'Restaurante Premium',
    industries: ['restaurant', 'restaurante', 'bar', 'cafe', 'cafetería', 'pizzeria', 'hostelería', 'hotel', 'catering', 'food', 'comida'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'reservations', 'menu', 'whatsapp', 'reviews', 'analytics', 'email', 'settings'],
    description: 'Plantilla premium para restaurantes, bares y hostelería. Dashboard con KPIs de reservas e ingresos, gestión de menú digital, simulación de reservas por WhatsApp, sistema de reseñas, analytics de rendimiento y email marketing.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as RestaurantMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'reservations', label: 'Reservas' },
      { id: 'menu', label: 'Carta' },
      { id: 'whatsapp', label: 'WhatsApp' },
      { id: 'reviews', label: 'Reseñas' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'email', label: 'Email' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || `${c.businessName} — Tu experiencia gastronómica`,
      md?.heroSubtitle || 'Reservas inteligentes, menú digital, comunicación automatizada y analytics en tiempo real.',
      [
        { value: md?.dailyCovers || 120, label: 'Cubiertos/Día' },
        { value: md?.monthlyRevenue || 45000, label: 'Ingresos/Mes', prefix: '€' },
        { value: md?.avgRating || 4.8, label: 'Valoración', suffix: '/5' },
        { value: md?.occupancyRate || '87%', label: 'Ocupación' },
      ],
      `Demo Interactivo — ${c.businessType || 'Restaurante'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '🍽️', label: 'Reservas Hoy', value: md?.reservationsToday || 34, trend: { value: '+8 vs ayer', direction: 'up' } },
      { icon: '💰', label: 'Facturación Hoy', value: md?.revenueToday || 4280, prefix: '€', trend: { value: '+15%', direction: 'up' } },
      { icon: '👥', label: 'Ocupación', value: md?.occupancy || 87, suffix: '%', trend: { value: '+5%', direction: 'up' } },
      { icon: '⭐', label: 'Rating Medio', value: md?.rating || 4.8, decimals: 1, suffix: '/5', trend: { value: '+0.2', direction: 'up' } },
    ]

    const popularDishes: BarChartItem[] = md?.popularDishes || [
      { label: 'Risotto de Setas', value: 89, color: 'var(--accent)' },
      { label: 'Entrecot Madurado', value: 76, color: 'var(--primary-light)' },
      { label: 'Pulpo a la Brasa', value: 64, color: 'var(--accent)' },
      { label: 'Tartar de Atún', value: 52, color: 'var(--primary-light)' },
      { label: 'Tiramisú Casero', value: 48, color: 'var(--accent)' },
    ]

    const dashAlerts = [
      alertRow('🔴', md?.alert1 || 'Mesa 7 — pedido especial: sin gluten', 'Alerta', 'badge-red'),
      alertRow('📦', md?.alert2 || 'Stock bajo: Trufa negra (quedan 200g)', '⚠️ Stock', 'badge-yellow'),
      alertRow('🎂', md?.alert3 || 'Cumpleaños mesa 12 — preparar tarta', 'VIP', 'badge-purple'),
      alertRow('⏰', md?.alert4 || 'Reserva grupo 20 pax a las 21:00', '20 pax', 'badge-blue'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Platos Más Pedidos</h3><span class="badge badge-accent">Esta semana</span></div>
          ${horizontalBarChart(popularDishes)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas del Servicio</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'RESTAURANTE', 'Panel de Control',
      'Vista en tiempo real del rendimiento de tu restaurante.',
      dashContent)

    // ── Reservations
    const resCols: TableColumn[] = [
      { label: 'Hora', key: 'time' },
      { label: 'Nombre', key: 'name' },
      { label: 'Pax', key: 'pax', align: 'center' },
      { label: 'Mesa', key: 'table', align: 'center' },
      { label: 'Estado', key: 'status' },
      { label: 'Notas', key: 'notes' },
    ]
    const resRows = md?.reservations || [
      { time: '13:00', name: 'García López', pax: '4', table: '3', status: '<span class="badge badge-green">Confirmada</span>', notes: 'Terraza preferida' },
      { time: '13:30', name: 'Martínez Ruiz', pax: '2', table: '7', status: '<span class="badge badge-green">Confirmada</span>', notes: 'Aniversario' },
      { time: '14:00', name: 'Fernández Vila', pax: '6', table: '12', status: '<span class="badge badge-yellow">Pendiente</span>', notes: 'Grupo empresa' },
      { time: '14:30', name: 'López Torres', pax: '3', table: '5', status: '<span class="badge badge-green">Confirmada</span>', notes: 'Sin gluten' },
      { time: '20:00', name: 'Rodríguez Pérez', pax: '8', table: '15-16', status: '<span class="badge badge-blue">WhatsApp</span>', notes: 'Cumpleaños — tarta' },
      { time: '20:30', name: 'Sánchez Moreno', pax: '2', table: '1', status: '<span class="badge badge-green">Confirmada</span>', notes: 'Vista al mar' },
      { time: '21:00', name: 'Empresa TechCo', pax: '20', table: 'Salón privado', status: '<span class="badge badge-purple">VIP</span>', notes: 'Menú cerrado' },
      { time: '21:30', name: 'Díaz Navarro', pax: '4', table: '9', status: '<span class="badge badge-yellow">Pendiente</span>', notes: '' },
    ]

    const occupancyByHour: BarChartItem[] = md?.occupancyByHour || [
      { label: '12:00-13:00', value: 45 },
      { label: '13:00-14:00', value: 92 },
      { label: '14:00-15:00', value: 88 },
      { label: '20:00-21:00', value: 95 },
      { label: '21:00-22:00', value: 78 },
      { label: '22:00-23:00', value: 40 },
    ]

    const resContent = `
      <div class="grid-2" style="align-items:start">
        <div class="card" style="grid-column:1/-1">${dataTable(resCols, resRows)}</div>
      </div>
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Ocupación por Franja</h3></div>
          ${horizontalBarChart(occupancyByHour, 100)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Resumen del Día</h3></div>
          ${kpiGrid([
            { icon: '📋', label: 'Total Reservas', value: md?.totalReservations || 42 },
            { icon: '👥', label: 'Comensales', value: md?.totalGuests || 156 },
            { icon: '🪑', label: 'Mesas Libres', value: md?.freeTables || 4 },
            { icon: '⏳', label: 'Lista Espera', value: md?.waitlist || 3 },
          ])}
        </div>
      </div>`

    const resSection = section('reservations', 'RESERVAS', 'Gestión de Reservas',
      'Control total de reservas con confirmación automática por WhatsApp.',
      resContent)

    // ── Menu section
    const menuItems = md?.menuItems || [
      { name: 'Risotto de Setas Silvestres', price: '€18.50', category: 'Principal', badge: 'TOP', badgeClass: 'badge-accent', desc: 'Arroz carnaroli, boletus, trufa negra, parmesano 24 meses' },
      { name: 'Entrecot Madurado 45 Días', price: '€32.00', category: 'Principal', badge: 'Premium', badgeClass: 'badge-purple', desc: 'Ternera gallega, guarnición de temporada, salsa de oporto' },
      { name: 'Pulpo a la Brasa', price: '€22.00', category: 'Principal', badge: '', badgeClass: '', desc: 'Pulpo gallego, patata confitada, pimentón de la Vera' },
      { name: 'Tartar de Atún Rojo', price: '€19.50', category: 'Entrante', badge: 'Nuevo', badgeClass: 'badge-green', desc: 'Atún rojo de almadraba, aguacate, sésamo, ponzu' },
      { name: 'Tiramisú Casero', price: '€9.50', category: 'Postre', badge: 'TOP', badgeClass: 'badge-accent', desc: 'Receta tradicional italiana, mascarpone, café espresso' },
      { name: 'Tarta de Queso Vasca', price: '€9.00', category: 'Postre', badge: '', badgeClass: '', desc: 'Textura cremosa, caramelo de fruta de la pasión' },
    ]

    const menuHtml = menuItems.map((item: Record<string, string>) => `
      <div class="card" style="padding:1.2rem">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:0.4rem">
          <div>
            <span style="font-size:0.64rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px">${item.category}</span>
            <h4 style="font-size:0.9rem;font-weight:700;margin-top:2px">${item.name}</h4>
          </div>
          <div style="text-align:right">
            <span style="font-size:1.1rem;font-weight:800;color:var(--accent)">${item.price}</span>
            ${item.badge ? `<div style="margin-top:4px"><span class="badge ${item.badgeClass}">${item.badge}</span></div>` : ''}
          </div>
        </div>
        <p style="font-size:0.76rem;color:var(--text-muted);line-height:1.5">${item.desc}</p>
      </div>
    `).join('')

    const menuContent = `
      <div class="grid-2">${menuHtml}</div>
      <div style="margin-top:1rem;display:flex;gap:0.5rem">
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px" onclick="showNotif('📱','QR Generado','Carta digital disponible en QR')">Generar QR</button>
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px;background:var(--bg-card);border:1px solid var(--border);color:var(--text)" onclick="showNotif('✏️','Editor','Modo edición activado')">Editar Carta</button>
      </div>`

    const menuSection = section('menu', 'CARTA DIGITAL', 'Menú del Restaurante',
      'Carta digital actualizable en tiempo real con QR para cada mesa.',
      menuContent)

    // ── WhatsApp
    const waMessages: WAChatMessage[] = md?.waMessages || [
      { from: 'client', text: `Hola, quiero reservar para el viernes a las 21:00`, time: '18:42' },
      { from: 'bot', text: `¡Hola! Soy el asistente de ${c.businessName} 🍽️ Perfecto, ¿para cuántas personas?`, time: '18:42' },
      { from: 'client', text: 'Somos 4, y si puede ser en terraza mejor', time: '18:43' },
      { from: 'bot', text: '📋 Viernes 21:00, 4 personas, terraza. Tengo la mesa 8 con vistas disponible. ¿La confirmo?', time: '18:43' },
      { from: 'client', text: 'Sí perfecto! Y es el cumpleaños de mi mujer, ¿podéis preparar algo?', time: '18:44' },
      { from: 'bot', text: '🎂 ¡Por supuesto! Anotado: tarta de cumpleaños incluida. Reserva confirmada:\n\n📅 Viernes 11/04\n🕘 21:00\n👥 4 personas\n🪑 Mesa 8 — Terraza\n🎂 Tarta cumpleaños\n\n¡Os esperamos! 🥂', time: '18:44' },
    ]

    const waSteps: StepData[] = [
      { title: 'Cliente escribe por WhatsApp', description: 'La IA detecta la intención: reserva, consulta, pedido...', icon: '💬' },
      { title: 'Verificación de disponibilidad', description: 'Se consulta en tiempo real las mesas y horarios libres.', icon: '🔍' },
      { title: 'Confirmación automática', description: 'Se asigna mesa, se confirma al cliente y se registra en el sistema.', detail: 'Incluye recordatorio automático 2h antes.', icon: '✅' },
      { title: 'Notificación al equipo', description: 'El personal recibe alerta con los detalles y notas especiales.', icon: '🔔' },
    ]

    const waContent = `
      <div class="grid-2" style="align-items:start">
        <div>
          <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:1rem">Simulación de Reserva</h3>
          ${whatsappChat('wa-reserva', c.businessName, c.businessName[0], waMessages)}
        </div>
        <div>
          <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:1rem">Flujo Automatizado</h3>
          ${stepProcess(waSteps)}
          <div style="margin-top:1.5rem">
            ${kpiGrid([
              { icon: '💬', label: 'Reservas/WhatsApp', value: md?.waReservations || 68, suffix: '%' },
              { icon: '⏱️', label: 'Tiempo Respuesta', value: md?.waResponseTime || '< 15s' },
            ])}
          </div>
        </div>
      </div>`

    const waSection = section('whatsapp', 'WHATSAPP IA', 'Reservas por WhatsApp',
      'Tu asistente virtual gestiona reservas, consultas y pedidos 24/7.',
      waContent)

    // ── Reviews
    const reviews = md?.reviews || [
      { name: 'María G.', rating: 5, text: 'Increíble experiencia. El risotto de setas es el mejor que he probado. Servicio impecable.', date: 'Hace 2 días', source: 'Google' },
      { name: 'Carlos R.', rating: 5, text: 'Cenamos para nuestro aniversario y fue perfecto. La terraza con vistas es mágica.', date: 'Hace 5 días', source: 'TripAdvisor' },
      { name: 'Laura M.', rating: 4, text: 'Muy buena cocina y ambiente. Solo pongo 4 por el tiempo de espera, pero mereció la pena.', date: 'Hace 1 semana', source: 'Google' },
      { name: 'Pedro S.', rating: 5, text: 'El sistema de reservas por WhatsApp es genial. Reservé en 30 segundos y hasta me prepararon tarta!', date: 'Hace 1 semana', source: 'Google' },
    ]

    const reviewsHtml = reviews.map((r: Record<string, string | number>) => `
      <div class="card" style="padding:1.2rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;color:#fff">${(r.name as string)[0]}</div>
            <div>
              <div style="font-weight:600;font-size:0.85rem">${r.name}</div>
              <div style="font-size:0.62rem;color:var(--text-dim)">${r.date} · ${r.source}</div>
            </div>
          </div>
          <div style="color:var(--accent);font-size:0.85rem">${'★'.repeat(r.rating as number)}${'☆'.repeat(5 - (r.rating as number))}</div>
        </div>
        <p style="font-size:0.8rem;color:var(--text-muted);line-height:1.5">${r.text}</p>
      </div>`).join('')

    const reviewsContent = `
      <div class="grid-2" style="margin-bottom:1.5rem">
        ${kpiGrid([
          { icon: '⭐', label: 'Rating Medio', value: md?.avgRating || 4.8, decimals: 1 },
          { icon: '📝', label: 'Total Reseñas', value: md?.totalReviews || 342 },
          { icon: '😊', label: '5 Estrellas', value: md?.fiveStarPct || 78, suffix: '%' },
          { icon: '📈', label: 'Tendencia', value: md?.reviewTrend || '+12%' },
        ])}
      </div>
      <div class="grid-2">${reviewsHtml}</div>`

    const revSection = section('reviews', 'RESEÑAS', 'Opiniones de Clientes',
      'Seguimiento de reseñas en Google, TripAdvisor y redes sociales.',
      reviewsContent)

    // ── Analytics
    const revenueByDay: BarChartItem[] = md?.revenueByDay || [
      { label: 'Lunes', value: 3200 },
      { label: 'Martes', value: 3800 },
      { label: 'Miércoles', value: 4100 },
      { label: 'Jueves', value: 4600 },
      { label: 'Viernes', value: 6800, color: 'var(--accent)' },
      { label: 'Sábado', value: 7200, color: 'var(--accent)' },
      { label: 'Domingo', value: 5400 },
    ]

    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Facturación Semanal</h3></div>
          ${horizontalBarChart(revenueByDay)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas Clave</h3></div>
          ${progressBar('Ticket medio vs objetivo', md?.avgTicketPct || 82, 'primary')}
          ${progressBar('Ocupación media', md?.avgOccupancy || 87, 'ok')}
          ${progressBar('Retorno de clientes', md?.returnRate || 64, 'accent')}
          ${progressBar('Margen bruto', md?.grossMargin || 71, 'ok')}
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${bigResult(
          md?.monthlyRevenueStr || '€45,200',
          md?.monthlyRevenueLabel || 'Facturación mensual proyectada',
          [
            { title: md?.avgTicket || '€38', subtitle: 'Ticket medio' },
            { title: md?.monthlyCovers || '3,600', subtitle: 'Cubiertos/mes' },
            { title: md?.foodCost || '28%', subtitle: 'Food cost' },
          ]
        )}
      </div>`

    const anaSection = section('analytics', 'RENDIMIENTO', 'Analytics del Restaurante',
      'Análisis detallado de facturación, ocupación y rendimiento.',
      analyticsContent)

    // ── Email Marketing
    const emails: EmailData[] = [
      {
        type: 'confirm', label: 'Confirmación', icon: '✅', badgeClass: 'badge-green',
        subject: `Reserva confirmada — ${c.businessName}`,
        body: `<p>Hola <strong>María</strong>,</p><p>Tu reserva está confirmada:</p><p>📅 <strong>Viernes 11/04 a las 21:00</strong><br>👥 4 personas — Mesa 8 (Terraza)<br>🎂 Nota: Tarta de cumpleaños preparada</p><p>Te esperamos con una experiencia especial. Si necesitas cambiar algo, responde a este email o escríbenos por WhatsApp.</p><p>¡Hasta pronto!<br><strong>${c.businessName}</strong></p>`,
      },
      {
        type: 'promo', label: 'Promoción', icon: '🎉', badgeClass: 'badge-accent',
        subject: `🍽️ Menú degustación especial este fin de semana`,
        body: `<p>Hola <strong>Carlos</strong>,</p><p>Este fin de semana tenemos algo especial para ti:</p><p>🍷 <strong>Menú Degustación Primavera</strong> — 7 platos + maridaje<br>💰 Precio especial: <strong>€65/persona</strong> (valor €95)<br>📅 Viernes y Sábado</p><p>Plazas limitadas. Reserva ahora respondiendo a este email.</p>`,
      },
      {
        type: 'feedback', label: 'Feedback', icon: '⭐', badgeClass: 'badge-yellow',
        subject: `¿Qué tal tu experiencia en ${c.businessName}?`,
        body: `<p>Hola <strong>Laura</strong>,</p><p>Gracias por visitarnos ayer. Tu opinión nos importa mucho.</p><p>¿Podrías dejarnos una reseña rápida? Solo toma 30 segundos:</p><p>⭐⭐⭐⭐⭐</p><p>Como agradecimiento, te enviamos un <strong>10% de descuento</strong> para tu próxima visita.</p>`,
      },
    ]

    const emailContent = emailPreview(emails, c.businessName)
    const emailSection = section('email', 'EMAIL MARKETING', 'Comunicación Automática',
      'Emails de confirmación, promociones y seguimiento enviados automáticamente.',
      emailContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre del restaurante', value: c.businessName, type: 'text' },
      { label: 'Email de contacto', value: md?.email || `reservas@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Hora apertura comida', value: md?.lunchOpen || '12:30', type: 'text' },
      { label: 'Hora apertura cena', value: md?.dinnerOpen || '20:00', type: 'text' },
      { label: 'Confirmación WhatsApp automática', value: '', type: 'toggle', enabled: true },
      { label: 'Recordatorio 2h antes', value: '', type: 'toggle', enabled: true },
      { label: 'Email post-visita automático', value: '', type: 'toggle', enabled: true },
      { label: 'Modo vacaciones', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes del Restaurante',
      'Personaliza horarios, notificaciones y automatizaciones.',
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
<style>${designSystemCSS(c.primaryColor, c.accentColor)}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${resSection}
${menuSection}
${waSection}
${revSection}
${anaSection}
${emailSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface RestaurantMockData {
  heroTagline?: string
  heroSubtitle?: string
  dailyCovers?: number
  monthlyRevenue?: number
  avgRating?: number
  occupancyRate?: string
  reservationsToday?: number
  revenueToday?: number
  occupancy?: number
  rating?: number
  popularDishes?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  reservations?: Record<string, string>[]
  occupancyByHour?: BarChartItem[]
  totalReservations?: number
  totalGuests?: number
  freeTables?: number
  waitlist?: number
  menuItems?: Record<string, string>[]
  waMessages?: WAChatMessage[]
  waReservations?: number
  waResponseTime?: string
  reviews?: Record<string, string | number>[]
  totalReviews?: number
  fiveStarPct?: number
  reviewTrend?: string
  revenueByDay?: BarChartItem[]
  avgTicketPct?: number
  avgOccupancy?: number
  returnRate?: number
  grossMargin?: number
  monthlyRevenueStr?: string
  monthlyRevenueLabel?: string
  avgTicket?: string
  monthlyCovers?: string
  foodCost?: string
  email?: string
  lunchOpen?: string
  dinnerOpen?: string
}
