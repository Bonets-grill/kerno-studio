// In-memory demo store (replace with Supabase later)
const demos = new Map<string, { html: string; name: string; createdAt: string }>()

export function saveDemo(html: string, name: string): string {
  const id = `demo_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
  demos.set(id, { html, name, createdAt: new Date().toISOString() })
  return id
}

export function getDemo(id: string): { html: string; name: string; createdAt: string } | undefined {
  return demos.get(id)
}

export function deleteDemo(id: string): boolean {
  return demos.delete(id)
}
