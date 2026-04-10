import { saveDemo, getDemo } from '@/lib/demo-store'

export async function POST(req: Request) {
  const { html, name } = (await req.json()) as { html: string; name: string }
  if (!html) return Response.json({ error: 'Missing html' }, { status: 400 })
  const id = saveDemo(html, name || 'Demo')
  const url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://kerno-studio.vercel.app'}/demo/${id}`
  return Response.json({ id, url })
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })
  const demo = getDemo(id)
  if (!demo) return Response.json({ error: 'Demo not found' }, { status: 404 })
  return Response.json(demo)
}
