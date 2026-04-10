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

export const socialTemplate: TemplateDefinition = {
  meta: {
    id: 'social',
    name: 'Red Social Premium',
    industries: ['social', 'community', 'comunidad', 'red social', 'social network', 'foro', 'forum', 'chat', 'messaging', 'discord'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'feed', 'members', 'channels', 'moderation', 'analytics', 'settings'],
    description: 'Plantilla premium para redes sociales y comunidades. Dashboard con KPIs de usuarios y engagement, feed de publicaciones, gestión de miembros, canales, moderación de contenido, analytics de crecimiento y configuración.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as SocialMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'feed', label: 'Feed' },
      { id: 'members', label: 'Miembros' },
      { id: 'channels', label: 'Canales' },
      { id: 'moderation', label: 'Moderación' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || `${c.businessName} — Tu Comunidad, Tu Mundo`,
      md?.heroSubtitle || 'Conecta, comparte y crece con una comunidad vibrante. Engagement real, moderación inteligente y analytics potentes.',
      [
        { value: md?.totalMembers || 45200, label: 'Miembros' },
        { value: md?.dailyPosts || 1240, label: 'Posts/Día' },
        { value: md?.engagementRate || 8.4, label: 'Engagement', suffix: '%' },
        { value: md?.growthRate || 12, label: 'Crecimiento', suffix: '%/mes' },
      ],
      `Demo Interactivo — ${c.businessType || 'Red Social'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '👥', label: 'Usuarios Activos', value: md?.dau || 12400, trend: { value: '+840 hoy', direction: 'up' } },
      { icon: '📝', label: 'Posts Hoy', value: md?.postsToday || 1240, trend: { value: '+22%', direction: 'up' } },
      { icon: '💬', label: 'Comentarios Hoy', value: md?.commentsToday || 4680, trend: { value: '+15%', direction: 'up' } },
      { icon: '📈', label: 'Engagement', value: md?.engagementToday || 8.4, suffix: '%', decimals: 1, trend: { value: '+1.2%', direction: 'up' } },
    ]

    const activityByHour: BarChartItem[] = md?.activityByHour || [
      { label: '08:00-10:00', value: 1200 },
      { label: '10:00-12:00', value: 2800 },
      { label: '12:00-14:00', value: 3400, color: 'var(--accent)' },
      { label: '14:00-16:00', value: 2600 },
      { label: '16:00-18:00', value: 3100 },
      { label: '18:00-20:00', value: 4200, color: 'var(--accent)' },
      { label: '20:00-22:00', value: 3800, color: 'var(--accent)' },
      { label: '22:00-00:00', value: 1900 },
    ]

    const dashAlerts = [
      alertRow('🔔', md?.alert1 || 'Post viral: "Tips de productividad" — 2,340 likes en 2h', 'Trending', 'badge-accent'),
      alertRow('🚨', md?.alert2 || '3 contenidos reportados en #off-topic — revisar', 'Moderación', 'badge-red'),
      alertRow('🎉', md?.alert3 || 'Comunidad alcanza 45,000 miembros — hito desbloqueado', 'Hito', 'badge-purple'),
      alertRow('📊', md?.alert4 || 'Engagement semanal +18% vs semana anterior', 'KPI', 'badge-green'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Actividad por Hora</h3><span class="badge badge-accent">Hoy</span></div>
          ${horizontalBarChart(activityByHour)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Notificaciones</h3><span class="badge badge-primary">${md?.alertCount || 4} nuevas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'COMUNIDAD', 'Panel de Control',
      'Vista en tiempo real de la actividad y el crecimiento de tu comunidad.',
      dashContent)

    // ── Feed
    const postsData = md?.posts || [
      { author: '@elena_dev', avatar: 'E', role: 'Admin', content: 'Acabamos de lanzar la v2.0 del sistema de notificaciones. Ahora las notificaciones se agrupan por tipo y podeis silenciar canales individualmente. Que os parece?', likes: 234, comments: 45, shares: 12, time: 'Hace 2h', badge: 'badge-purple' },
      { author: '@carlos_ux', avatar: 'C', role: 'Moderador', content: 'Nuevo tutorial: Como disenar interfaces accesibles con contraste adecuado. Link en bio. Aceptamos sugerencias para el proximo tema!', likes: 189, comments: 32, shares: 28, time: 'Hace 4h', badge: 'badge-blue' },
      { author: '@maria_pm', avatar: 'M', role: 'Miembro Pro', content: 'Mi equipo acaba de cerrar un sprint de 2 semanas con 0 bugs en produccion. La clave? Code reviews exhaustivas y testing automatizado. Thread con nuestro proceso abajo.', likes: 456, comments: 67, shares: 89, time: 'Hace 6h', badge: 'badge-green' },
      { author: '@jorge_data', avatar: 'J', role: 'Miembro', content: 'Alguien ha probado la nueva API de embeddings de OpenAI? Los resultados para busqueda semantica son brutales. Comparto benchmark en los comentarios.', likes: 123, comments: 41, shares: 15, time: 'Hace 8h', badge: 'badge-primary' },
    ]

    const feedCards = postsData.map((p: Record<string, string | number>) => `
      <div class="card" style="padding:1.5rem;margin-bottom:1rem">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem">
          <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1rem;color:#fff">${p.avatar}</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-weight:700;font-size:0.88rem">${p.author}</span>
              <span class="badge ${p.badge}" style="font-size:0.58rem">${p.role}</span>
            </div>
            <span style="font-size:0.68rem;color:var(--text-dim)">${p.time}</span>
          </div>
        </div>
        <p style="font-size:0.85rem;line-height:1.65;color:var(--text-muted);margin-bottom:1rem">${p.content}</p>
        <div style="display:flex;gap:1.5rem;padding-top:0.8rem;border-top:1px solid var(--border)">
          <span style="font-size:0.76rem;color:var(--text-dim);cursor:pointer">❤️ ${(p.likes as number).toLocaleString()}</span>
          <span style="font-size:0.76rem;color:var(--text-dim);cursor:pointer">💬 ${p.comments}</span>
          <span style="font-size:0.76rem;color:var(--text-dim);cursor:pointer">🔄 ${p.shares}</span>
        </div>
      </div>
    `).join('')

    const feedContent = `
      <div style="max-width:700px">${feedCards}</div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '📝', label: 'Posts Hoy', value: md?.feedPostsToday || 1240 },
          { icon: '❤️', label: 'Likes Hoy', value: md?.feedLikesToday || 18400 },
          { icon: '💬', label: 'Comentarios', value: md?.feedCommentsToday || 4680 },
          { icon: '🔄', label: 'Compartidos', value: md?.feedSharesToday || 1230 },
        ])}
      </div>`

    const feedSection = section('feed', 'FEED', 'Publicaciones Recientes',
      'Las publicaciones mas populares de tu comunidad en tiempo real.',
      feedContent)

    // ── Members
    const membersData = md?.members || [
      { name: 'Elena Dev', username: '@elena_dev', avatar: 'E', role: 'Admin', posts: 342, followers: 2840, joined: 'Ene 2024', status: 'online' },
      { name: 'Carlos UX', username: '@carlos_ux', avatar: 'C', role: 'Moderador', posts: 256, followers: 1920, joined: 'Feb 2024', status: 'online' },
      { name: 'Maria PM', username: '@maria_pm', avatar: 'M', role: 'Pro', posts: 189, followers: 3420, joined: 'Mar 2024', status: 'online' },
      { name: 'Jorge Data', username: '@jorge_data', avatar: 'J', role: 'Miembro', posts: 134, followers: 890, joined: 'Abr 2024', status: 'offline' },
      { name: 'Ana Cloud', username: '@ana_cloud', avatar: 'A', role: 'Pro', posts: 98, followers: 1240, joined: 'May 2024', status: 'online' },
      { name: 'Pablo ML', username: '@pablo_ml', avatar: 'P', role: 'Miembro', posts: 67, followers: 560, joined: 'Jun 2024', status: 'offline' },
    ]

    const memberCards = membersData.map((m: Record<string, string | number>) => {
      const statusDot = m.status === 'online' ? 'var(--success)' : 'var(--text-dim)'
      const roleBadge = m.role === 'Admin' ? 'badge-purple' : m.role === 'Moderador' ? 'badge-blue' : m.role === 'Pro' ? 'badge-accent' : 'badge-primary'
      return `
      <div class="card" style="padding:1.5rem;text-align:center">
        <div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.2rem;color:#fff;margin:0 auto 0.8rem;position:relative">
          ${m.avatar}
          <div style="position:absolute;bottom:2px;right:2px;width:14px;height:14px;border-radius:50%;background:${statusDot};border:2px solid var(--bg-card)"></div>
        </div>
        <h4 style="font-size:0.9rem;font-weight:700">${m.name}</h4>
        <p style="font-size:0.72rem;color:var(--text-dim)">${m.username}</p>
        <span class="badge ${roleBadge}" style="margin-top:4px;display:inline-block">${m.role}</span>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border)">
          <div>
            <div style="font-size:1rem;font-weight:800;color:var(--accent)">${(m.posts as number).toLocaleString()}</div>
            <div style="font-size:0.6rem;color:var(--text-dim)">Posts</div>
          </div>
          <div>
            <div style="font-size:1rem;font-weight:800;color:var(--primary-light)">${(m.followers as number).toLocaleString()}</div>
            <div style="font-size:0.6rem;color:var(--text-dim)">Seguidores</div>
          </div>
        </div>
        <div style="font-size:0.62rem;color:var(--text-dim);margin-top:0.5rem">Desde ${m.joined}</div>
      </div>`
    }).join('')

    const membersContent = `
      <div class="grid-3">${memberCards}</div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '👥', label: 'Total Miembros', value: md?.totalMemCount || 45200 },
          { icon: '🟢', label: 'Online Ahora', value: md?.onlineNow || 3420 },
          { icon: '🆕', label: 'Nuevos (7d)', value: md?.newMembers || 890 },
          { icon: '⭐', label: 'Miembros Pro', value: md?.proMembers || 1240 },
        ])}
      </div>`

    const membersSection = section('members', 'MIEMBROS', 'Comunidad',
      'Todos los miembros con roles, actividad y estado en tiempo real.',
      membersContent)

    // ── Channels
    const channelsData = md?.channels || [
      { name: '# general', description: 'Conversaciones generales de la comunidad', members: 45200, messages: '12,400/sem', icon: '💬', active: true },
      { name: '# dev-talk', description: 'Desarrollo, codigo y tecnologia', members: 18400, messages: '8,200/sem', icon: '💻', active: true },
      { name: '# design', description: 'UI/UX, diseno y creatividad', members: 12300, messages: '4,600/sem', icon: '🎨', active: true },
      { name: '# jobs', description: 'Ofertas de trabajo y freelancing', members: 28900, messages: '2,100/sem', icon: '💼', active: true },
      { name: '# off-topic', description: 'Memes, random y diversion', members: 34100, messages: '15,800/sem', icon: '🎲', active: true },
      { name: '# announcements', description: 'Anuncios oficiales y updates', members: 45200, messages: '340/sem', icon: '📢', active: true },
      { name: '# feedback', description: 'Sugerencias y mejoras', members: 8900, messages: '890/sem', icon: '💡', active: true },
      { name: '# voice-lounge', description: 'Canal de voz para hangouts', members: 6200, messages: '—', icon: '🎙️', active: false },
    ]

    const channelRows = channelsData.map((ch: Record<string, string | number | boolean>) => `
      <div style="display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:1.4rem">${ch.icon}</span>
        <div style="flex:1">
          <h4 style="font-size:0.88rem;font-weight:700">${ch.name}</h4>
          <span style="font-size:0.72rem;color:var(--text-dim)">${ch.description}</span>
        </div>
        <div style="text-align:right">
          <div style="font-size:0.85rem;font-weight:700;color:var(--accent)">${(ch.members as number).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text-dim)">${ch.messages} msgs</div>
        </div>
        <span class="badge ${ch.active ? 'badge-green' : 'badge-yellow'}" style="min-width:60px;text-align:center">${ch.active ? 'Activo' : 'Pausa'}</span>
      </div>
    `).join('')

    const channelsContent = `
      <div class="card" style="padding:1.5rem">
        <div class="card-header"><h3>Canales de la Comunidad</h3><span class="badge badge-accent">${channelsData.length} canales</span></div>
        ${channelRows}
      </div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '📢', label: 'Canales Activos', value: md?.activeChannels || 7 },
          { icon: '💬', label: 'Mensajes/Día', value: md?.dailyMessages || 6400 },
          { icon: '🎙️', label: 'Horas Voz/Día', value: md?.voiceHours || 128 },
          { icon: '📌', label: 'Hilos Activos', value: md?.activeThreads || 342 },
        ])}
      </div>`

    const channelsSection = section('channels', 'CANALES', 'Espacios de Conversacion',
      'Canales tematicos con actividad, miembros y configuracion.',
      channelsContent)

    // ── Moderation
    const modCols: TableColumn[] = [
      { label: 'Contenido', key: 'content' },
      { label: 'Autor', key: 'author' },
      { label: 'Canal', key: 'channel' },
      { label: 'Reportes', key: 'reports', align: 'center' },
      { label: 'Razón', key: 'reason' },
      { label: 'Estado', key: 'status' },
    ]
    const modRows = md?.reportedContent || [
      { content: 'Enlace a sitio sospechoso...', author: '@spam_user42', channel: '#general', reports: '12', reason: 'Spam', status: '<span class="badge badge-red">Pendiente</span>' },
      { content: 'Comentario ofensivo sobre...', author: '@troll_123', channel: '#off-topic', reports: '8', reason: 'Acoso', status: '<span class="badge badge-red">Pendiente</span>' },
      { content: 'Publicidad no autorizada de...', author: '@promo_bot', channel: '#dev-talk', reports: '5', reason: 'Publicidad', status: '<span class="badge badge-yellow">En revision</span>' },
      { content: 'Contenido duplicado de otro...', author: '@copy_paste', channel: '#design', reports: '3', reason: 'Duplicado', status: '<span class="badge badge-green">Resuelto</span>' },
      { content: 'Informacion falsa sobre...', author: '@fake_news', channel: '#general', reports: '15', reason: 'Desinformacion', status: '<span class="badge badge-red">Pendiente</span>' },
      { content: 'Auto-promocion excesiva en...', author: '@self_promo', channel: '#jobs', reports: '4', reason: 'Spam', status: '<span class="badge badge-green">Resuelto</span>' },
    ]

    const modContent = `
      <div class="card">${dataTable(modCols, modRows)}</div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '🚨', label: 'Reportes Pendientes', value: md?.pendingReports || 14 },
          { icon: '🔨', label: 'Bans Este Mes', value: md?.bansThisMonth || 8 },
          { icon: '⚠️', label: 'Advertencias', value: md?.warningsGiven || 23 },
          { icon: '✅', label: 'Resueltos (7d)', value: md?.resolvedReports || 42 },
        ])}
      </div>
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Tipo de Reportes</h3></div>
          ${horizontalBarChart([
            { label: 'Spam', value: 34, color: 'var(--danger)' },
            { label: 'Acoso', value: 18, color: 'var(--warning)' },
            { label: 'Contenido inapropiado', value: 12, color: 'var(--primary-light)' },
            { label: 'Desinformacion', value: 8, color: 'var(--accent)' },
            { label: 'Otros', value: 5, color: 'var(--text-dim)' },
          ])}
        </div>
        <div class="card">
          <div class="card-header"><h3>Moderacion Automatica</h3></div>
          ${progressBar('Spam detectado por IA', md?.spamAI || 94, 'ok')}
          ${progressBar('Contenido NSFW filtrado', md?.nsfwAI || 99, 'ok')}
          ${progressBar('Links maliciosos bloqueados', md?.maliciousAI || 97, 'ok')}
          ${progressBar('Falsos positivos', md?.falsePositives || 3, 'warn')}
        </div>
      </div>`

    const modSection = section('moderation', 'MODERACION', 'Centro de Moderacion',
      'Gestion de contenido reportado, bans y herramientas de moderacion automatica.',
      modContent)

    // ── Analytics
    const growthByWeek: BarChartItem[] = md?.growthByWeek || [
      { label: 'Sem 1', value: 2400 },
      { label: 'Sem 2', value: 2800 },
      { label: 'Sem 3', value: 3100, color: 'var(--accent)' },
      { label: 'Sem 4', value: 3600, color: 'var(--accent)' },
    ]

    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Crecimiento Semanal</h3></div>
          ${horizontalBarChart(growthByWeek)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Metricas de Engagement</h3></div>
          ${progressBar('DAU/MAU Ratio', md?.dauMau || 27, 'primary')}
          ${progressBar('Tasa de retencion (7d)', md?.retention7d || 68, 'ok')}
          ${progressBar('Posts con interaccion', md?.postsEngaged || 82, 'accent')}
          ${progressBar('Tasa de respuesta', md?.replyRate || 45, 'primary')}
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${bigResult(
          md?.mauStr || '45,200',
          md?.mauLabel || 'Usuarios Activos Mensuales (MAU)',
          [
            { title: md?.dauStr || '12,400', subtitle: 'DAU' },
            { title: md?.avgSession || '18min', subtitle: 'Sesion media' },
            { title: md?.postsPerUser || '2.4', subtitle: 'Posts/usuario/sem' },
          ]
        )}
      </div>`

    const anaSection = section('analytics', 'RENDIMIENTO', 'Analytics de la Comunidad',
      'Analisis detallado de crecimiento, engagement y retencion.',
      analyticsContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre de la comunidad', value: c.businessName, type: 'text' },
      { label: 'Email de administracion', value: md?.email || `admin@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Registro abierto', value: '', type: 'toggle', enabled: true },
      { label: 'Verificacion de email obligatoria', value: '', type: 'toggle', enabled: true },
      { label: 'Moderacion automatica IA', value: '', type: 'toggle', enabled: true },
      { label: 'Permitir contenido NSFW', value: '', type: 'toggle', enabled: false },
      { label: 'Notificaciones push', value: '', type: 'toggle', enabled: true },
      { label: 'Modo privado', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACION', 'Ajustes de la Comunidad',
      'Personaliza registro, moderacion y notificaciones.',
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
<style>${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'bold')}</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700;800;900&display=swap');
body { font-family: 'Albert Sans', sans-serif; background: #08080e; }
</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${feedSection}
${membersSection}
${channelsSection}
${modSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface SocialMockData {
  heroTagline?: string
  heroSubtitle?: string
  totalMembers?: number
  dailyPosts?: number
  engagementRate?: number
  growthRate?: number
  dau?: number
  postsToday?: number
  commentsToday?: number
  engagementToday?: number
  activityByHour?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  posts?: Record<string, string | number>[]
  feedPostsToday?: number
  feedLikesToday?: number
  feedCommentsToday?: number
  feedSharesToday?: number
  members?: Record<string, string | number>[]
  totalMemCount?: number
  onlineNow?: number
  newMembers?: number
  proMembers?: number
  channels?: Record<string, string | number | boolean>[]
  activeChannels?: number
  dailyMessages?: number
  voiceHours?: number
  activeThreads?: number
  reportedContent?: Record<string, string>[]
  pendingReports?: number
  bansThisMonth?: number
  warningsGiven?: number
  resolvedReports?: number
  spamAI?: number
  nsfwAI?: number
  maliciousAI?: number
  falsePositives?: number
  growthByWeek?: BarChartItem[]
  dauMau?: number
  retention7d?: number
  postsEngaged?: number
  replyRate?: number
  mauStr?: string
  mauLabel?: string
  dauStr?: string
  avgSession?: string
  postsPerUser?: string
  email?: string
}
