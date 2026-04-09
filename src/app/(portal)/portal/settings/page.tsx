'use client'

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Ajustes</h2>
        <p className="text-muted text-sm">Configura tu perfil y preferencias</p>
      </div>

      {/* Profile */}
      <div className="p-6 rounded-2xl bg-surface-2 border border-border">
        <h3 className="text-sm font-semibold mb-4">Perfil</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="settings-name" className="text-sm text-muted mb-1 block">Nombre</label>
            <input
              id="settings-name"
              type="text"
              defaultValue="Mario"
              className="w-full px-4 py-3 rounded-xl bg-surface-3 border border-border text-foreground focus:outline-none focus:border-neon-cyan/50"
            />
          </div>
          <div>
            <label htmlFor="settings-email" className="text-sm text-muted mb-1 block">Email</label>
            <input
              id="settings-email"
              type="email"
              defaultValue="mario@ejemplo.com"
              className="w-full px-4 py-3 rounded-xl bg-surface-3 border border-border text-foreground focus:outline-none focus:border-neon-cyan/50"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-6 rounded-2xl bg-surface-2 border border-border">
        <h3 className="text-sm font-semibold mb-4">Notificaciones</h3>
        <div className="space-y-3">
          {[
            { label: 'Actualizaciones de progreso', id: 'notif-progress' },
            { label: 'Nuevos mensajes del equipo', id: 'notif-messages' },
            { label: 'Documentos disponibles', id: 'notif-docs' },
          ].map((item) => (
            <label key={item.id} htmlFor={item.id} className="flex items-center justify-between py-2 cursor-pointer">
              <span className="text-sm">{item.label}</span>
              <input id={item.id} type="checkbox" defaultChecked className="w-4 h-4 accent-neon-cyan" />
            </label>
          ))}
        </div>
      </div>

      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold hover:opacity-90">
        Guardar cambios
      </button>
    </div>
  )
}
