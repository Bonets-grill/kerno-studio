import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  settingsForm, alertRow, bigResult,
  type KpiData, type TableColumn, type BarChartItem,
  type SettingsField,
} from '../shared/components'

export const fleetTemplate: TemplateDefinition = {
  meta: {
    id: 'fleet',
    name: 'Gestión de Flota & Vehículos',
    industries: ['fleet', 'flota', 'vehículos', 'vehicles', 'car', 'coche', 'truck', 'camión', 'rental', 'alquiler', 'taller', 'workshop', 'garage'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'vehicles', 'maintenance', 'fuel', 'drivers', 'tracking', 'settings'],
    description: 'Plantilla industrial para gestión de flotas, talleres y alquiler de vehículos. Dashboard con KPIs de flota, tabla de vehículos, mantenimiento programado, consumo de combustible, conductores y tracking en vivo.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as FleetMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'vehicles', label: 'Vehículos' },
      { id: 'maintenance', label: 'Mantenimiento' },
      { id: 'fuel', label: 'Combustible' },
      { id: 'drivers', label: 'Conductores' },
      { id: 'tracking', label: 'Tracking' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || 'Control total de tu flota',
      md?.heroSubtitle || 'Gestión inteligente de vehículos, mantenimiento predictivo y optimización de rutas en una sola plataforma.',
      [
        { value: md?.totalVehicles || 48, label: 'Vehículos' },
        { value: md?.activeVehicles || 42, label: 'Activos' },
        { value: md?.kmMonth || 128400, label: 'Km/mes' },
        { value: md?.savings || 18200, label: 'Ahorro/mes', prefix: '€' },
      ],
      `Demo Interactivo — ${c.businessType || 'Gestión de Flota'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '🚛', label: 'Total Vehículos', value: md?.totalVehicles || 48, trend: { value: '+3', direction: 'up' } },
      { icon: '✅', label: 'Activos', value: md?.activeVehicles || 42, trend: { value: '87.5%', direction: 'up' } },
      { icon: '🔧', label: 'En Mantenimiento', value: md?.inMaintenance || 4, trend: { value: '-2', direction: 'down' } },
      { icon: '⛽', label: 'Gasto Combustible', value: md?.fuelCost || 8420, prefix: '€', trend: { value: '-6.3%', direction: 'down' } },
    ]

    const vehiclesByStatus: BarChartItem[] = md?.vehiclesByStatus || [
      { label: 'En ruta', value: 28, color: 'var(--success)' },
      { label: 'Disponible', value: 14, color: 'var(--primary-light)' },
      { label: 'Mantenimiento', value: 4, color: 'var(--warning)' },
      { label: 'Avería', value: 1, color: 'var(--danger)' },
      { label: 'Reservado', value: 1, color: 'var(--accent)' },
    ]

    const dashAlerts = [
      alertRow('🔧', md?.alert1 || 'Ford Transit 4821-KLM: Revisión ITV vence en 5 días', 'Urgente', 'badge-red'),
      alertRow('⛽', md?.alert2 || 'Consumo anómalo detectado en Mercedes Vito 9934-BNX', 'Alerta', 'badge-yellow'),
      alertRow('✅', md?.alert3 || '3 vehículos completaron mantenimiento preventivo hoy', 'OK', 'badge-green'),
      alertRow('📍', md?.alert4 || 'Renault Master 2210-FGH fuera de zona asignada', 'Tracking', 'badge-blue'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Vehículos por Estado</h3><span class="badge badge-accent">Tiempo real</span></div>
          ${horizontalBarChart(vehiclesByStatus)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas de Flota</h3><span class="badge badge-primary">${md?.alertCount || 4} alertas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', 'DASHBOARD', 'Panel de Control de Flota',
      'Estado general de la flota, distribución de vehículos y alertas activas.',
      dashContent)

    // ── Vehicles
    const vehicleRows = md?.vehicles || [
      { plate: '4821-KLM', model: 'Ford Transit 350', type: 'Furgoneta', status: '<span class="badge badge-green">En ruta</span>', km: '142,380', driver: 'Carlos Ruiz', nextService: '2026-04-14' },
      { plate: '9934-BNX', model: 'Mercedes Vito 116', type: 'Furgoneta', status: '<span class="badge badge-green">En ruta</span>', km: '98,210', driver: 'Ana García', nextService: '2026-04-28' },
      { plate: '2210-FGH', model: 'Renault Master', type: 'Furgón', status: '<span class="badge badge-yellow">Mantenimiento</span>', km: '187,450', driver: '—', nextService: '2026-04-10' },
      { plate: '5567-JRP', model: 'Iveco Daily 35S', type: 'Camión ligero', status: '<span class="badge badge-green">En ruta</span>', km: '63,820', driver: 'Miguel Torres', nextService: '2026-05-12' },
      { plate: '7743-WDL', model: 'Peugeot Expert', type: 'Furgoneta', status: '<span class="badge badge-blue">Disponible</span>', km: '54,100', driver: '—', nextService: '2026-05-03' },
      { plate: '3318-NCV', model: 'Mercedes Sprinter 314', type: 'Furgón', status: '<span class="badge badge-green">En ruta</span>', km: '112,740', driver: 'Laura Díaz', nextService: '2026-04-22' },
      { plate: '8801-TXZ', model: 'Ford Transit Custom', type: 'Furgoneta', status: '<span class="badge badge-red">Avería</span>', km: '201,300', driver: '—', nextService: 'Pendiente' },
      { plate: '6625-BMQ', model: 'Volkswagen Crafter', type: 'Furgón', status: '<span class="badge badge-green">En ruta</span>', km: '76,890', driver: 'Pedro Sánchez', nextService: '2026-05-18' },
    ]

    const vehicleCols: TableColumn[] = [
      { label: 'Matrícula', key: 'plate' },
      { label: 'Modelo', key: 'model' },
      { label: 'Tipo', key: 'type' },
      { label: 'Estado', key: 'status', align: 'center' },
      { label: 'Km', key: 'km', align: 'right' },
      { label: 'Conductor', key: 'driver' },
      { label: 'Próx. Revisión', key: 'nextService' },
    ]

    const vehContent = `
      <div class="card">
        <div class="card-header"><h3>Inventario de Vehículos</h3><span class="badge badge-accent">${vehicleRows.length} vehículos</span></div>
        ${dataTable(vehicleCols, vehicleRows)}
      </div>
      <div class="grid-4" style="margin-top:1.5rem">
        <div class="card" style="text-align:center;border-left:3px solid var(--success)">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">En Ruta</div>
          <div style="font-size:2rem;font-weight:800;color:var(--success)" class="counter" data-target="${md?.enRuta || 28}">0</div>
        </div>
        <div class="card" style="text-align:center;border-left:3px solid var(--info)">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Disponible</div>
          <div style="font-size:2rem;font-weight:800;color:var(--info)" class="counter" data-target="${md?.disponible || 14}">0</div>
        </div>
        <div class="card" style="text-align:center;border-left:3px solid var(--warning)">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Mantenimiento</div>
          <div style="font-size:2rem;font-weight:800;color:var(--warning)" class="counter" data-target="${md?.enMant || 4}">0</div>
        </div>
        <div class="card" style="text-align:center;border-left:3px solid var(--danger)">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Avería</div>
          <div style="font-size:2rem;font-weight:800;color:var(--danger)" class="counter" data-target="${md?.averia || 1}">0</div>
        </div>
      </div>`

    const vehSection = section('vehicles', 'VEHICULOS', 'Gestión de Vehículos',
      'Inventario completo con matrícula, modelo, estado, kilometraje y próxima revisión.',
      vehContent)

    // ── Maintenance
    const maintRows = md?.maintenance || [
      { vehicle: '2210-FGH Renault Master', type: 'Revisión general', priority: '<span class="badge badge-red">Urgente</span>', scheduled: '2026-04-10', estimatedCost: '€480', technician: 'Taller Central', notes: 'Cambio de frenos + filtros' },
      { vehicle: '4821-KLM Ford Transit', type: 'ITV', priority: '<span class="badge badge-yellow">Alta</span>', scheduled: '2026-04-14', estimatedCost: '€65', technician: 'ITV Alcalá', notes: 'ITV periódica obligatoria' },
      { vehicle: '3318-NCV Mercedes Sprinter', type: 'Cambio neumáticos', priority: '<span class="badge badge-blue">Normal</span>', scheduled: '2026-04-22', estimatedCost: '€640', technician: 'Taller Central', notes: '4 neumáticos traseros' },
      { vehicle: '9934-BNX Mercedes Vito', type: 'Revisión aceite', priority: '<span class="badge badge-blue">Normal</span>', scheduled: '2026-04-28', estimatedCost: '€120', technician: 'Taller Norte', notes: 'Aceite + filtro aceite' },
      { vehicle: '7743-WDL Peugeot Expert', type: 'Mantenimiento preventivo', priority: '<span class="badge badge-green">Baja</span>', scheduled: '2026-05-03', estimatedCost: '€280', technician: 'Taller Central', notes: 'Revisión 50.000km' },
      { vehicle: '8801-TXZ Ford Transit Custom', type: 'Reparación motor', priority: '<span class="badge badge-red">Urgente</span>', scheduled: 'Pendiente', estimatedCost: '€1,800', technician: 'Ford Servicio', notes: 'Fallo turbo - en diagnóstico' },
    ]

    const maintCols: TableColumn[] = [
      { label: 'Vehículo', key: 'vehicle' },
      { label: 'Tipo', key: 'type' },
      { label: 'Prioridad', key: 'priority', align: 'center' },
      { label: 'Fecha', key: 'scheduled' },
      { label: 'Coste Est.', key: 'estimatedCost', align: 'right' },
      { label: 'Taller', key: 'technician' },
    ]

    const maintContent = `
      <div class="card">
        <div class="card-header"><h3>Calendario de Mantenimiento</h3><span class="badge badge-accent">${maintRows.length} pendientes</span></div>
        ${dataTable(maintCols, maintRows)}
      </div>
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Tipo de Mantenimiento</h3></div>
          ${horizontalBarChart([
            { label: 'Preventivo', value: 18, color: 'var(--success)' },
            { label: 'Correctivo', value: 8, color: 'var(--warning)' },
            { label: 'ITV / Legal', value: 6, color: 'var(--info)' },
            { label: 'Neumáticos', value: 4, color: 'var(--accent)' },
            { label: 'Emergencia', value: 2, color: 'var(--danger)' },
          ])}
        </div>
        <div class="card">
          <div class="card-header"><h3>Coste de Mantenimiento</h3></div>
          ${progressBar('Presupuesto utilizado', 62, 'primary')}
          ${progressBar('Preventivo vs Correctivo', 72, 'ok')}
          ${progressBar('Cumplimiento calendario', 88, 'ok')}
          ${bigResult(md?.maintCostMonth || '€3,385', 'Coste total mantenimiento este mes')}
        </div>
      </div>`

    const maintSection = section('maintenance', 'MANTENIMIENTO', 'Mantenimiento Programado',
      'Calendario de revisiones, ITV, reparaciones y mantenimiento preventivo de la flota.',
      maintContent)

    // ── Fuel
    const fuelRows = md?.fuelConsumption || [
      { vehicle: '4821-KLM', model: 'Ford Transit 350', liters: '420', cost: '€630', kmDriven: '4,200', consumption: '10.0 L/100km', efficiency: '<span class="badge badge-green">Normal</span>' },
      { vehicle: '9934-BNX', model: 'Mercedes Vito 116', liters: '285', cost: '€428', kmDriven: '3,800', consumption: '7.5 L/100km', efficiency: '<span class="badge badge-green">Bueno</span>' },
      { vehicle: '5567-JRP', model: 'Iveco Daily 35S', liters: '510', cost: '€765', kmDriven: '3,400', consumption: '15.0 L/100km', efficiency: '<span class="badge badge-red">Alto</span>' },
      { vehicle: '3318-NCV', model: 'Mercedes Sprinter', liters: '380', cost: '€570', kmDriven: '3,600', consumption: '10.6 L/100km', efficiency: '<span class="badge badge-yellow">Regular</span>' },
      { vehicle: '6625-BMQ', model: 'VW Crafter', liters: '340', cost: '€510', kmDriven: '3,200', consumption: '10.6 L/100km', efficiency: '<span class="badge badge-yellow">Regular</span>' },
      { vehicle: '7743-WDL', model: 'Peugeot Expert', liters: '180', cost: '€270', kmDriven: '2,400', consumption: '7.5 L/100km', efficiency: '<span class="badge badge-green">Bueno</span>' },
    ]

    const fuelCols: TableColumn[] = [
      { label: 'Matrícula', key: 'vehicle' },
      { label: 'Modelo', key: 'model' },
      { label: 'Litros', key: 'liters', align: 'right' },
      { label: 'Coste', key: 'cost', align: 'right' },
      { label: 'Km Recorridos', key: 'kmDriven', align: 'right' },
      { label: 'Consumo', key: 'consumption', align: 'right' },
      { label: 'Eficiencia', key: 'efficiency', align: 'center' },
    ]

    const fuelContent = `
      <div class="card">
        <div class="card-header"><h3>Consumo de Combustible</h3><span class="badge badge-accent">Último mes</span></div>
        ${dataTable(fuelCols, fuelRows)}
      </div>
      ${bigResult(md?.totalFuelCost || '€8,420', 'Gasto total combustible — Marzo 2026', [
        { title: md?.totalLiters || '5,620 L', subtitle: 'Litros consumidos' },
        { title: md?.avgConsumption || '9.8 L/100km', subtitle: 'Consumo medio flota' },
        { title: md?.fuelSaving || '-6.3%', subtitle: 'vs. mes anterior' },
      ])}`

    const fuelSection = section('fuel', 'COMBUSTIBLE', 'Gestión de Combustible',
      'Consumo por vehículo, costes, eficiencia y evolución mensual.',
      fuelContent)

    // ── Drivers
    const driverRows = md?.drivers || [
      { name: 'Carlos Ruiz', license: 'B + C1', expiry: '2028-06-15', vehicle: '4821-KLM', km: '4,200', trips: '38', rating: '<span class="badge badge-green">4.8</span>', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Ana García', license: 'B', expiry: '2027-11-20', vehicle: '9934-BNX', km: '3,800', trips: '42', rating: '<span class="badge badge-green">4.9</span>', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Miguel Torres', license: 'B + C1 + C', expiry: '2029-03-08', vehicle: '5567-JRP', km: '3,400', trips: '28', rating: '<span class="badge badge-yellow">4.2</span>', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Laura Díaz', license: 'B + C1', expiry: '2027-08-30', vehicle: '3318-NCV', km: '3,600', trips: '35', rating: '<span class="badge badge-green">4.7</span>', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Pedro Sánchez', license: 'B + C1', expiry: '2028-12-10', vehicle: '6625-BMQ', km: '3,200', trips: '31', rating: '<span class="badge badge-green">4.6</span>', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Marta López', license: 'B', expiry: '2026-07-22', vehicle: '—', km: '0', trips: '0', rating: '<span class="badge badge-blue">—</span>', status: '<span class="badge badge-yellow">Baja médica</span>' },
    ]

    const driverCols: TableColumn[] = [
      { label: 'Conductor', key: 'name' },
      { label: 'Permiso', key: 'license' },
      { label: 'Caducidad', key: 'expiry' },
      { label: 'Vehículo', key: 'vehicle' },
      { label: 'Km/mes', key: 'km', align: 'right' },
      { label: 'Viajes', key: 'trips', align: 'right' },
      { label: 'Rating', key: 'rating', align: 'center' },
      { label: 'Estado', key: 'status', align: 'center' },
    ]

    const driverContent = `
      <div class="card">
        <div class="card-header"><h3>Equipo de Conductores</h3><span class="badge badge-accent">${driverRows.length} conductores</span></div>
        ${dataTable(driverCols, driverRows)}
      </div>
      <div class="grid-3" style="margin-top:1.5rem">
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Rating Medio</div>
          <div style="font-size:1.8rem;font-weight:800;color:var(--success)" class="counter" data-target="4.6" data-decimals="1">0</div>
          <div style="font-size:0.72rem;color:var(--text-muted)">de 5.0</div>
        </div>
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Viajes Totales</div>
          <div style="font-size:1.8rem;font-weight:800;color:var(--accent)" class="counter" data-target="${md?.totalTrips || 174}">0</div>
          <div style="font-size:0.72rem;color:var(--text-muted)">este mes</div>
        </div>
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Licencias por Caducar</div>
          <div style="font-size:1.8rem;font-weight:800;color:var(--warning)" class="counter" data-target="${md?.licensesExpiring || 1}">0</div>
          <div style="font-size:0.72rem;color:var(--text-muted)">próximos 6 meses</div>
        </div>
      </div>`

    const driverSection = section('drivers', 'CONDUCTORES', 'Gestión de Conductores',
      'Equipo, permisos de conducir, vehículos asignados y rendimiento.',
      driverContent)

    // ── Tracking
    const trackingCards = md?.tracking || [
      { plate: '4821-KLM', model: 'Ford Transit 350', driver: 'Carlos Ruiz', location: 'A-2 km 34, Madrid → Guadalajara', speed: '92 km/h', status: 'en-ruta', fuel: '68%', eta: '14:45' },
      { plate: '9934-BNX', model: 'Mercedes Vito 116', driver: 'Ana García', location: 'Polígono Ind. San Fernando, Madrid', speed: '0 km/h', status: 'detenido', fuel: '42%', eta: 'En destino' },
      { plate: '5567-JRP', model: 'Iveco Daily 35S', driver: 'Miguel Torres', location: 'M-40 km 12, Madrid Sur', speed: '78 km/h', status: 'en-ruta', fuel: '55%', eta: '15:20' },
      { plate: '3318-NCV', model: 'Mercedes Sprinter', driver: 'Laura Díaz', location: 'C/ Gran Vía 28, Madrid Centro', speed: '0 km/h', status: 'detenido', fuel: '81%', eta: 'Cargando' },
      { plate: '6625-BMQ', model: 'VW Crafter', driver: 'Pedro Sánchez', location: 'AP-6 km 58, Villalba', speed: '110 km/h', status: 'en-ruta', fuel: '73%', eta: '16:00' },
      { plate: '7743-WDL', model: 'Peugeot Expert', driver: '—', location: 'Base Central, Nave 3', speed: '0 km/h', status: 'base', fuel: '95%', eta: '—' },
    ]

    const getStatusBadge = (status: string) => {
      if (status === 'en-ruta') return '<span class="badge badge-green">En Ruta</span>'
      if (status === 'detenido') return '<span class="badge badge-yellow">Detenido</span>'
      return '<span class="badge badge-blue">En Base</span>'
    }

    const trackingHtml = `
      <div class="grid-2">
        ${trackingCards.map((v: TrackingVehicle) => `
        <div class="card" style="border-left:3px solid ${v.status === 'en-ruta' ? 'var(--success)' : v.status === 'detenido' ? 'var(--warning)' : 'var(--info)'}">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem">
            <div>
              <div style="font-weight:700;font-size:0.9rem">${v.plate} — ${v.model}</div>
              <div style="font-size:0.72rem;color:var(--text-muted)">${v.driver}</div>
            </div>
            ${getStatusBadge(v.status)}
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;font-size:0.76rem">
            <div><span style="color:var(--text-dim)">Ubicación:</span><br/><span style="color:var(--text-muted)">${v.location}</span></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.3rem">
              <div><span style="color:var(--text-dim)">Velocidad</span><br/><span style="font-weight:700">${v.speed}</span></div>
              <div><span style="color:var(--text-dim)">ETA</span><br/><span style="font-weight:700">${v.eta}</span></div>
            </div>
          </div>
          <div style="margin-top:0.6rem">
            ${progressBar('Combustible: ' + v.fuel, parseInt(v.fuel), parseInt(v.fuel) > 50 ? 'ok' : parseInt(v.fuel) > 20 ? 'warn' : 'crit')}
          </div>
        </div>`).join('')}
      </div>`

    const trackContent = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:1.5rem">
        <span class="badge badge-green" style="animation:dotPulse 2s infinite;width:8px;height:8px;border-radius:50%;padding:0;display:inline-block;background:var(--success)"></span>
        <span style="font-size:0.78rem;color:var(--text-muted)">Tracking en tiempo real — Última actualización: hace 12 segundos</span>
      </div>
      ${trackingHtml}`

    const trackSection = section('tracking', 'TRACKING', 'Seguimiento en Vivo',
      'Estado, ubicación, velocidad y combustible de cada vehículo en tiempo real.',
      trackContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre de la empresa', value: c.businessName, type: 'text' },
      { label: 'Base principal', value: md?.baseLocation || 'Polígono Industrial Norte, Madrid', type: 'text' },
      { label: 'Email de alertas', value: md?.alertEmail || `flota@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Alertas de velocidad', value: '', type: 'toggle', enabled: true },
      { label: 'Alertas de combustible bajo', value: '', type: 'toggle', enabled: true },
      { label: 'Recordatorios ITV', value: '', type: 'toggle', enabled: true },
      { label: 'Geofencing activo', value: '', type: 'toggle', enabled: true },
      { label: 'Modo nocturno', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACION', 'Ajustes de Flota',
      'Base, alertas, geofencing y configuración general del sistema.',
      settContent)

    // ── Footer
    const footer = `<div class="footer">&copy; 2026 ${c.businessName} — Prototipo generado por <strong style="color:var(--accent)">Kerno Studio</strong></div>`

    // ── Extra CSS overrides for fleet-specific styling
    const fleetCSS = `
      @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800;900&display=swap');

      body { font-family: 'Exo 2', sans-serif !important; }
      .nav-brand, .hero-h1, .s-title, h3 { font-family: 'Exo 2', sans-serif !important; }
      .kpi { border-left: 3px solid var(--primary); }
      /* Industrial accent: subtle diagonal stripes on hero */
      .hero-wrap::after {
        content: '';
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: repeating-linear-gradient(
          -45deg, transparent, transparent 40px,
          rgba(255,255,255,0.008) 40px, rgba(255,255,255,0.008) 80px
        );
        pointer-events: none; z-index: 0;
      }
    `

    // ── Assemble
    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.businessName} — Fleet Management Demo</title>
<style>${designSystemCSS(c.primaryColor || '#10b981', c.accentColor || '#f59e0b', c.theme || 'executive')}${fleetCSS}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${vehSection}
${maintSection}
${fuelSection}
${driverSection}
${trackSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface TrackingVehicle {
  plate: string
  model: string
  driver: string
  location: string
  speed: string
  status: string
  fuel: string
  eta: string
}

interface FleetMockData {
  heroTagline?: string
  heroSubtitle?: string
  totalVehicles?: number
  activeVehicles?: number
  kmMonth?: number
  savings?: number
  inMaintenance?: number
  fuelCost?: number
  vehiclesByStatus?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  vehicles?: Record<string, string>[]
  enRuta?: number
  disponible?: number
  enMant?: number
  averia?: number
  maintenance?: Record<string, string>[]
  maintCostMonth?: string
  fuelConsumption?: Record<string, string>[]
  totalFuelCost?: string
  totalLiters?: string
  avgConsumption?: string
  fuelSaving?: string
  drivers?: Record<string, string>[]
  totalTrips?: number
  licensesExpiring?: number
  tracking?: TrackingVehicle[]
  baseLocation?: string
  alertEmail?: string
}
